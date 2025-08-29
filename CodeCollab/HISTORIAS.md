# CodeCollab - Historias de Usuario

## 👤 Como Candidato quiero

### HU01: Unirme fácilmente a una entrevista

- Como candidato quiero poder unirme a una sala de entrevista usando un código simple
- Para no tener que crear una cuenta o recordar credenciales
- **Criterios de aceptación:**
  - Campo para ingresar código de 6 caracteres
  - Validación en tiempo real del código
  - Mensaje claro si el código es inválido o ha expirado
  - Redirección automática a la sala al ingresar código válido

### HU02: Ver y editar código en tiempo real

- Como candidato quiero ver los cambios que hace el entrevistador en el código
- Para poder colaborar efectivamente durante la entrevista
- **Criterios de aceptación:**
  - Sincronización en menos de 100ms
  - Resaltado de sintaxis según lenguaje
  - Indicador visual de quien está editando
  - Funcionamiento offline con reconexión automática

### HU03: Comunicarme durante la entrevista

- Como candidato quiero poder hablar y chatear con el entrevistador
- Para resolver dudas y recibir indicaciones
- **Criterios de aceptación:**
  - Audio y video de calidad aceptable
  - Chat de texto persistente durante la sesión
  - Indicador de conexión estable
  - Opción de mute/desactivar video

### HU04: Recibir ejercicios claros

- Como candidato quiero ver el enunciado del ejercicio claramente
- Para entender lo que debo resolver
- **Criterios de aceptación:**
  - Panel dedicado para instrucciones
  - Formato legible (markdown compatible)
  - Ejemplos de input/output cuando aplique
  - Tiempo estimado de solución visible

### HU05: Guardar mi progreso

- Como candidato quiero que mi trabajo se guarde automáticamente
- Para no preocuparme por pérdida de datos
- **Criterios de aceptación:**
  - Auto-guardado cada 30 segundos
  - Indicador de estado de guardado
  - Recuperación de contenido después de desconexión
  - Historial de cambios accesible

## 👨‍💼 Como Entrevistador quiero

### HU06: Crear y programar entrevistas

- Como entrevistador quiero crear salas de entrevista
- Para organizar mis sesiones de evaluación
- **Criterios de aceptación:**
  - Formulario simple de creación
  - Generación automática de código único
  - Opción de programar fecha/hora
  - Campos para notas internas

### HU07: Gestionar ejercicios

- Como entrevistador quiero crear y seleccionar ejercicios
- Para evaluar diferentes habilidades técnicas
- **Criterios de aceptación:**
  - Editor de ejercicios con múltiples lenguajes
  - Biblioteca de ejercicios predefinidos
  - Búsqueda y filtrado por dificultad/tema
  - Posibilidad de crear ejercicios personalizados

### HU08: Evaluar candidatos en tiempo real

- Como entrevistador quiero tomar notas durante la entrevista
- Para documentar el desempeño del candidato
- **Criterios de aceptación:**
  - Panel de evaluación lateral
  - Rúbricas predefinidas y personalizables
  - Marcado de habilidades evaluadas
  - Guardado automático de notas

### HU09: Controlar el ambiente de entrevista

- Como entrevistador quiero gestionar la sesión
- Para mantener el control de la evaluación
- **Criterios de aceptación:**
  - Botones de inicio/pausa/finalizar entrevista
  - Control de temporizador visible
  - Opción de cambiar ejercicios durante la sesión
  - Capacidad de resetear el editor de código

### HU10: Revisar entrevistas pasadas

- Como entrevistador quiero acceder al historial
- Para comparar candidatos y tomar decisiones
- **Criterios de aceptación:**
  - Listado de entrevistas completadas
  - Filtros por fecha/candidato/resultado
  - Visualización de código final y notas
  - Exportación de datos en formatos comunes

## 👨‍💻 Como Administrador quiero

### HU11: Gestionar usuarios y permisos

- Como administrador quiero gestionar cuentas de entrevistadores
- Para mantener la seguridad de la plataforma
- **Criterios de aceptación:**
  - Panel de administración de usuarios
  - Asignación y revocación de roles
  - Reset de contraseñas
  - Auditoría de accesos

### HU12: Monitorear el rendimiento del sistema

- Como administrador quiero ver métricas de uso
- Para garantizar la estabilidad de la plataforma
- **Criterios de aceptación:**
  - Dashboard con estadísticas de uso
  - Monitoreo de salas activas
  - Logs de errores y rendimiento
  - Alertas de capacidad

### HU13: Gestionar la biblioteca de ejercicios

- Como administrador quiero curar ejercicios públicos
- Para mantener la calidad de las evaluaciones
- **Criterios de aceptación:**
  - Aprobación/rechazo de ejercicios enviados
  - Categorización y etiquetado consistente
  - Control de versiones de ejercicios
  - Estadísticas de uso por ejercicio

### HU14: Configurar la plataforma

- Como administrador quiero ajustar configuraciones
- Para adaptar la plataforma a necesidades específicas
- **Criterios de aceptación:**
  - Configuración de lenguajes disponibles
  - Límites de tiempo personalizables
  - Plantillas de evaluación configurables
  - Branding personalizable

## 🎯 Priorización

### Fase 1 (MVP - 2 semanas)

- HU01: Unirme fácilmente a una entrevista
- HU02: Ver y editar código en tiempo real  
- HU03: Comunicarme durante la entrevista (solo chat inicial)
- HU06: Crear y programar entrevistas
- HU07: Gestionar ejercicios (solo selección)

### Fase 2 (Funcionalidades completas - 1.5 semanas)

- HU04: Recibir ejercicios claros
- HU05: Guardar mi progreso
- HU08: Evaluar candidatos en tiempo real
- HU09: Controlar el ambiente de entrevista
- HU10: Revisar entrevistas pasadas
- HU03: Comunicarme (completar con video/audio)

### Fase 3 (Admin & Mejoras - 1 semana)

- HU11: Gestionar usuarios y permisos
- HU12: Monitorear el rendimiento del sistema
- HU13: Gestionar la biblioteca de ejercicios
- HU14: Configurar la plataforma
- Mejoras de UX y rendimiento

## 📊 Métricas de Éxito

- ✅ Tiempo de creación de sala < 30 segundos
- ✅ Latencia de sincronización de código < 100ms
- ✅ Tasa de finalización de entrevistas > 95%
- ✅ Satisfacción usuaria > 4.5/5 estrellas
- ✅ Uptime > 99.5%
