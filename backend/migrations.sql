-- Script para agregar la columna password_hash a la tabla users
-- Ejecuta esto en DBeaver si la columna no existe

ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);

-- Si necesitas también agregar la columna fecha_creacion
ALTER TABLE users ADD COLUMN IF NOT EXISTS fecha_creacion TIMESTAMPTZ DEFAULT NOW();
