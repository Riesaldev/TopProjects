import { getPool } from '@/db/getPool.ts';

// Ejecuta un DELETE lógico (pone a NULL) para códigos expirados.
async function cleanupOnce() {
  try {
    const pool = await getPool();
    if (!pool) return;
    // Ponemos a NULL código y expiración si ya pasaron.
    const [result] = await pool.query<import('mysql2/promise').ResultSetHeader>(
      'UPDATE users SET recoverPassword = NULL, recoverPasswordExpires = NULL WHERE recoverPasswordExpires IS NOT NULL AND recoverPasswordExpires < UTC_TIMESTAMP()'
    );
    const affected = result.affectedRows ?? 0;
    if (affected > 0) {
      console.log(`[cleanupRecoveryCodes] Limpieza realizada: ${affected} registros`);
    }
  } catch (e) {
    console.warn('[cleanupRecoveryCodes] Error durante limpieza:', e);
  }
}

let started = false;
export function scheduleRecoveryCodesCleanup() {
  if (started) return; // evitar múltiples schedulers
  started = true;
  const intervalMs = Number(process.env.RECOVERY_CLEAN_INTERVAL_MS ?? '900000'); // 15 min por defecto
  // Primera ejecución diferida unos segundos para no competir con init
  setTimeout(() => cleanupOnce(), 5000);
  setInterval(() => cleanupOnce(), intervalMs);
}
