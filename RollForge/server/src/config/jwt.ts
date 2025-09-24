// Centraliza la obtención del secreto JWT.
// Política simplificada: solo se admite SECRET para firmar/verificar.
// Si no existe, se lanza error explícito.
export function getJwtSecret(): string {
  const secret = process.env.SECRET;
  if (!secret) {
    throw new Error('SECRET no configurado');
  }
  return secret;
}

export function logJwtSecretMeta() {
  if (process.env.NODE_ENV === 'production') return;
  try {
    const sec = getJwtSecret();
    // eslint-disable-next-line no-console
    console.debug(`[jwt] usando SECRET (length=${sec.length})`);
  } catch (e) {
    console.error('[jwt] secreto no disponible:', e);
  }
}