import { Component } from '@angular/core';
import { PROCESS_STEPS } from '../../../../data/about.data';
import { RevealDirective } from '../../../../shared/directives/motion.directives';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';

/** Cuatro pasos unidos por una línea que avanza: de izquierda a derecha es avanzar. */
@Component({
  selector: 'gloz-process-section',
  imports: [SectionHeadingComponent, RevealDirective],
  host: { id: 'proceso', class: 'seccion acanalado', role: 'region', 'aria-labelledby': 'proceso-titulo' },
  template: `
    <!-- ===== INICIO Cómo trabajamos ===== -->
    <div class="contenedor">
      <gloz-section-heading titleId="proceso-titulo">De tu primer mensaje <em>a tu marca en marcha</em></gloz-section-heading>
      <div class="pasos-wrap">
        <span class="via" glozReveal="line" aria-hidden="true"></span>
        <ol class="pasos">
          @for (step of steps; track step.title; let i = $index) {
            <li glozReveal [revealDelay]="i * 0.12">
              <span class="marca" aria-hidden="true">{{ i + 1 }}</span>
              <h3>{{ step.title }}</h3>
              <p>{{ step.text }}</p>
            </li>
          }
        </ol>
      </div>
    </div>
    <!-- ===== FIN Cómo trabajamos ===== -->
  `,
  styles: `
    :host {
      display: block;
    }
    .pasos-wrap {
      position: relative;
      margin-top: clamp(32px, 5vw, 56px);
    }
    .via {
      position: absolute;
      left: 21px;
      top: 22px;
      bottom: 22px;
      width: 1.5px;
      background: var(--brand);
    }
    .pasos {
      position: relative;
      display: grid;
      gap: 28px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      display: grid;
      grid-template-columns: 44px 1fr;
      gap: 4px 18px;
    }
    .marca {
      grid-row: span 2;
      display: grid;
      place-items: center;
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: var(--surface);
      border: 1.5px solid var(--brand);
      color: var(--brand);
      font-family: var(--font-accent);
      font-size: 20px;
      line-height: 1;
    }
    li:last-child .marca {
      background: var(--brand);
      color: #fff;
    }
    h3 {
      margin: 8px 0 0;
      font-size: 19px;
      font-weight: 800;
      text-transform: uppercase;
    }
    p {
      margin: 0;
      color: var(--muted);
      font-size: 15px;
    }
    @media (min-width: 900px) {
      .via {
        left: 22px;
        right: 22px;
        top: 21px;
        bottom: auto;
        width: auto;
        height: 1.5px;
      }
      .pasos {
        grid-template-columns: repeat(4, 1fr);
        gap: 32px;
      }
      li {
        grid-template-columns: 1fr;
        gap: 6px;
      }
      .marca {
        grid-row: auto;
        margin-bottom: 14px;
      }
    }
  `,
})
export class ProcessSection {
  protected readonly steps = PROCESS_STEPS;
}
