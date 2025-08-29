# ArtFlow - Especificaciones Técnicas

## 📋 Descripción del Proyecto

ArtFlow es un marketplace de arte digital enfocado en creadores independientes. Permite a los artistas subir sus obras, exhibirlas en galerías interactivas en 3D, y participar en subastas o ventas directas. Incluye un sistema de pagos seguros y soporte para NFTs.

## 🎯 Objetivos Principales

- Crear una plataforma para que artistas digitales exhiban y vendan sus obras.
- Implementar un sistema de subastas y compras directas.
- Ofrecer una galería 3D interactiva para explorar obras.
- Facilitar la autenticidad de obras mediante NFTs.

## 🛠 Stack Tecnológico

### Frontend

- **Angular 16** con **RxJS**
- **Three.js** para galería 3D
- **TailwindCSS** para diseño
- **NgRx** para gestión de estado

### Backend

- **Node.js** + **Express**
- **MongoDB** con **Mongoose**
- **WebSocket** para subastas en tiempo real
- **Stripe API** para pagos
- **IPFS/Pinata** para almacenamiento de obras como NFTs

### Base de Datos

- **MongoDB** con documentos flexibles

## 🗄️ Esquema de Base de Datos

### Tabla: users

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | Identificador único |
| name | String | Nombre del usuario |
| email | String | Correo electrónico |
| role | Enum (artist, buyer, admin) | Rol del usuario |
| wallet_address | String | Wallet para NFTs |
| created_at | Timestamp | Fecha de registro |

### Tabla: artworks

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | Identificador único |
| artist_id | ObjectId (FK → users) | Autor de la obra |
| title | String | Título de la obra |
| description | String | Descripción |
| file_url | String | URL de archivo (imagen/video) |
| nft_metadata | Object | Metadata asociada al NFT |
| price | Decimal | Precio de venta directa |
| created_at | Timestamp | Fecha de publicación |

### Tabla: auctions

| Campo | Tipo | Descripción |
|-------|------|-------------|
| id | ObjectId (PK) | Identificador único |
| artwork_id | ObjectId (FK → artworks) | Obra subastada |
| start_price | Decimal | Precio inicial |
| current_price | Decimal | Precio actual |
| end_date | Timestamp | Fecha de finalización |
| winner_id | ObjectId (FK → users) | Comprador ganador |

## 🔧 Funcionalidades Principales

### 1. Galería 3D

- Exploración inmersiva de obras con Three.js.
- Modos de visualización: sala de exposición, carrusel 3D.
- Detalles emergentes al seleccionar una obra.

### 2. Subidas de Obras

- Subida de imágenes y videos.
- Organización por colecciones.
- Compatibilidad con NFTs vía IPFS.

### 3. Subastas y Ventas

- Subastas en tiempo real con WebSocket.
- Compras directas con Stripe.
- Historial de ventas.

### 4. Autenticidad NFT

- Conversión de obras en tokens NFT.
- Vinculación con wallets (Metamask).
- Listado en marketplaces externos.

## 🚀 Entregables por Fases

### Fase 1: MVP (3 semanas)

- [ ] Registro y login de artistas/usuarios
- [ ] Subida de obras básicas
- [ ] Galería 3D inicial
- [ ] Compras directas con Stripe

### Fase 2: Funcionalidades Avanzadas (2 semanas)

- [ ] Subastas en tiempo real
- [ ] Autenticidad mediante NFTs
- [ ] Organización en colecciones
- [ ] Dashboard de artistas

### Fase 3: Mejoras (1 semana)

- [ ] Galerías temáticas colaborativas
- [ ] Gamificación para compradores
- [ ] Exportación avanzada de reportes
- [ ] Integración con OpenSea
