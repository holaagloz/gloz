import { DOCUMENT } from '@angular/common';
import { Component, computed, inject, signal } from '@angular/core';
import { motionEffect } from '../../../../core/motion/motion-effect';
import { WHATSAPP_MESSAGES } from '../../../../data/site.data';
import { WhatsappLinkDirective } from '../../../../shared/directives/whatsapp-link.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button';

/**
 * Botón principal siempre a la mano. Aparece después de la portada y se esconde al llegar a Contacto,
 * para no tapar el formulario ni repetir el botón.
 */
@Component({
  selector: 'gloz-sticky-cta',
  imports: [ButtonComponent, WhatsappLinkDirective],
  host: { '[class.visible]': 'visible()', '[attr.aria-hidden]': '!visible()', '[attr.inert]': 'visible() ? null : ""' },
  template: `<a glozButton [glozWhatsapp]="message">Escríbenos por WhatsApp</a>`,
  styles: `
    :host {
      position: fixed;
      z-index: 50;
      left: 12px;
      right: 12px;
      bottom: calc(12px + env(safe-area-inset-bottom));
      display: grid;
      opacity: 0;
      translate: 0 120%;
      pointer-events: none;
      transition:
        opacity var(--t-hover) var(--ease),
        translate 0.5s var(--ease);
    }
    :host(.visible) {
      opacity: 1;
      translate: 0 0;
      pointer-events: auto;
    }
    a {
      box-shadow: 0 18px 36px -14px rgb(2 74 169 / 55%);
    }
    @media (min-width: 900px) {
      :host {
        left: auto;
        right: 24px;
        bottom: 24px;
      }
    }
  `,
})
export class StickyCtaComponent {
  private readonly document = inject(DOCUMENT);
  protected readonly message = WHATSAPP_MESSAGES.hero;
  private readonly pastHero = signal(false);
  private readonly atContact = signal(false);
  protected readonly visible = computed(() => this.pastHero() && !this.atContact());

  constructor() {
    motionEffect(() => {
      const hero = this.document.querySelector('gloz-hero-section');
      const contact = this.document.getElementById('contacto');
      const observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          const above = entry.boundingClientRect.top < 0;
          if (entry.target === hero) this.pastHero.set(!entry.isIntersecting && above);
          else this.atContact.set(entry.isIntersecting || above); // en Contacto o ya pasado (pie de página)
        }
      });
      [hero, contact].forEach((el) => el && observer.observe(el));
      return () => observer.disconnect();
    });
  }
}
