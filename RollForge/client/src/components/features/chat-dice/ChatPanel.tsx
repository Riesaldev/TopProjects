/**
 * ChatPanel — panel derecho del VTT con Chat/Log + DiceRoller.
 * Tabs: Chat | Iniciativa
 */

import { useEffect, useRef, useState } from 'react';
import { useGame } from '@/hooks/useGame';
import type { ChatMessage } from '@/types/game';
import { DiceRoller } from './DiceRoller';

// ─── Mensaje individual ───────────────────────────────────────────────────────

function MessageItem({ msg }: { msg: ChatMessage }) {
  const time = new Date(msg.timestamp).toLocaleTimeString('es', {
    hour: '2-digit',
    minute: '2-digit',
  });

  if (msg.type === 'system') {
    return (
      <div className="text-center py-1">
        <span className="text-text-muted text-xs italic">{msg.content}</span>
      </div>
    );
  }

  if (msg.type === 'dice' && msg.diceResult) {
    const r = msg.diceResult;
    const isCrit = r.rolls.length > 0 && r.rolls[0] === (r.formula.match(/d(\d+)/)?.[1] ? parseInt(r.formula.match(/d(\d+)/)![1], 10) : 0);
    const isFumble = r.rolls.length === 1 && r.rolls[0] === 1;
    const resultColor = isCrit ? '#0bda6c' : isFumble ? '#ff4d4f' : r.total >= 15 ? '#e5e7eb' : '#a19db9';

    return (
      <div className="bg-surface-dark-lighter rounded-lg border border-border-dark p-2.5 my-1">
        <div className="flex items-center gap-2 mb-1.5">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
            style={{ background: msg.color }}
          >
            {msg.username.slice(0, 1)}
          </div>
          <span className="text-xs font-bold text-text-primary">{msg.username}</span>
          {r.label && <span className="text-xs text-text-muted">·  {r.label}</span>}
          <span className="ml-auto text-[10px] text-text-muted">{time}</span>
        </div>
        <div className="flex items-center justify-between bg-black/20 rounded p-2">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-text-muted text-base">casino</span>
            <span className="text-xs font-mono text-text-muted">{r.formula}</span>
            {r.rolls.length > 1 && (
              <span className="text-[10px] text-text-muted">
                [{r.rolls.join(', ')}]
              </span>
            )}
          </div>
          <span
            className="text-2xl font-bold"
            style={{ color: resultColor }}
            title={isCrit ? '¡Crítico!' : isFumble ? '¡Pifia!' : undefined}
          >
            {r.total}
          </span>
        </div>
        {(isCrit || isFumble) && (
          <p className="text-[10px] font-bold mt-1 text-center" style={{ color: resultColor }}>
            {isCrit ? '✦ ¡Crítico!' : '✦ ¡Pifia!'}
          </p>
        )}
      </div>
    );
  }

  // Mensaje de chat normal (y susurros)
  const isWhisper = msg.isWhisper;
  return (
    <div className={`flex gap-2 py-1 ${isWhisper ? 'opacity-90' : ''}`}>
      <div
        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5"
        style={{ background: isWhisper ? '#8b5cf6' : msg.color }}
      >
        {msg.username.slice(0, 1)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-1.5 mb-0.5 flex-wrap">
          <span className="text-xs font-bold" style={{ color: isWhisper ? '#a78bfa' : msg.color }}>
            {msg.username}
          </span>
          {isWhisper && (
            <span className="flex items-center gap-0.5 text-[10px] text-purple-400 font-medium">
              <span className="material-symbols-outlined text-[11px]">lock</span>
              {msg.targetUsername ? `→ ${msg.targetUsername}` : '(susurro)'}
            </span>
          )}
          <span className="text-[10px] text-text-muted">{time}</span>
        </div>
        <p className={`text-sm leading-snug wrap-break-words ${isWhisper ? 'italic text-purple-200' : 'text-text-secondary'}`}>
          {msg.content}
        </p>
      </div>
    </div>
  );
}

// ─── Panel principal ──────────────────────────────────────────────────────────

type Tab = 'chat' | 'initiative';

interface ChatPanelProps {
  /** Mostrar el tab de iniciativa en lugar de chat */
  defaultTab?: Tab;
}

export function ChatPanel({ defaultTab = 'chat' }: ChatPanelProps) {
  const { messages, sendMessage, initiativeOrder, currentTurnIndex, round, nextTurn, isConnected, players } = useGame();
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab);
  const [input, setInput] = useState('');
  const [whisperTarget, setWhisperTarget] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    sendMessage(trimmed, whisperTarget ?? undefined);
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <aside className="w-80 bg-[#121118] border-l border-border-dark flex flex-col z-20 shadow-2xl shrink-0">
      {/* Tabs */}
      <div className="flex border-b border-border-dark shrink-0">
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'chat'
              ? 'text-white border-b-2 border-primary bg-surface-dark/50'
              : 'text-text-muted hover:text-white hover:bg-surface-dark'
          }`}
        >
          <span className="material-symbols-outlined text-base">chat</span>
          Chat
        </button>
        <button
          onClick={() => setActiveTab('initiative')}
          className={`flex-1 py-2.5 text-sm font-semibold flex items-center justify-center gap-1.5 transition-colors ${
            activeTab === 'initiative'
              ? 'text-white border-b-2 border-primary bg-surface-dark/50'
              : 'text-text-muted hover:text-white hover:bg-surface-dark'
          }`}
        >
          <span className="material-symbols-outlined text-base">format_list_numbered</span>
          Iniciativa
        </button>
      </div>

      {/* Estado de conexión */}
      <div className={`flex items-center gap-1.5 px-3 py-1 text-[10px] font-medium ${isConnected ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
        <div className={`w-1.5 h-1.5 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-yellow-400'}`} />
        {isConnected ? 'Conectado al servidor' : 'Modo sin conexión'}
      </div>

      {/* Contenido */}
      <div className="flex-1 overflow-hidden flex flex-col">
        {activeTab === 'chat' ? (
          <>
            {/* Mensajes */}
            <div className="flex-1 overflow-y-auto p-3 space-y-0.5">
              {messages.map((msg) => (
                <MessageItem key={msg.id} msg={msg} />
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Dados */}
            <DiceRoller />

            {/* Selector de destinatario */}
            {players.length > 0 && (
              <div className="px-3 py-1.5 border-t border-border-dark bg-[#121118] flex items-center gap-2">
                <span className="text-[10px] text-text-muted shrink-0">Para:</span>
                <div className="flex gap-1.5 flex-wrap">
                  <button
                    onClick={() => setWhisperTarget(null)}
                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                      whisperTarget === null
                        ? 'bg-primary text-white'
                        : 'bg-surface-dark-lighter text-text-muted hover:text-white'
                    }`}
                  >
                    Todos
                  </button>
                  {players.map((p) => (
                    <button
                      key={p.userId}
                      onClick={() => setWhisperTarget(p.username)}
                      className={`px-2 py-0.5 rounded text-[10px] font-bold transition-colors ${
                        whisperTarget === p.username
                          ? 'bg-purple-600 text-white'
                          : 'bg-surface-dark-lighter text-text-muted hover:text-white'
                      }`}
                      style={{ borderLeft: `2px solid ${p.color}` }}
                    >
                      {p.username}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-border-dark bg-[#121118]">
              {whisperTarget && (
                <div className="flex items-center gap-1 mb-1.5 text-[10px] text-purple-400">
                  <span className="material-symbols-outlined text-[11px]">lock</span>
                  Susurro privado a <span className="font-bold">{whisperTarget}</span>
                  <button
                    onClick={() => setWhisperTarget(null)}
                    className="ml-auto text-text-muted hover:text-white"
                  >
                    <span className="material-symbols-outlined text-[11px]">close</span>
                  </button>
                </div>
              )}
              <div className="relative">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Mensaje o /roll 1d20…"
                  className="w-full bg-surface-dark-lighter border border-border-dark text-text-primary text-sm rounded-lg pl-3 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-text-muted"
                />
                <button
                  onClick={handleSend}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-primary hover:text-white hover:bg-primary rounded p-0.5 transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">send</span>
                </button>
              </div>
              <p className="text-[10px] text-text-muted mt-1">
                <kbd className="bg-surface-dark px-1 rounded text-[10px]">/roll 2d6+3</kbd>
                {' '}·{' '}
                <kbd className="bg-surface-dark px-1 rounded text-[10px]">/w @Jugador msg</kbd>
              </p>
            </div>
          </>
        ) : (
          <InitiativeTab
            order={initiativeOrder}
            currentIdx={currentTurnIndex}
            round={round}
            onNext={nextTurn}
          />
        )}
      </div>
    </aside>
  );
}

// ─── Tab de Iniciativa ────────────────────────────────────────────────────────

function InitiativeTab({
  order,
  currentIdx,
  round,
  onNext,
}: {
  order: ReturnType<typeof useGame>['initiativeOrder'];
  currentIdx: number;
  round: number;
  onNext: () => void;
}) {
  if (order.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
        <span className="material-symbols-outlined text-4xl text-text-muted mb-3">
          format_list_numbered
        </span>
        <p className="text-text-muted text-sm">No hay combate activo</p>
        <p className="text-text-muted text-xs mt-1">
          El GM puede iniciar el rastreo de iniciativa
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      {/* Cabecera */}
      <div className="flex items-center justify-between px-3 py-2 bg-border-dark/50 border-b border-border-dark shrink-0">
        <span className="text-xs font-bold text-text-muted uppercase tracking-wider">
          Ronda {round}
        </span>
        <button
          onClick={onNext}
          className="flex items-center gap-1 text-xs text-primary hover:text-white font-bold transition-colors"
        >
          Siguiente
          <span className="material-symbols-outlined text-base">skip_next</span>
        </button>
      </div>

      {/* Lista */}
      <div className="flex-1 overflow-y-auto divide-y divide-border-dark">
        {order.map((entry, i) => {
          const isActive = i === currentIdx;
          const hpPct = entry.maxHp > 0 ? (entry.hp / entry.maxHp) * 100 : 100;
          const hpColor = hpPct > 50 ? 'bg-accent-green' : hpPct > 25 ? 'bg-accent-yellow' : 'bg-accent-red';

          return (
            <div
              key={entry.id}
              className={`flex items-center gap-3 p-2.5 transition-colors ${
                isActive ? 'bg-primary/10 border-l-4 border-primary' : 'border-l-4 border-transparent opacity-70'
              }`}
            >
              <span className="text-base font-bold text-primary w-6 text-center">
                {entry.initiative}
              </span>
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white border shrink-0"
                style={{
                  background: entry.image ? undefined : (entry.isPlayer ? '#3713ec40' : '#ef444440'),
                  borderColor: entry.isPlayer ? '#3713ec' : '#ef4444',
                }}
              >
                {entry.image ? (
                  <img src={entry.image} alt={entry.name} className="w-full h-full rounded-full object-cover" />
                ) : (
                  entry.name.slice(0, 2)
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-bold truncate ${isActive ? 'text-white' : 'text-text-secondary'}`}>
                  {entry.name}
                  {isActive && <span className="ml-1.5 text-[10px] text-primary font-normal">(Turno)</span>}
                </p>
                <div className="w-full bg-border-dark h-1 rounded-full mt-1">
                  <div
                    className={`${hpColor} h-1 rounded-full transition-all`}
                    style={{ width: `${hpPct}%` }}
                  />
                </div>
              </div>
              <span className="text-xs text-text-muted font-mono">{entry.hp}/{entry.maxHp}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
