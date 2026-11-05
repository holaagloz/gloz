import { CaseStudy } from '../models/content.models';

/**
 * Qué hicimos con cada marca (debajo del portafolio). Las piezas están en work.data.ts.
 * Servicios por cliente confirmados por Gloz el 4 de noviembre de 2026 (Tienda del Oro y el diseño de Santillán Rafaniello: por validar).
 */
export const CASES: readonly CaseStudy[] = [
  {
    id: 'burguer-house',
    client: 'Burguer House',
    sector: 'Hamburguesería',
    summary: 'Su logo, el diseño de su feed y las fotos y piezas gráficas que publican en redes.',
    services: ['Producción de contenido', 'Logo', 'Diseño de feed', 'Diseño gráfico'],
  },
  {
    id: 'sillon-tech',
    client: 'Sillón Tech',
    sector: 'Sillones extensibles · Argentina',
    summary: 'Llevamos su publicidad digital: estrategia, campañas, análisis y seguimiento, más el contenido publicitario.',
    services: ['Campañas publicitarias', 'Videos de producto', 'Fotografía', 'Contenido publicitario'],
    current: true,
  },
  {
    id: 'cafe',
    client: '@Cafe',
    sector: 'Cafetería',
    summary: 'Producimos su contenido y manejamos sus redes: fotos de sus bebidas y platos, listas para publicar.',
    services: ['Producción de contenido', 'Manejo de redes'],
  },
  {
    id: 'tienda-del-oro',
    client: 'Tienda del Oro',
    sector: 'Joyería',
    summary: 'Fotos y videos de producto para sus redes: cadenas, anillos y aros sobre fondos oscuros que hacen brillar el oro.',
    services: ['Producción de contenido', 'Edición de video'],
  },
  {
    id: 'santillan-rafaniello',
    client: 'Santillán Rafaniello',
    sector: 'Estudio jurídico · Derecho de nacionalidad',
    summary: 'Grabamos y editamos sus videos institucionales y con su equipo, y diseñamos sus publicaciones informativas.',
    services: ['Videos institucionales', 'Fotografía', 'Diseño gráfico'],
  },
  {
    id: 'viejos-barberia',
    client: 'Viejos Barbería',
    sector: 'Barbería',
    summary: 'Su logo, sus íconos y una app para el celular hecha a la medida de su barbero.',
    services: ['Logo', 'Íconos', 'App a medida (PWA)'],
  },
];
