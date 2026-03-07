# Checklist UX - Flujos Criticos

Fecha: 2026-03-06
Alcance: registro, login, compra de tokens, reporte y videollamada.
Objetivo: validar consistencia, claridad y resiliencia en escenarios felices y no felices.

## Criterios Globales (aplican a todos los flujos)

- [x] El usuario entiende objetivo de la pantalla en menos de 5 segundos (titulo + descripcion clara).
- [x] Campos obligatorios y opcionales se distinguen visualmente.
- [x] Validaciones en cliente aparecen cerca del campo y con mensaje accionable.
- [x] Errores de servidor se muestran en lenguaje claro (sin codigos tecnicos).
- [x] Estados de carga muestran feedback visible y bloquean dobles envios.
- [x] Accion exitosa devuelve confirmacion explicita (toast/banner/estado final).
- [x] Flujo es usable con teclado (tab, enter, escape cuando aplique).
- [x] Controles tienen foco visible y contraste suficiente.
- [x] Flujo funciona en mobile (<640), tablet (640-1024) y desktop (>1024).
- [x] CTA principal se mantiene visible sin confusion en todos los breakpoints.

## 1. Registro (`/auth/register`)

- [ ] El formulario indica requisitos de contraseña antes de enviar.
- [ ] Confirmacion de contraseña detecta mismatch en tiempo real.
- [ ] Errores de email existente o datos invalidos no limpian el formulario.
- [ ] En exito, la redireccion o siguiente paso es inmediato y claro.
- [ ] El usuario sabe que cuenta fue creada (mensaje de exito explicito).

Escenarios a probar:

- [ ] Registro valido completo.
- [ ] Email duplicado.
- [ ] Password debil.
- [ ] Perdida de red durante submit.

## 2. Login (`/auth/login`)

- [ ] Mensaje de error diferencia credenciales invalidas vs error de red.
- [ ] El boton de acceso muestra carga durante autenticacion.
- [ ] No hay doble submit al presionar Enter multiples veces.
- [ ] Tras login exitoso, el destino (dashboard/rol) es consistente.
- [ ] La sesion persistida se refleja en navbar/estado autenticado.

Escenarios a probar:

- [ ] Login correcto con usuario normal.
- [ ] Login correcto con admin.
- [ ] Password incorrecta.
- [ ] Token ausente/caducado al refrescar.

## 3. Compra de Tokens (`/tokens/store`, compras dentro de videollamada)

- [ ] El precio, cantidad y total son legibles antes de confirmar.
- [ ] La accion de compra deja claro estado en progreso.
- [ ] En exito se confirma acreditacion de tokens.
- [ ] En fallo se explica como reintentar sin perder contexto.
- [ ] No se permite compra sin usuario autenticado.
- [ ] Si saldo insuficiente, se informa como estado parcial/no bloqueante.

Escenarios a probar:

- [ ] Compra exitosa.
- [ ] Falla backend en registro de compra.
- [ ] Usuario sin token JWT.
- [ ] Intento de compra concurrente (doble click).

## 4. Reporte de Usuario (`/user/reports` + formulario de reporte)

- [ ] Motivo del reporte y campos obligatorios son claros.
- [ ] El usuario recibe confirmacion al crear reporte.
- [ ] El historial muestra estado actualizado (pendiente/resuelto).
- [ ] Cuando cambia a resuelto, aparece feedback de seguimiento.
- [ ] El flujo evita duplicados accidentales.

Escenarios a probar:

- [ ] Creacion de reporte valida.
- [ ] Error de red al enviar.
- [ ] Visualizacion de reporte resuelto.
- [ ] Lista vacia de reportes.

## 5. Videollamada (`/user/video-call`)

- [ ] Controles principales (silenciar/finalizar/reportar) visibles en mobile.
- [ ] Compra de tiempo extra informa resultado exitoso o fallido.
- [ ] Paneles secundarios (juegos/notas/tienda) no bloquean salida en mobile.
- [ ] Mensajes de moderacion distinguen fallo total vs parcial.
- [ ] Finalizacion de llamada confirma recompensa/mision cuando aplica.

Escenarios a probar:

- [ ] Llamada basica completa.
- [ ] Compra de +2 min con saldo suficiente.
- [ ] Compra de +2 min con saldo insuficiente.
- [ ] Speech recognition no soportado.
- [ ] Cierre manual y cierre por timeout.

## Matriz de Ejecucion

| Flujo | QA Manual | Mobile | Tablet | Desktop | Resultado |
| --- | --- | --- | --- | --- | --- |
| Registro | [ ] | [ ] | [ ] | [ ] | Pendiente |
| Login | [ ] | [ ] | [ ] | [ ] | Pendiente |
| Compra tokens | [ ] | [ ] | [ ] | [ ] | Pendiente |
| Reporte | [ ] | [ ] | [ ] | [ ] | Pendiente |
| Videollamada | [ ] | [ ] | [ ] | [ ] | Pendiente |

## Criterio de cierre

- [ ] Todos los escenarios no felices tienen feedback claro y accionable.
- [ ] No existen bloqueos de navegacion por teclado en flujos criticos.
- [ ] No hay desbordes visuales ni CTA ocultos en mobile/tablet.
- [ ] Resultado global de matriz: Aprobado.
