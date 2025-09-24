# RollForge

Aplicación React (Vite + TypeScript + Tailwind) para soporte de tiradas de dados y gestión básica de jugadores.

## Mapa Hexagonal (HexGridMap)

Nuevo componente `HexGridMap` que permite:

- Cargar o quitar una imagen (botón Imagen / ícono X) como mapa de fondo (`object-contain`).
- Mostrar/ocultar la cuadrícula de hexágonos (hex flat-top lado con lado, sin solaparse).
- Ajustar opacidad de la grilla.
- Hacer zoom independiente en la imagen y en la grilla (controles Zoom In/Out/Reset para cada uno).
- Ver recuento de hexágonos (overlay inferior izquierda).

Actualmente la grilla se adapta al tamaño del panel draggable. El tamaño de los hexágonos está fijado (prop `hexSize`, valor por defecto 40). El control de tamaño en la UI está deshabilitado como placeholder para una futura configuración.

### Herramientas de Medición y Áreas

En la misma barra se ha integrado un bloque "Herramientas" con tres modos:

- Medir: Haz click en un hex para punto A y luego en otro para punto B. Se muestra la distancia en pies (1 hex = 5 ft) y se dibuja una línea discontinua.
- Radial: Selecciona el modo y haz click para establecer el centro. Ajusta el radio (en hexes) con el slider; todos los hex resaltados representan el área (cada hex 5 ft). Color violeta.
- Cónica: Haz click para fijar el origen y, sin soltar (o moviendo luego el ratón), orienta el cono de 120° (un tercio de la circunferencia hex: eje central + dos direcciones adyacentes). Sólo ajustas la longitud; la orientación se calcula según la dirección del cursor respecto al origen. Color naranja.

Colores usados (opacos semi-transparentes):

- Inicio medición: verde
- Fin medición: rojo
- Radio: índigo/violeta
- Cono: naranja

Limitaciones actuales:

- Selección de hex se basa en proximidad al centro (no test preciso de polígono) — suficiente para interacción básica.
- Las áreas no se pueden arrastrar todavía; un nuevo click reubica el centro/origen.
- El cono ahora es un wedge fijo de 120° formado por el eje principal y las dos direcciones vecinas. La orientación se determina dinámicamente con el movimiento del ratón (aproximación al ángulo más cercano de las 6 direcciones base).

Próximas mejoras sugeridas:

- Arrastrar mientras se mantiene pulsado para actualizar dinámicamente medida (drag-to-measure).
- Mostrar etiqueta flotante con la distancia sobre la línea.
- Exportar áreas como entidades persistentes (array de hex keys) para guardado/sincronización.
- Mejor algoritmo de cono (calcular por ángulo real y recorte).

Componentes clave:

- `src/components/Tools.tsx` UI de modos y control de longitud del cono.
- `src/utils/hex.ts` utilidades de distancia, radio y funciones `wedgeConeArea` y `directionFromDelta`.

Estados principales añadidos dentro de `HexGridMap`:

```ts
toolMode, measureStart, measureEnd,
radiusSize, radiusCenter,
coneLength, coneDirection, coneOrigin
```

Render de overlays: se colorean los `<polygon>` según pertenencia y se dibuja una `<line>` para medición.

### Integración

En `App.tsx` se añadió:

```tsx
<DraggableResizable id="hex-map" initial={{ x: 720, y: 60, w: 600, h: 500 }}>
  <HexGridMap />
</DraggableResizable>
```

### Próximos pasos sugeridos

- Pan (arrastre) de la imagen y/o la grilla.
- Zoom con rueda del ratón (wheel) y focalización en cursor.
- Ajuste dinámico de `hexSize` con recálculo eficiente (memoization / virtualización).
- Conversión axial/cúbica de coordenadas para pathfinding o alcance.
- Colocar tokens arrastrables anclados al centro de cada hex.
- Snap de entidades y cálculo de rango / AoE.
- Persistencia en `localStorage` de imagen y nivel de zoom.

---

## Lista de Jugadores

Se añadió un contexto `PlayersProvider` y el componente `PlayerList` para mostrar e iniciar sesión de jugadores locales.

Características:

- Alta de jugador escribiendo nombre y opcionalmente marcando GM.
- Evita duplicados por nombre (ignora mayúsculas/minúsculas). Si un nombre ya existe, simplemente se marca online de nuevo.
- Colores asignados automáticamente de una paleta.
- Estado `online/offline` al hacer logout (se conserva el jugador en la lista para histórico local).
- Persistencia en `localStorage` clave `rf_players_v1`.

### Uso rápido

```tsx
// En `App.tsx` ya está envuelto:
<PlayersProvider>
  <App />
</PlayersProvider>

// El panel se muestra como una ventana draggable (PlayerList)
```

### Hooks

```ts
import { usePlayers } from './context/PlayersContext';

const { players, login, logout, setOnline, clearAll } = usePlayers();
```

### Métodos

- `login(name: string, { isGM?: boolean })` agrega o reactiva un jugador.
- `logout(id: string)` marca al jugador como offline.
- `setOnline(id: string, boolean)` fuerza estado.
- `clearAll()` limpia la lista local.

### Extensiones futuras sugeridas

- Integración con WebSocket para presencia en tiempo real.
- Distinción de sesiones vs. jugadores (eliminar jugadores inactivos tras X tiempo).
- Añadir avatar / token.
- Filtro sólo jugadores online.

## Desarrollo

Instalar dependencias y ejecutar:

```bash
npm install
npm run dev
```

Build de producción:

```bash
npm run build
```

---

Licencia: MIT (añadir archivo LICENSE si se requiere).

## TODO

- [ ] Implementar registro con imagen token del personaje, si es el GM podra asignar mas de un token para diferentes pnjs(borrar,agregar,sacar).
- [ ] zoom con rueda del ratón en HexGridMap. Candado para bloquear/desbloquear los zooms.
- [ ] Menú de opciones al estar "logueado" para personalizar color/avatar.
- [ ] Poder arrastrar el nombre del jugador para reordenar la lista y para colocar token en el mapa.
- [ ] Colocar tiradas de iniciativa de los personajes en el mapa y listar el orden de actuación.
- [ ] Como GM, poder bloquear el mapa para que los jugadores no puedan moverlo o hacer zoom (o zonas oscuras), colocar tokens de criaturas en el mapa y en la lista de iniciativa, y que los jugadores solo puedan mover sus propios tokens.
- [ ] Guardar el estado de la partida en localStorage o backend, poder acceder a diferentes partidas iniciadas.
- [ ] Como GM, tener acceso a un sistema de carpetas donde guardar mapas, personajes y plantillas de tiradas.
- [ ] areas lineales.
- [ ] Como usuario, poder acceder a una galería de documentos externos para usar como respaldo (PDFs disponibles en [Google Drive](https://drive.google.com/drive/folders/1nOvrMp_12WS0SOxtbLuo-AAL7YgMV19N) o propios subidos a la app).
- [ ] Como GM, tener acceso a imágenes prediseñadas de mapas y tokens para usar en las partidas.
