/**
 * TokenManager — modal para añadir tokens al mapa.
 * Permite crear tokens de jugadores (aliados) y PNJs/enemigos.
 */

import { useState } from 'react';
import { useGame } from '@/hooks/useGame';
import type { Token, InitiativeEntry } from '@/types/game';

const FACTION_COLORS = [
  { label: 'Aliado', value: '#3713ec' },
  { label: 'Enemigo', value: '#ef4444' },
  { label: 'Neutral', value: '#f59e0b' },
  { label: 'NPC', value: '#10b981' },
  { label: 'Mago', value: '#8b5cf6' },
];

interface TokenManagerProps {
  onClose: () => void;
}

export function TokenManager({ onClose }: TokenManagerProps) {
  const { addToken, tokens, removeToken, initiativeOrder, setInitiativeOrder } = useGame();

  const [form, setForm] = useState({
    name: '',
    color: '#3713ec',
    hp: 20,
    maxHp: 20,
    ac: 12,
    isEnemy: false,
    image: '',
  });

  // id del token para el que se está configurando la iniciativa
  const [initiativeFor, setInitiativeFor] = useState<string | null>(null);
  const [initiativeValue, setInitiativeValue] = useState<number>(10);

  const handleAdd = () => {
    if (!form.name.trim()) return;
    const token: Token = {
      id: Math.random().toString(36).slice(2, 9),
      name: form.name.trim(),
      color: form.color,
      x: 100 + Math.random() * 200,
      y: 100 + Math.random() * 200,
      hp: form.hp,
      maxHp: form.maxHp,
      ac: form.ac,
      isEnemy: form.isEnemy,
      conditions: [],
      image: form.image || undefined,
    };
    addToken(token);
    setForm((f) => ({ ...f, name: '' }));
  };

  const handleAddToInitiative = (token: Token) => {
    if (initiativeFor === token.id) {
      // Confirmar
      const alreadyIn = initiativeOrder.some((e) => e.tokenId === token.id);
      if (alreadyIn) {
        setInitiativeFor(null);
        return;
      }
      const entry: InitiativeEntry = {
        id: Math.random().toString(36).slice(2, 9),
        name: token.name,
        initiative: initiativeValue,
        hp: token.hp,
        maxHp: token.maxHp,
        isPlayer: !token.isEnemy,
        tokenId: token.id,
      };
      const newOrder = [...initiativeOrder, entry].sort((a, b) => b.initiative - a.initiative);
      setInitiativeOrder(newOrder);
      setInitiativeFor(null);
    } else {
      // Tirada automática d20
      const rolled = Math.ceil(Math.random() * 20);
      setInitiativeValue(rolled);
      setInitiativeFor(token.id);
    }
  };

  const isInInitiative = (tokenId: string) =>
    initiativeOrder.some((e) => e.tokenId === tokenId);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-surface-dark border border-border-dark rounded-xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border-dark">
          <h2 className="text-text-primary font-bold text-base">Gestor de Tokens</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Formulario de creación */}
          <div className="bg-surface-dark-lighter rounded-lg p-4 space-y-3">
            <h3 className="text-text-secondary text-sm font-semibold">Nuevo token</h3>

            <input
              type="text"
              placeholder="Nombre del token"
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full bg-surface-dark border border-border-dark text-text-primary text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted"
            />

            {/* Color de facción */}
            <div>
              <label className="text-text-muted text-xs block mb-1.5">Facción / Color</label>
              <div className="flex gap-2 flex-wrap">
                {FACTION_COLORS.map((fc) => (
                  <button
                    key={fc.value}
                    onClick={() => setForm((f) => ({ ...f, color: fc.value }))}
                    className={`h-8 px-3 rounded-lg text-xs font-medium transition-all border ${
                      form.color === fc.value
                        ? 'border-white scale-105'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                    style={{ background: `${fc.value}33`, color: fc.value }}
                  >
                    {fc.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'HP', key: 'hp' as const },
                { label: 'HP Máx.', key: 'maxHp' as const },
                { label: 'CA', key: 'ac' as const },
              ].map((field) => (
                <div key={field.key}>
                  <label className="text-text-muted text-xs block mb-1">{field.label}</label>
                  <input
                    type="number"
                    min={0}
                    max={999}
                    value={form[field.key]}
                    onChange={(e) => setForm((f) => ({ ...f, [field.key]: Number(e.target.value) }))}
                    className="w-full bg-surface-dark border border-border-dark text-text-primary text-sm rounded-lg px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary text-center"
                  />
                </div>
              ))}
            </div>

            {/* ¿Enemigo? */}
            <label className="flex items-center gap-2 text-text-secondary text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={form.isEnemy}
                onChange={(e) => setForm((f) => ({ ...f, isEnemy: e.target.checked }))}
                className="rounded accent-accent-red"
              />
              Token enemigo (borde rojo)
            </label>

            <button
              onClick={handleAdd}
              disabled={!form.name.trim()}
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-hover disabled:opacity-40 text-white text-sm font-bold py-2.5 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-base">add</span>
              Añadir al mapa
            </button>
          </div>

          {/* Tokens existentes */}
          {tokens.length > 0 && (
            <div>
              <h3 className="text-text-muted text-xs font-bold uppercase tracking-wider mb-2">
                Tokens en el mapa ({tokens.length})
              </h3>
              <div className="space-y-1.5">
                {tokens.map((t) => (
                  <div
                    key={t.id}
                    className="flex flex-col gap-1.5 bg-surface-dark-lighter rounded-lg px-3 py-2"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full border-2 flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ borderColor: t.color, background: `${t.color}30` }}
                      >
                        {t.name.slice(0, 2)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-text-primary font-medium truncate">{t.name}</p>
                        <p className="text-[10px] text-text-muted">
                          HP {t.hp}/{t.maxHp} · CA {t.ac ?? '—'}
                        </p>
                      </div>
                      {/* Botón iniciativa */}
                      <button
                        onClick={() => handleAddToInitiative(t)}
                        title={isInInitiative(t.id) ? 'Ya en iniciativa' : 'Añadir a iniciativa'}
                        className={`p-1 transition-colors rounded ${
                          isInInitiative(t.id)
                            ? 'text-accent-green cursor-default'
                            : initiativeFor === t.id
                            ? 'text-primary bg-primary/10'
                            : 'text-text-muted hover:text-accent-yellow'
                        }`}
                      >
                        <span className="material-symbols-outlined text-base">
                          {isInInitiative(t.id) ? 'check_circle' : 'format_list_numbered'}
                        </span>
                      </button>
                      <button
                        onClick={() => removeToken(t.id)}
                        className="text-text-muted hover:text-accent-red transition-colors p-1"
                        title="Eliminar token"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                    {/* Inline iniciativa input */}
                    {initiativeFor === t.id && !isInInitiative(t.id) && (
                      <div className="flex items-center gap-2 pl-10 pt-1">
                        <label className="text-[10px] text-text-muted shrink-0">Iniciativa:</label>
                        <input
                          type="number"
                          min={1}
                          max={30}
                          value={initiativeValue}
                          onChange={(e) => setInitiativeValue(Number(e.target.value))}
                          className="w-16 bg-surface-dark border border-border-dark text-text-primary text-xs rounded px-2 py-1 text-center focus:outline-none focus:ring-1 focus:ring-primary"
                          autoFocus
                        />
                        <span className="text-[10px] text-text-muted">(d20 auto)</span>
                        <button
                          onClick={() => handleAddToInitiative(t)}
                          className="text-xs bg-primary hover:bg-primary-hover text-white px-2 py-0.5 rounded font-bold transition-colors"
                        >
                          Confirmar
                        </button>
                        <button
                          onClick={() => setInitiativeFor(null)}
                          className="text-text-muted hover:text-white text-xs"
                        >
                          Cancelar
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
