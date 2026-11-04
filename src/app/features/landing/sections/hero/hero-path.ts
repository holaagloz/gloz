/**
 * Traza la flecha de la marca desde las piezas de contenido hasta el botón principal,
 * con las posiciones reales (cambian entre celular y escritorio). Devuelve el trazo o null.
 */
export function traceArrowToButton(host: HTMLElement): SVGPathElement | null {
  const svg = host.querySelector<SVGSVGElement>('[data-camino]');
  const path = svg?.querySelector<SVGPathElement>('path');
  const from = host.querySelector<HTMLElement>('[data-camino-desde]');
  const first = host.querySelector<HTMLElement>('[data-pieza]');
  const to = host.querySelector<HTMLElement>('[data-camino-hasta]');
  if (!svg || !path || !from || !first || !to) return null;

  const h = svg.getBoundingClientRect();
  const a = from.getBoundingClientRect();
  const b = to.getBoundingClientRect();
  svg.setAttribute('viewBox', `0 0 ${h.width} ${h.height}`);

  const side = a.left > b.right; // escritorio: el botón queda a la izquierda de las piezas
  let x1: number, y1: number, x2: number, y2: number, c1x: number, c1y: number, c2x: number, c2y: number;
  if (side) {
    const f = first.getBoundingClientRect();
    x1 = f.left - h.left + 10;
    y1 = f.bottom - h.top + 16;
    x2 = b.right - h.left + 16;
    y2 = b.top - h.top + b.height / 2;
    [c1x, c1y, c2x, c2y] = [x1 - 10, y2 + 70, x2 + 140, y2 + 30];
  } else {
    x1 = a.left - h.left + a.width / 2;
    y1 = a.top - h.top - 12;
    x2 = b.left - h.left + b.width * 0.72;
    y2 = b.bottom - h.top + 10;
    [c1x, c1y, c2x, c2y] = [x1, y1 - 30, x2 + 30, y2 + 26];
  }
  // Punta de flecha orientada según la última curva
  const angle = Math.atan2(y2 - c2y, x2 - c2x);
  const tip = (turn: number) => `${(x2 - 9 * Math.cos(angle + turn)).toFixed(1)},${(y2 - 9 * Math.sin(angle + turn)).toFixed(1)}`;
  const n = (v: number) => v.toFixed(1);
  path.setAttribute(
    'd',
    `M${n(x1)},${n(y1)} C${n(c1x)},${n(c1y)} ${n(c2x)},${n(c2y)} ${n(x2)},${n(y2)} M${n(x2)},${n(y2)} L${tip(0.5)} M${n(x2)},${n(y2)} L${tip(-0.5)}`,
  );
  return path;
}
