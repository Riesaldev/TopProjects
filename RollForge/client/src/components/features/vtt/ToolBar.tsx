/**
 * ToolBar — barra flotante izquierda del VTT.
 * Herramientas: Select, Measure, AOE Blast, AOE Cone, Fog, Draw.
 * Zoom controls en la parte inferior.
 */

import { useGame } from '@/hooks/useGame';
import type { ToolType } from '@/types/game';

interface Tool {
  id: ToolType;
  icon: string;
  label: string;
}

const TOOLS: Tool[] = [
  { id: 'select',    icon: 'near_me',    label: 'Seleccionar' },
  { id: 'measure',   icon: 'straighten', label: 'Medir' },
  { id: 'aoe-blast', icon: 'circle',     label: 'AOE Radial' },
  { id: 'aoe-cone',  icon: 'change_history', label: 'AOE Cono' },
  { id: 'fog',       icon: 'cloud',      label: 'Niebla' },
  { id: 'draw',      icon: 'draw',       label: 'Dibujar' },
];

export function ToolBar() {
  const { activeTool, setActiveTool, mapState, updateMapState, aoeState, setAoeState, setMeasurementState } = useGame();

  const handleToolClick = (tool: ToolType) => {
    setActiveTool(tool);
    // Limpiar overlays al cambiar herramienta
    if (tool !== 'measure') setMeasurementState(null);
    if (tool !== 'aoe-blast' && tool !== 'aoe-cone') setAoeState(null);
  };

  const handleZoom = (delta: number) => {
    const newZoom = Math.min(4, Math.max(0.3, mapState.zoom + delta));
    updateMapState({ zoom: newZoom });
  };

  const handleToggleGrid = () => {
    updateMapState({ showGrid: !mapState.showGrid });
  };

  return (
    <aside className="absolute left-4 top-4 bottom-20 flex flex-col gap-3 pointer-events-none z-20">
      {/* Herramientas */}
      <div className="flex flex-col gap-1.5 p-1.5 bg-surface-dark/90 backdrop-blur-md border border-border-dark rounded-2xl shadow-lg pointer-events-auto">
        {TOOLS.map((tool, i) => (
          <div key={tool.id} className="contents">
            {i === 4 && <div className="h-px w-6 mx-auto bg-border-dark my-0.5" />}
            <button
              onClick={() => handleToolClick(tool.id)}
              title={tool.label}
              className={`
                relative w-10 h-10 flex items-center justify-center rounded-full transition-colors group
                ${activeTool === tool.id
                  ? 'bg-primary text-white shadow-[0_0_10px_rgba(55,19,236,0.5)]'
                  : 'text-text-muted hover:bg-surface-hover hover:text-white'
                }
              `}
            >
              <span className="material-symbols-outlined text-xl">{tool.icon}</span>
              {/* Tooltip */}
              <span className="absolute left-12 bg-surface-dark text-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border-dark pointer-events-none z-50">
                {tool.label}
              </span>
            </button>
          </div>
        ))}

        <div className="h-px w-6 mx-auto bg-border-dark my-0.5" />

        {/* Toggle grid */}
        <button
          onClick={handleToggleGrid}
          title="Grilla hexagonal"
          className={`
            relative w-10 h-10 flex items-center justify-center rounded-full transition-colors group
            ${mapState.showGrid ? 'text-primary' : 'text-text-muted hover:text-white hover:bg-surface-hover'}
          `}
        >
          <span className="material-symbols-outlined text-xl">grid_on</span>
          <span className="absolute left-12 bg-surface-dark text-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border-dark pointer-events-none z-50">
            Grilla
          </span>
        </button>

        {/* Limpiar AOE / medición */}
        {(aoeState || activeTool === 'measure') && (
          <button
            onClick={() => { setAoeState(null); setMeasurementState(null); }}
            title="Limpiar overlay"
            className="relative w-10 h-10 flex items-center justify-center rounded-full text-accent-red hover:bg-red-500/10 transition-colors group"
          >
            <span className="material-symbols-outlined text-xl">clear</span>
            <span className="absolute left-12 bg-surface-dark text-text-primary text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border-dark pointer-events-none z-50">
              Limpiar
            </span>
          </button>
        )}
      </div>

      {/* Zoom controls (bottom) */}
      <div className="mt-auto flex flex-col gap-1.5 p-1.5 bg-surface-dark/90 backdrop-blur-md border border-border-dark rounded-2xl shadow-lg pointer-events-auto">
        <button
          onClick={() => handleZoom(0.2)}
          title="Acercar"
          className="w-10 h-10 flex items-center justify-center rounded-full text-text-muted hover:bg-surface-hover hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">add</span>
        </button>
        <div className="text-center text-[10px] text-text-muted font-mono px-1">
          {Math.round(mapState.zoom * 100)}%
        </div>
        <button
          onClick={() => handleZoom(-0.2)}
          title="Alejar"
          className="w-10 h-10 flex items-center justify-center rounded-full text-text-muted hover:bg-surface-hover hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">remove</span>
        </button>
        <div className="h-px w-6 mx-auto bg-border-dark my-0.5" />
        <button
          onClick={() => updateMapState({ zoom: 1, panX: 0, panY: 0 })}
          title="Resetear vista"
          className="w-10 h-10 flex items-center justify-center rounded-full text-text-muted hover:bg-surface-hover hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-xl">center_focus_strong</span>
        </button>
      </div>
    </aside>
  );
}
