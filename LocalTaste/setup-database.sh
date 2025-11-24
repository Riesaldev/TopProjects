#!/bin/bash

# Configuración de la base de datos
DB_NAME="localtaste"
DB_USER="postgres"
DB_PASSWORD="password"
DB_HOST="localhost"
DB_PORT="5432"

echo "🗄️  Iniciando configuración de la base de datos PostgreSQL..."

# Crear la base de datos si no existe
echo "📦 Creando base de datos $DB_NAME..."
createdb -h $DB_HOST -p $DB_PORT -U $DB_USER $DB_NAME 2>/dev/null || echo "Base de datos ya existe"

echo "✅ Base de datos configurada correctamente"

# Ejecutar migraciones (cuando estén disponibles)
echo "🔄 Para ejecutar migraciones, utiliza:"
echo "cd backend && npm run migration:run"

echo "🚀 ¡Base de datos lista para usar!"