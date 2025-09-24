# DraggableResizable (Panel Movible y Redimensionable)

Componente contenedor para envolver otros componentes y permitir moverlos y cambiar su tamaño libremente dentro de la ventana.

## Uso básico

```tsx
import DraggableResizable from './components/DraggableResizable';

<DraggableResizable
  id="mi-panel"
  initial={{ x: 80, y: 120, w: 400, h: 300 }}
  minWidth={200}
  minHeight={120}
  onChange={(s) => console.log('nuevo estado', s)}
>
  <MiContenido />
</DraggableResizable>
```

## Props

- `id?: string` Identificador (también visible en la barra superior).
- `initial?: { x?: number; y?: number; w?: number; h?: number }` Posición y tamaño inicial.
- `minWidth`, `minHeight`, `maxWidth`, `maxHeight` Límites de tamaño.
- `lockAspectRatio?: boolean` Mantiene la proporción inicial al redimensionar.
- `onChange?: (state) => void` Callback en cada cambio (drag o resize) con `{ x, y, w, h }`.
- `className?: string` Clases extra para el contenedor externo.

## Notas

- Usa Pointer Events para soportar mouse y táctil.
- El contenedor se posiciona con `transform: translate(x,y)` para rendimiento.
- Los handles de redimensionado están en bordes y esquinas (amarillo).

## Mejoras futuras sugeridas

- Snapping a una grilla.
- Persistencia en localStorage.
- Restricción dentro de un contenedor padre.
- Modo de maximizar/restaurar.
