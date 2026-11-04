import { Component, input } from '@angular/core';
import { SplitLinesDirective } from '../../directives/motion.directives';

/** Título de sección que sube por líneas. Se proyecta para permitir énfasis (<em>). */
@Component({
  selector: 'gloz-section-heading',
  imports: [SplitLinesDirective],
  template: `
    <h2 class="titulo" [id]="titleId()" glozSplitLines><ng-content /></h2>
  `,
  styles: `
    :host {
      display: block;
    }
  `,
})
export class SectionHeadingComponent {
  readonly titleId = input.required<string>();
}
