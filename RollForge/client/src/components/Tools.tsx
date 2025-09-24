import React from 'react';
import { Ruler, Circle, Cone } from 'lucide-react';

export type ToolMode = 'none' | 'measure' | 'radius' | 'cone';

interface ToolsProps {
  mode: ToolMode;
  onModeChange: (m: ToolMode) => void;
  radiusSize: number; // en hexes
  onRadiusChange: (v: number) => void;
  coneLength: number;
  onConeLengthChange: (v: number) => void;
  measurementFeet?: number | null;
}

const btnBase = 'flex items-center gap-1 px-2 py-1 rounded text-xs font-medium border border-transparent transition-colors';

const Tools: React.FC<ToolsProps> = ({
  mode,
  onModeChange,
  radiusSize,
  onRadiusChange,
  coneLength,
  onConeLengthChange,
  measurementFeet
}) => {
  const active = (m: ToolMode) => mode === m ? 'bg-indigo-600 text-white' : 'bg-gray-700 hover:bg-gray-600 text-gray-200';

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 flex-wrap">
        <button className={`${btnBase} ${active('measure')}`} onClick={() => onModeChange(mode === 'measure' ? 'none' : 'measure')} title="Medir (A-B)">
          <Ruler className="w-4 h-4" /> Medir
        </button>
        <button className={`${btnBase} ${active('radius')}`} onClick={() => onModeChange(mode === 'radius' ? 'none' : 'radius')} title="Zona radial">
          <Circle className="w-4 h-4" /> Radial
        </button>
        <button className={`${btnBase} ${active('cone')}`} onClick={() => onModeChange(mode === 'cone' ? 'none' : 'cone')} title="Zona cónica">
          <Cone className="w-4 h-4" /> Cónica
        </button>
      </div>

      {mode === 'measure' && (
        <div className="text-xs bg-gray-800/60 p-2 rounded border border-gray-700 flex items-center gap-2">
          <span className="text-gray-300">Distancia:</span>
          <span className="font-semibold text-indigo-300">{measurementFeet ?? '--'} pies</span>
          <span className="text-gray-500">(1 hex = 5 ft)</span>
        </div>
      )}

      {mode === 'radius' && (
        <div className="text-xs bg-gray-800/60 p-2 rounded border border-gray-700 flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <span className="text-gray-300 w-16">Radio</span>
            <input
              type="range"
              min={1}
              max={15}
              value={radiusSize}
              onChange={e => onRadiusChange(parseInt(e.target.value))}
            />
            <span className="w-6 text-right text-gray-200">{radiusSize}</span>
          </label>
          <div className="text-gray-400">Radio en hexes (x5 pies)</div>
        </div>
      )}

      {mode === 'cone' && (
        <div className="text-xs bg-gray-800/60 p-2 rounded border border-gray-700 flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <span className="text-gray-300 w-16">Longitud</span>
            <input
              type="range"
              min={1}
              max={30}
              value={coneLength}
              onChange={e => onConeLengthChange(parseInt(e.target.value))}
            />
            <span className="w-6 text-right text-gray-200">{coneLength}</span>
          </label>
          <div className="text-gray-400 leading-snug">
            Click para origen y mueve el ratón para orientar el cono (hasta 30 hex de longitud).
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;
