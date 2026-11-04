import { computed, Directive, inject, input } from '@angular/core';
import { WhatsappService } from '../../core/contact/whatsapp.service';

/**
 * Convierte un enlace en un botón de WhatsApp con su mensaje prellenado.
 * El href queda escrito en el HTML prerenderizado, así funciona aunque falle el JavaScript.
 */
@Directive({
  selector: 'a[glozWhatsapp]',
  host: {
    '[href]': 'href()',
    target: '_blank',
    rel: 'noopener',
  },
})
export class WhatsappLinkDirective {
  private readonly whatsapp = inject(WhatsappService);
  readonly glozWhatsapp = input.required<string>();
  protected readonly href = computed(() => this.whatsapp.link(this.glozWhatsapp()));
}
