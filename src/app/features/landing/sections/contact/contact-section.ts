import { Component, computed, ElementRef, inject, signal } from '@angular/core';
import { FieldTree, form, FormField, FormRoot, required } from '@angular/forms/signals';
import { WhatsappService } from '../../../../core/contact/whatsapp.service';
import { SITE, WHATSAPP_MESSAGES } from '../../../../data/site.data';
import { ServiceInterest } from '../../../../models/content.models';
import { RevealDirective } from '../../../../shared/directives/motion.directives';
import { WhatsappLinkDirective } from '../../../../shared/directives/whatsapp-link.directive';
import { ButtonComponent } from '../../../../shared/ui/button/button';
import { SectionHeadingComponent } from '../../../../shared/ui/section-heading/section-heading';

interface ContactModel {
  nombre: string;
  negocio: string;
  interes: ServiceInterest;
  mensaje: string;
}

const INTERESTS: readonly Exclude<ServiceInterest, ''>[] = [
  'Marketing y publicidad',
  'Contenido y creatividad',
  'Desarrollo digital',
  'Todavía no sé',
];

/** Formulario corto: dos campos obligatorios, arma el mensaje y abre WhatsApp. El correo es la segunda opción. */
@Component({
  selector: 'gloz-contact-section',
  imports: [FormRoot, FormField, SectionHeadingComponent, ButtonComponent, WhatsappLinkDirective, RevealDirective],
  host: { id: 'contacto', class: 'seccion sobre-azul', role: 'region', 'aria-labelledby': 'contacto-titulo' },
  templateUrl: './contact-section.html',
  styleUrl: './contact-section.css',
})
export class ContactSection {
  private readonly whatsapp = inject(WhatsappService);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  protected readonly site = SITE;
  protected readonly interests = INTERESTS;
  protected readonly directMessage = WHATSAPP_MESSAGES.hero;

  private readonly model = signal<ContactModel>({ nombre: '', negocio: '', interes: '', mensaje: '' });

  protected readonly contactForm = form(
    this.model,
    (path) => {
      required(path.nombre, { message: 'Escribe tu nombre para continuar.' });
      required(path.negocio, { message: 'Escribe el nombre de tu negocio o marca.' });
    },
    {
      submission: {
        action: async () => {
          this.whatsapp.open(this.message());
          return undefined;
        },
        onInvalid: () => this.focusFirstError(),
      },
    },
  );

  protected readonly message = computed(() => {
    const v = this.model();
    return this.whatsapp.composeMessage(WHATSAPP_MESSAGES.form, [
      { label: 'Nombre', value: v.nombre },
      { label: 'Negocio', value: v.negocio },
      { label: 'Me interesa', value: v.interes },
      { label: 'Mensaje', value: v.mensaje },
    ]);
  });

  protected readonly mailto = computed(() =>
    this.whatsapp.mailto(`Proyecto para ${this.model().negocio.trim() || 'mi marca'}`, this.message()),
  );

  protected errorOf(field: FieldTree<string>): string | null {
    const state = field();
    return state.touched() && state.invalid() ? (state.errors()[0]?.message ?? 'Revisa este campo.') : null;
  }

  private focusFirstError(): void {
    queueMicrotask(() => this.host.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus());
  }
}
