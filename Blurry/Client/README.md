# Blurry Client

Aplicación frontend para la plataforma de citas Blurry, desarrollada con Next.js 14 y el App Router.

## Características

- **Next.js 14**: App Router con Server Components
- **TypeScript**: Type safety completo
- **Autenticación JWT**: Login/registro con persistencia
- **Matching inteligente**: Algoritmos de compatibilidad
- **Sistema de tokens**: Gamificación y recompensas
- **Chat en tiempo real**: WebSockets con Socket.IO
- **Videollamadas**: WebRTC integrado
- **Notificaciones push**: Alertas en tiempo real
- **Panel de administración**: Gestión completa (admins)
- **Responsive design**: Mobile-first approach
- **PWA Ready**: Instalable como app nativa

## Tecnologías

- **Next.js 14** (App Router)
- **TypeScript** para type safety
- **Tailwind CSS** para estilos
- **Socket.IO Client** para WebSockets
- **WebRTC** para videollamadas
- **Context API** para estado global
- **React Hook Form** para formularios
- **Axios** para HTTP requests

## Estructura del proyecto

```
Client/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── (auth)/            # Grupo de rutas de autenticación
│   │   │   ├── login/         # Página de login
│   │   │   └── register/      # Página de registro
│   │   ├── (dashboard)/       # Grupo de rutas autenticadas
│   │   │   ├── discover/      # Descubrir usuarios
│   │   │   ├── matches/       # Matches y likes
│   │   │   ├── chat/          # Conversaciones
│   │   │   ├── profile/       # Perfil personal
│   │   │   ├── tokens/        # Balance y tienda
│   │   │   └── video-call/    # Videollamadas
│   │   ├── admin/             # Panel de administración
│   │   │   ├── users/         # Gestión de usuarios
│   │   │   ├── reports/       # Moderación
│   │   │   └── analytics/     # Estadísticas
│   │   ├── api/               # API routes (proxy)
│   │   ├── globals.css        # Estilos globales
│   │   └── layout.tsx         # Layout principal
│   ├── components/            # Componentes reutilizables
│   │   ├── ui/               # Componentes base
│   │   ├── forms/            # Formularios
│   │   ├── chat/             # Componentes de chat
│   │   └── video/            # Componentes de video
│   ├── contexts/             # Contextos de React
│   │   ├── AuthContext.tsx   # Autenticación
│   │   ├── SocketContext.tsx # WebSockets
│   │   └── NotificationContext.tsx
│   ├── hooks/                # Custom hooks
│   ├── types/                # Tipos TypeScript
│   ├── utils/                # Utilidades
│   └── lib/                  # Configuraciones
├── public/                   # Archivos estáticos
├── tailwind.config.js        # Configuración de Tailwind
└── next.config.js           # Configuración de Next.js
```

## Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repo-url>
   cd blurry/Client
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**
   Crear archivo `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Ejecutar en desarrollo**
   ```bash
   npm run dev
   ```

La aplicación estará disponible en `http://localhost:3000`

## Scripts disponibles

- `npm run dev` - Servidor de desarrollo
- `npm run build` - Build para producción
- `npm run start` - Ejecutar build de producción
- `npm run lint` - Linter de código
- `npm run type-check` - Verificación de tipos

## Rutas principales

### Autenticación
- `/login` - Iniciar sesión
- `/register` - Registro de usuario

### Dashboard principal
- `/discover` - Descubrir nuevos usuarios
- `/matches` - Ver matches y likes mutuos
- `/chat` - Lista de conversaciones
- `/chat/[roomId]` - Chat específico
- `/profile` - Perfil personal
- `/tokens` - Balance y tienda de tokens
- `/video-call/[roomId]` - Videollamada

### Administración
- `/admin/users` - Gestión de usuarios
- `/admin/reports` - Moderación de reportes
- `/admin/analytics` - Estadísticas de la plataforma

## Funcionalidades principales

### Sistema de Matching
- **Descubrimiento**: Swipe left/right para like/dislike
- **Algoritmo IA**: Sugerencias basadas en compatibilidad
- **Filtros avanzados**: Por edad, ubicación, intereses
- **Boost de perfil**: Usando tokens para más visibilidad

### Chat en tiempo real
- **Mensajería instantánea**: Solo entre matches mutuos
- **Estados de conexión**: Online/offline en tiempo real
- **Historial persistente**: Todos los mensajes guardados
- **Multimedia**: Envío de imágenes y emojis

### Sistema de Tokens
- **Ganar tokens**: Por actividad diaria, matches, etc.
- **Gastar tokens**: Boosts, super likes, rewind
- **Tienda virtual**: Funciones premium
- **Historial**: Tracking de ganancia/gasto

### Videollamadas
- **WebRTC nativo**: Sin servidores externos
- **Controles completos**: Audio, video, pantalla
- **Calidad adaptativa**: Según conexión
- **Grabación**: Para matches Premium

### Notificaciones
- **Push notifications**: Nuevos matches, mensajes
- **In-app notifications**: Toast y banners
- **Configurables**: El usuario puede personalizar

## Contextos principales

### AuthContext
```tsx
const { user, login, logout, isLoading } = useAuth();
```

### SocketContext
```tsx
const { socket, isConnected, emit } = useSocket();
```

### NotificationContext
```tsx
const { showToast, notifications } = useNotifications();
```

## Componentes clave

### MatchCard
Tarjeta de usuario para swipe con información básica

### ChatMessage
Componente de mensaje individual con estados

### VideoCall
Componente completo de videollamada con controles

### TokenBalance
Display del balance actual y opciones de gasto

## Sistema de tipos

### Interfaces principales
```typescript
interface User {
  id: string;
  name: string;
  email: string;
  age: number;
  location: string;
  photos: string[];
  bio: string;
  interests: string[];
  tokenBalance: number;
}

interface Match {
  id: string;
  users: [User, User];
  createdAt: Date;
  chatRoom: ChatRoom;
}

interface ChatRoom {
  id: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}

interface Message {
  id: string;
  content: string;
  sender: User;
  timestamp: Date;
  type: 'text' | 'image' | 'emoji';
}
```

## Estilos y diseño

### Sistema de colores
```css
/* Tailwind personalizado */
primary: '#E91E63'     /* Rosa principal */
secondary: '#9C27B0'   /* Morado secundario */
accent: '#FF5722'      /* Naranja de acento */
success: '#4CAF50'     /* Verde éxito */
warning: '#FFC107'     /* Amarillo advertencia */
error: '#F44336'       /* Rojo error */
```

### Breakpoints responsivos
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## PWA (Progressive Web App)

La aplicación está configurada como PWA:
- **Instalable**: Desde navegador móvil
- **Offline ready**: Funcionalidad básica sin conexión
- **Push notifications**: Incluso con app cerrada
- **App-like experience**: Navigation gestures

## Optimizaciones

### Performance
- **Server Components**: Renderizado en servidor
- **Image optimization**: Next.js Image component
- **Code splitting**: Automático por rutas
- **Lazy loading**: Componentes pesados

### SEO
- **Metadata dinámico**: Por página
- **Open Graph**: Para compartir en redes
- **Structured data**: Para motores de búsqueda

## Desarrollo local

### Requisitos previos
1. Backend NestJS corriendo en puerto 3001
2. Base de datos MySQL configurada
3. Redis corriendo (opcional, para cache)

### Flujo de desarrollo
```bash
# Terminal 1: Backend
cd Server
npm run start:dev

# Terminal 2: Frontend
cd Client
npm run dev
```

### Testing local
1. **Registrar usuarios**: Crear cuentas de prueba
2. **Hacer matches**: Like mutuo entre usuarios
3. **Probar chat**: Mensajería en tiempo real
4. **Videollamada**: Funcionalidad WebRTC
5. **Admin panel**: Con usuario admin

## Build y deploy

### Producción
```bash
# Build optimizado
npm run build

# Verificar build
npm start
```

### Variables de entorno de producción
```env
NEXT_PUBLIC_API_URL=https://api.tu-dominio.com
NEXT_PUBLIC_SOCKET_URL=https://api.tu-dominio.com
NEXT_PUBLIC_APP_URL=https://tu-dominio.com
```

### Plataformas recomendadas
- **Vercel**: Deploy automático desde Git
- **Netlify**: Alternativa con funciones serverless
- **AWS Amplify**: Con CDN global

## Licencia

MIT

---

Esta aplicación forma parte del ecosistema Blurry, una plataforma moderna de citas que combina algoritmos de IA, gamificación y tecnologías web avanzadas para crear experiencias de conexión auténticas.
