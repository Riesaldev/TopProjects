/**
 * TokenLayer — tokens DOM arrastrables sobre el mapa.
 * Cada token es un div absolutamente posicionado con drag nativo.
 */

import { useRef, useCallback, type PointerEvent } from 'react';
import { useGame } from '@/hooks/useGame';
import type { Token } from '@/types/game';
import { pixelToHex, hexRound, hexToPixel } from '@/utils/hexMath';

interface TokenDragState {
  tokenId: string;
  offsetX: number;
  offsetY: number;
}

function TokenItem({
  token,
  zoom,
  panX,
  panY,
  hexSize,
  onDragEnd,
}: {
  token: Token;
  zoom: number;
  panX: number;
  panY: number;
  hexSize: number;
  onDragEnd: (id: string, x: number, y: number) => void;
}) {
  const dragRef = useRef<TokenDragState | null>(null);

  // Posición en pantalla
  const screenX = token.x * zoom + panX;
  const screenY = token.y * zoom + panY;
  const radius = Math.max(20, 28 * zoom);
  const hpPct = token.maxHp > 0 ? (token.hp / token.maxHp) * 100 : 100;
  const hpColor = hpPct > 50 ? '#10b981' : hpPct > 25 ? '#f59e0b' : '#ef4444';

  // Circunferencia del anillo de HP
  const svgR = radius + 3;
  const circumference = 2 * Math.PI * svgR;
  const dashOffset = circumference * (1 - hpPct / 100);

  /** Convierte coords de pantalla a mapa, luego snappea al centro del hex más cercano */
  const snapToHex = useCallback(
    (screenX: number, screenY: number): { x: number; y: number } => {
      const mapX = (screenX - panX) / zoom;
      const mapY = (screenY - panY) / zoom;
      const { q: fq, r: fr } = pixelToHex(mapX, mapY, hexSize);
      const { q, r } = hexRound(fq, fr);
      return hexToPixel(q, r, hexSize);
    },
    [zoom, panX, panY, hexSize],
  );

  const handlePointerDown = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.stopPropagation();
      e.currentTarget.setPointerCapture(e.pointerId);
      dragRef.current = {
        tokenId: token.id,
        offsetX: e.clientX - screenX,
        offsetY: e.clientY - screenY,
      };
    },
    [token.id, screenX, screenY],
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      if (!dragRef.current) return;
      e.stopPropagation();
      // rawScreen* apunta al centro del token
      const rawScreenX = e.clientX - dragRef.current.offsetX;
      const rawScreenY = e.clientY - dragRef.current.offsetY;
      const snapped = snapToHex(rawScreenX, rawScreenY);
      onDragEnd(token.id, snapped.x, snapped.y);
    },
    [token.id, snapToHex, onDragEnd],
  );

  const handlePointerUp = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      dragRef.current = null;
    },
    [],
  );

  return (
    <div
      className="absolute group"
      style={{
        left: screenX - radius,
        top: screenY - radius,
        width: radius * 2,
        height: radius * 2,
        touchAction: 'none',
        zIndex: 10,
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/* Anillo de HP */}
      <svg
        className="absolute inset-0 pointer-events-none"
        width={radius * 2 + 8}
        height={radius * 2 + 8}
        style={{ left: -4, top: -4 }}
        viewBox={`0 0 ${(radius + 4) * 2} ${(radius + 4) * 2}`}
      >
        {/* Track del anillo */}
        <circle
          cx={radius + 4}
          cy={radius + 4}
          r={svgR}
          fill="none"
          stroke="rgba(0,0,0,0.5)"
          strokeWidth={2.5}
        />
        {/* Progreso de HP */}
        <circle
          cx={radius + 4}
          cy={radius + 4}
          r={svgR}
          fill="none"
          stroke={hpColor}
          strokeWidth={2.5}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${radius + 4} ${radius + 4})`}
          style={{ transition: 'stroke-dashoffset 0.3s, stroke 0.3s' }}
        />
      </svg>

      {/* Avatar circular */}
      <div
        className="w-full h-full rounded-full overflow-hidden border-2 cursor-move transition-transform hover:scale-110"
        style={{
          borderColor: token.color,
          boxShadow: `0 0 10px ${token.color}60`,
        }}
      >
        {token.image ? (
          <img src={token.image} alt={token.name} className="w-full h-full object-cover" draggable={false} />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center font-bold text-white text-sm"
            style={{ background: `${token.color}40` }}
          >
            {token.name.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      {/* Etiqueta de nombre */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -bottom-6 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-bold border"
        style={{
          background: 'rgba(18,17,24,0.9)',
          borderColor: token.isEnemy ? '#ef444440' : '#3713ec40',
          color: token.isEnemy ? '#fca5a5' : '#e5e7eb',
        }}
      >
        {token.name}
      </div>

      {/* Indicadores de condición */}
      {token.conditions.length > 0 && (
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-accent-yellow rounded-full flex items-center justify-center text-[8px] font-bold text-black">
          {token.conditions.length}
        </div>
      )}
    </div>
  );
}

export function TokenLayer() {
  const { tokens, moveToken, mapState } = useGame();

  return (
    <div className="absolute inset-0 pointer-events-none">
      {tokens.map((token) => (
        <div key={token.id} className="pointer-events-auto">
          <TokenItem
            token={token}
            zoom={mapState.zoom}
            panX={mapState.panX}
            panY={mapState.panY}
            hexSize={mapState.hexSize}
            onDragEnd={moveToken}
          />
        </div>
      ))}
    </div>
  );
}
