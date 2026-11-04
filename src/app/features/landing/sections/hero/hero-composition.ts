import { Component } from '@angular/core';
import { HERO_LABELS, HERO_PIECES } from '../../../../data/hero.data';
import { SEARCH_TOPICS } from '../../../../data/site.data';
import { LogoComponent } from '../../../../shared/ui/logo/logo';
import { ResponsiveImageComponent } from '../../../../shared/ui/responsive-image/responsive-image';
import { SearchPillComponent } from '../../../../shared/ui/search-pill/search-pill';

/** Piezas de contenido reales con las flechas de anotación de la marca. La anima la portada (firma). */
@Component({
  selector: 'gloz-hero-composition',
  imports: [ResponsiveImageComponent, LogoComponent, SearchPillComponent],
  templateUrl: './hero-composition.html',
  styleUrl: './hero-composition.css',
})
export class HeroCompositionComponent {
  protected readonly pieces = HERO_PIECES;
  protected readonly labels = HERO_LABELS;
  protected readonly topics = SEARCH_TOPICS;
  protected readonly clients = HERO_PIECES.map((p) => p.client).join(', ');
}
