import { Component, ElementRef, inject } from '@angular/core';
import { HERO_PIECES } from '../../../../data/hero.data';
import { NAV_LINKS, SITE, WHATSAPP_MESSAGES } from '../../../../data/site.data';
import { motionEffect } from '../../../../core/motion/motion-effect';
import { WhatsappLinkDirective } from '../../../../shared/directives/whatsapp-link.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { LogoComponent } from '../../../../shared/ui/logo/logo';
import { ResponsiveImageComponent } from '../../../../shared/ui/responsive-image/responsive-image';

/** Cierre: la frase de marca, el botón y "Gloz" gigante que se arma letra por letra (rima de la firma). */
@Component({
  selector: 'gloz-footer-section',
  imports: [LogoComponent, ButtonComponent, WhatsappLinkDirective, ResponsiveImageComponent],
  host: { class: 'oscuro', role: 'contentinfo' },
  templateUrl: './footer-section.html',
  styleUrl: './footer-section.css',
})
export class FooterSection {
  protected readonly site = SITE;
  protected readonly links = NAV_LINKS;
  protected readonly message = WHATSAPP_MESSAGES.footer;
  protected readonly photos = [HERO_PIECES[0], HERO_PIECES[1]].filter((p) => !!p);
  protected readonly year = new Date().getFullYear();

  constructor() {
    const host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    motionEffect((motion) => {
      if (!motion.enabled) return;
      const word = host.querySelector('[data-firma-final]');
      const letters = host.querySelectorAll('[data-firma-final] .logo__pieza');
      const photos = host.querySelectorAll('[data-foto-final]');
      const tl = motion.gsap
        .timeline({ scrollTrigger: { trigger: word, start: 'top 85%', once: true } })
        .from(letters, { yPercent: 110, duration: motion.tokens.dur * 1.2, stagger: motion.tokens.stagger * 1.5, ease: motion.tokens.ease })
        .from(photos, { y: 60, autoAlpha: 0, rotation: 0, duration: motion.tokens.dur * 1.2, stagger: 0.15, ease: motion.tokens.ease }, 0.4);
      return () => tl.scrollTrigger?.kill() ?? tl.kill();
    });
  }
}
