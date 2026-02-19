/**
 * MacroBar — barra inferior del VTT con:
 *  - HUD de HP/Mana del token seleccionado
 *  - Macros rápidas (Attack, Defend, Dash, Spell, Item)
 *  - Estado de turno activo
 */

import { useState } from 'react';
import { useGame } from '@/hooks/useGame';

interface Macro {
  id: string;
  icon: string;
  label: string;
  color?: string;
  action: () => void;
}

export function MacroBar() {
  const { tokens, rollDice, initiativeOrder, currentTurnIndex, round } = useGame();
  const [selectedTokenId] = useState<string | null>(null);

  const selectedToken = tokens.find((t) => t.id === selectedTokenId) ?? tokens[0] ?? null;

  const hpPct = selectedToken
    ? Math.round((selectedToken.hp / selectedToken.maxHp) * 100)
    : 0;
  const hpColor = hpPct > 50 ? '#10b981' : hpPct > 25 ? '#f59e0b' : '#ef4444';

  const MACROS: Macro[] = [
    {
      id: 'attack',
      icon: 'swords',
      label: 'Ataque',
      action: () => rollDice('1d20', 'Ataque'),
    },
    {
      id: 'defend',
      icon: 'shield',
      label: 'Defensa',
      action: () => rollDice('1d20', 'Defensa'),
    },
    {
      id: 'dash',
      icon: 'footprint',
      label: 'Sprint',
      action: () => {},
    },
    {
      id: 'spell',
      icon: 'auto_fix',
      label: 'Hechizo',
      color: '#8b5cf6',
      action: () => rollDice('1d20', 'Conjuro'),
    },
    {
      id: 'item',
      icon: 'local_drink',
      label: 'Ítem',
      color: '#10b981',
      action: () => {},
    },
  ];

  const currentEntry = initiativeOrder[currentTurnIndex];

  return (
    <footer className="fixed bottom-6 left-1/2 -translate-x-1/2 max-w-4xl w-full px-4 z-30 pointer-events-none">
      <div className="flex flex-col items-center gap-3">
        {/* HUD de HP/Recursos si hay token seleccionado */}
        {selectedToken && (
          <div className="flex items-center gap-4 bg-[#121118]/95 backdrop-blur-md border border-border-dark px-6 py-2 rounded-xl shadow-lg pointer-events-auto">
            {/* HP */}
            <div className="flex flex-col items-end gap-1 min-w-30">
              <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">HP</span>
              <div className="w-32 h-2.5 bg-border-dark rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${hpPct}%`, backgroundColor: hpColor }}
                />
              </div>
              <span className="text-xs font-bold text-text-primary">
                {selectedToken.hp} / {selectedToken.maxHp}
              </span>
            </div>

            <div className="w-px h-8 bg-border-dark" />

            {/* AC */}
            {selectedToken.ac !== undefined && (
              <>
                <div className="flex flex-col items-center gap-0.5">
                  <span className="text-[10px] uppercase font-bold text-text-muted tracking-wider">CA</span>
                  <span className="text-xl font-bold text-text-primary">{selectedToken.ac}</span>
                </div>
                <div className="w-px h-8 bg-border-dark" />
              </>
            )}

            {/* Nombre token */}
            <div className="flex items-center gap-2">
              <div
                className="w-7 h-7 rounded-full border-2 overflow-hidden"
                style={{ borderColor: selectedToken.color }}
              >
                {selectedToken.image ? (
                  <img src={selectedToken.image} alt={selectedToken.name} className="w-full h-full object-cover" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white"
                    style={{ background: `${selectedToken.color}40` }}
                  >
                    {selectedToken.name.slice(0, 2)}
                  </div>
                )}
              </div>
              <span className="text-sm font-bold text-text-primary">{selectedToken.name}</span>
            </div>
          </div>
        )}

        {/* Macros + turno actual */}
        <div className="flex items-center gap-2 p-2 bg-[#121118]/95 backdrop-blur-md border border-border-dark rounded-xl shadow-2xl pointer-events-auto">
          {/* Indicador de ronda */}
          {initiativeOrder.length > 0 && (
            <>
              <div className="flex flex-col items-center px-2 min-w-15">
                <span className="text-[10px] text-text-muted uppercase tracking-wider">Ronda</span>
                <span className="text-xl font-bold text-primary">{round}</span>
                {currentEntry && (
                  <span className="text-[10px] text-text-muted truncate max-w-15">{currentEntry.name}</span>
                )}
              </div>
              <div className="w-px h-10 bg-border-dark" />
            </>
          )}

          {/* Botones macro */}
          {MACROS.map((macro) => (
            <button
              key={macro.id}
              onClick={macro.action}
              className={`
                flex flex-col items-center justify-center w-16 h-14 rounded-lg transition-all group border border-transparent
                bg-surface-dark hover:border-opacity-50
                ${macro.color
                  ? 'hover:-translate-y-1'
                  : 'hover:bg-primary hover:-translate-y-1 hover:border-primary/50'
                }
              `}
              style={macro.color ? { '--hover-bg': macro.color } as React.CSSProperties : undefined}
              onMouseEnter={(e) => { if (macro.color) e.currentTarget.style.background = `${macro.color}33`; }}
              onMouseLeave={(e) => { if (macro.color) e.currentTarget.style.background = ''; }}
              title={macro.label}
            >
              <span
                className="material-symbols-outlined mb-1 group-hover:scale-110 transition-transform"
                style={{ color: macro.color ?? 'white' }}
              >
                {macro.icon}
              </span>
              <span className="text-[10px] font-bold text-text-muted group-hover:text-white">
                {macro.label}
              </span>
            </button>
          ))}

          <div className="w-px h-10 bg-border-dark mx-1" />

          {/* Editar macros */}
          <button className="flex flex-col items-center justify-center w-16 h-14 rounded-lg border border-dashed border-border-dark hover:border-text-muted transition-colors group">
            <span className="material-symbols-outlined text-text-muted mb-1 group-hover:text-white text-base">edit</span>
            <span className="text-[10px] font-bold text-text-muted group-hover:text-white">Editar</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
