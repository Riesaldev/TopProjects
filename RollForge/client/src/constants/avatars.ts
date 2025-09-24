// Avatares de fallback disponibles en /public
// Si se amplía la lista, solo actualizar aquí.
export const FALLBACK_AVATARS = ['/samurai.png', '/viking.png', '/wizard.png'];

export function getRandomFallbackAvatar() {
  return FALLBACK_AVATARS[Math.floor(Math.random() * FALLBACK_AVATARS.length)];
}
