import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID, Service } from '@angular/core';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import { MOTION } from './motion.tokens';

export type RevealMode = 'up' | 'fade' | 'line' | 'media';

/** Deshace lo que se creó (animaciones, divisiones de texto, observadores). */
export type Cleanup = () => void;
const noop: Cleanup = () => undefined;

/**
 * Único punto de entrada a GSAP, ScrollTrigger, SplitText y Lenis.
 * - Solo actúa en el navegador (el HTML prerenderizado se ve completo y quieto).
 * - Con "Reducir movimiento" no crea Lenis ni animaciones: todo queda visible.
 * - Los componentes piden efectos por intención (revelar, dividir, dibujar) y reciben su limpieza.
 */
@Service()
export class MotionService {
  private readonly document = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private lenis: Lenis | null = null;
  private started = false;
  private fontsReady: Promise<void> | null = null;

  readonly tokens = MOTION;

  /** true si se pueden reproducir animaciones (navegador y sin "Reducir movimiento"). */
  get enabled(): boolean {
    return this.isBrowser && !this.reducedMotion;
  }

  get reducedMotion(): boolean {
    return this.isBrowser && !!this.document.defaultView?.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  get gsap(): typeof gsap {
    return gsap;
  }

  /** Arranca una sola vez: plugins, Lenis y anclas suaves. */
  start(): void {
    if (!this.isBrowser || this.started) return;
    this.started = true;
    gsap.registerPlugin(ScrollTrigger, SplitText);
    ScrollTrigger.config({ ignoreMobileResize: true });
    this.document.addEventListener('click', this.onAnchorClick);
    if (!this.enabled || !MOTION.lerp) return;
    this.lenis = new Lenis({ lerp: MOTION.lerp, smoothWheel: true });
    this.lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => this.lenis?.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  /** Resuelve cuando cargan las fuentes, con tope de 1.2 s para no esperar de más. */
  whenFontsReady(): Promise<void> {
    if (!this.isBrowser) return Promise.resolve();
    this.fontsReady ??= Promise.race([
      this.document.fonts?.ready.then(() => undefined) ?? Promise.resolve(),
      new Promise<void>((r) => setTimeout(r, 1200)),
    ]);
    return this.fontsReady;
  }

  refresh(): void {
    if (this.isBrowser && this.started) ScrollTrigger.refresh();
  }

  scrollTo(target: HTMLElement): void {
    if (this.lenis) this.lenis.scrollTo(target, { offset: -8, duration: 1.4 });
    else target.scrollIntoView({ behavior: this.reducedMotion ? 'auto' : 'smooth' });
  }

  /** Revela un bloque al entrar en pantalla, una sola vez. */
  reveal(el: HTMLElement, mode: RevealMode = 'up', delay = 0): Cleanup {
    if (!this.enabled) return noop;
    const trigger = { trigger: el, start: 'top 88%', once: true };
    const base = { duration: MOTION.dur, ease: MOTION.ease, delay, scrollTrigger: trigger };
    let tween: gsap.core.Animation;
    switch (mode) {
      case 'fade':
        tween = gsap.from(el, { autoAlpha: 0, ...base });
        break;
      case 'line': {
        // Avanza en la dirección de la línea: horizontal de izquierda a derecha, vertical de arriba hacia abajo
        const vertical = el.offsetHeight > el.offsetWidth;
        const axis = vertical ? { scaleY: 0, transformOrigin: '50% 0' } : { scaleX: 0, transformOrigin: '0 50%' };
        tween = gsap.from(el, { ...axis, ...base, duration: MOTION.dur * 1.6, ease: MOTION.easeIO });
        break;
      }
      case 'media':
        tween = gsap.from(el, { clipPath: 'inset(14% 10% 14% 10% round 20px)', scale: 1.06, ...base, duration: MOTION.dur * 1.4 });
        break;
      default:
        tween = gsap.from(el, { autoAlpha: 0, y: MOTION.dist, ...base });
    }
    return () => tween.scrollTrigger?.kill() ?? tween.kill();
  }

  /** Título que sube por líneas desde una ranura. Se vuelve a dividir si cambia el ancho. */
  splitLines(el: HTMLElement): Cleanup {
    if (!this.enabled) return noop;
    let split: SplitText | null = null;
    void this.whenFontsReady().then(() => {
      split = SplitText.create(el, {
        type: 'lines',
        mask: 'lines',
        linesClass: 'linea',
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 130,
            duration: MOTION.dur,
            stagger: MOTION.stagger,
            ease: MOTION.ease,
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }),
      });
    });
    return () => split?.revert();
  }

  /** Esconde trazos SVG para dibujarlos después. Sin movimiento, quedan completos. */
  prepareStrokes(paths: readonly SVGGeometryElement[]): readonly SVGGeometryElement[] {
    if (!this.enabled) return paths;
    paths.forEach((p) => {
      const length = p.getTotalLength();
      gsap.set(p, { strokeDasharray: length, strokeDashoffset: length, opacity: 0 });
    });
    return paths;
  }

  /** Dibuja trazos (flechas de anotación) como si alguien los trazara. */
  drawStrokes(paths: readonly SVGGeometryElement[], vars: gsap.TweenVars = {}): gsap.core.Tween {
    return gsap.fromTo(
      paths,
      { strokeDashoffset: (_: number, p: SVGGeometryElement) => p.getTotalLength(), opacity: 1 },
      // immediateRender: false → cada trazo sigue escondido hasta su turno (sin puntitos antes de dibujarse)
      { strokeDashoffset: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: MOTION.easeIO, immediateRender: false, ...vars },
    );
  }

  /** Dibuja un grupo de trazos y muestra sus etiquetas al entrar en pantalla. */
  drawOnScroll(container: HTMLElement): Cleanup {
    if (!this.enabled) return noop;
    const paths = this.prepareStrokes([...container.querySelectorAll<SVGGeometryElement>('[data-trazo]')]);
    const labels = [...container.querySelectorAll<HTMLElement>('[data-trazo-etiqueta]')];
    gsap.set(labels, { autoAlpha: 0 });
    const tl = gsap
      .timeline({ scrollTrigger: { trigger: container, start: 'top 80%', once: true } })
      .add(this.drawStrokes(paths))
      .to(labels, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08, ease: MOTION.ease }, 0.3);
    return () => tl.scrollTrigger?.kill() ?? tl.kill();
  }

  private readonly onAnchorClick = (e: MouseEvent): void => {
    const link = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
    const id = link?.getAttribute('href')?.slice(1);
    const target = id ? this.document.getElementById(id) : null;
    if (!target) return;
    e.preventDefault();
    this.scrollTo(target);
    this.document.defaultView?.history.replaceState(null, '', `#${id}`);
    target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };
}
