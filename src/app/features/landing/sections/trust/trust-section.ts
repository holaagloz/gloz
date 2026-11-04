import { Component } from '@angular/core';
import { TESTIMONIAL, TRUST_FACTS } from '../../../../data/about.data';
import { RevealDirective } from '../../../../shared/directives/motion.directives';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';

/**
 * Prueba y confianza juntas: credenciales reales (AboutUs.md) y el testimonio real de un cliente.
 */
@Component({
  selector: 'gloz-trust-section',
  imports: [SectionHeadingComponent, RevealDirective],
  host: { class: 'seccion', role: 'region', 'aria-labelledby': 'confianza-titulo' },
  template: `
    <!-- ===== INICIO Confianza ===== -->
    <div class="contenedor grid">
      <div>
        <gloz-section-heading titleId="confianza-titulo">Experiencia de agencia, <em>trato de equipo propio</em></gloz-section-heading>
        <figure class="cita" glozReveal>
          <span class="comillas" aria-hidden="true">“</span>
          <blockquote>
            <p>{{ testimonial.quote }}</p>
          </blockquote>
          <figcaption>
            <cite>{{ testimonial.author }}</cite>
            <span>{{ testimonial.role }}</span>
            <small>{{ testimonial.source }}</small>
          </figcaption>
        </figure>
      </div>
      <div>
        <dl class="datos">
          @for (fact of facts; track fact.figure; let i = $index) {
            <div class="dato" glozReveal [revealDelay]="i * 0.08">
              <dt>{{ fact.figure }}</dt>
              <dd>{{ fact.text }}</dd>
            </div>
          }
        </dl>
        <p class="fuente">Datos de Gloz Studio, noviembre de 2026.</p>
      </div>
    </div>
    <!-- ===== FIN Confianza ===== -->
  `,
  styles: `
    :host {
      display: block;
      background: var(--surface);
    }
    .grid {
      display: grid;
      gap: clamp(36px, 5vw, 64px);
    }
    .cita {
      position: relative;
      margin: 32px 0 0;
      padding: 0 0 0 22px;
      border-left: 2px solid var(--brand);
    }
    .comillas {
      display: block;
      height: 0.5em;
      font-family: var(--font-accent);
      font-size: 88px;
      line-height: 1;
      color: var(--brand);
    }
    blockquote {
      margin: 0;
    }
    blockquote p {
      margin: 0 0 18px;
      font-size: clamp(18px, 1.9vw, 22px);
      font-weight: 500;
      line-height: 1.5;
    }
    figcaption {
      display: grid;
      gap: 2px;
      font-size: 14px;
    }
    cite {
      font-style: normal;
      font-weight: 800;
      font-size: 16px;
    }
    figcaption span {
      color: var(--brand);
      font-weight: 600;
    }
    figcaption small {
      margin-top: 4px;
      font-size: 13px;
      color: var(--muted);
    }
    .datos {
      display: grid;
      margin: 0;
    }
    .dato {
      display: grid;
      gap: 4px;
      padding: 20px 0;
      border-top: 1px solid var(--line);
    }
    dt {
      font-family: var(--font-accent);
      font-size: clamp(26px, 3vw, 34px);
      line-height: 1.1;
      color: var(--brand);
    }
    dd {
      margin: 0;
      color: var(--muted);
    }
    .fuente {
      margin: 8px 0 0;
      padding-top: 14px;
      border-top: 1px solid var(--line);
      font-size: 13px;
      color: var(--muted);
    }
    @media (min-width: 900px) {
      .grid {
        grid-template-columns: 1fr 1fr;
        align-items: start;
      }
    }
  `,
})
export class TrustSection {
  protected readonly facts = TRUST_FACTS;
  protected readonly testimonial = TESTIMONIAL;
}
