import { glozImageLoader } from './image-loader';

describe('glozImageLoader', () => {
  it('pide el archivo del ancho exacto', () => {
    expect(glozImageLoader({ src: 'img/casos/cafe', width: 960 })).toBe('img/casos/cafe-960.webp');
  });

  it('sin ancho, usa el ancho base', () => {
    expect(glozImageLoader({ src: 'img/casos/cafe', loaderParams: { base: 560 } })).toBe('img/casos/cafe-560.webp');
  });
});
