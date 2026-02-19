/**
 * MapOverlay — SVG overlay para herramientas de medición y AOE.
 * Posicionado sobre el canvas, no bloquea eventos del mapa (pointer-events-none)
 * excepto en las propias formas de AOE cuando corresponda.
 */

import { useGame } from '@/hooks/useGame';
import {
  hexToPixel,
  hexesInBlast,
  hexesInCone,
  hexPolygonPoints,
} from '@/utils/hexMath';

export function MapOverlay() {
  const { mapState, measurementState, aoeState } = useGame();
  const { zoom, panX, panY, hexSize } = mapState;

  const toScreen = (mapX: number, mapY: number) => ({
    x: mapX * zoom + panX,
    y: mapY * zoom + panY,
  });

  return (
    <svg
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    >
      {/* ── Medición de distancia ─────────────────────────────────────── */}
      {measurementState?.startPx && (
        <>
          {/* Punto de inicio */}
          <circle
            cx={measurementState.startPx.x}
            cy={measurementState.startPx.y}
            r={6}
            fill="#10b981"
            stroke="#fff"
            strokeWidth={1.5}
          />

          {/* Línea discontinua hasta el cursor */}
          {measurementState.endPx && (
            <line
              x1={measurementState.startPx.x}
              y1={measurementState.startPx.y}
              x2={measurementState.endPx.x}
              y2={measurementState.endPx.y}
              stroke="#10b981"
              strokeWidth={2}
              strokeDasharray="6 4"
              opacity={0.9}
            />
          )}

          {/* Punto final */}
          {measurementState.endPx && (
            <>
              <circle
                cx={measurementState.endPx.x}
                cy={measurementState.endPx.y}
                r={6}
                fill="#ef4444"
                stroke="#fff"
                strokeWidth={1.5}
              />
              {/* Etiqueta de distancia */}
              <g transform={`translate(${(measurementState.startPx.x + measurementState.endPx.x) / 2},${(measurementState.startPx.y + measurementState.endPx.y) / 2 - 14})`}>
                <rect x={-28} y={-12} width={56} height={20} rx={4} fill="rgba(18,17,24,0.9)" stroke="#2b2839" strokeWidth={1} />
                <text textAnchor="middle" dy="4" fill="#10b981" fontSize={11} fontWeight="bold" fontFamily="monospace">
                  {measurementState.distanceFt} ft
                </text>
              </g>
            </>
          )}
        </>
      )}

      {/* ── AOE Blast (radial) ────────────────────────────────────────── */}
      {aoeState?.type === 'blast' && aoeState.data.centerPx && (() => {
        const center = aoeState.data.centerPx!;
        const hexes = hexesInBlast(center, aoeState.data.radiusFt, hexSize);
        return (
          <>
            {hexes.map((hex) => {
              const raw = hexToPixel(hex.q, hex.r, hexSize);
              const sc = toScreen(raw.x, raw.y);
              const pts = hexPolygonPoints(sc.x, sc.y, hexSize * zoom);
              return (
                <polygon
                  key={`${hex.q},${hex.r}`}
                  points={pts}
                  fill="rgba(139,92,246,0.25)"
                  stroke="rgba(139,92,246,0.6)"
                  strokeWidth={0.8}
                />
              );
            })}
            {/* Centro */}
            <circle
              cx={center.x * zoom + panX}
              cy={center.y * zoom + panY}
              r={5}
              fill="#8b5cf6"
              stroke="#fff"
              strokeWidth={1.5}
            />
            {/* Etiqueta */}
            <g transform={`translate(${center.x * zoom + panX},${center.y * zoom + panY - 20})`}>
              <rect x={-32} y={-12} width={64} height={20} rx={4} fill="rgba(18,17,24,0.9)" stroke="#2b2839" strokeWidth={1} />
              <text textAnchor="middle" dy="4" fill="#8b5cf6" fontSize={11} fontWeight="bold" fontFamily="monospace">
                r={aoeState.data.radiusFt} ft
              </text>
            </g>
          </>
        );
      })()}

      {/* ── AOE Cono ─────────────────────────────────────────────────── */}
      {aoeState?.type === 'cone' && aoeState.data.originPx && (() => {
        const origin = aoeState.data.originPx!;
        const hexes = hexesInCone(
          origin,
          aoeState.data.directionAngle,
          aoeState.data.lengthFt,
          hexSize,
        );
        return (
          <>
            {hexes.map((hex) => {
              const raw = hexToPixel(hex.q, hex.r, hexSize);
              const sc = toScreen(raw.x, raw.y);
              const pts = hexPolygonPoints(sc.x, sc.y, hexSize * zoom);
              return (
                <polygon
                  key={`${hex.q},${hex.r}`}
                  points={pts}
                  fill="rgba(245,158,11,0.25)"
                  stroke="rgba(245,158,11,0.6)"
                  strokeWidth={0.8}
                />
              );
            })}
            {/* Origen */}
            <circle
              cx={origin.x * zoom + panX}
              cy={origin.y * zoom + panY}
              r={5}
              fill="#f59e0b"
              stroke="#fff"
              strokeWidth={1.5}
            />
          </>
        );
      })()}
    </svg>
  );
}
