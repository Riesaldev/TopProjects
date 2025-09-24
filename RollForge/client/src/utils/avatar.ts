// Utilidad para resolver la URL final del avatar
// - Acepta nombre de archivo, ruta relativa o URL absoluta
// - Usa VITE_API_URL como base para /uploads si es necesario

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export function resolveAvatarUrl(raw: string | null | undefined): string {
  if (!raw) return ''; // el consumidor decide fallback
  if (/^https?:\/\//i.test(raw)) return raw; // URL absoluta
  if (raw.startsWith('/uploads/')) return `${API_BASE}${raw}`; // ya viene con prefijo
  if (raw.startsWith('/')) return raw; // recurso público del frontend (/samurai.png)
  // nombre de archivo plano devuelto por backend
  return `${API_BASE}/uploads/${raw}`;
}
