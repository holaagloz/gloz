import { Component } from '@angular/core';
import { SERVICE_GROUPS } from '../../../../data/services.data';
import { RevealDirective } from '../../../../shared/directives/motion.directives';
import { WhatsappLinkDirective } from '../../../../shared/directives/whatsapp-link.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';

/** Los tres grupos de servicios en filas numeradas; cada grupo abre WhatsApp con su nombre. */
@Component({
  selector: 'gloz-services-section',
  imports: [SectionHeadingComponent, RevealDirective, ButtonComponent, WhatsappLinkDirective],
  host: { id: 'servicios', class: 'seccion', role: 'region', 'aria-labelledby': 'servicios-titulo' },
  template: `
    <!-- ===== INICIO Servicios ===== -->
    <div class="contenedor">
      <div class="cabeza">
        <gloz-section-heading titleId="servicios-titulo">De la idea al anuncio, <em>y del anuncio al software</em></gloz-section-heading>
        <p class="entrada" glozReveal>Soluciones creativas y estratégicas para acompañar el crecimiento de tu marca.</p>
      </div>

      <ol class="grupos">
        @for (group of groups; track group.id) {
          <li class="grupo">
            <span class="linea" glozReveal="line" aria-hidden="true"></span>
            <p class="numero" aria-hidden="true">{{ group.number }}</p>
            <div class="resumen" glozReveal>
              <h3>{{ group.title }}</h3>
              <p>{{ group.summary }}</p>
            </div>
            <ul class="items" glozReveal [revealDelay]="0.1">
              @for (item of group.items; track item.name) {
                <li>
                  <b>{{ item.name }}</b>
                  <span>{{ item.description }}</span>
                </li>
              }
            </ul>
            <a class="cta" glozButton [small]="true" [glozWhatsapp]="group.whatsappMessage">{{ group.cta }}</a>
          </li>
        }
      </ol>
      <p class="medida" glozReveal>Cada propuesta es a la medida: depende de lo que necesitas y por cuánto tiempo.</p>
    </div>
    <!-- ===== FIN Servicios ===== -->
  `,
  styles: `
    :host {
      display: block;
      background: var(--surface);
    }
    .cabeza {
      display: grid;
      gap: 8px;
      margin-bottom: clamp(36px, 5vw, 64px);
    }
    .grupos {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .grupo {
      position: relative;
      display: grid;
      gap: 14px 24px;
      padding: 28px 0 32px;
    }
    .linea {
      position: absolute;
      inset: 0 0 auto;
      height: 1px;
      background: var(--line);
    }
    .numero {
      margin: 0;
      font-family: var(--font-accent);
      font-size: clamp(34px, 4vw, 48px);
      line-height: 1;
      color: var(--brand);
    }
    h3 {
      margin: 0 0 4px;
      font-size: clamp(20px, 2vw, 24px);
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: -0.005em;
    }
    .resumen p {
      margin: 0;
      color: var(--muted);
    }
    .items {
      display: grid;
      gap: 12px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .items li {
      display: grid;
      gap: 2px;
      padding-left: 18px;
      border-left: 2px solid var(--brand-soft);
    }
    .items b {
      font-size: 15px;
    }
    .items span {
      font-size: 14px;
      line-height: 1.5;
      color: var(--muted);
    }
    .cta {
      justify-self: start;
    }
    .medida {
      margin: 8px 0 0;
      padding-top: 24px;
      border-top: 1px solid var(--line);
      font-weight: 600;
    }
    @media (min-width: 960px) {
      .cabeza {
        grid-template-columns: 1.4fr 1fr;
        align-items: end;
        gap: 48px;
      }
      .grupo {
        grid-template-columns: 90px 1fr 1.5fr auto;
        align-items: start;
        padding: 40px 0 44px;
      }
    }
  `,
})
export class ServicesSection {
  protected readonly groups = SERVICE_GROUPS;
}
