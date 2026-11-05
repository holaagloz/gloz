import { Component, inject } from '@angular/core';
import { MotionService } from '../../../../core/motion/motion.service';
import { HERO_PIECES } from '../../../../data/hero.data';
import { SERVICE_GROUPS } from '../../../../data/services.data';
import { DrawOnScrollDirective, RevealDirective } from '../../../../shared/directives/motion.directives';
import { WhatsappLinkDirective } from '../../../../shared/directives/whatsapp-link.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { ResponsiveImageComponent } from '../../../../shared/ui/responsive-image/responsive-image';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';

/**
 * Las tres áreas con el mismo peso, una columna cada una y su propia imagen:
 * marketing (flecha de la estrategia), contenido (piezas reales) y software (una interfaz dibujada).
 * La lista de servicios de cada área va contraída en un <details> nativo: se abre sin depender del JS.
 */
@Component({
  selector: 'gloz-services-section',
  imports: [SectionHeadingComponent, RevealDirective, DrawOnScrollDirective, ButtonComponent, WhatsappLinkDirective, ResponsiveImageComponent],
  host: { id: 'servicios', class: 'seccion', role: 'region', 'aria-labelledby': 'servicios-titulo' },
  templateUrl: './services-section.html',
  styleUrl: './services-section.css',
})
export class ServicesSection {
  protected readonly groups = SERVICE_GROUPS;
  protected readonly pieces = HERO_PIECES;
  private readonly motion = inject(MotionService);

  /** Al abrir o cerrar una lista cambia el alto de la página: se recalculan las animaciones de scroll. */
  protected onToggle(): void {
    this.motion.refresh();
  }
}
