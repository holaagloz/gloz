import { Directive, ElementRef, inject, input } from '@angular/core';
import { motionEffect } from '../../core/motion/motion-effect';
import { RevealMode } from '../../core/motion/motion.service';

/** Revela el elemento al entrar en pantalla: `glozReveal`, `glozReveal="line"`, `glozReveal="media"`. */
@Directive({ selector: '[glozReveal]' })
export class RevealDirective {
  readonly glozReveal = input<RevealMode | ''>('');
  readonly revealDelay = input(0);

  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    motionEffect((motion) => motion.reveal(el, this.glozReveal() || 'up', this.revealDelay()));
  }
}

/** Título que sube por líneas. */
@Directive({ selector: '[glozSplitLines]' })
export class SplitLinesDirective {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    motionEffect((motion) => motion.splitLines(el));
  }
}

/** Dibuja los trazos `[data-trazo]` y muestra las `[data-trazo-etiqueta]` del contenedor al entrar en pantalla. */
@Directive({ selector: '[glozDrawOnScroll]' })
export class DrawOnScrollDirective {
  constructor() {
    const el = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    motionEffect((motion) => motion.drawOnScroll(el));
  }
}
