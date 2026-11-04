import { afterNextRender, DestroyRef, inject } from '@angular/core';
import { Cleanup, MotionService } from './motion.service';

/**
 * Corre un efecto de movimiento después del primer render en el navegador
 * y lo limpia al destruir el componente o directiva. Llamar en contexto de inyección.
 */
export function motionEffect(effect: (motion: MotionService) => Cleanup | void): void {
  const motion = inject(MotionService);
  let cleanup: Cleanup | void;
  afterNextRender(() => {
    motion.start();
    cleanup = effect(motion);
  });
  inject(DestroyRef).onDestroy(() => cleanup?.());
}
