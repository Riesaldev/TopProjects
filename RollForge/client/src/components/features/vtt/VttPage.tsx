/**
 * VttPage — página principal del Virtual Tabletop.
 *
 * Orquesta todos los componentes del VTT:
 *  - Header
 *  - MapCanvas (centro)
 *  - ToolBar (izquierda flotante)
 *  - ChatPanel (derecha)
 *  - MacroBar (abajo flotante)
 *  - TokenManager modal (para añadir/gestionar tokens)
 *
 * El GameProvider se monta aquí con el campaignId de la URL.
 */

import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { GameProvider } from '@/context/GameProvider';
import { useGame } from '@/hooks/useGame';
import { MapCanvas } from './MapCanvas';
import { ToolBar } from './ToolBar';
import { MacroBar } from './MacroBar';
import { TokenManager } from './TokenManager';
import { MapSettingsPanel } from './MapSettingsPanel';
import { ChatPanel } from '../chat-dice/ChatPanel';
import { useCampaigns } from '@/hooks/useCampaigns';

// ─── Header del VTT ──────────────────────────────────────────────────────────

function VttHeader() {
  const { campaignName, isConnected, players, round } = useGame();
  const [showTokenManager, setShowTokenManager] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <header className="flex items-center justify-between border-b border-border-dark bg-[#0e0d16] px-5 py-2.5 z-50 shrink-0">
        {/* Logo + campaña */}
        <div className="flex items-center gap-3">
          <Link to="/campaigns" className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg text-white hover:bg-primary-hover transition-colors">
            <span className="material-symbols-outlined text-xl">casino</span>
          </Link>
          <div>
            <h1 className="text-white text-sm font-bold leading-tight">{campaignName}</h1>
            <span className="text-text-muted text-xs">RollForge VTT</span>
          </div>
        </div>

        {/* Estado de sesión */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1 rounded bg-surface-dark-lighter/50 border border-border-dark">
          <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-accent-green animate-pulse' : 'bg-accent-yellow'}`} />
          <span className="text-xs text-text-secondary font-mono">
            {isConnected ? `EN VIVO · Ronda ${round}` : 'SIN CONEXIÓN'}
          </span>
        </div>

        {/* Controles */}
        <div className="flex items-center gap-3">
          {/* Avatares de jugadores */}
          <div className="flex -space-x-2">
            {players.slice(0, 4).map((p) => (
              <div
                key={p.userId}
                className="w-7 h-7 rounded-full border-2 border-[#0e0d16] flex items-center justify-center text-xs font-bold text-white"
                style={{ background: p.color }}
                title={p.username}
              >
                {p.username.slice(0, 1).toUpperCase()}
              </div>
            ))}
            {players.length === 0 && (
              <div className="w-7 h-7 rounded-full border-2 border-[#0e0d16] bg-border-dark flex items-center justify-center">
                <span className="text-text-muted text-[10px]">0</span>
              </div>
            )}
          </div>

          {/* Añadir token */}
          <button
            onClick={() => setShowTokenManager(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-dark-lighter hover:bg-surface-hover border border-border-dark rounded-lg text-text-secondary hover:text-white text-xs font-medium transition-colors"
          >
            <span className="material-symbols-outlined text-base">add</span>
            Token
          </button>

          {/* Configuración */}
          <div className="relative">
            <button
              onClick={() => setShowSettings((v) => !v)}
              className={`w-9 h-9 flex items-center justify-center rounded-lg border border-border-dark transition-colors ${
                showSettings
                  ? 'bg-primary text-white border-primary'
                  : 'bg-surface-dark-lighter hover:bg-surface-hover text-text-muted hover:text-white'
              }`}
              title="Ajustes del mapa"
            >
              <span className="material-symbols-outlined text-lg">settings</span>
            </button>
            {showSettings && <MapSettingsPanel onClose={() => setShowSettings(false)} />}
          </div>

          {/* Volver al dashboard */}
          <Link
            to="/campaigns"
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-surface-dark-lighter hover:bg-surface-hover border border-border-dark text-text-muted hover:text-white transition-colors"
            title="Volver al dashboard"
          >
            <span className="material-symbols-outlined text-lg">logout</span>
          </Link>
        </div>
      </header>

      {showTokenManager && <TokenManager onClose={() => setShowTokenManager(false)} />}
    </>
  );
}

// ─── VTT interior (requiere GameContext montado) ──────────────────────────────

function VttInterior() {
  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-[#0f0e17]">
      <VttHeader />

      <main className="flex-1 relative flex overflow-hidden">
        {/* Mapa central */}
        <div className="flex-1 relative">
          <MapCanvas />
          <ToolBar />
          <MacroBar />
        </div>

        {/* Panel derecho: chat + iniciativa */}
        <ChatPanel />
      </main>
    </div>
  );
}

// ─── Página exportable ────────────────────────────────────────────────────────

export default function VttPage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const { campaigns } = useCampaigns();

  const id = Number(campaignId ?? 0);
  const campaign = campaigns.find((c) => c.id === id);
  const name = campaign?.name ?? `Campaña #${id}`;

  if (!id) {
    return (
      <div className="flex h-screen w-screen bg-background-primary items-center justify-center">
        <p className="text-text-muted">ID de campaña no válido</p>
      </div>
    );
  }

  return (
    <GameProvider campaignId={id} campaignName={name}>
      <VttInterior />
    </GameProvider>
  );
}
