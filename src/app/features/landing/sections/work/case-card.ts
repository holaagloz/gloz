import { Component, input } from '@angular/core';
import { CaseStudy } from '../../../../models/content.models';
import { AutoplayInViewDirective } from '../../../../shared/directives/autoplay-in-view.directive';
import { RevealDirective } from '../../../../shared/directives/motion.directives';
import { LogoComponent } from '../../../../shared/ui/logo/logo';
import { ResponsiveImageComponent } from '../../../../shared/ui/responsive-image/responsive-image';

/** Tarjeta de caso: texto con cliente y servicios a un lado, el trabajo real al otro, con la firma de Gloz. */
@Component({
  selector: 'gloz-case-card',
  imports: [ResponsiveImageComponent, LogoComponent, RevealDirective, AutoplayInViewDirective],
  host: { '[class.invertida]': 'reversed()' },
  templateUrl: './case-card.html',
  styleUrl: './case-card.css',
})
export class CaseCardComponent {
  readonly caseStudy = input.required<CaseStudy>();
  readonly reversed = input(false);
}
