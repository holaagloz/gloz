import { Component, computed, signal } from '@angular/core';
import { CASES } from '../../../../data/cases.data';
import { WHATSAPP_MESSAGES } from '../../../../data/site.data';
import { WORK_FILTERS, WORK_PIECES } from '../../../../data/work.data';
import { WorkKind } from '../../../../models/content.models';
import { RevealDirective } from '../../../../shared/directives/motion.directives';
import { WhatsappLinkDirective } from '../../../../shared/directives/whatsapp-link.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { ResponsiveImageComponent } from '../../../../shared/ui/responsive-image/responsive-image';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';
import { SoftwareCaseComponent } from './software-case';
import { WorkVideoComponent } from './work-video';

type Filter = WorkKind | 'todo';

/**
 * Portafolio: primero el caso de software; luego el trabajo real en grande (videos, fotos, diseño
 * y campañas), con filtro por tipo. Debajo, qué hicimos con cada marca.
 */
@Component({
  selector: 'gloz-work-section',
  imports: [SectionHeadingComponent, ButtonComponent, WhatsappLinkDirective, RevealDirective, ResponsiveImageComponent, WorkVideoComponent, SoftwareCaseComponent],
  host: { id: 'trabajos', class: 'seccion oscuro', role: 'region', 'aria-labelledby': 'trabajos-titulo' },
  template: `
    <!-- ===== INICIO Trabajos ===== -->
    <div class="contenedor">
      <div class="cabeza">
        <gloz-section-heading titleId="trabajos-titulo">Así se ve <em>lo que hacemos</em></gloz-section-heading>
        <p class="entrada" glozReveal>Software, videos, fotos, diseño y campañas que hicimos para marcas reales. Todo lo que ves aquí salió de nuestro equipo.</p>
      </div>

      <gloz-software-case />

      <div class="filtros" role="group" aria-label="Filtrar trabajos por tipo" glozReveal>
        @for (f of filters; track f.id) {
          <button type="button" class="filtro" [attr.aria-pressed]="active() === f.id" (click)="active.set(f.id)">
            {{ f.label }} <span class="cuenta">{{ counts()[f.id] }}</span>
          </button>
        }
      </div>
      <p class="sr-only" aria-live="polite">{{ visible().length }} trabajos</p>

      <ul class="grilla">
        @for (p of visible(); track p.id) {
          <li [class]="'pieza pieza--' + p.size + ' pieza--' + p.media">
            @switch (p.media) {
              @case ('image') {
                <gloz-responsive-image class="medio" [image]="p.image" [sizes]="p.size === 'grande' ? '(min-width: 960px) 570px, 100vw' : '(min-width: 960px) 280px, 50vw'" />
              }
              @case ('video') {
                <gloz-work-video class="medio" [video]="p.video" />
              }
              @case ('logo') {
                <div class="medio logo-pieza" [style.background-color]="p.tone">
                  <i class="logo" role="img" [attr.aria-label]="'Logo de ' + p.client" [style.background-color]="p.ink" [style.mask-image]="'url(' + p.logo.file + ')'" [style.aspect-ratio]="p.logo.ratio"></i>
                </div>
              }
              @case ('campaign') {
                <div class="medio campana sobre-azul">
                  <div class="campana__marca">
                    <i class="logo" role="img" [attr.aria-label]="p.client" [style.mask-image]="'url(' + p.logo.file + ')'" [style.aspect-ratio]="p.logo.ratio"></i>
                    <p class="campana__texto">{{ p.text }}</p>
                    <ul class="campana__chips" aria-label="Qué llevamos">
                      @for (h of p.highlights; track h) {
                        <li>{{ h }}</li>
                      }
                    </ul>
                  </div>
                  <figure class="campana__cita">
                    <blockquote>“{{ p.quote }}”</blockquote>
                    <figcaption>{{ p.quoteAuthor }}</figcaption>
                  </figure>
                </div>
              }
            }
            <p class="pie">
              <b>{{ p.client }}</b>
              <span>{{ p.label }}</span>
            </p>
          </li>
        }
      </ul>

      <h3 class="subtitulo" glozReveal>Qué hicimos con cada marca</h3>
      <ul class="marcas">
        @for (c of cases; track c.id; let i = $index) {
          <li glozReveal [revealDelay]="i * 0.06">
            <p class="marca__nombre">
              {{ c.client }}
              @if (c.current) {
                <span class="hoy">Hoy</span>
              }
            </p>
            <p class="marca__sector">{{ c.sector }}</p>
            <ul class="chips" [attr.aria-label]="'Servicios para ' + c.client">
              @for (s of c.services; track s) {
                <li>{{ s }}</li>
              }
            </ul>
          </li>
        }
      </ul>

      <div class="cierre" glozReveal>
        <p>¿Quieres algo así para tu marca?</p>
        <a glozButton variant="light" [glozWhatsapp]="message">Escríbenos</a>
      </div>
    </div>
    <!-- ===== FIN Trabajos ===== -->
  `,
  styleUrl: './work-section.css',
})
export class WorkSection {
  protected readonly filters = WORK_FILTERS;
  protected readonly cases = CASES;
  protected readonly message = WHATSAPP_MESSAGES.work;
  protected readonly active = signal<Filter>('todo');
  protected readonly visible = computed(() => {
    const f = this.active();
    return f === 'todo' ? WORK_PIECES : WORK_PIECES.filter((p) => p.kind === f);
  });
  protected readonly counts = computed(() => {
    const counts: Record<Filter, number> = { todo: WORK_PIECES.length, video: 0, foto: 0, diseno: 0, campana: 0 };
    for (const p of WORK_PIECES) counts[p.kind]++;
    return counts;
  });
}
