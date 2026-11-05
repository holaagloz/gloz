/** Imagen preparada en varios anchos: `public/<path>-<ancho>.webp`. */
export interface ResponsiveImage {
  readonly path: string;
  readonly widths: readonly number[];
  readonly alt: string;
  /** Alto / ancho del archivo. Por defecto 1.25 (4:5). */
  readonly ratio?: number;
}

export interface ServiceItem {
  readonly name: string;
  readonly description: string;
}

export interface ServiceGroup {
  readonly id: 'marketing' | 'contenido' | 'software';
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
  /** Medidas del archivo; por defecto 540 x 960 (vertical). */
  readonly width?: number;
  readonly height?: number;
  /** Por defecto se repite; false lo deja en el último cuadro. */
  readonly loop?: boolean;
}

export interface CaseStudy {
  readonly id: string;
  readonly client: string;
  readonly sector: string;
  readonly summary: string;
  readonly services: readonly string[];
  readonly current?: boolean;
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

export type ServiceInterest = '' | 'Marketing y publicidad' | 'Contenido y creatividad' | 'Software a medida' | 'Todavía no sé';

export interface Testimonial {
  readonly quote: string;
  readonly author: string;
  readonly role: string;
  /** Dónde y cuándo lo dijo: se muestra junto a la cita. */
  readonly source: string;
}

/** Tipo de pieza del portafolio: define el filtro y la etiqueta. */
export type WorkKind = 'video' | 'foto' | 'diseno' | 'campana';

/** Tamaño de la pieza en la grilla: columnas x filas. */
export type WorkSize = 'normal' | 'alta' | 'grande' | 'ancha';

interface WorkPieceBase {
  readonly id: string;
  readonly client: string;
  readonly kind: WorkKind;
  /** Qué es la pieza, en pocas palabras: "Reel de producto", "Diseño de feed". */
  readonly label: string;
  readonly size: WorkSize;
}

export type WorkPiece =
  | (WorkPieceBase & { readonly media: 'image'; readonly image: ResponsiveImage })
  | (WorkPieceBase & { readonly media: 'video'; readonly video: CaseVideo })
  | (WorkPieceBase & { readonly media: 'logo'; readonly logo: ClientLogo; readonly tone: string; readonly ink?: string })
  | (WorkPieceBase & {
      readonly media: 'campaign';
      readonly logo: ClientLogo;
      readonly text: string;
      readonly highlights: readonly string[];
      readonly quote: string;
      readonly quoteAuthor: string;
    });

/** Un ejemplo de software a medida: el app en video, lo que hace y lo que hicimos. */
export interface SoftwareCase {
  readonly client: string;
  readonly title: string;
  readonly summary: string;
  readonly made: readonly string[];
  readonly features: readonly ServiceItem[];
  readonly video: CaseVideo;
  readonly cta: string;
  readonly whatsappMessage: string;
}
