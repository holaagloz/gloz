import { Component, input } from '@angular/core';

export type ButtonVariant = 'solid' | 'light' | 'outline';

/**
 * Botón de la marca sobre un <a> o <button> nativo (conserva su semántica).
 * solid: azul con letra blanca (fondos claros) · light: blanco con letra azul (sobre azul) · outline: secundario.
 */
@Component({
  selector: 'a[glozButton], button[glozButton]',
  host: {
    class: 'gloz-btn',
    '[class.gloz-btn--light]': "variant() === 'light'",
    '[class.gloz-btn--outline]': "variant() === 'outline'",
    '[class.gloz-btn--small]': 'small()',
  },
  template: `
    <ng-content />
    @if (arrow()) {
      <svg class="flecha" viewBox="0 0 18 18" aria-hidden="true" focusable="false"><path d="M4 14 14 4M6 4h8v8" /></svg>
    }
  `,
  styles: `
    :host {
      --b-bg: var(--brand);
      --b-ink: #fff;
      --b-hover: var(--brand-press);
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: 0.7em;
      min-height: 52px;
      padding: 0.85em 1.4em 0.85em 1.5em;
      border: 1px solid transparent;
      border-radius: 999px;
      background: var(--b-bg);
      color: var(--b-ink);
      font: 700 15px/1.2 var(--font-body);
      letter-spacing: 0.01em;
      text-decoration: none;
      cursor: pointer;
      transition:
        background-color var(--t-hover) var(--ease),
        scale 0.18s var(--ease);
    }
    :host(:hover) {
      background: var(--b-hover);
    }
    :host(:active) {
      scale: 0.97;
    }
    :host(.gloz-btn--light) {
      --b-bg: #fff;
      --b-ink: var(--brand);
      --b-hover: var(--bg);
    }
    :host(.gloz-btn--outline) {
      --b-bg: transparent;
      --b-ink: currentColor;
      --b-hover: rgb(255 255 255 / 10%);
      border-color: currentColor;
    }
    :host(.gloz-btn--small) {
      min-height: 44px;
      padding: 0.6em 1.15em;
      font-size: 14px;
    }
    .flecha {
      width: 18px;
      height: 18px;
      flex: none;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      transition: translate var(--t-hover) var(--ease);
    }
    :host(:hover) .flecha {
      translate: 3px -3px;
    }
  `,
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('solid');
  readonly arrow = input(true);
  readonly small = input(false);
}
