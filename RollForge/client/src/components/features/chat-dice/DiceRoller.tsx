/**
 * DiceRoller — selector visual de dados con notación "NdX+M".
 * Los dados son botones; el resultado se envía al chat.
 */

import { useState } from 'react';
import { useGame } from '@/hooks/useGame';

const DICE = [4, 6, 8, 10, 12, 20, 100];

interface DiceConfig {
  dieType: number;
  count: number;
  modifier: number;
  label: string;
}

export function DiceRoller() {
  const { rollDice } = useGame();
  const [config, setConfig] = useState<DiceConfig>({
    dieType: 20,
    count: 1,
    modifier: 0,
    label: '',
  });

  const formula = `${config.count}d${config.dieType}${config.modifier > 0 ? `+${config.modifier}` : config.modifier < 0 ? config.modifier : ''}`;

  const handleRoll = () => {
    rollDice(formula, config.label || undefined);
  };

  return (
    <div className="p-3 border-t border-border-dark bg-background-primary/50">
      {/* Dados disponibles */}
      <div className="flex gap-1.5 mb-3 flex-wrap">
        {DICE.map((d) => (
          <button
            key={d}
            onClick={() => setConfig((c) => ({ ...c, dieType: d }))}
            className={`
              w-10 h-10 rounded-lg text-xs font-bold transition-colors border
              ${config.dieType === d
                ? 'bg-primary border-primary text-white shadow-[0_0_8px_rgba(55,19,236,0.4)]'
                : 'bg-surface-dark-lighter border-border-dark text-text-muted hover:border-primary/50 hover:text-white'
              }
            `}
          >
            d{d}
          </button>
        ))}
      </div>

      {/* Configuración: cantidad y modificador */}
      <div className="flex gap-2 mb-2">
        <div className="flex items-center gap-1.5">
          <label className="text-text-muted text-xs">×</label>
          <div className="flex">
            <button
              onClick={() => setConfig((c) => ({ ...c, count: Math.max(1, c.count - 1) }))}
              className="w-7 h-7 bg-surface-dark-lighter border border-border-dark text-text-muted hover:text-white rounded-l-sm text-sm transition-colors"
            >−</button>
            <span className="w-7 h-7 flex items-center justify-center bg-surface-dark border-y border-border-dark text-sm font-bold text-text-primary">
              {config.count}
            </span>
            <button
              onClick={() => setConfig((c) => ({ ...c, count: Math.min(20, c.count + 1) }))}
              className="w-7 h-7 bg-surface-dark-lighter border border-border-dark text-text-muted hover:text-white rounded-r-sm text-sm transition-colors"
            >+</button>
          </div>
        </div>

        <div className="flex items-center gap-1.5 ml-2">
          <label className="text-text-muted text-xs">Mod.</label>
          <div className="flex">
            <button
              onClick={() => setConfig((c) => ({ ...c, modifier: c.modifier - 1 }))}
              className="w-7 h-7 bg-surface-dark-lighter border border-border-dark text-text-muted hover:text-white rounded-l-sm text-sm transition-colors"
            >−</button>
            <span className="w-8 h-7 flex items-center justify-center bg-surface-dark border-y border-border-dark text-xs font-bold text-text-primary">
              {config.modifier >= 0 ? `+${config.modifier}` : config.modifier}
            </span>
            <button
              onClick={() => setConfig((c) => ({ ...c, modifier: c.modifier + 1 }))}
              className="w-7 h-7 bg-surface-dark-lighter border border-border-dark text-text-muted hover:text-white rounded-r-sm text-sm transition-colors"
            >+</button>
          </div>
        </div>
      </div>

      {/* Etiqueta opcional */}
      <input
        type="text"
        placeholder="Etiqueta (ej. Ataque, Percepción…)"
        value={config.label}
        onChange={(e) => setConfig((c) => ({ ...c, label: e.target.value }))}
        className="w-full bg-surface-dark-lighter border border-border-dark text-text-primary text-xs rounded-lg px-2.5 py-1.5 mb-2 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted"
      />

      {/* Botón de tirada */}
      <button
        onClick={handleRoll}
        className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover text-white text-sm font-bold py-2 rounded-lg transition-colors shadow-[0_0_10px_rgba(55,19,236,0.3)] hover:shadow-[0_0_15px_rgba(55,19,236,0.5)]"
      >
        <span className="material-symbols-outlined text-lg">casino</span>
        Tirar {formula}
      </button>
    </div>
  );
}
