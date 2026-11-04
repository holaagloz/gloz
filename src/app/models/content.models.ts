/** Imagen preparada en varios anchos: `public/<path>-<ancho>.webp`. */
export interface ResponsiveImage {
  readonly path: string;
  readonly widths: readonly number[];
  readonly alt: string;
}

export interface ServiceItem {
  readonly name: string;
  readonly description: string;
}

export interface ServiceGroup {
  readonly id: string;
  readonly number: string;
  readonly title: string;
  readonly summary: string;
  readonly items: readonly ServiceItem[];
  readonly cta: string;
  readonly whatsappMessage: string;
}

export interface CaseVideo {
  readonly src: string;
  readonly poster: string;
  readonly label: string;
}

export interface CaseStudy {
  readonly id: string;
  readonly client: string;
  readonly sector: string;
  readonly summary: string;
  readonly services: readonly string[];
  readonly current?: boolean;
  /** Sin fotos propias: la tarjeta usa el logo del cliente sobre la textura de la marca. */
  readonly media:
    | { readonly kind: 'photos'; readonly main: ResponsiveImage; readonly extras: readonly ResponsiveImage[]; readonly video?: CaseVideo }
    | { readonly kind: 'logo'; readonly logo: ClientLogo; readonly highlights: readonly string[] };
}

export interface ClientLogo {
  readonly name: string;
  readonly file: string;
  /** Proporción ancho / alto del archivo. */
  readonly ratio: number;
}

export interface ProcessStep {
  readonly title: string;
  readonly text: string;
}

export interface TrustFact {
  readonly figure: string;
  readonly text: string;
}

export type ServiceInterest = '' | 'Marketing y publicidad' | 'Contenido y creatividad' | 'Desarrollo digital' | 'Todavía no sé';

export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  /** Dónde y cuándo lo dijo: se muestra junto a la cita. */
  readonly source: string;
}
