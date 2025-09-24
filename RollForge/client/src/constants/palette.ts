// Paleta de colores centralizada para jugadores y UI
// Si en el futuro se hace dinámica (temas), este archivo es el punto único.
export const PALETTE: string[] = [
  '#facc15', // amarillo
  '#fb923c', // naranja
  '#38bdf8', // celeste
  '#4ade80', // verde
  '#a78bfa', // lila
  '#f472b6', // rosa
  '#f87171', // rojo claro
  '#34d399', // verde menta
];

export function getPaletteColor(index: number) {
  return PALETTE[index % PALETTE.length];
}

export function randomPaletteColor() {
  return PALETTE[Math.floor(Math.random() * PALETTE.length)];
}
