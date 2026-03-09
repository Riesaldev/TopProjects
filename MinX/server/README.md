# Minitwitter

Se trata de una web donde los usuarios podrán publicar tweets (con una imagen adjunta de forma opcional) y dar like a tweets de otros usuarios.

## Instalar

1. Instalar las dependencias mediante el comando `npm install` o `npm i`.

2. Duplicar el archivo `.env.example`, renombrarlo a `.env` y cubrir los datos necesarios.

3. Ejecutar `npm run initdb` para crear las tablas necesarias en la base de datos.

4. Ejecutar `npm run dev` para lanzar el servidor.

## Base de datos

### users

| Campo      | Tipo         | Descripción                            |
| ---------- | ------------ | -------------------------------------- |
| id         | INT UNSIGNED | Identificador único del usuario        |
| username   | VARCHAR(30)  | Nombre de usuario del usuario          |
| email      | VARCHAR(100) | Correo electrónico del usuario         |
| password   | VARCHAR(100) | Contraseña del usuario (hash)          |
| avatar     | VARCHAR(100) | URL del avatar del usuario             |
| createdAt  | DATETIME     | Fecha y hora de creación del usuario   |
| modifiedAt | DATETIME     | Fecha y hora de la última modificación |

### tweets

| Campo     | Tipo         | Descripción                        |
| --------- | ------------ | ---------------------------------- |
| id        | INT UNSIGNED | Identificador único del tweet      |
| userId    | INT UNSIGNED | Identificador del usuario creador  |
| text      | VARCHAR(280) | Contenido del tweet                |
| image     | VARCHAR(100) | Imagen adjunta                     |
| createdAt | DATETIME     | Fecha y hora de creación del tweet |

### likes

| Campo     | Tipo         | Descripción                       |
| --------- | ------------ | --------------------------------- |
| id        | INT UNSIGNED | Identificador único del like      |
| userId    | INT UNSIGNED | Identificador del usuario creador |
| tweetId   | INT UNSIGNED | Identificador del tweet objetivo  |
| createdAt | DATETIME     | Fecha y hora de creación del like |

## Endpoints del usuario

- **POST** - [`/api/users/register`] - Crea un nuevo usuario. ✅
- **POST** - [`/api/users/login`] - Logea a un usuario retornando un token. ✅
- **GET** - [`/api/users`] - Retorna información privada del usuario con el id del token. ✅
- **PUT** - [`/api/users/avatar`] - Permite actualizar el avatar del usuario. ✅

## Endpoints de los tweets

- **POST** - [`/api/tweets`] - Crea un tweet. ✅
- **GET** - [`/api/tweets`] - Retorna el listado de tweets. ✅
- **GET** - [`/api/tweets/:tweetId`] - Retorna un tweet por ID. ✅
- **POST** - [`/api/tweets/:tweetId/likes`] - Da like a un tweet. ✅
- **DELETE** - [`/api/tweets/:tweetId/likes] - Elimina un like de un tweet. ✅
- **DELETE** - [`/api/tweets/:tweetId`] - Eliminar un tweet. ✅.
