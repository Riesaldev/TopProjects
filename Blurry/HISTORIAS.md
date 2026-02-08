# Blurry - Historias de Usuario

## 👤 Como Usuario quiero

### HU01: Registrarme en la plataforma

**Como** usuario nuevo  
**Quiero** registrarme con email y contraseña  
**Para** crear mi perfil y comenzar a conocer personas  

**Criterios de aceptación:**

- ✅ Formulario con nombre, email y contraseña
- ✅ Validación de email único
- ✅ Hash seguro de contraseña (bcrypt)
- ✅ Confirmación de registro
- ✅ Redirección a completar perfil

---

### HU02: Completar mi perfil

**Como** usuario registrado  
**Quiero** completar mi perfil con información personal e intereses  
**Para** que el algoritmo me muestre coincidencias compatibles  

**Criterios de aceptación:**

- ✅ Formulario multi-paso con validación
- ✅ Campos: edad, género, bio, intereses, fotos
- ✅ Carga de hasta 6 fotos
- ✅ Selección de preferencias de matching
- ✅ Vista previa del perfil

---

### HU03: Descubrir perfiles compatibles

**Como** usuario  
**Quiero** ver perfiles de personas compatibles  
**Para** decidir si me gustan o no  

**Criterios de aceptación:**

- ✅ Vista de tarjetas con perfiles sugeridos
- ✅ Swipe para like/dislike
- ✅ Información básica visible (fotos, edad, bio)
- ✅ Algoritmo de compatibilidad
- ✅ Indicador de tokens disponibles

---

### HU04: Hacer match con alguien

**Como** usuario  
**Quiero** ser notificado cuando hago match con alguien  
**Para** comenzar a conversar  

**Criterios de aceptación:**

- ✅ Notificación en tiempo real de match
- ✅ Animación/modal de celebración
- ✅ Botón para ir al chat
- ✅ Historial de matches en perfil
- ✅ Opción de deshacer match

---

### HU05: Chatear con mis matches

**Como** usuario con matches  
**Quiero** chatear en tiempo real  
**Para** conocer mejor a la persona  

**Criterios de aceptación:**

- ✅ Lista de conversaciones activas
- ✅ Mensajes en tiempo real (WebSockets)
- ✅ Indicador de "escribiendo..."
- ✅ Timestamp de mensajes
- ✅ Notificaciones de mensajes nuevos

---

### HU06: Realizar videollamadas

**Como** usuario con match  
**Quiero** hacer videollamadas  
**Para** tener una conversación cara a cara  

**Criterios de aceptación:**

- ✅ Botón de videollamada en chat
- ✅ Integración WebRTC
- ✅ Controles de audio/video
- ✅ Opción de finalizar llamada
- ✅ Notificación de llamada entrante

---

### HU07: Jugar con mis matches

**Como** usuario con match  
**Quiero** jugar juegos interactivos o test de compatibilidad
**Para** fortalecer la conexión y divertirme  

**Criterios de aceptación:**

- ✅ Selección de juegos disponibles o test de compatibilidad
- ✅ Invitación a jugar desde el chat
- ✅ Notificaciones de invitación
- ✅ Resultados y recompensas en tokens
- ✅ Historial de juegos jugados

---

### HU07: Gestionar mis tokens

**Como** usuario  
**Quiero** ver y ganar tokens  
**Para** desbloquear funciones premium  

**Criterios de aceptación:**

- ✅ Balance de tokens visible
- ✅ Sistema de recompensas diarias
- ✅ Historial de transacciones
- ✅ Tienda de tokens
- ✅ Uso de tokens para boosts/super likes

---

### HU08: Reportar usuarios

**Como** usuario  
**Quiero** reportar comportamiento inapropiado  
**Para** mantener la comunidad segura  

**Criterios de aceptación:**

- ✅ Botón de reporte en perfiles
- ✅ Formulario con categorías
- ✅ Campo de descripción opcional
- ✅ Confirmación de envío
- ✅ Opción de bloquear usuario

---

### HU09: Editar mi perfil

**Como** usuario  
**Quiero** editar mi información de perfil  
**Para** mantenerla actualizada  

**Criterios de aceptación:**

- ✅ Formulario pre-rellenado con datos actuales
- ✅ Validación de cambios
- ✅ Actualización en tiempo real
- ✅ Confirmación de guardado
- ✅ Opción de cambiar contraseña

---

### HU10: Ver mis estadísticas

**Como** usuario  
**Quiero** ver mis estadísticas de actividad  
**Para** entender mi desempeño en la plataforma  

**Criterios de aceptación:**

- ✅ Número de matches totales
- ✅ Tasa de respuesta
- ✅ Visitas al perfil
- ✅ Gráficos de actividad
- ✅ Comparativa con promedios

---

## 👨‍💼 Como Administrador quiero

### HU11: Ver dashboard administrativo

**Como** administrador  
**Quiero** ver métricas generales de la plataforma  
**Para** monitorear el estado del sistema  

**Criterios de aceptación:**

- ✅ Métricas clave (usuarios activos, matches, reportes)
- ✅ Gráficos de crecimiento
- ✅ Alertas de sistema
- ✅ Estadísticas en tiempo real
- ✅ Filtros de fecha

---

### HU12: Gestionar usuarios

**Como** administrador  
**Quiero** buscar, ver y moderar usuarios  
**Para** mantener la calidad de la plataforma  

**Criterios de aceptación:**

- ✅ Búsqueda de usuarios por filtros
- ✅ Vista detallada de perfiles
- ✅ Opciones de suspender/banear
- ✅ Edición manual de información
- ✅ Historial de acciones del usuario

---

### HU13: Revisar reportes

**Como** administrador  
**Quiero** revisar reportes de usuarios  
**Para** tomar acciones de moderación  

**Criterios de aceptación:**

- ✅ Lista de reportes pendientes
- ✅ Filtros por categoría/estado
- ✅ Vista detallada del reporte
- ✅ Acciones: aprobar/rechazar/investigar
- ✅ Historial de moderación

---

### HU14: Gestionar tokens del sistema

**Como** administrador  
**Quiero** configurar precios y promociones de tokens  
**Para** optimizar la monetización  

**Criterios de aceptación:**

- ✅ Panel de configuración de precios
- ✅ Creación de promociones
- ✅ Asignación manual de tokens
- ✅ Estadísticas de ventas
- ✅ Ajuste de recompensas

---

### HU15: Monitorear el chat

**Como** administrador  
**Quiero** revisar conversaciones reportadas  
**Para** detectar comportamiento inapropiado  

**Criterios de aceptación:**

- ✅ Acceso a chats reportados
- ✅ Búsqueda por palabras clave
- ✅ Herramientas de moderación
- ✅ Sistema de alertas automáticas
- ✅ Registro de acciones tomadas

---

## 🔧 Como Sistema quiero

### HU16: Algoritmo de matching inteligente

**Como** sistema  
**Quiero** calcular compatibilidad entre usuarios  
**Para** sugerir matches relevantes  

**Criterios de aceptación:**

- ✅ Análisis de preferencias
- ✅ Scoring de compatibilidad
- ✅ Machine Learning para mejorar sugerencias
- ✅ Cache de resultados
- ✅ Actualización periódica

---

### HU17: Sistema de notificaciones

**Como** sistema  
**Quiero** enviar notificaciones en tiempo real  
**Para** mantener a los usuarios informados  

**Criterios de aceptación:**

- ✅ Notificaciones push
- ✅ Notificaciones en app
- ✅ Email notifications
- ✅ Configuración por usuario
- ✅ Queue de procesamiento

---

### HU18: Backup y seguridad

**Como** sistema  
**Quiero** realizar backups automáticos  
**Para** proteger los datos de usuarios  

**Criterios de aceptación:**

- ✅ Backup diario automático
- ✅ Encriptación de datos sensibles
- ✅ Logs de auditoría
- ✅ Plan de recuperación
- ✅ Monitoreo de seguridad
