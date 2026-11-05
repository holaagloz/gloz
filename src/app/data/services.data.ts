import { ServiceGroup } from '../models/content.models';

/** Fuente: materiales/originales/Info/Services.md (nombres y descripciones tal cual). */
export const SERVICE_GROUPS: readonly ServiceGroup[] = [
  {
    id: 'marketing',
    title: 'Marketing y publicidad',
    summary: 'Campañas en Meta Ads que buscan ventas, no solo likes.',
    cta: 'Cotizar marketing',
    whatsappMessage: 'Hola Gloz, quiero cotizar Marketing y publicidad. ¿Qué información necesitan?',
    items: [
      {
        name: 'Gestión de campañas publicitarias en Meta Ads',
        description: 'Planificamos, configuramos y optimizamos campañas para alcanzar los objetivos de cada negocio.',
      },
      {
        name: 'Asesoramiento en marketing',
        description: 'Analizamos las necesidades de la marca y proponemos estrategias y acciones para fortalecer su comunicación.',
      },
      {
        name: 'Análisis de resultados',
        description: 'Revisamos el rendimiento de las campañas para encontrar oportunidades y orientar las próximas decisiones.',
      },
    ],
  },
  {
    id: 'contenido',
    title: 'Contenido y creatividad',
    summary: 'Fotos, videos, diseño y guiones: de la idea a la pieza publicada.',
    cta: 'Cotizar contenido',
    whatsappMessage: 'Hola Gloz, quiero cotizar Contenido y creatividad. ¿Qué información necesitan?',
    items: [
      { name: 'Desarrollo creativo publicitario', description: 'Ideas y conceptos alineados con la identidad y los objetivos de tu marca.' },
      { name: 'Producción de contenido', description: 'Contenido visual y audiovisual para mostrar productos, servicios y novedades.' },
      { name: 'Edición de video', description: 'Videos editados para redes sociales y otros canales digitales.' },
      { name: 'Diseño gráfico básico', description: 'Piezas gráficas que acompañan la comunicación de la marca.' },
      { name: 'Guiones, copywriting y voz en off', description: 'Guiones, textos y locuciones para contenidos y anuncios.' },
      { name: 'Aparición en cámara y perfil dinámico', description: 'Participamos frente a cámara para crear contenidos cercanos, ágiles y atractivos.' },
    ],
  },
  {
    id: 'software',
    title: 'Software a medida',
    summary: 'Sistemas y herramientas hechos para cómo trabaja tu negocio, no al revés.',
    cta: 'Cotizar software',
    whatsappMessage: 'Hola Gloz, quiero cotizar un desarrollo de software a medida. ¿Qué información necesitan?',
    items: [
      {
        name: 'Desarrollo de software personalizado',
        description: 'Diseñamos y desarrollamos soluciones adaptadas a las necesidades, los procesos y los objetivos de cada empresa.',
      },
    ],
  },
];
