/**
 * MapSettingsPanel — panel flotante de configuración del mapa VTT.
 *
 * Controles disponibles:
 *  - Mostrar/ocultar grilla hexagonal
 *  - Tamaño de celda (hexSize) con slider
 *  - Opacidad de la grilla
 *  - Opacidad de la imagen de fondo
 *  - Subir/cambiar imagen de mapa
 *  - Resetear vista (zoom + pan)
 */

import { useRef } from 'react';
import { useGame } from '@/hooks/useGame';

interface MapSettingsPanelProps {
  onClose: () => void;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  unit,
  onChange,
  disabled,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (v: number) => void;
  disabled?: boolean;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <div className={`flex flex-col gap-1.5 ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-text-secondary font-medium">{label}</span>
        <span className="text-xs font-mono text-primary">
          {unit === '%' ? `${Math.round(value * 100)}%` : `${value}${unit ?? ''}`}
        </span>
      </div>
      <div className="relative h-2 rounded-full bg-border-dark-heavy">
        <div
          className="absolute left-0 top-0 h-full rounded-full bg-primary/70 transition-all"
          style={{ width: `${pct}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute inset-0 w-full opacity-0 cursor-pointer h-full"
        />
      </div>
    </div>
  );
}

export function MapSettingsPanel({ onClose }: MapSettingsPanelProps) {
  const { mapState, updateMapState, loadMapImage } = useGame();
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      loadMapImage(file);
      onClose();
    }
  };

  return (
    <>
      {/* Overlay para cerrar al hacer click fuera */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Panel */}
      <div
        className="absolute top-12 right-0 z-50 w-72 bg-[#16141f] border border-border-dark-heavy rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border-dark bg-surface-dark/50">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-lg">map</span>
            <h3 className="text-sm font-bold text-text-primary">Configuración del Mapa</h3>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>

        {/* Cuerpo */}
        <div className="p-4 flex flex-col gap-5">

          {/* ── Imagen del mapa ─────────────────────────────── */}
          <section>
            <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-3">
              Imagen de fondo
            </p>
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2 rounded-lg border border-dashed border-border-dark-heavy hover:border-primary text-text-muted hover:text-white text-sm transition-colors"
            >
              <span className="material-symbols-outlined text-base">upload_file</span>
              {mapState.imageUrl ? 'Cambiar imagen' : 'Subir imagen de mapa'}
            </button>
            {mapState.imageUrl && (
              <button
                onClick={() => updateMapState({ imageUrl: null })}
                className="w-full mt-2 text-xs text-accent-red hover:underline text-center"
              >
                Eliminar imagen
              </button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
            <div className="mt-3">
              <Slider
                label="Opacidad de imagen"
                value={mapState.imageOpacity}
                min={0}
                max={1}
                step={0.05}
                unit="%"
                onChange={(v) => updateMapState({ imageOpacity: v })}
                disabled={!mapState.imageUrl}
              />
            </div>
          </section>

          <div className="h-px bg-border-dark" />

          {/* ── Grilla hexagonal ────────────────────────────── */}
          <section>
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold">
                Grilla hexagonal
              </p>
              {/* Toggle ON/OFF */}
              <button
                onClick={() => updateMapState({ showGrid: !mapState.showGrid })}
                className={`relative w-10 h-5 rounded-full transition-colors ${
                  mapState.showGrid ? 'bg-primary' : 'bg-border-dark-heavy'
                }`}
              >
                <span
                  className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
                    mapState.showGrid ? 'left-5' : 'left-0.5'
                  }`}
                />
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <Slider
                label="Tamaño de celda (px)"
                value={mapState.hexSize}
                min={20}
                max={80}
                step={2}
                unit="px"
                onChange={(v) => updateMapState({ hexSize: v })}
                disabled={!mapState.showGrid}
              />
              <Slider
                label="Opacidad de grilla"
                value={mapState.gridOpacity}
                min={0.05}
                max={1}
                step={0.05}
                unit="%"
                onChange={(v) => updateMapState({ gridOpacity: v })}
                disabled={!mapState.showGrid}
              />
            </div>
          </section>

          <div className="h-px bg-border-dark" />

          {/* ── Vista ────────────────────────────────────────── */}
          <section>
            <p className="text-[10px] text-text-muted uppercase tracking-wider font-bold mb-3">
              Vista
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => updateMapState({ zoom: 1, panX: 0, panY: 0 })}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-surface-dark-lighter hover:bg-surface-hover border border-border-dark text-text-secondary hover:text-white text-xs font-medium transition-colors"
              >
                <span className="material-symbols-outlined text-base">center_focus_strong</span>
                Resetear vista
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
