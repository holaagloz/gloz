import { ProcessStep, Testimonial, TrustFact } from '../models/content.models';
import { SITE } from './site.data';

/** Pasos basados en "entender, proponer y resolver" (AboutUs.md). */
export const PROCESS_STEPS: readonly ProcessStep[] = [
  { title: 'Nos escribes', text: 'Cuéntanos qué vende tu marca y qué necesitas, por WhatsApp o con el formulario.' },
  { title: 'Entendemos', text: 'Conocemos tu negocio, tu público y lo que ya hiciste antes de proponer nada.' },
  { title: 'Proponemos', text: 'Te presentamos un plan concreto: qué hacer, en qué canales y con qué piezas.' },
  { title: 'Resolvemos', text: 'Lo ponemos en marcha y revisamos los resultados para decidir el siguiente paso.' },
];

/** Fuente: AboutUs.md. Fecha de los datos: noviembre de 2026. */
export const TRUST_FACTS: readonly TrustFact[] = [
  { figure: `Desde ${SITE.since}`, text: 'construyendo experiencia en software, marketing, contenido y publicidad digital.' },
  { figure: `${SITE.brands} marcas`, text: 'de distintos rubros, cada una con su propio desafío.' },
  { figure: 'Hoy', text: 'llevamos la publicidad digital de Sillón Tech, en Argentina: campañas, análisis y seguimiento.' },
  {
    figure: 'De agencia a freelance',
    text: 'fuimos asistentes de diseño y coordinación, community managers, creadores de contenido y armamos nuestro propio equipo.',
  },
];

export const BEHIND_LABELS = [
  'Ideas de contenido',
  'Producción',
  'Elegir las tomas',
  'Elegir la música',
  'Cambios',
  'Edición completa',
] as const;

/**
 * Mensajes de WhatsApp de Dayanna Jara (CEO de Sillón Tech) del 4/11/2026, unidos y recortados
 * con sus propias palabras, sin cambiar el sentido. Enviados por Gloz para publicar.
 */
export const TESTIMONIAL: Testimonial = {
  quote:
    'La verdad, estamos muy contentos con el trabajo que han realizado. Nos han encantado sus ideas, la calidad del contenido y la creatividad en cada campaña. Además, los resultados que hemos conseguido han sido muy positivos. Estamos muy satisfechos con todo lo que hemos logrado juntos.',
  author: 'Dayanna Jara',
  role: 'CEO de Sillón Tech · Argentina',
  source: 'Mayo de 2026',
};
