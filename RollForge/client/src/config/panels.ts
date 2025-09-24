// Configuración centralizada de posiciones y tamaños iniciales de los paneles
// Facilita modificar layout por defecto y futura persistencia.

export interface PanelLayoutDef {
  x: number; y: number; w: number; h: number;
}

export const PANEL_DEFAULTS: Record<string, PanelLayoutDef> = {
  'dice-roller': { x: 40, y: 80, w: 360, h: 320 },
  'players': { x: 430, y: 80, w: 240, h: 380 },
  'hex-map': { x: 700, y: 60, w: 620, h: 520 },
};

// Helper para obtener layout con fallback seguro
export function getPanelDefault(id: string): PanelLayoutDef {
  return PANEL_DEFAULTS[id] ?? { x: 40, y: 40, w: 300, h: 240 };
}

// Futuro: aquí podemos añadir lógica de carga/guardado en localStorage.