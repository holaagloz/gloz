/**
 * Datos del negocio. Fuente: Gloz Studio (conversación del 4 de noviembre de 2026)
 * y materiales/originales/Info/AboutUs.md.
 */
export const SITE = {
  name: 'Gloz Studio',
  /** Costa Rica, solo dígitos con código de país. */
  whatsapp: '50662652841',
  whatsappDisplay: '+506 6265 2841',
  email: 'holaagloz@gmail.com',
  instagram: { user: '@studiogloz', url: 'https://www.instagram.com/studiogloz' },
  location: 'En remoto, para toda Latinoamérica',
  since: 2023,
  brands: '+30',
} as const;

/** Un mensaje por lugar: así se sabe desde dónde escribe cada persona. */
export const WHATSAPP_MESSAGES = {
  hero: 'Hola Gloz, quiero informes para mi marca.',
  work: 'Hola Gloz, vi sus trabajos y quiero algo así para mi marca.',
  footer: 'Hola Gloz, quiero empezar un proyecto con ustedes.',
  form: 'Hola Gloz, quiero informes para mi marca.',
} as const;

export const NAV_LINKS = [
  { label: 'Servicios', href: '#servicios' },
  { label: 'Trabajos', href: '#trabajos' },
  { label: 'Nosotros', href: '#nosotros' },
  { label: 'Contacto', href: '#contacto' },
] as const;

/** Rubros reales de clientes, para el buscador de la portada. */
export const SEARCH_TOPICS = [
  'hamburgueserías',
  'joyerías',
  'cafeterías',
  'barberías',
  'estudios de uñas',
] as const;
