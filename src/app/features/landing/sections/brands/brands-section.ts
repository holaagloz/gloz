import { Component } from '@angular/core';
import { CLIENT_LOGOS } from '../../../../data/clients.data';
import { SITE } from '../../../../data/site.data';
import { RevealDirective } from '../../../../shared/directives/motion.directives';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';

/** Marcas que ya confiaron: los 10 logos en una sola tinta, con máscara CSS. */
@Component({
  selector: 'gloz-brands-section',
  imports: [SectionHeadingComponent, RevealDirective],
  host: { class: 'seccion acanalado', role: 'region', 'aria-labelledby': 'marcas-titulo' },
  template: `
    <!-- ===== INICIO Marcas ===== -->
    <div class="contenedor">
      <div class="cabeza">
        <gloz-section-heading titleId="marcas-titulo">Marcas que ya confiaron en <em>Gloz</em></gloz-section-heading>
        <p class="entrada" glozReveal>Más de 30 marcas de distintos rubros desde {{ since }}. Estas son algunas.</p>
      </div>
      <ul class="logos">
        @for (logo of logos; track logo.name; let i = $index) {
          <li glozReveal="fade" [revealDelay]="(i % 5) * 0.08">
            <i
              class="logo"
              role="img"
              [attr.aria-label]="logo.name"
              [style.mask-image]="'url(' + logo.file + ')'"
              [style.width.%]="logoWidth(logo.ratio)"
              [style.aspect-ratio]="logo.ratio"
            ></i>
          </li>
        }
      </ul>
    </div>
    <!-- ===== FIN Marcas ===== -->
  `,
  styles: `
    :host {
      display: block;
    }
    .cabeza {
      display: grid;
      gap: 8px;
      margin-bottom: clamp(32px, 5vw, 56px);
    }
    .logos {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      display: grid;
      place-items: center;
      aspect-ratio: 16 / 10;
      border-radius: var(--r-md);
      background: var(--surface);
      color: var(--ink);
      transition: color var(--t-hover) var(--ease);
    }
    li:hover {
      color: var(--brand);
    }
    .logo {
      display: block;
      max-height: 62%;
      background-color: currentColor;
      mask-repeat: no-repeat;
      mask-position: center;
      mask-size: contain;
    }
    @media (min-width: 760px) {
      .cabeza {
        grid-template-columns: 1.3fr 1fr;
        align-items: end;
        gap: 40px;
      }
      .logos {
        grid-template-columns: repeat(5, 1fr);
        gap: 14px;
      }
    }
  `,
})
export class BrandsSection {
  protected readonly logos = CLIENT_LOGOS;
  protected readonly since = SITE.since;

  /** Equilibra el peso visual: logos cuadrados más chicos, alargados más anchos. */
  protected logoWidth(ratio: number): number {
    return Math.round(Math.min(78, 30 + ratio * 18));
  }
}
