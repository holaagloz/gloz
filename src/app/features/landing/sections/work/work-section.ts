import { Component } from '@angular/core';
import { CASES } from '../../../../data/cases.data';
import { WHATSAPP_MESSAGES } from '../../../../data/site.data';
import { RevealDirective } from '../../../../shared/directives/motion.directives';
import { WhatsappLinkDirective } from '../../../../shared/directives/whatsapp-link.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';
import { CaseCardComponent } from './case-card';

@Component({
  selector: 'gloz-work-section',
  imports: [SectionHeadingComponent, CaseCardComponent, ButtonComponent, WhatsappLinkDirective, RevealDirective],
  host: { id: 'trabajos', class: 'seccion oscuro', role: 'region', 'aria-labelledby': 'trabajos-titulo' },
  template: `
    <!-- ===== INICIO Trabajos ===== -->
    <div class="contenedor">
      <div class="cabeza">
        <gloz-section-heading titleId="trabajos-titulo">Así se ve <em>lo que hacemos</em></gloz-section-heading>
        <p class="entrada" glozReveal>Algunas de las marcas con las que trabajamos y lo que hicimos con cada una.</p>
      </div>
      <div class="casos">
        @for (item of cases; track item.id; let odd = $odd) {
          <gloz-case-card [caseStudy]="item" [reversed]="odd" />
        }
      </div>
      <div class="cierre" glozReveal>
        <p>¿Quieres algo así para tu marca?</p>
        <a glozButton variant="light" [glozWhatsapp]="message">Escríbenos</a>
      </div>
    </div>
    <!-- ===== FIN Trabajos ===== -->
  `,
  styles: `
    :host {
      display: block;
    }
    .cabeza {
      display: grid;
      gap: 8px;
      margin-bottom: clamp(36px, 5vw, 64px);
    }
    .casos {
      display: grid;
      gap: clamp(18px, 3vw, 32px);
    }
    .cierre {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 16px 24px;
      margin-top: clamp(36px, 5vw, 56px);
    }
    .cierre p {
      margin: 0;
      font-size: clamp(20px, 2.2vw, 26px);
      font-weight: 700;
    }
    @media (min-width: 960px) {
      .cabeza {
        grid-template-columns: 1.4fr 1fr;
        align-items: end;
        gap: 48px;
      }
    }
  `,
})
export class WorkSection {
  protected readonly cases = CASES;
  protected readonly message = WHATSAPP_MESSAGES.work;
}
