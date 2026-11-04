import { Component, ElementRef, input, linkedSignal, viewChild } from '@angular/core';
import { motionEffect } from '../../../core/motion/motion-effect';

/**
 * La píldora de búsqueda de la marca ("¿Quién hace contenido para…?").
 * Rota entre rubros reales de clientes; con "Reducir movimiento" se queda en el primero.
 * Es decorativa: los lectores de pantalla no la leen.
 */
@Component({
  selector: 'gloz-search-pill',
  host: { 'aria-hidden': 'true' },
  template: `
    <svg viewBox="0 0 16 16" focusable="false"><circle cx="7" cy="7" r="5" /><path d="m11 11 3.5 3.5" /></svg>
    <span>¿Quién hace contenido para <b #topic>{{ current() }}</b>?</span>
  `,
  styles: `
    :host {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 9px 16px 9px 12px;
      border-radius: 999px;
      background: #fff;
      color: var(--ink);
      font-size: clamp(12px, 1.1vw, 14px);
      font-weight: 500;
      box-shadow: 0 18px 30px -16px rgb(8 18 48 / 60%);
    }
    svg {
      width: 16px;
      height: 16px;
      flex: none;
      fill: none;
      stroke: var(--brand);
      stroke-width: 2.2;
      stroke-linecap: round;
    }
    b {
      display: inline-block;
      color: var(--brand);
      font-weight: 700;
    }
  `,
})
export class SearchPillComponent {
  readonly topics = input.required<readonly string[]>();
  /** Empieza en el primer rubro (así se pinta en el HTML prerenderizado) y la rotación lo cambia. */
  protected readonly current = linkedSignal(() => this.topics()[0] ?? '');
  private readonly topic = viewChild.required<ElementRef<HTMLElement>>('topic');

  constructor() {
    motionEffect((motion) => {
      if (!motion.enabled) return;
      const { gsap, tokens } = motion;
      let index = 0;
      const id = setInterval(() => {
        index = (index + 1) % this.topics().length;
        const el = this.topic().nativeElement;
        gsap
          .timeline()
          .to(el, { yPercent: -60, autoAlpha: 0, duration: 0.3, ease: 'power2.in' })
          .add(() => this.current.set(this.topics()[index] ?? ''))
          .fromTo(el, { yPercent: 60, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, duration: 0.45, ease: tokens.ease });
      }, 2600);
      return () => clearInterval(id);
    });
  }
}
