import { NgOptimizedImage } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { ResponsiveImage } from '../../../models/content.models';

/** Foto vertical 4:5 de la marca, con sus anchos preparados y NgOptimizedImage. */
@Component({
  selector: 'gloz-responsive-image',
  imports: [NgOptimizedImage],
  template: `
    <img
      [ngSrc]="image().path"
      [ngSrcset]="srcset()"
      [sizes]="sizes()"
      [loaderParams]="{ base: image().widths[0] }"
      [width]="image().widths[0]"
      [height]="image().widths[0] * 1.25"
      [alt]="image().alt"
      [priority]="priority()"
    />
  `,
  styles: `
    :host {
      display: block;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  `,
})
export class ResponsiveImageComponent {
  readonly image = input.required<ResponsiveImage>();
  readonly sizes = input('(min-width: 1000px) 480px, 90vw');
  readonly priority = input(false);
  protected readonly srcset = computed(() => this.image().widths.map((w) => `${w}w`).join(', '));
}
