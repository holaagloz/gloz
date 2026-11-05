import { Component } from '@angular/core';
import { SOFTWARE_CASE } from '../../../../data/software.data';
import { RevealDirective } from '../../../../shared/directives/motion.directives';
import { WhatsappLinkDirective } from '../../../../shared/directives/whatsapp-link.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { WorkVideoComponent } from './work-video';

/**
 * Un ejemplo de software a medida, en grande y antes de la grilla: el app funcionando,
 * qué hace y qué hicimos.
 */
@Component({
  selector: 'gloz-software-case',
  imports: [WorkVideoComponent, ButtonComponent, WhatsappLinkDirective, RevealDirective],
  host: { id: 'caso-software', 'aria-labelledby': 'caso-software-titulo', role: 'article' },
  template: `
    <div class="pantalla" glozReveal>
      <div class="marco">
        <div class="barra" aria-hidden="true"><i></i><i></i><i></i></div>
        <gloz-work-video class="video" [video]="c.video" />
      </div>
      <p class="ejemplo">Es uno de los sistemas que hemos desarrollado. Cada uno se diseña desde cero para el negocio que lo va a usar.</p>
    </div>

    <div class="texto" glozReveal [revealDelay]="0.08">
      <h3 id="caso-software-titulo">{{ c.title }}</h3>
      <p class="estado"><span class="punto" aria-hidden="true"></span>En uso con clientes reales</p>
      <p class="resumen">{{ c.summary }}</p>
      <ul class="funciones">
        @for (f of c.features; track f.name) {
          <li>
            <b>{{ f.name }}</b>
            <span>{{ f.description }}</span>
          </li>
        }
      </ul>
      <ul class="hicimos" aria-label="Lo que hicimos">
        @for (m of c.made; track m) {
          <li>{{ m }}</li>
        }
      </ul>
      <a glozButton variant="light" [glozWhatsapp]="c.whatsappMessage">{{ c.cta }}</a>
    </div>
  `,
  styleUrl: './software-case.css',
})
export class SoftwareCaseComponent {
  protected readonly c = SOFTWARE_CASE;
}
