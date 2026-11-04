import { IMAGE_LOADER, ImageLoaderConfig } from '@angular/common';
import { Provider } from '@angular/core';

/**
 * Las fotos están preparadas como `<ruta>-<ancho>.webp` (por ejemplo img/casos/cafe-560.webp).
 * Sin ancho pedido, se usa el ancho base indicado en `loaderParams.base`.
 */
export const glozImageLoader = (config: ImageLoaderConfig): string => {
  const base = config.loaderParams?.['base'] as number | undefined;
  const width = config.width ?? base;
  return width ? `${config.src}-${width}.webp` : `${config.src}.webp`;
};

export const provideGlozImageLoader = (): Provider => ({ provide: IMAGE_LOADER, useValue: glozImageLoader });
