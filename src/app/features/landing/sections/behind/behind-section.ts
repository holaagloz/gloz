import { Component } from '@angular/core';
import { BEHIND_LABELS } from '../../../../data/about.data';
import { DrawOnScrollDirective, RevealDirective } from '../../../../shared/directives/motion.directives';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';

interface Arrow {
  readonly d: string;
  readonly label: string;
  readonly left: number;
  readonly top: number;
}

/** El diagrama sale del post "Solo quiero un video" de Gloz. Arriba tres flechas, abajo tres. */
const ARROWS: readonly Omit<Arrow, 'label'>[] = [
  { d: 'M100 96 C92 80 80 62 64 46 M64 46 l9 2 M64 46 l2 9', left: 17, top: 5 },
  { d: 'M180 90 C180 76 180 60 180 44 M180 44 l-5 8 M180 44 l5 8', left: 50, top: 5 },
  { d: 'M260 96 C268 80 280 62 296 46 M296 46 l-9 2 M296 46 l-2 9', left: 83, top: 5 },
  { d: 'M100 166 C92 182 80 198 64 214 M64 214 l2-9 M64 214 l9-2', left: 17, top: 86 },
  { d: 'M180 172 C180 186 180 200 180 214 M180 214 l-5-8 M180 214 l5-8', left: 50, top: 86 },
  { d: 'M260 166 C268 182 280 198 296 214 M296 214 l-9-2 M296 214 l-2-9', left: 83, top: 86 },
];

@Component({
  selector: 'gloz-behind-section',
  imports: [SectionHeadingComponent, RevealDirective, DrawOnScrollDirective],
  host: { id: 'nosotros', class: 'seccion', role: 'region', 'aria-labelledby': 'nosotros-titulo' },
  template: `
    <!-- ===== INICIO Lo que hay detrás ===== -->
    <div class="contenedor grid">
      <div>
        <gloz-section-heading titleId="nosotros-titulo">Un video nunca es <em>solo</em> un video</gloz-section-heading>
        <p class="entrada" glozReveal>
          Detrás de cada pieza hay ideas, guion, producción, edición y una pauta pensada para vender. Nos involucramos en cada
          proyecto como si la marca fuera propia: entendemos el negocio, detectamos qué necesita y buscamos soluciones que vayan
          más allá de una tarea puntual.
        </p>
        <p class="entrada" glozReveal>
          Podemos acompañarte de principio a fin, trabajar en equipo con el tuyo o tomar una tarea puntual. Siempre con la misma
          idea: entender, proponer y resolver.
        </p>
      </div>

      <figure class="diagrama" glozDrawOnScroll aria-label="Un pedido de un video y todo lo que implica: ideas de contenido, producción, elegir las tomas, elegir la música, cambios y edición completa.">
        <svg viewBox="0 0 360 260" aria-hidden="true" focusable="false">
          @for (arrow of arrows; track arrow.label) {
            <path data-trazo [attr.d]="arrow.d" />
          }
        </svg>
        @for (arrow of arrows; track arrow.label) {
          <span class="etiqueta" aria-hidden="true" data-trazo-etiqueta [style.left.%]="arrow.left" [style.top.%]="arrow.top">{{ arrow.label }}</span>
        }
        <p class="centro" aria-hidden="true"><b>"Solo quiero</b><i>un video"</i></p>
      </figure>
    </div>
    <!-- ===== FIN Lo que hay detrás ===== -->
  `,
  styles: `
    :host {
      display: block;
    }
    .grid {
      display: grid;
      gap: clamp(40px, 6vw, 72px);
      align-items: center;
    }
    .entrada + .entrada {
      margin-top: 14px;
    }
    .diagrama {
      position: relative;
      width: 100%;
      max-width: 540px;
      margin: 0 auto;
      padding: 0;
      aspect-ratio: 360 / 260;
      border-radius: var(--r-lg);
    }
    svg {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      overflow: visible;
    }
    path {
      fill: none;
      stroke: var(--brand);
      stroke-width: 1.6;
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .etiqueta {
      color: var(--ink);
      font-size: clamp(11px, 1.2vw, 13px);
    }
    .centro {
      position: absolute;
      left: 50%;
      top: 50%;
      margin: 0;
      translate: -50% -50%;
      text-align: center;
      white-space: nowrap;
      line-height: 1;
    }
    .centro b {
      display: block;
      font-size: clamp(17px, 2.4vw, 26px);
      font-weight: 800;
    }
    .centro i {
      display: block;
      margin-top: 2px;
      font-family: var(--font-accent);
      font-style: normal;
      font-size: clamp(28px, 4vw, 44px);
      color: var(--brand);
    }
    @media (min-width: 900px) {
      .grid {
        grid-template-columns: 1fr 1.1fr;
      }
    }
  `,
})
export class BehindSection {
  protected readonly arrows: readonly Arrow[] = ARROWS.map((a, i) => ({ ...a, label: BEHIND_LABELS[i] ?? '' }));
}
