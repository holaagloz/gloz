import { Component, input } from '@angular/core';
import { LOGO_LETTERS, LOGO_VIEWBOX } from '../../../data/logo.data';

/** "Gloz" en trazos: toma el color del texto donde esté y cada letra se puede animar (`.logo__pieza`). */
@Component({
  selector: 'gloz-logo',
  template: `
    <svg [attr.viewBox]="viewBox" [attr.role]="decorative() ? null : 'img'" [attr.aria-label]="decorative() ? null : 'Gloz'" [attr.aria-hidden]="decorative() || null" focusable="false">
      @for (piece of letters; track piece.letter) {
        <path class="logo__pieza" [attr.d]="piece.d" />
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }
    svg {
      height: 1em;
      width: auto;
      fill: currentColor;
      overflow: visible;
    }
    .logo__pieza {
      transform-box: fill-box;
      transform-origin: 50% 100%;
    }
  `,
})
export class LogoComponent {
  readonly decorative = input(false);
  protected readonly viewBox = LOGO_VIEWBOX;
  protected readonly letters = LOGO_LETTERS;
}
