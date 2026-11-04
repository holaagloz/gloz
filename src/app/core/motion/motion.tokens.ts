/**
 * Ficha de movimiento de Gloz: preciso, cálido y elegante.
 * Pareja CSS en src/styles/tokens.css (--ease, --ease-io, --ease-pop, --dur, --dist).
 */
export const MOTION = {
  ease: 'power3.out',
  easeIO: 'power3.inOut',
  pop: 'back.out(1.2)',
  dur: 0.9,
  stagger: 0.06,
  dist: 22,
  /** Inercia de Lenis. */
  lerp: 0.105,
} as const;
