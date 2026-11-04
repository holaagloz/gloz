import { TestBed } from '@angular/core/testing';
import { SITE } from '../../data/site.data';
import { WhatsappService } from './whatsapp.service';

describe('WhatsappService', () => {
  let service: WhatsappService;

  beforeEach(() => {
    service = TestBed.inject(WhatsappService);
  });

  it('arma el enlace con el número confirmado, sin "+" ni espacios', () => {
    expect(service.link()).toBe(`https://wa.me/${SITE.whatsapp}`);
    expect(SITE.whatsapp).toMatch(/^\d+$/);
  });

  it('codifica acentos, signos y saltos de línea del mensaje', () => {
    const url = service.link('Hola Gloz, ¿qué información necesitan?\nGracias');
    expect(url).toBe(
      `https://wa.me/${SITE.whatsapp}?text=Hola%20Gloz%2C%20%C2%BFqu%C3%A9%20informaci%C3%B3n%20necesitan%3F%0AGracias`,
    );
    expect(decodeURIComponent(url.split('?text=')[1] ?? '')).toBe('Hola Gloz, ¿qué información necesitan?\nGracias');
  });

  it('agrega al mensaje solo los campos que la persona llenó', () => {
    const message = service.composeMessage('Hola Gloz, quiero informes para mi marca.', [
      { label: 'Nombre', value: ' Ana ' },
      { label: 'Negocio', value: 'Café Luna' },
      { label: 'Me interesa', value: '' },
      { label: 'Mensaje', value: '   ' },
    ]);
    expect(message).toBe('Hola Gloz, quiero informes para mi marca.\n\nNombre: Ana\nNegocio: Café Luna');
  });

  it('sin campos llenos, deja solo el saludo', () => {
    expect(service.composeMessage('Hola', [{ label: 'Nombre', value: '' }])).toBe('Hola');
  });

  it('arma el correo con asunto y cuerpo codificados', () => {
    expect(service.mailto('Proyecto para Café', 'Hola\nGloz')).toBe(
      `mailto:${SITE.email}?subject=Proyecto%20para%20Caf%C3%A9&body=Hola%0AGloz`,
    );
  });
});
