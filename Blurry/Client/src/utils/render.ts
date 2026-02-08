// Utilidad para renderizar valores de forma segura
export function safeRender(value: unknown): string {
  if (value === null || value === undefined) {
    return '';
  }
  
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  
  if (typeof value === 'object') {
    if (value instanceof Date) {
      return value.toLocaleString();
    }
    
    // Para objetos, intentar extraer propiedades comunes
    const obj = value as Record<string, unknown>;
    if (obj.name && typeof obj.name === 'string') return obj.name;
    if (obj.title && typeof obj.title === 'string') return obj.title;
    if (obj.text && typeof obj.text === 'string') return obj.text;
    if (obj.message && typeof obj.message === 'string') return obj.message;
    
    // Como último recurso, convertir a JSON (aunque esto debería evitarse)
    return JSON.stringify(value);
  }
  
  return String(value);
}

// Función específica para fechas
export function formatDate(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleString();
  } catch {
    return 'Fecha inválida';
  }
}

// Función para formatear tiempo
export function formatTime(date: string | Date): string {
  try {
    const d = typeof date === 'string' ? new Date(date) : date;
    return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return 'Hora inválida';
  }
}
