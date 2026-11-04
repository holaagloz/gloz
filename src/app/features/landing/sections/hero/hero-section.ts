import { Component, ElementRef, inject } from '@angular/core';
import { SplitText } from 'gsap/SplitText';
import { motionEffect } from '../../../../core/motion/motion-effect';
import { MotionService } from '../../../../core/motion/motion.service';
import { NAV_LINKS, SITE, WHATSAPP_MESSAGES } from '../../../../data/site.data';
import { WhatsappLinkDirective } from '../../../../shared/directives/whatsapp-link.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { LogoComponent } from '../../../../shared/ui/logo/logo';
import { HeroCompositionComponent } from './hero-composition';
import { traceArrowToButton } from './hero-path';

/**
 * Portada con la firma de Gloz: el logo sube letra por letra, el titular pasa de borroso a nítido,
 * las piezas se asientan, las flechas se dibujan y la última termina en el botón de WhatsApp.
 * Se salta con un toque. Sin JavaScript o con "Reducir movimiento" se ve completa y quieta.
 */
@Component({
  selector: 'gloz-hero-section',
  imports: [LogoComponent, ButtonComponent, WhatsappLinkDirective, HeroCompositionComponent],
  templateUrl: './hero-section.html',
  styleUrl: './hero-section.css',
})
export class HeroSection {
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly message = WHATSAPP_MESSAGES.hero;

  constructor() {
    motionEffect((motion) => {
      const retrace = () => traceArrowToButton(this.host);
      retrace();
      let width = window.innerWidth;
      const onResize = () => {
        if (window.innerWidth === width) return; // en celular la barra del navegador solo cambia el alto
        width = window.innerWidth;
        const path = retrace();
        if (path && motion.enabled) motion.gsap.set(path, { strokeDasharray: 'none', strokeDashoffset: 0, opacity: 1 });
      };
      window.addEventListener('resize', onResize);
      if (!motion.enabled) return () => window.removeEventListener('resize', onResize);

      let timeline: gsap.core.Timeline | undefined;
      const skip = () => timeline?.progress(1);
      void motion.whenFontsReady().then(() => {
        timeline = this.signature(motion);
        document.addEventListener('pointerdown', skip, { once: true });
        document.addEventListener('keydown', skip, { once: true });
        motion.refresh();
      });
      return () => {
        window.removeEventListener('resize', onResize);
        document.removeEventListener('pointerdown', skip);
        document.removeEventListener('keydown', skip);
        timeline?.kill();
      };
    });
  }

  private signature(motion: MotionService): gsap.core.Timeline {
    const { gsap, tokens: M } = motion;
    const q = (s: string) => [...this.host.querySelectorAll<HTMLElement>(s)];
    const arrowToButton = traceArrowToButton(this.host);
    const arrows = motion.prepareStrokes(q('[data-flecha]') as unknown as SVGGeometryElement[]);
    // Se divide el h1 completo: SplitText le pone la etiqueta accesible al título (válido en un heading)
    const words = q('[data-palabras]').flatMap((el) => SplitText.create(el, { type: 'words', wordsClass: 'palabra' }).words);

    gsap.set(q('[data-hero-in]'), { visibility: 'visible' });
    const tl = gsap
      .timeline({ defaults: { ease: M.ease } })
      .fromTo(q('[data-logo] .logo__pieza'), { yPercent: 120, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: M.dur, stagger: M.stagger }, 0)
      .fromTo(q('[data-nav-in]'), { autoAlpha: 0, y: -12 }, { autoAlpha: 1, y: 0, duration: M.dur }, 0.2)
      .fromTo(words, { autoAlpha: 0, y: 14, filter: 'blur(10px)' }, { autoAlpha: 1, y: 0, filter: 'blur(0px)', duration: M.dur * 1.1, stagger: M.stagger * 1.4 }, 0.15)
      .fromTo(q('[data-sube]'), { autoAlpha: 0, y: M.dist }, { autoAlpha: 1, y: 0, duration: M.dur, stagger: M.stagger * 2 }, 0.55)
      .fromTo(q('[data-pieza]'), { autoAlpha: 0, y: 90, rotation: (i: number) => [-5, 4, 6][i] ?? 0 }, { autoAlpha: 1, y: 0, rotation: 0, duration: M.dur * 1.35, stagger: 0.12 }, 0.5)
      .add(motion.drawStrokes(arrows, { duration: 0.75, stagger: 0.09 }), 1.2)
      .fromTo(q('[data-etiqueta]'), { autoAlpha: 0, y: 6 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.09 }, 1.45)
      .fromTo(q('[data-buscador]'), { autoAlpha: 0, scale: 0.9 }, { autoAlpha: 1, scale: 1, duration: 0.6, ease: M.pop }, 1.7);
    if (arrowToButton) {
      motion.prepareStrokes([arrowToButton]);
      tl.add(motion.drawStrokes([arrowToButton], { duration: 0.9 }), 1.85);
    }
    return tl;
  }
}
