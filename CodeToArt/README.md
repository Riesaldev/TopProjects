# CodeToArt - Especificaciones Técnicas

## 📋 Descripción del Proyecto

CodeToArt es una aplicación creativa que transforma fragmentos de código en visualizaciones artísticas y música generativa. Permite a los desarrolladores y artistas digitales convertir su código en obras visuales únicas, con posibilidad de exportarlas como NFTs.

## 🎯 Objetivos Principales

- Transformar código fuente en visualizaciones artísticas interactivas.
- Generar música a partir de patrones en el código.
- Permitir exportación en formatos digitales (imagen, video, audio, NFT).
- Crear una galería en línea para compartir las obras.

## 🛠 Stack Tecnológico

### Frontend

- **React 18** con **Vite**
- **Canvas API** y **Three.js** para visualizaciones
- **Tone.js** para generación de música
- **TailwindCSS** para diseño visual

### Backend

- **Node.js** + **Express**
- **WebSocket** para render en tiempo real
- **OpenAI API** (opcional) para sugerencias creativas
- **IPFS**/**Pinata** para almacenamiento descentralizado de obras

### Base de Datos

- **MongoDB** con **Mongoose**
- **AWS S3** o **Cloudinary** para multimedia

## 🗄️ Esquema de Base de Datos

### Tabla: artworks

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | ID único de la obra |
| user_id | ObjectId (FK → users) | Autor de la obra |
| title | String | Título de la obra |
| code_snippet | String | Fragmento de código fuente |
| visualization_url | String | URL de la visualización renderizada |
| music_url | String | URL de la música generada |
| nft_metadata | Object | Datos NFT (si aplica) |
| created_at | Date | Fecha de creación |

### Tabla: users

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | ID único del usuario |
| name | String | Nombre del usuario |
| email | String | Correo de registro |
| avatar_url | String | Imagen de perfil |
| wallet_address | String | Dirección de wallet para NFTs |

## 🔧 Funcionalidades Principales

### 1. Transformación de Código

- Análisis sintáctico de código (JavaScript, Python, Java, etc.).
- Generación de visualizaciones artísticas dinámicas.
- Animaciones en tiempo real.

### 2. Generación de Música

- Traducción de patrones de código a notas musicales.
- Variaciones rítmicas según complejidad del código.
- Exportación a formato MP3/WAV.

### 3. Galería Online

- Explorar obras de otros usuarios.
- Likes, comentarios y compartición.
- Descarga/exportación de obras.

### 4. Exportación NFT

- Generación automática de metadata.
- Almacenamiento descentralizado en IPFS.
- Integración con OpenSea/Metamask.

## 🚀 Entregables por Fases

### Fase 1: MVP (3 semanas)

- [ ] Transformación básica de código a visualizaciones.
- [ ] Generación de música simple.
- [ ] Exportación a imagen y audio.
- [ ] Galería básica.

### Fase 2: Funcionalidades Avanzadas (2 semanas)

- [ ] Visualizaciones interactivas con Three.js.
- [ ] Generación musical avanzada con Tone.js.
- [ ] Likes y comentarios en galería.
- [ ] Exportación a video.

### Fase 3: Mejoras (1 semana)

- [ ] Integración con NFTs.
- [ ] Recomendaciones basadas en IA.
- [ ] Soporte de múltiples lenguajes de programación.
- [ ] Colaboración en tiempo real.
