import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { Image as ImageIcon, Eye, EyeOff, X, ZoomIn, ZoomOut, RefreshCw, Layers } from 'lucide-react';
import Tools, { ToolMode } from './Tools';
import { hexDistance, offsetRadius, offsetOddQToAxial, axialToOffsetOddQ, wedgeTwoDirArea, DIRECTIONS } from '../utils/hex';

interface HexGridMapProps {
  hexSize?: number;          // radio del hex (distancia del centro a un vértice)
  initialGridOpacity?: number;
  // Futuro: callbacks de interacción si se necesitan
  // onCellClick?: (cell: { q: number; r: number; x: number; y: number }) => void;
  className?: string;
}

interface HexCellDef { q: number; r: number; x: number; y: number; points: string }

// Cálculo de puntos para hex "flat-top" (lado plano arriba). Orden antihorario.
// Ángulos: 0,60,120,180,240,300 grados => lado horizontal superior.
function hexPoints(cx: number, cy: number, size: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i); // flat-top
    const x = cx + size * Math.cos(angle);
    const y = cy + size * Math.sin(angle);
    pts.push(`${x},${y}`);
  }
  return pts.join(' ');
}

const HexGridMap: React.FC<HexGridMapProps> = ({
  hexSize = 40,
  initialGridOpacity = 0.6,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [dims, setDims] = useState({ w: 800, h: 600 });
  const [imageData, setImageData] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [gridOpacity, setGridOpacity] = useState(initialGridOpacity);
  // Eliminamos selección de celdas según nuevo requerimiento
  const [hoverCell, setHoverCell] = useState<string | null>(null);
  // Escalas independientes
  const [imageScale, setImageScale] = useState(1);
  const [gridScale, setGridScale] = useState(1);
  const [imageOpacity, setImageOpacity] = useState(1);

  // Tools state
  const [toolMode, setToolMode] = useState<ToolMode>('none');
  const [measureStart, setMeasureStart] = useState<string | null>(null);
  const [measureEnd, setMeasureEnd] = useState<string | null>(null);
  const [radiusSize, setRadiusSize] = useState(3);
  const [coneLength, setConeLength] = useState(6);
  const [coneDirection, setConeDirection] = useState(0); // derivado del movimiento del ratón

  // Overlay hex sets
  const [radiusCenter, setRadiusCenter] = useState<string | null>(null);
  const [coneOrigin, setConeOrigin] = useState<string | null>(null);
  const [isSettingConeDir, setIsSettingConeDir] = useState(false);

  // Resize observer para ajustar dims a tamaño visible del panel
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new ResizeObserver(entries => {
      for (const e of entries) {
        const cr = e.contentRect;
        setDims({ w: cr.width, h: cr.height });
      }
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const cells = useMemo<HexCellDef[]>(() => {
    // Zoom real: al disminuir gridScale, se reduce el tamaño de cada hex y caben más
    const effectiveSize = hexSize * (1 / gridScale); // Interpretamos gridScale>1 como zoom in (hex más grande), <1 como más pequeño
    const size = effectiveSize;
    const w = size * 2;
    const h = Math.sqrt(3) * size;
    const horiz = 1.5 * size;
    const list: HexCellDef[] = [];

    const cols = Math.ceil(dims.w / horiz) + 2;
    const rows = Math.ceil(dims.h / h) + 2;

    // Límite de seguridad para no generar demasiados polígonos si se hace zoom out extremo
    const MAX_CELLS = 12000;

    for (let q = 0; q < cols && list.length < MAX_CELLS; q++) {
      const columnYOffset = (q % 2 === 1) ? (h / 2) : 0;
      for (let r = 0; r < rows && list.length < MAX_CELLS; r++) {
        const x = q * horiz + size;
        const y = r * h + columnYOffset + size;
        if (x + w / 2 < 0 || x - w / 2 > dims.w || y + h / 2 < 0 || y - h / 2 > dims.h) continue;
        list.push({ q, r, x, y, points: hexPoints(x, y, size) });
      }
    }
    return list;
  }, [dims.w, dims.h, hexSize, gridScale]);

  // Helpers zoom
  const clamp = (v: number) => Math.min(5, Math.max(0.2, v));
  const zoomInImage = () => setImageScale(s => clamp(s * 1.2));
  const zoomOutImage = () => setImageScale(s => clamp(s / 1.2));
  const resetImageZoom = () => setImageScale(1);
  const zoomInGrid = () => setGridScale(s => clamp(s * 1.2));
  const zoomOutGrid = () => setGridScale(s => clamp(s / 1.2));
  const resetGridZoom = () => setGridScale(1);

  const handleUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result as string);
    reader.readAsDataURL(file);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Helpers para encontrar cell bajo mouse (coordenadas aproximadas por proximidad a polígono). Simplificación: usamos bounding boxes.
  const findCellAt = useCallback((clientX: number, clientY: number): HexCellDef | null => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return null;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    // Buscamos la más cercana dentro de un umbral
    let best: HexCellDef | null = null;
    let bestDist = Infinity;
    for (const c of cells) {
      const dx = c.x - x;
      const dy = c.y - y;
      const d2 = dx * dx + dy * dy;
      if (d2 < bestDist) {
        best = c;
        bestDist = d2;
      }
    }
    return best;
  }, [cells]);

  const onMapClick = useCallback((e: React.MouseEvent) => {
    // Solo para modos que usan click simple (measure/radius). Cono usa mousedown.
    if (toolMode === 'none' || toolMode === 'cone') return;
    const cell = findCellAt(e.clientX, e.clientY);
    if (!cell) return;
    const key = `${cell.q},${cell.r}`;
    if (toolMode === 'measure') {
      if (!measureStart || (measureStart && measureEnd)) {
        setMeasureStart(key);
        setMeasureEnd(null);
      } else if (!measureEnd) {
        setMeasureEnd(key);
      }
    } else if (toolMode === 'radius') {
      setRadiusCenter(key);
    }
  }, [toolMode, findCellAt, measureStart, measureEnd]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (toolMode !== 'cone') return;
    const cell = findCellAt(e.clientX, e.clientY);
    if (!cell) return;
    const key = `${cell.q},${cell.r}`;
    setConeOrigin(key);
    setIsSettingConeDir(true);
  }, [toolMode, findCellAt]);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (toolMode !== 'cone' || !isSettingConeDir || !coneOrigin) return;
    const cell = findCellAt(e.clientX, e.clientY);
    if (!cell) return;
    const [oq, or] = coneOrigin.split(',').map(Number);
    const aOrigin = offsetOddQToAxial({ q: oq, r: or });
    const aTarget = offsetOddQToAxial({ q: cell.q, r: cell.r });
    let dq = aTarget.q - aOrigin.q;
    let dr = aTarget.r - aOrigin.r;
    if (dq === 0 && dr === 0) return;
    // Vector hacia el cursor en axial (sin invertir ahora)
    // Queremos elegir el par de direcciones adyacentes (i, i+1) cuya suma vectorial esté más alineada con (dq,dr).
    // Calculamos ángulo objetivo y probamos las 6 parejas.
    const toCartesian = (q: number, r: number) => {
      // Proyección aproximada para flat-top
      const x = q + r / 2;
      const y = (Math.sqrt(3) / 2) * r;
      return { x, y };
    };
    const target = toCartesian(dq, dr);
    const targetAngle = Math.atan2(target.y, target.x);
    let bestIdx = 0;
    let bestDiff = Infinity;
    for (let i = 0; i < 6; i++) {
      const a = DIRECTIONS[i];
      const b = DIRECTIONS[(i + 1) % 6];
      const sum = { q: a.q + b.q, r: a.r + b.r };
      const c = toCartesian(sum.q, sum.r);
      const ang = Math.atan2(c.y, c.x);
      let diff = Math.abs(ang - targetAngle);
      const twoPi = Math.PI * 2;
      if (diff > Math.PI) diff = twoPi - diff;
      if (diff < bestDiff) { bestDiff = diff; bestIdx = i; }
    }
    setConeDirection(bestIdx);
  }, [toolMode, isSettingConeDir, coneOrigin, findCellAt]);

  const onMouseUp = useCallback(() => {
    if (isSettingConeDir) setIsSettingConeDir(false);
  }, [isSettingConeDir]);

  // Calcular overlays
  const measurementFeet = useMemo(() => {
    if (toolMode !== 'measure' || !measureStart || !measureEnd) return null;
    const [q1, r1] = measureStart.split(',').map(Number);
    const [q2, r2] = measureEnd.split(',').map(Number);
    const a1 = offsetOddQToAxial({ q: q1, r: r1 });
    const a2 = offsetOddQToAxial({ q: q2, r: r2 });
    const distHex = hexDistance(a1, a2);
    return distHex * 5; // 5 pies por hex
  }, [toolMode, measureStart, measureEnd]);

  const radiusHexes = useMemo(() => {
    if (toolMode !== 'radius' || !radiusCenter) return new Set<string>();
    const [q, r] = radiusCenter.split(',').map(Number);
    return offsetRadius({ q, r }, radiusSize);
  }, [toolMode, radiusCenter, radiusSize]);

  const coneHexes = useMemo(() => {
    if (toolMode !== 'cone' || !coneOrigin) return new Set<string>();
    const [oq, or] = coneOrigin.split(',').map(Number);
    const aOrigin = offsetOddQToAxial({ q: oq, r: or });
    const axialSet = wedgeTwoDirArea(aOrigin, coneDirection, coneLength);
    return new Set(axialSet.map(a => {
      const o = axialToOffsetOddQ(a);
      return `${o.q},${o.r}`;
    }));
  }, [toolMode, coneOrigin, coneDirection, coneLength]);

  const isOverlay = (key: string): { type: 'measureStart' | 'measureEnd' | 'radius' | 'cone' | null } => {
    if (toolMode === 'measure') {
      if (measureStart === key) return { type: 'measureStart' };
      if (measureEnd === key) return { type: 'measureEnd' };
    }
    if (toolMode === 'radius' && radiusHexes.has(key)) return { type: 'radius' };
    if (toolMode === 'cone' && coneHexes.has(key)) return { type: 'cone' };
    return { type: null };
  };

  const resetToolState = () => {
    setMeasureStart(null);
    setMeasureEnd(null);
    setRadiusCenter(null);
    setConeOrigin(null);
    setIsSettingConeDir(false);
  };

  useEffect(() => {
    // Al cambiar modo limpiar selecciones salvo persistencia por diseño
    resetToolState();
  }, [toolMode]);

  return (
    <div className={`w-full h-full flex flex-col bg-gray-800 ${className}`}>
      {/* Toolbar reorganizada */}
      <div className="flex flex-col gap-3 p-2 text-[11px] bg-gray-900/80 border-b border-gray-700">
        <div className="flex flex-wrap items-start gap-4">
          {/* Bloque Imagen */}
          <div className="flex flex-col gap-1 min-w-[180px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-200">Imagen</span>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-1 px-2 py-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-100"
              >
                <ImageIcon className="w-3 h-3" /> Cargar
              </button>
              {imageData && (
                <button
                  onClick={() => setImageData(null)}
                  className="p-1 rounded bg-gray-700 hover:bg-red-600 text-gray-200"
                  title="Quitar imagen"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-300">Zoom</span>
              <button onClick={zoomOutImage} className="p-1 rounded bg-gray-700 hover:bg-gray-600" title="Zoom - imagen">
                <ZoomOut className="w-3 h-3" />
              </button>
              <button onClick={zoomInImage} className="p-1 rounded bg-gray-700 hover:bg-gray-600" title="Zoom + imagen">
                <ZoomIn className="w-3 h-3" />
              </button>
              <button onClick={resetImageZoom} className="p-1 rounded bg-gray-700 hover:bg-gray-600" title="Reset zoom imagen">
                <RefreshCw className="w-3 h-3" />
              </button>
              <span className="text-gray-400 w-10">x{imageScale.toFixed(2)}</span>
            </div>
            <label className="flex items-center gap-2">
              <span className="text-gray-300">Opac</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={imageOpacity}
                onChange={e => setImageOpacity(parseFloat(e.target.value))}
              />
              <span className="text-gray-400 w-8 tabular-nums text-right">{Math.round(imageOpacity * 100)}%</span>
            </label>
          </div>

          {/* Bloque Grid */}
          <div className="flex flex-col gap-1 min-w-[180px]">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-semibold text-gray-200">Grilla</span>
              <button
                onClick={() => setShowGrid(s => !s)}
                className="p-1 rounded bg-gray-700 hover:bg-gray-600 text-gray-200"
                title="Mostrar/Ocultar grid"
              >
                {showGrid ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
              </button>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-gray-300">Zoom</span>
              <button onClick={zoomOutGrid} className="p-1 rounded bg-gray-700 hover:bg-gray-600" title="Zoom - grilla">
                <ZoomOut className="w-3 h-3" />
              </button>
              <button onClick={zoomInGrid} className="p-1 rounded bg-gray-700 hover:bg-gray-600" title="Zoom + grilla">
                <ZoomIn className="w-3 h-3" />
              </button>
              <button onClick={resetGridZoom} className="p-1 rounded bg-gray-700 hover:bg-gray-600" title="Reset zoom grilla">
                <RefreshCw className="w-3 h-3" />
              </button>
              <span className="text-gray-400 w-10">x{gridScale.toFixed(2)}</span>
            </div>
            <label className="flex items-center gap-2">
              <span className="text-gray-300">Opac</span>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={gridOpacity}
                onChange={e => setGridOpacity(parseFloat(e.target.value))}
              />
              <span className="text-gray-400 w-8 tabular-nums text-right">{Math.round(gridOpacity * 100)}%</span>
            </label>
          </div>

          {/* Bloque Tools */}
          <div className="flex-1 min-w-[260px]">
            <div className="flex items-center gap-2 mb-1">
              <Layers className="w-3 h-3 text-indigo-300" />
              <span className="font-semibold text-gray-200">Herramientas</span>
            </div>
            <Tools
              mode={toolMode}
              onModeChange={setToolMode}
              radiusSize={radiusSize}
              onRadiusChange={setRadiusSize}
              coneLength={coneLength}
              onConeLengthChange={setConeLength}
              measurementFeet={measurementFeet}
            />
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0];
            if (f) handleUpload(f);
          }}
        />
      </div>

      {/* Contenedor mapa */}
      <div
        ref={containerRef}
        className="relative flex-1 overflow-hidden select-none"
        onClick={onMapClick}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        {/* Imagen de fondo */}
        {imageData && (
          <img
            src={imageData}
            alt="map"
            className="absolute inset-0 w-full h-full object-contain pointer-events-none"
            style={{ transform: `scale(${imageScale})`, transformOrigin: 'center center', opacity: imageOpacity }}
          />
        )}

        {/* SVG grid */}
        <div className="absolute inset-0" style={{ pointerEvents: 'none' }}>
          <svg
            width={dims.w}
            height={dims.h}
            style={{
              opacity: showGrid ? gridOpacity : 0,
              transition: 'opacity .2s'
            }}
          >
            {cells.map(cell => {
              const key = `${cell.q},${cell.r}`;
              const isHover = hoverCell === key;
              const overlay = isOverlay(key).type;
              let fill = 'rgba(255,255,255,0.05)';
              let stroke = 'rgba(255,255,255,0.35)';
              if (overlay === 'measureStart') {
                fill = 'rgba(16,185,129,0.55)';
                stroke = 'rgba(16,185,129,0.9)';
              } else if (overlay === 'measureEnd') {
                fill = 'rgba(239,68,68,0.55)';
                stroke = 'rgba(239,68,68,0.9)';
              } else if (overlay === 'radius') {
                fill = 'rgba(99,102,241,0.35)';
                stroke = 'rgba(99,102,241,0.8)';
              } else if (overlay === 'cone') {
                fill = 'rgba(249,115,22,0.35)';
                stroke = 'rgba(249,115,22,0.85)';
              }
              return (
                <polygon
                  key={key}
                  points={cell.points}
                  fill={fill}
                  stroke={stroke}
                  strokeWidth={1}
                  onMouseEnter={() => setHoverCell(key)}
                  onMouseLeave={() => setHoverCell(c => c === key ? null : c)}
                  style={{ cursor: toolMode !== 'none' ? 'crosshair' : 'default', transition: 'fill .12s, stroke .12s' }}
                  opacity={isHover ? 0.9 : 1}
                />
              );
            })}
            {/* Línea de medición */}
            {toolMode === 'measure' && measureStart && measureEnd && (() => {
              const [q1, r1] = measureStart.split(',').map(Number);
              const [q2, r2] = measureEnd.split(',').map(Number);
              const c1 = cells.find(c => c.q === q1 && c.r === r1);
              const c2 = cells.find(c => c.q === q2 && c.r === r2);
              if (!c1 || !c2) return null;
              return (
                <line
                  x1={c1.x}
                  y1={c1.y}
                  x2={c2.x}
                  y2={c2.y}
                  stroke="#10b981"
                  strokeWidth={3}
                  strokeDasharray="6 4"
                />
              );
            })()}
          </svg>
        </div>

        {/* Overlay para debug y selección futura */}
        <div className="absolute bottom-1 left-2 text-[10px] bg-gray-900/60 px-2 py-1 rounded text-gray-300 pointer-events-none flex flex-col gap-0.5">
          <span>Hexágonos: {cells.length} | gridScale: {gridScale.toFixed(2)}</span>
          {toolMode === 'measure' && measurementFeet != null && (
            <span className="text-emerald-300">Dist: {measurementFeet} ft</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default HexGridMap;
