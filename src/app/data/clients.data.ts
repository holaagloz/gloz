import { ClientLogo } from '../models/content.models';

/** Logos con permiso del dueño (4 de noviembre de 2026). Archivos en public/img/logos, en una sola tinta. */
export const CLIENT_LOGOS: readonly ClientLogo[] = [
  { name: 'Burguer House', file: 'img/logos/burguer-house.png', ratio: 1.69 },
  { name: 'Sillón Tech', file: 'img/logos/sillon-tech.png', ratio: 2.33 },
  { name: 'Tienda del Oro', file: 'img/logos/tienda-del-oro.png', ratio: 1 },
  { name: 'Viejos Barbería', file: 'img/logos/viejos-barberia.png', ratio: 2.56 },
  { name: 'Nailyssa', file: 'img/logos/nailyssa.png', ratio: 1.68 },
  { name: 'Gentleman Club del Caballero', file: 'img/logos/gentleman-club.png', ratio: 2.75 },
  { name: 'LF Solutions', file: 'img/logos/lf-solutions.png', ratio: 1.21 },
  { name: 'Santillán Rafaniello', file: 'img/logos/santillan-rafaniello.png', ratio: 2.62 },
  { name: 'Systech Group', file: 'img/logos/systech-group.png', ratio: 0.94 },
  { name: 'Zero Sport', file: 'img/logos/zero-sport.png', ratio: 1.37 },
];

export const logoByName = (name: string): ClientLogo => {
  const logo = CLIENT_LOGOS.find((l) => l.name === name);
  if (!logo) throw new Error(`Logo no encontrado: ${name}`);
  return logo;
};
