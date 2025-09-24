import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Componente contenedor que permite arrastrar y redimensionar su contenido.
 * Uso básico:
 * <DraggableResizable initial={{ x: 100, y: 80, w: 320, h: 240 }}>
 *   <MiPanel />
 * </DraggableResizable>
 */
export interface DraggableResizableProps {
  id?: string;
  initial?: { x?: number; y?: number; w?: number; h?: number };
  minWidth?: number;
  minHeight?: number;
  maxWidth?: number;
  maxHeight?: number;
  lockAspectRatio?: boolean;
  onChange?: (state: { x: number; y: number; w: number; h: number }) => void;
  className?: string;
  /** Si true (por defecto) evita que este panel se solape con otros DraggableResizable hermanos */
  collideWithSiblings?: boolean;
  children: React.ReactNode;
}

interface BoxState { x: number; y: number; w: number; h: number }

type ResizeDir = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
const HANDLE_SIZE = 10;

const directionCursors: Record<ResizeDir, string> = {
  n: 'ns-resize', s: 'ns-resize', e: 'ew-resize', w: 'ew-resize',
  ne: 'nesw-resize', sw: 'nesw-resize', nw: 'nwse-resize', se: 'nwse-resize'
};

export const DraggableResizable: React.FC<DraggableResizableProps> = ({
  id,
  initial,
  minWidth = 160,
  minHeight = 100,
  maxWidth = 1200,
  maxHeight = 900,
  lockAspectRatio = false,
  onChange,
  className = '',
  collideWithSiblings = true,
  children
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [box, setBox] = useState<BoxState>(() => {
    if (typeof window !== 'undefined' && id) {
      try {
        const raw = localStorage.getItem(`panel-layout:${id}`);
        if (raw) {
          const parsed = JSON.parse(raw) as Partial<BoxState>;
          if (
            typeof parsed.x === 'number' && typeof parsed.y === 'number' &&
            typeof parsed.w === 'number' && typeof parsed.h === 'number'
          ) {
            return { x: parsed.x, y: parsed.y, w: parsed.w, h: parsed.h };
          }
        }
      } catch { /* ignore */ }
    }
    return {
      x: initial?.x ?? 40,
      y: initial?.y ?? 40,
      w: initial?.w ?? 300,
      h: initial?.h ?? 220,
    };
  });
  const aspect = useRef(box.w / box.h);

  const dragging = useRef(false);
  const resizing = useRef<ResizeDir | null>(null);
  const pointerStart = useRef<{ x: number; y: number; box: BoxState }>({ x: 0, y: 0, box: box });

  useEffect(() => {
    aspect.current = box.w / box.h;
  }, [box.w, box.h]);

  const emitChange = useCallback((next: BoxState) => {
    onChange?.(next);
    // Guardar persistencia
    if (typeof window !== 'undefined' && id) {
      try {
        localStorage.setItem(`panel-layout:${id}`, JSON.stringify(next));
      } catch { /* ignore */ }
    }
  }, [onChange]);

  const onPointerDownDrag = (e: React.PointerEvent) => {
    if (e.button !== 0) return; // solo click izquierdo
    dragging.current = true;
    pointerStart.current = { x: e.clientX, y: e.clientY, box: { ...box } };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerDownResize = (dir: ResizeDir) => (e: React.PointerEvent) => {
    if (e.button !== 0) return;
    resizing.current = dir;
    pointerStart.current = { x: e.clientX, y: e.clientY, box: { ...box } };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.stopPropagation();
  };

  const onPointerMove = (e: PointerEvent) => {
    if (!dragging.current && !resizing.current) return;
    const dx = e.clientX - pointerStart.current.x;
    const dy = e.clientY - pointerStart.current.y;
    let next = { ...pointerStart.current.box };

    if (dragging.current) {
      next.x = pointerStart.current.box.x + dx;
      next.y = pointerStart.current.box.y + dy;
    } else if (resizing.current) {
      const dir = resizing.current;
      if (dir.includes('e')) {
        next.w = pointerStart.current.box.w + dx;
      }
      if (dir.includes('s')) {
        next.h = pointerStart.current.box.h + dy;
      }
      if (dir.includes('w')) {
        next.w = pointerStart.current.box.w - dx;
        next.x = pointerStart.current.box.x + dx;
      }
      if (dir.includes('n')) {
        next.h = pointerStart.current.box.h - dy;
        next.y = pointerStart.current.box.y + dy;
      }

      // Aspect ratio opcional
      if (lockAspectRatio) {
        const ratio = aspect.current;
        if (dir === 'e' || dir === 'w') {
          next.h = next.w / ratio;
        } else if (dir === 'n' || dir === 's') {
          next.w = next.h * ratio;
        } else {
          // esquina: ajustar el más grande para conservar ratio
          const byWidth = next.w / ratio;
          if (byWidth > next.h) {
            next.h = byWidth;
          } else {
            next.w = next.h * ratio;
          }
        }
      }
    }

    // Límites tamaño
    next.w = Math.max(minWidth, Math.min(maxWidth, next.w));
    next.h = Math.max(minHeight, Math.min(maxHeight, next.h));

    // Clamping dentro del contenedor padre (si existe y es posicionable)
    const parentEl = containerRef.current?.parentElement;
    if (parentEl) {
      const parentRect = parentEl.getBoundingClientRect();
      // Usamos bounding del elemento padre relativo a viewport, y asumimos que la posición (x,y) está en coordenadas del mismo flujo
      // Obtenemos top-left del padre para convertir a coords relativas
      // Ajustar x,y para que el panel permanezca dentro: 0 <= x <= parentWidth - w, idem y.
      const maxX = parentRect.width - next.w;
      const maxY = parentRect.height - next.h;
      next.x = Math.min(Math.max(0, next.x), Math.max(0, maxX));
      next.y = Math.min(Math.max(0, next.y), Math.max(0, maxY));
    }

    // Colisiones entre hermanos
    if (collideWithSiblings && containerRef.current) {
      const parent = containerRef.current.parentElement;
      if (parent) {
        const children = Array.from(parent.children) as HTMLElement[];
        for (const el of children) {
          if (el === containerRef.current) continue;
          if (!el.id) continue; // sólo paneles con id
          // Recuperar box del otro panel: preferimos dataset si está, si no, calculamos.
          const ow = el.offsetWidth;
          const oh = el.offsetHeight;
          // Intentar leer translate
          let ox = 0, oy = 0;
          const style = el.style.transform;
          const m = /translate\(([-0-9.]+)px,\s*([-0-9.]+)px\)/.exec(style);
          if (m) {
            ox = parseFloat(m[1]);
            oy = parseFloat(m[2]);
          }
          const overlaps = !(next.x + next.w <= ox || ox + ow <= next.x || next.y + next.h <= oy || oy + oh <= next.y);
          if (overlaps) {
            // Calcular traslapes en cada eje
            const overlapX = next.x < ox ? (next.x + next.w - ox) : (ox + ow - next.x);
            const overlapY = next.y < oy ? (next.y + next.h - oy) : (oy + oh - next.y);
            // Resolver por el eje de menor penetración
            if (overlapX < overlapY) {
              // mover en X
              if (next.x < ox) {
                next.x -= overlapX; // empujar a la izquierda
              } else {
                next.x += overlapX; // a la derecha
              }
            } else {
              if (next.y < oy) {
                next.y -= overlapY; // arriba
              } else {
                next.y += overlapY; // abajo
              }
            }
            // Reaplicar clamping contenedor si existe
            const parentEl2 = containerRef.current.parentElement;
            if (parentEl2) {
              const parentRect2 = parentEl2.getBoundingClientRect();
              const maxX2 = parentRect2.width - next.w;
              const maxY2 = parentRect2.height - next.h;
              next.x = Math.min(Math.max(0, next.x), Math.max(0, maxX2));
              next.y = Math.min(Math.max(0, next.y), Math.max(0, maxY2));
            }
          }
        }
      }
    }

    setBox(next);
    emitChange(next);
  };

  const onPointerUp = () => {
    dragging.current = false;
    resizing.current = null;
  };

  useEffect(() => {
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  });

  return (
    <div
      id={id}
      ref={containerRef}
      className={`absolute select-none ${className}`}
      style={{
        transform: `translate(${box.x}px, ${box.y}px)`,
        width: box.w,
        height: box.h,
        // TODO: z-index dinámico (al hacer focus traer al frente)
      }}
    >
      {/* Barra drag */}
      <div
        onPointerDown={onPointerDownDrag}
        className="cursor-move bg-gray-700/70 hover:bg-gray-700 text-xs px-2 py-1 rounded-t-md flex items-center justify-between"
      >
        <span className="truncate">{id || 'Panel'}</span>
        <span className="text-gray-400">⠿</span>
      </div>

      {/* Contenido */}
      <div className="bg-gray-800 w-full h-[calc(100%-24px)] rounded-b-md overflow-auto">
        {children}
      </div>

      {/* Handles de resize */}
      {(['n', 's', 'e', 'w', 'ne', 'nw', 'se', 'sw'] as ResizeDir[]).map(dir => {
        const size = HANDLE_SIZE;
        const common = 'absolute bg-yellow-500/70 hover:bg-yellow-400 transition-colors';
        const pos: React.CSSProperties = {};
        if (dir.includes('n')) pos.top = -size / 2;
        if (dir.includes('s')) pos.bottom = -size / 2;
        if (dir.includes('w')) pos.left = -size / 2;
        if (dir.includes('e')) pos.right = -size / 2;
        if (!dir.includes('n') && !dir.includes('s')) pos.top = '50%';
        if (!dir.includes('e') && !dir.includes('w')) pos.left = '50%';
        if (pos.top === '50%') pos.transform = 'translateY(-50%)';
        if (pos.left === '50%') pos.transform = (pos.transform ? pos.transform + ' ' : '') + 'translateX(-50%)';

        const isCorner = dir.length === 2;
        return (
          <div
            key={dir}
            onPointerDown={onPointerDownResize(dir)}
            style={{ ...pos, width: size, height: size, cursor: directionCursors[dir], borderRadius: 2 }}
            className={`${common} ${isCorner ? '' : ''}`}
          // TODO: quizas efecto iman al tocarse los common edges.
          />
        );
      })}
    </div>
  );
};

export default DraggableResizable;
