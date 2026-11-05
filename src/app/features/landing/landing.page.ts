import { Component } from '@angular/core';
import { BehindSection } from './sections/behind/behind-section';
import { BrandsSection } from './sections/brands/brands-section';
import { ContactSection } from './sections/contact/contact-section';
import { FooterSection } from './sections/footer/footer-section';
import { HeroSection } from './sections/hero/hero-section';
import { ProcessSection } from './sections/process/process-section';
import { ServicesSection } from './sections/services/services-section';
import { StickyCtaComponent } from './sections/sticky-cta/sticky-cta';
import { TrustSection } from './sections/trust/trust-section';
import { WorkSection } from './sections/work/work-section';

/**
 * Landing de Gloz Studio. Cada sección es un bloque independiente: se pueden reordenar aquí
 * sin tocar nada más. Orden del 4 de noviembre de 2026: primero qué hacemos y cómo se ve, después la confianza.
 */
@Component({
  selector: 'gloz-landing-page',
  imports: [
    HeroSection,
    BrandsSection,
    BehindSection,
    ServicesSection,
    WorkSection,
    ProcessSection,
    TrustSection,
    ContactSection,
    FooterSection,
    StickyCtaComponent,
  ],
  template: `
    <a class="saltar" href="#contenido">Saltar al contenido</a>
    <header>
      <gloz-hero-section />
    </header>
    <main id="contenido">
      <gloz-services-section />
      <gloz-work-section />
      <gloz-brands-section />
      <gloz-behind-section />
      <gloz-process-section />
      <gloz-trust-section />
      <gloz-contact-section />
    </main>
    <gloz-footer-section />
    <gloz-sticky-cta />
  `,
})
export class LandingPage {}
