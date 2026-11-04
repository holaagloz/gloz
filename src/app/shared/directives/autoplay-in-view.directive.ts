import { Directive, ElementRef, inject } from '@angular/core';
import { motionEffect } from '../../core/motion/motion-effect';

/** Reproduce un video decorativo solo mientras se ve. Con "Reducir movimiento" o ahorro de datos, se queda la portada. */
@Directive({ selector: 'video[glozAutoplayInView]' })
export class AutoplayInViewDirective {
  constructor() {
    const video = inject<ElementRef<HTMLVideoElement>>(ElementRef).nativeElement;
    motionEffect((motion) => {
      const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
      if (!motion.enabled || saveData) return;
      video.muted = true;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry?.isIntersecting) void video.play().catch(() => undefined);
          else video.pause();
        },
        { threshold: 0.35 },
      );
      observer.observe(video);
      return () => observer.disconnect();
    });
  }
}
