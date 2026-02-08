# API Routes - Temporary File-based Implementation

## Estado Actual

Se han creado rutas temporales que leen datos desde archivos JSON locales para evitar errores 404 y 401 mientras se configura el backend NestJS.

### Archivos de datos creados:
- `data/sanctions.json` - Datos de sanciones
- `data/services.json` - Estado de servicios
- `data/tokens.json` - Transacciones de tokens
- `data/matches.json` - Datos de matches
- `data/reports.json` - Reportes de usuarios
- `data/users.json` - Datos de usuarios

### Rutas modificadas:
- `/api/sanctions` - Implementado con manejo de errores
- `/api/services` - Implementado con manejo de errores
- `/api/tokens` - Cambiado de proxy a archivo local
- `/api/matches` - Cambiado de proxy a archivo local
- `/api/reports` - Cambiado de proxy a archivo local
- `/api/users` - Cambiado de proxy a archivo local

## Para restaurar el backend

Cuando el servidor NestJS esté completamente configurado y funcionando:

1. **Verificar que el servidor NestJS esté corriendo**: `npm run dev` en la carpeta Server
2. **Configurar autenticación**: Asegurarse de que los tokens JWT funcionen correctamente
3. **Restaurar rutas de proxy**: Revertir los archivos `route.ts` para usar `proxyRequest` nuevamente

### Ejemplo de restauración para `/api/tokens/route.ts`:
```typescript
import { NextRequest } from "next/server";
import { proxyRequest } from "../_proxy";

export async function GET(req: NextRequest) {
  return proxyRequest(req, "/tokens");
}

export async function POST(req: NextRequest) {
  return proxyRequest(req, "/tokens");
}
```

## Estado del servidor

- **Backend NestJS**: Ejecutándose en puerto 3001
- **Base de datos MySQL**: Configurada y conectada
- **Problema principal**: Las rutas requieren autenticación JWT que no está configurada en el frontend

## Próximos pasos

1. Configurar autenticación JWT en el frontend
2. Implementar sistema de login funcional
3. Restaurar rutas de proxy una vez que la autenticación funcione
4. Eliminar archivos JSON temporales
