import { ResponsiveImage } from '../models/content.models';

export interface HeroPiece {
  readonly client: string;
  readonly image: ResponsiveImage;
  readonly signed?: boolean;
}

/** Tres piezas reales de clientes para la composición de la portada. */
export const HERO_PIECES: readonly HeroPiece[] = [
  {
    client: 'Burguer House',
    image: { path: 'img/portada/burguer-house', widths: [480, 800], alt: 'Hamburguesa doble con huevo y tocino sobre fondo rojo, para Burguer House' },
  },
  {
    client: 'Tienda del Oro',
    signed: true,
    image: { path: 'img/portada/tienda-del-oro', widths: [480, 800], alt: 'Cadena de oro sobre un busto azul oscuro, para Tienda del Oro' },
  },
  {
    client: '@Cafe',
    image: { path: 'img/portada/cafe', widths: [480, 800], alt: 'Mano sosteniendo un latte junto a plantas, para @Cafe' },
  },
];

/** Etiquetas de las flechas de la portada, con su posición en la composición. */
export const HERO_LABELS = [
  { text: 'Ideas', left: 12, top: 2 },
  { text: 'Producción', left: 84, top: 2 },
  { text: 'Edición', left: 14, top: 90.5 },
  { text: 'Pauta en Meta', left: 50, top: 90.5 },
  { text: 'Análisis', left: 87, top: 90.5 },
] as const;
