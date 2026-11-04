import { DOCUMENT } from '@angular/common';
import { inject, Service } from '@angular/core';
import { SITE } from '../../data/site.data';

export interface MessageField {
  readonly label: string;
  readonly value: string;
}

/** Único lugar que arma enlaces de contacto (WhatsApp y correo). */
@Service()
export class WhatsappService {
  private readonly document = inject(DOCUMENT);

  link(message?: string): string {
    const base = `https://wa.me/${SITE.whatsapp}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  /** Saludo, renglón vacío y solo los campos que la persona llenó. */
  composeMessage(greeting: string, fields: readonly MessageField[]): string {
    const lines = fields.filter((f) => f.value.trim()).map((f) => `${f.label}: ${f.value.trim()}`);
    return lines.length ? [greeting, '', ...lines].join('\n') : greeting;
  }

  mailto(subject: string, body: string): string {
    return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  open(message: string): void {
    this.document.defaultView?.open(this.link(message), '_blank', 'noopener');
  }
}
