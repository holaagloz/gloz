import { CaseStudy } from '../models/content.models';
import { logoByName } from './clients.data';

/** Servicios por cliente confirmados por Gloz el 4 de noviembre de 2026 (Tienda del Oro: por validar). */
export const CASES: readonly CaseStudy[] = [
  {
    id: 'burguer-house',
    client: 'Burguer House',
    sector: 'Hamburguesería',
    summary: 'Su logo, el diseño de su feed y las fotos y piezas gráficas que publican en redes.',
    services: ['Producción de contenido', 'Logo', 'Diseño de feed', 'Diseño gráfico'],
    media: {
      kind: 'photos',
      main: { path: 'img/casos/burguer-house', widths: [560, 960], alt: 'Hamburguesa doble sostenida con guantes negros sobre fondo rojo' },
      extras: [
        { path: 'img/casos/burguer-house-feed', widths: [360], alt: 'Diseño del feed de Instagram de Burguer House' },
        { path: 'img/casos/burguer-house-2', widths: [360], alt: 'Hamburguesa con tocino y queso en primer plano' },
      ],
    },
  },
  {
    id: 'sillon-tech',
    client: 'Sillón Tech',
    sector: 'Sillones extensibles · Argentina',
    summary: 'Llevamos su publicidad digital: estrategia, campañas, análisis y seguimiento, más el contenido publicitario.',
    services: ['Campañas publicitarias', 'Producción de contenido', 'Contenido publicitario'],
    current: true,
    media: {
      kind: 'logo',
      logo: logoByName('Sillón Tech'),
      highlights: ['Estrategia', 'Campañas', 'Análisis', 'Seguimiento'],
    },
  },
  {
    id: 'cafe',
    client: '@Cafe',
    sector: 'Cafetería',
    summary: 'Producimos su contenido y manejamos sus redes: fotos de sus bebidas y platos, listas para publicar.',
    services: ['Producción de contenido', 'Manejo de redes'],
    media: {
      kind: 'photos',
      main: { path: 'img/casos/cafe', widths: [560, 960], alt: 'Café para llevar con galletas junto a un árbol de Navidad' },
      extras: [
        { path: 'img/casos/cafe-2', widths: [360], alt: 'Mano sosteniendo un jugo de naranja junto a plantas' },
        { path: 'img/casos/cafe-3', widths: [360], alt: 'Ensalada con pollo, huevo y limón vista desde arriba' },
      ],
    },
  },
  {
    id: 'tienda-del-oro',
    client: 'Tienda del Oro',
    sector: 'Joyería',
    summary: 'Fotos y videos de producto para sus redes: cadenas, anillos y aros sobre fondos oscuros que hacen brillar el oro.',
    services: ['Producción de contenido', 'Edición de video'],
    media: {
      kind: 'photos',
      main: { path: 'img/casos/tienda-del-oro', widths: [560, 960], alt: 'Cadenas de oro sobre un exhibidor azul oscuro' },
      extras: [
        { path: 'img/casos/tienda-del-oro-2', widths: [360], alt: 'Anillo de oro con piedra negra sobre fondo oscuro' },
        { path: 'img/casos/tienda-del-oro-3', widths: [360], alt: 'Aros de oro con forma de delfín y piedras brillantes' },
      ],
      video: {
        src: 'video/tienda-del-oro.mp4',
        poster: 'video/tienda-del-oro-poster.webp',
        label: 'Video de producto: cadena de oro sostenida con guante negro',
      },
    },
  },
];
