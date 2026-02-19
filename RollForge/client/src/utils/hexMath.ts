/**
 * Matemáticas para grilla hexagonal flat-top (vértices arriba/abajo).
 *
 *  Ejes de coordenadas axiales (q, r):
 *    q → columna horizontal
 *    r → fila diagonal
 *
 *  1 hexágono = 5 pies de juego (RAW D&D 5e).
 */

import type { HexCoord, PixelCoord } from '@/types/game';

// ─── Constantes ───────────────────────────────────────────────────────────────

export const FEET_PER_HEX = 5;

// ─── Conversión píxeles ↔ hexágono (flat-top) ─────────────────────────────────

/**
 * Convierte coordenadas axiales a centro en píxeles.
 * @param q columna axial
 * @param r fila axial
 * @param size radio del hexágono en px
 */
export function hexToPixel(q: number, r: number, size: number): PixelCoord {
  const x = size * (3 / 2) * q;
  const y = size * (Math.sqrt(3) / 2 * q + Math.sqrt(3) * r);
  return { x, y };
}

/**
 * Convierte coordenadas de píxel al hexágono más cercano.
 * @param px posición x en px
 * @param py posición y en px
 * @param size radio del hexágono en px
 */
export function pixelToHex(px: number, py: number, size: number): HexCoord {
  const q = ((2 / 3) * px) / size;
  const r = ((-1 / 3) * px + (Math.sqrt(3) / 3) * py) / size;
  return hexRound(q, r);
}

/** Redondea coordenadas fraccionarias al hexágono entero más cercano (cubo → axial). */
export function hexRound(q: number, r: number): HexCoord {
  const s = -q - r;
  let rq = Math.round(q);
  let rr = Math.round(r);
  const rs = Math.round(s);

  const dq = Math.abs(rq - q);
  const dr = Math.abs(rr - r);
  const ds = Math.abs(rs - s);

  if (dq > dr && dq > ds) {
    rq = -rr - rs;
  } else if (dr > ds) {
    rr = -rq - rs;
  }

  return { q: rq, r: rr };
}

// ─── Distancia ────────────────────────────────────────────────────────────────

/** Distancia en número de hexágonos entre dos coords axiales. */
export function hexDistance(a: HexCoord, b: HexCoord): number {
  const dq = b.q - a.q;
  const dr = b.r - a.r;
  const ds = -dq - dr;
  return Math.max(Math.abs(dq), Math.abs(dr), Math.abs(ds));
}

/** Distancia en pies (1 hex = 5 ft). */
export function hexDistanceFt(a: HexCoord, b: HexCoord): number {
  return hexDistance(a, b) * FEET_PER_HEX;
}

/** Distancia en pies entre dos puntos en píxeles. */
export function pixelDistanceFt(a: PixelCoord, b: PixelCoord, size: number): number {
  const hexA = pixelToHex(a.x, a.y, size);
  const hexB = pixelToHex(b.x, b.y, size);
  return hexDistanceFt(hexA, hexB);
}

// ─── Vecinos ──────────────────────────────────────────────────────────────────

const HEX_DIRECTIONS: HexCoord[] = [
  { q: 1, r: 0 }, { q: 1, r: -1 }, { q: 0, r: -1 },
  { q: -1, r: 0 }, { q: -1, r: 1 }, { q: 0, r: 1 },
];

export function hexNeighbors(hex: HexCoord): HexCoord[] {
  return HEX_DIRECTIONS.map((d) => ({ q: hex.q + d.q, r: hex.r + d.r }));
}

// ─── Área ─────────────────────────────────────────────────────────────────────

/**
 * Devuelve todos los hexágonos dentro de un radio dado (en hexágonos).
 */
export function hexesInRadius(center: HexCoord, radius: number): HexCoord[] {
  const results: HexCoord[] = [];
  for (let q = -radius; q <= radius; q++) {
    const r1 = Math.max(-radius, -q - radius);
    const r2 = Math.min(radius, -q + radius);
    for (let r = r1; r <= r2; r++) {
      results.push({ q: center.q + q, r: center.r + r });
    }
  }
  return results;
}

/**
 * Devuelve los hexágonos dentro de un radio en pies (desde un centro en px).
 */
export function hexesInBlast(
  centerPx: PixelCoord,
  radiusFt: number,
  hexSize: number,
): HexCoord[] {
  const center = pixelToHex(centerPx.x, centerPx.y, hexSize);
  const radiusHex = Math.ceil(radiusFt / FEET_PER_HEX);
  return hexesInRadius(center, radiusHex);
}

// ─── Cono ─────────────────────────────────────────────────────────────────────

/**
 * Devuelve los hexágonos dentro de un cono de 120°.
 * @param originPx origen del cono en píxeles
 * @param angleDeg dirección central del cono en grados
 * @param lengthFt longitud del cono en pies
 * @param hexSize radio del hexágono en px
 */
export function hexesInCone(
  originPx: PixelCoord,
  angleDeg: number,
  lengthFt: number,
  hexSize: number,
): HexCoord[] {
  const origin = pixelToHex(originPx.x, originPx.y, hexSize);
  const radiusHex = Math.ceil(lengthFt / FEET_PER_HEX);
  const candidates = hexesInRadius(origin, radiusHex);

  return candidates.filter((hex) => {
    if (hex.q === origin.q && hex.r === origin.r) return true;
    const px = hexToPixel(hex.q, hex.r, hexSize);
    const dx = px.x - originPx.x;
    const dy = px.y - originPx.y;
    const hexAngleDeg = (Math.atan2(dy, dx) * 180) / Math.PI;
    let diff = hexAngleDeg - angleDeg;
    // Normalizar a [-180, 180]
    while (diff > 180) diff -= 360;
    while (diff < -180) diff += 360;
    return Math.abs(diff) <= 60;
  });
}

// ─── Vértices del hexágono ────────────────────────────────────────────────────

/**
 * Calcula los 6 vértices de un hexágono flat-top para dibujar con SVG/Canvas.
 */
export function hexCorners(
  centerX: number,
  centerY: number,
  size: number,
): PixelCoord[] {
  return Array.from({ length: 6 }, (_, i) => {
    const angleDeg = 60 * i; // flat-top: empieza en 0°
    const rad = (Math.PI / 180) * angleDeg;
    return {
      x: centerX + size * Math.cos(rad),
      y: centerY + size * Math.sin(rad),
    };
  });
}

/**
 * Genera el string de puntos SVG para un polígono hexagonal.
 */
export function hexPolygonPoints(
  centerX: number,
  centerY: number,
  size: number,
): string {
  return hexCorners(centerX, centerY, size)
    .map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ');
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Compara dos coords hexagonales. */
export function hexEqual(a: HexCoord, b: HexCoord): boolean {
  return a.q === b.q && a.r === b.r;
}

/** Genera una clave string para un hex (uso en Map/Set). */
export function hexKey(h: HexCoord): string {
  return `${h.q},${h.r}`;
}
