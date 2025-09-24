// Utilidades para cálculos en grillas hexagonales flat-top (offset/axial simple)
// Usamos sistema axial q,r con orientación flat-top (q horizontal, r diagonal hacia abajo derecha)
// Cada hex se considera a 5 pies.

export interface Axial {
  q: number;
  r: number;
}

// Convert axial to cube (x,y,z) con x=q, z=r, y=-x-z
function axialToCube(a: Axial) {
  const x = a.q;
  const z = a.r;
  const y = -x - z;
  return { x, y, z };
}

export function hexDistance(a: Axial, b: Axial): number {
  const ac = axialToCube(a);
  const bc = axialToCube(b);
  return Math.max(Math.abs(ac.x - bc.x), Math.abs(ac.y - bc.y), Math.abs(ac.z - bc.z));
}

// Hexes en radio (incluye centro)
export function hexesInRadius(center: Axial, radius: number): Axial[] {
  const results: Axial[] = [];
  for (let dq = -radius; dq <= radius; dq++) {
    for (let dr = Math.max(-radius, -dq - radius); dr <= Math.min(radius, -dq + radius); dr++) {
      const q = center.q + dq;
      const r = center.r + dr;
      results.push({ q, r });
    }
  }
  return results;
}

// Área cónica: definimos dirección como uno de los 6 vecinos 0..5 (clockwise empezando a la derecha (0 grados))
// size = alcance en hexes, spread = apertura en "pasos" laterales (como radio lateral). Simplificación para TTRPG.
export const DIRECTIONS: Axial[] = [
  { q: 1, r: 0 },   // 0
  { q: 1, r: -1 },  // 1
  { q: 0, r: -1 },  // 2
  { q: -1, r: 0 },  // 3
  { q: -1, r: 1 },  // 4
  { q: 0, r: 1 }    // 5
];

function add(a: Axial, b: Axial): Axial { return { q: a.q + b.q, r: a.r + b.r }; }
function scale(a: Axial, k: number): Axial { return { q: a.q * k, r: a.r * k }; }

export function coneArea(origin: Axial, directionIndex: number, length: number, spread: number): Axial[] {
  const dir = DIRECTIONS[((directionIndex % 6) + 6) % 6];
  const results: Axial[] = [];
  for (let step = 1; step <= length; step++) {
    const center = add(origin, scale(dir, step));
    // Para cada "step" expandimos lateralmente usando dos direcciones adyacentes
    const leftDir = DIRECTIONS[((directionIndex - 1) % 6 + 6) % 6];
    const rightDir = DIRECTIONS[((directionIndex + 1) % 6 + 6) % 6];
    results.push(center);
    for (let s = 1; s <= spread; s++) {
      results.push(add(center, scale(leftDir, s)));
      results.push(add(center, scale(rightDir, s)));
    }
  }
  // El origen se incluye para marcar convergencia visual
  results.push(origin);
  // Quitar duplicados
  const key = (h: Axial) => `${h.q},${h.r}`;
  const unique = Array.from(new Map(results.map(h => [key(h), h])).values());
  return unique;
}

export function axialKey(a: Axial) { return `${a.q},${a.r}`; }

// Nuevo: cono de 120° (wedge) siempre incluye dos direcciones adyacentes al eje principal.
// Para cada "anillo" (step) añadimos el eje principal y para offset lateral k añadimos ambos lados.

// wedgeTwoDirArea: área definida por dos direcciones adyacentes (dirA = directionIndex, dirB = directionIndex+1)
// Conjunto = { origin } ∪ { i*dirA + j*dirB | i>=0, j>=0, i+j <= length, i+j > 0 }
// Longitud 1 => origin + dirA + dirB (coincide con tu ejemplo).
export function wedgeTwoDirArea(origin: Axial, directionIndex: number, length: number): Axial[] {
  if (length <= 0) return [origin];
  const dirA = DIRECTIONS[((directionIndex % 6) + 6) % 6];
  const dirB = DIRECTIONS[((directionIndex + 1) % 6 + 6) % 6];
  const cells: Axial[] = [origin];
  for (let i = 0; i <= length; i++) {
    for (let j = 0; j <= length; j++) {
      const s = i + j;
      if (s === 0 || s > length) continue;
      const cell = add(add(origin, scale(dirA, i)), scale(dirB, j));
      cells.push(cell);
    }
  }
  const key = (h: Axial) => `${h.q},${h.r}`;
  return Array.from(new Map(cells.map(h => [key(h), h])).values());
}

// Determinar dirección aproximada (0..5) desde delta axial.
export function directionFromDelta(dq: number, dr: number): number {
  if (dq === 0 && dr === 0) return 0;
  // Convertimos a vector en 2D para comparar ángulos respecto a ejes direccionales.
  // Para flat-top axial: usamos aproximación de centros: cada dirección en radianes 0,60,...
  const angle = Math.atan2(dr * Math.sqrt(3) / 2, dq + dr / 2); // proyección axial a euclidiano
  // Normalizar ángulo a [0, 2PI)
  const twoPi = Math.PI * 2;
  const norm = (angle % twoPi + twoPi) % twoPi;
  // Direcciones a ángulos base
  const dirAngles = [0, 60, 120, 180, 240, 300].map(d => (d * Math.PI) / 180);
  let best = 0;
  let bestDiff = Infinity;
  dirAngles.forEach((a, idx) => {
    let diff = Math.abs(a - norm);
    if (diff > Math.PI) diff = twoPi - diff;
    if (diff < bestDiff) { bestDiff = diff; best = idx; }
  });
  return best;
}

// --- Offset <-> Axial (odd-q) ---
// Nuestro grid generado en HexGridMap usa q como columna y r como fila desplazada (odd columns shifted down half)
// Fórmulas de redblobgames: https://www.redblobgames.com/grids/hex-grids/#coordinates-offset

export interface Offset { q: number; r: number } // q = columna, r = fila (visual)

export function offsetOddQToAxial(o: Offset): Axial {
  // r_axial = r_visual - (q - (q&1)) / 2
  const r = o.r - (o.q - (o.q & 1)) / 2;
  return { q: o.q, r };
}

export function axialToOffsetOddQ(a: Axial): Offset {
  const r = a.r + (a.q - (a.q & 1)) / 2;
  return { q: a.q, r };
}

// Generar conjunto de keys offset ("q,r") dentro de un radio dado (incluye centro) tomando centro en offset.
export function offsetRadius(center: Offset, radius: number): Set<string> {
  const axialCenter = offsetOddQToAxial(center);
  const inAxial = hexesInRadius(axialCenter, radius); // ya incluye centro en axial
  return new Set(inAxial.map(a => {
    const o = axialToOffsetOddQ(a);
    return `${o.q},${o.r}`;
  }));
}
