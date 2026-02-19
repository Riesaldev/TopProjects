/**
 * MapCanvas — lienzo interactivo del VTT.
 *
 * Capas (de fondo a frente):
 *  1. <div> con CSS hex-grid (patrón de fondo)
 *  2. <img> de imagen de mapa cargada por el GM
 *  3. <canvas> para dibujar la grilla hexagonal flat-top
 *  4. <TokenLayer /> componentes DOM arrastrables
 *  5. <MapOverlay /> SVG para medición y AOE
 *
 * Interacciones:
 *  - Pan: click+drag sobre fondo (sólo herramienta 'select')
 *  - Zoom: rueda del ratón
 *  - Clic en hex: depende de herramienta activa
 */

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent,
  type WheelEvent,
} from 'react';
import { useGame } from '@/hooks/useGame';
import { hexToPixel, pixelToHex, hexPolygonPoints, hexDistance } from '@/utils/hexMath';
import { FEET_PER_HEX } from '@/utils/hexMath';
import type { PixelCoord, ToolType } from '@/types/game';
import { TokenLayer } from './TokenLayer';
import { MapOverlay } from '../map-tools/MapOverlay';

const MIN_ZOOM = 0.3;
const MAX_ZOOM = 4;

export function MapCanvas() {
  const {
    mapState,
    updateMapState,
    activeTool,
    measurementState,
    setMeasurementState,
    aoeState,
    setAoeState,
    loadMapImage,
  } = useGame();

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Pan drag state
  const isPanning = useRef(false);
  const panStart = useRef<PixelCoord>({ x: 0, y: 0 });

  // ─── Dibujar grilla en canvas ───────────────────────────────────────────

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const W = container.clientWidth;
    const H = container.clientHeight;
    canvas.width = W;
    canvas.height = H;
    ctx.clearRect(0, 0, W, H);

    if (!mapState.showGrid) return;

    const size = mapState.hexSize * mapState.zoom;
    const offsetX = mapState.panX;
    const offsetY = mapState.panY;

    ctx.save();
    ctx.globalAlpha = mapState.gridOpacity;
    ctx.strokeStyle = 'rgba(100, 90, 180, 0.5)';
    ctx.lineWidth = 0.8;

    // Calcular rango de hexágonos visibles
    const qMin = Math.floor((-offsetX - size * 2) / (size * 1.5)) - 1;
    const qMax = Math.ceil((W - offsetX + size * 2) / (size * 1.5)) + 1;
    const rMin = Math.floor((-offsetY - size * 2) / (size * Math.sqrt(3))) - 1;
    const rMax = Math.ceil((H - offsetY + size * 2) / (size * Math.sqrt(3))) + 1;

    for (let q = qMin; q <= qMax; q++) {
      for (let r = rMin; r <= rMax; r++) {
        const raw = hexToPixel(q, r, mapState.hexSize);
        const cx = raw.x * mapState.zoom + offsetX;
        const cy = raw.y * mapState.zoom + offsetY;

        // Only draw if vaguely on screen
        if (cx < -size * 2 || cx > W + size * 2) continue;
        if (cy < -size * 2 || cy > H + size * 2) continue;

        const pts = hexPolygonPoints(cx, cy, size);
        const pts2 = pts.split(' ').map((p) => p.split(',').map(Number));

        ctx.beginPath();
        ctx.moveTo(pts2[0][0], pts2[0][1]);
        for (let i = 1; i < pts2.length; i++) {
          ctx.lineTo(pts2[i][0], pts2[i][1]);
        }
        ctx.closePath();
        ctx.stroke();
      }
    }

    ctx.restore();
  }, [mapState]);

  // Redibuja al redimensionar
  useEffect(() => {
    const ro = new ResizeObserver(() => {
      // Trigger re-render
      updateMapState({});
    });
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, [updateMapState]);

  // ─── Zoom con rueda ────────────────────────────────────────────────────

  const handleWheel = useCallback(
    (e: WheelEvent<HTMLDivElement>) => {
      e.preventDefault();
      const factor = e.deltaY < 0 ? 1.08 : 0.92;
      const newZoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, mapState.zoom * factor));

      // Zoom centrado en el cursor
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cursorX = e.clientX - rect.left;
      const cursorY = e.clientY - rect.top;

      const newPanX = cursorX - (cursorX - mapState.panX) * (newZoom / mapState.zoom);
      const newPanY = cursorY - (cursorY - mapState.panY) * (newZoom / mapState.zoom);

      updateMapState({ zoom: newZoom, panX: newPanX, panY: newPanY });
    },
    [mapState, updateMapState],
  );

  // ─── Pan con drag ──────────────────────────────────────────────────────

  const handleMouseDown = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (activeTool !== 'select') return;
      if (e.button !== 0) return;
      isPanning.current = true;
      panStart.current = { x: e.clientX - mapState.panX, y: e.clientY - mapState.panY };
    },
    [activeTool, mapState.panX, mapState.panY],
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (!isPanning.current) return;
      updateMapState({
        panX: e.clientX - panStart.current.x,
        panY: e.clientY - panStart.current.y,
      });
    },
    [updateMapState],
  );

  const stopPan = useCallback(() => {
    isPanning.current = false;
  }, []);

  // ─── Clic en el mapa para herramientas ────────────────────────────────

  const getMapCoords = useCallback(
    (e: MouseEvent<HTMLDivElement>): PixelCoord => {
      const rect = containerRef.current!.getBoundingClientRect();
      const px = (e.clientX - rect.left - mapState.panX) / mapState.zoom;
      const py = (e.clientY - rect.top - mapState.panY) / mapState.zoom;
      return { x: px, y: py };
    },
    [mapState.panX, mapState.panY, mapState.zoom],
  );

  const getScreenCoords = useCallback(
    (e: MouseEvent<HTMLDivElement>): PixelCoord => {
      const rect = containerRef.current!.getBoundingClientRect();
      return { x: e.clientX - rect.left, y: e.clientY - rect.top };
    },
    [],
  );

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // No clicar si estaba paneando
      if (isPanning.current) return;

      const mapCoords = getMapCoords(e);
      const screenCoords = getScreenCoords(e);

      if (activeTool === 'measure') {
        const hex = pixelToHex(mapCoords.x, mapCoords.y, mapState.hexSize);
        if (!measurementState?.startHex) {
          setMeasurementState({
            startHex: hex,
            endHex: null,
            startPx: screenCoords,
            endPx: null,
            distanceFt: 0,
          });
        } else {
          // Reset al segundo click
          setMeasurementState(null);
        }
      }

      if (activeTool === 'aoe-blast') {
        setAoeState({
          type: 'blast',
          data: { centerPx: mapCoords, radiusFt: 20 },
        });
      }

      if (activeTool === 'aoe-cone') {
        setAoeState({
          type: 'cone',
          data: {
            originPx: mapCoords,
            directionAngle: 0,
            lengthFt: 30,
          },
        });
      }
    },
    [
      activeTool, mapState.hexSize, measurementState,
      setMeasurementState, setAoeState,
      getMapCoords, getScreenCoords,
    ],
  );

  const handleMouseMoveTool = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      // Actualizar extremo de medición al mover
      if (activeTool === 'measure' && measurementState?.startHex) {
        const rect = containerRef.current?.getBoundingClientRect();
        if (!rect) return;
        const mapX = (e.clientX - rect.left - mapState.panX) / mapState.zoom;
        const mapY = (e.clientY - rect.top - mapState.panY) / mapState.zoom;
        const hex = pixelToHex(mapX, mapY, mapState.hexSize);
        const dist = hexDistance(measurementState.startHex, hex);
        const screenCoords = getScreenCoords(e);
        setMeasurementState({
          ...measurementState,
          endHex: hex,
          endPx: screenCoords,
          distanceFt: dist * FEET_PER_HEX,
        });
      }

      // Actualizar dirección del cono
      if (activeTool === 'aoe-cone' && aoeState?.type === 'cone' && aoeState.data.originPx) {
        const mapCoords = getMapCoords(e);
        const dx = mapCoords.x - aoeState.data.originPx.x;
        const dy = mapCoords.y - aoeState.data.originPx.y;
        const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
        setAoeState({
          type: 'cone',
          data: { ...aoeState.data, directionAngle: angle },
        });
      }
    },
    [activeTool, mapState, measurementState, aoeState, setMeasurementState, setAoeState, getMapCoords, getScreenCoords],
  );

  // ─── Cursor según herramienta ──────────────────────────────────────────

  const cursorClass: Record<ToolType, string> = {
    select: isPanning.current ? 'cursor-grabbing' : 'cursor-grab',
    measure: 'cursor-crosshair',
    'aoe-blast': 'cursor-crosshair',
    'aoe-cone': 'cursor-crosshair',
    fog: 'cursor-cell',
    draw: 'cursor-cell',
  };

  // ─── Render ────────────────────────────────────────────────────────────

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden select-none ${cursorClass[activeTool]}`}
      style={{ background: '#0f0e17' }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseMove={(e) => { handleMouseMove(e); handleMouseMoveTool(e); }}
      onMouseUp={stopPan}
      onMouseLeave={stopPan}
      onClick={handleClick}
    >
      {/* Imagen de mapa */}
      {mapState.imageUrl && (
        <img
          src={mapState.imageUrl}
          alt="Mapa de campaña"
          className="absolute inset-0 pointer-events-none"
          style={{
            transform: `translate(${mapState.panX}px, ${mapState.panY}px) scale(${mapState.zoom})`,
            transformOrigin: '0 0',
            opacity: mapState.imageOpacity,
            maxWidth: 'none',
          }}
          draggable={false}
        />
      )}

      {/* Canvas de grilla hex */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: mapState.showGrid ? 1 : 0 }}
      />

      {/* Capa de tokens */}
      <TokenLayer />

      {/* Overlay de herramientas (medición, AOE) */}
      <MapOverlay />

      {/* Drop zone para imagen de mapa */}
      {!mapState.imageUrl && (
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at center, rgba(55,19,236,0.05) 0%, transparent 70%)' }}
        >
          <div className="text-center pointer-events-auto">
            <span className="material-symbols-outlined text-6xl text-border-dark-heavy mb-4 block">
              map
            </span>
            <p className="text-text-muted text-sm mb-4">
              No hay mapa cargado · haz click para añadir
            </p>
            <button
              className="px-4 py-2 bg-surface-dark-lighter border border-border-dark text-text-secondary text-sm rounded-lg hover:bg-surface-hover transition-colors flex items-center gap-2 mx-auto"
              onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
            >
              <span className="material-symbols-outlined text-sm">upload</span>
              Cargar imagen
            </button>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) loadMapImage(file);
        }}
      />
    </div>
  );
}
