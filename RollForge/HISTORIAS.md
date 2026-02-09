# RollForge – Historias de Usuario

## 🎲 Como Jugador quiero

### HU01: Registrarme en la plataforma

**Como** jugador  
**Quiero** registrarme con email y contraseña  
**Para** acceder a las funcionalidades de la plataforma  

**Criterios de aceptación:**

- ✅ Formulario con username, email y password
- ✅ Validación de email único
- ✅ Hash seguro de contraseña (bcrypt)
- ✅ Confirmación de registro
- ✅ Redirección a login

---

### HU02: Iniciar sesión

**Como** jugador  
**Quiero** hacer login con email o username  
**Para** acceder a mis campañas y personajes  

**Criterios de aceptación:**

- ✅ Login con email O username
- ✅ Generación de token JWT
- ✅ Persistencia de sesión
- ✅ Mensaje de error si credenciales incorrectas

---

### HU03: Recuperar contraseña

**Como** jugador  
**Quiero** recuperar mi contraseña por email  
**Para** acceder nuevamente si la olvido  

**Criterios de aceptación:**

- ✅ Solicitud de código por email
- ✅ Email con código temporal (15 min)
- ✅ Validación del código
- ✅ Reset de contraseña
- ✅ Rate limiting (5 intentos/10 min)

---

### HU04: Crear personaje

**Como** jugador  
**Quiero** crear un personaje para una campaña  
**Para** participar en sesiones de juego  

**Criterios de aceptación:**

- ✅ Nombre del personaje
- ✅ Edición y guardado de la ficha 
- ✅ Imagen/avatar opcional
- ✅ Vinculación a campaña
- ✅ Persistencia en BD

---

### HU05: Ver lista de jugadores online

**Como** jugador  
**Quiero** ver quién está conectado en mi sesión  
**Para** saber quiénes participan  

**Criterios de aceptación:**

- ✅ Lista visual con nombres
- ✅ Colores distintivos elegibles por el usuario
- ✅ Indicador online/offline
- ✅ Badge de GM visible
- ✅ Persistencia en localStorage
- ✅ Actualización en tiempo real (Socket.io

---

### HU06: Medir distancias en el mapa

**Como** jugador  
**Quiero** medir distancias entre dos puntos  
**Para** calcular movimiento y alcance  

**Criterios de aceptación:**

- ✅ Click en hex de inicio
- ✅ Click en hex de destino
- ✅ Línea visual discontinua
- ✅ Distancia en pies (1 hex = 5 ft)
- ✅ Colores diferenciados (inicio verde, fin rojo)
- ✅ Reset al hacer click en otro hex o botón de limpiar
- ✅ Persistencia temporal de la medición hasta nueva acción

---

### HU07: Visualizar áreas radiales

**Como** jugador  
**Quiero** ver áreas circulares (AOE radial)  
**Para** planear hechizos y habilidades de área  

**Criterios de aceptación:**

- ✅ Click para establecer centro
- ✅ Slider para ajustar radio
- ✅ Resaltado de hexágonos afectados
- ✅ Color distintivo (violeta)
- ✅ Indicador de número de hexágonos

---

### HU08: Visualizar áreas cónicas

**Como** jugador  
**Quiero** ver áreas cónicas (120°)  
**Para** usar habilidades direccionales  

**Criterios de aceptación:**

- ✅ Click para fijar origen
- ✅ Orientación dinámica con cursor
- ✅ Ajuste de longitud con slider
- ✅ Aproximación a 6 direcciones base
- ✅ Color distintivo (naranja)

---

## 🎮 Como Game Master quiero

### HU09: Crear campaña

**Como** GM  
**Quiero** crear una nueva campaña  
**Para** organizar sesiones con mis jugadores  

**Criterios de aceptación:**

- ✅ Nombre y descripción
- ✅ Asignación automática como GM
- ✅ Fecha de creación
- ✅ Edición posterior

---

### HU10: Invitar jugadores a campaña

**Como** GM  
**Quiero** invitar jugadores a mi campaña  
**Para** que puedan crear personajes y participar  

**Criterios de aceptación:**

- ⏳ Generación de código de invitación
- ⏳ Link compartible por email o redes
- ⏳ Lista de jugadores invitados
- ⏳ Control de permisos
- ⏳ Opción de revocar invitación
- ⏳ Notificación al jugador invitado
- ⏳ Acceso a campaña tras aceptación de invitación
- ⏳ Acceso al mapa y recursos de campaña para jugadores invitados segun sistema eleguido

---

### HU11: Cargar mapa como imagen

**Como** GM  
**Quiero** subir una imagen como mapa de fondo  
**Para** visualizar el escenario de combate  

**Criterios de aceptación:**

- ✅ Botón de carga de imagen
- ✅ Preview inmediato
- ✅ Opción de eliminar imagen
- ✅ Ajuste object-contain

---

### HU12: Ajustar grilla hexagonal

**Como** GM  
**Quiero** mostrar/ocultar y ajustar la grilla  
**Para** adaptar el mapa a diferentes escalas  

**Criterios de aceptación:**

- ✅ Toggle para mostrar/ocultar grilla
- ✅ Control de opacidad
- ✅ Zoom independiente de grilla e imagen
- ✅ Reset de zoom
- ✅ Contador de hexágonos visible

---

### HU13: Gestionar recursos de campaña

**Como** GM  
**Quiero** subir PDFs, audios e imágenes  
**Para** compartir con mis jugadores  

**Criterios de aceptación:**

- ✅ Upload de archivos (image, audio, pdf)
- ✅ Organización por campaña
- ✅ Listado de recursos
- ✅ Eliminación de recursos
- ⏳ Descarga desde interfaz

---

### HU14: Crear tokens de PNJs

**Como** GM  
**Quiero** crear múltiples tokens para enemigos/NPCs  
**Para** representarlos en el mapa  

**Criterios de aceptación:**

- ✅ Nombre del token
- ✅ Imagen personalizada
- ✅ Sin vinculación obligatoria a personaje
- ⏳ Colocación en mapa
- ⏳ Drag & drop

---

### HU15: Bloquear mapa para jugadores

**Como** GM  
**Quiero** controlar qué pueden ver/hacer los jugadores  
**Para** mantener el control de la sesión  

**Criterios de aceptación:**

- ⏳ Bloqueo de zoom
- ⏳ Bloqueo de pan (arrastre)
- ⏳ Zonas ocultas (fog of war)
- ⏳ Control de visibilidad de tokens
- ⏳ Permisos por jugador

---

## 👥 Como Usuario quiero

### HU16: Personalizar mi avatar

**Como** usuario  
**Quiero** subir un avatar personalizado  
**Para** identificarme visualmente  

**Criterios de aceptación:**

- ⏳ Upload de imagen de perfil
- ⏳ Preview antes de guardar
- ⏳ Compresión automática
- ⏳ Formato circular

---

### HU17: Acceder a documentos externos

**Como** usuario  
**Quiero** ver PDFs de reglas y manuales  
**Para** consultar durante la partida  

**Criterios de aceptación:**

- ⏳ Galería de PDFs
- ⏳ Visor integrado
- ⏳ Búsqueda dentro del PDF
- ⏳ Marcadores

---

### HU18: Guardar estado de partida

**Como** usuario  
**Quiero** que se guarde el estado del mapa y tokens  
**Para** continuar en la próxima sesión  

**Criterios de aceptación:**

- ⏳ Auto-guardado periódico
- ⏳ Guardado manual
- ⏳ Restauración de estado
- ⏳ Historial de versiones
- ⏳ Notificación de guardado exitoso mediante toast o presencia de icono de guardado
- ⏳ Sincronización de estado entre jugadores en tiempo real (Socket.io)
- ⏳ Generacion de la transcripcion de la partida en formato texto o PDF al finalizar la sesión, incluyendo acciones, tiradas de dados y chat relevante

---

### HU19: Tirar dados virtuales

**Como** usuario  
**Quiero** un sistema de tiradas de dados  
**Para** resolver acciones en el juego  

**Criterios de aceptación:**

- ⏳ Dados estándar (d4, d6, d8, d10, d12, d20, d100)
- ⏳ Modificadores (+/-)
- ⏳ Historial de tiradas
- ⏳ Tiradas visibles para todos/privadas GM
- ⏳ Integración con chat para mostrar resultados
- ⏳ Personalización de dados (colores, estilos)
- ⏳ Opción de tirar múltiples dados a la vez
- ⏳ Soporte para tiradas de habilidad (ej: 3d6) y tiradas de ataque (ej: 1d20 + mod)
- ⏳ Animaciones visuales para las tiradas de dados
- ⏳ Sonidos asociados a las tiradas de dados
- ⏳ Opción de guardar tiradas frecuentes como macros para uso rápido

---

### HU20: Chat en tiempo real

**Como** usuario  
**Quiero** chatear con otros jugadores  
**Para** comunicarnos durante la partida  

**Criterios de aceptación:**

- ⏳ Mensajes en tiempo real en grupo o a un usuario especifico(Socket.io)
- ⏳ Mensajes de sistema (acciones)
- ⏳ Historial persistente
- ⏳ Markdown básico
- ⏳ Chat de voz en tiempo real (WebRTC)
- ⏳ Compartir imágenes y recursos en el chat
- ⏳ Notificaciones de nuevos mensajes
- ⏳ Opción de silenciar chat o usuarios específicos

---

## 🎯 Priorización

### Fase 1 - MVP (Completada)

- ✅ HU01: Registro
- ✅ HU02: Login
- ✅ HU03: Recuperación de contraseña
- ✅ HU09: Crear campaña
- ✅ HU04: Crear personaje
- ✅ HU11: Cargar mapa
- ✅ HU12: Grilla hexagonal básica

### Fase 2 - Herramientas de Mapa (Completada)

- ✅ HU06: Medir distancias
- ✅ HU07: Áreas radiales
- ✅ HU08: Áreas cónicas
- ✅ HU05: Lista de jugadores
- ✅ HU13: Recursos de campaña
- ✅ HU14: Tokens básicos

### Fase 3 - Interactividad (En progreso)

- 🚧 Drag & drop de tokens en mapa
- 🚧 Zoom con rueda del ratón
- 🚧 Sistema de iniciativa
- ⏳ HU19: Dados virtuales
- ⏳ HU20: Chat en tiempo real

### Fase 4 - Control GM (Planificado)

- ⏳ HU10: Invitación a campañas
- ⏳ HU15: Bloqueo y permisos
- ⏳ Fog of war
- ⏳ HU18: Guardado de estado

### Fase 5 - Experiencia Completa (Futuro)

- ⏳ HU16: Avatares personalizados
- ⏳ HU17: Visor de PDFs
- ⏳ Hojas de personaje completas
- ⏳ Videollamadas integradas
- ⏳ Galería de assets prediseñados

---

## 📈 Métricas de Éxito

- **Registro:** > 100 usuarios en 3 meses
- **Retención:** > 60% de usuarios activos semanalmente
- **Sesiones:** > 500 sesiones de juego mensuales
- **Tiempo medio:** > 2 horas por sesión
- **NPS:** > 8/10 en satisfacción

---

## 🔑 Leyenda

- ✅ Implementado y funcional
- 🚧 En desarrollo
- ⏳ Planificado
