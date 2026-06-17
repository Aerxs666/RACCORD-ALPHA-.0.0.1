-- ========================================
-- CREAR O RECONSTRUIR TABLA USERS
-- ========================================
-- Ejecuta esto en Supabase SQL Editor

-- PASO 1: Ver la estructura actual (sin eliminar)
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- PASO 2: Si la tabla no existe o está mal, eliminarla
-- DESCOMENTAR SOLO SI QUIERES ELIMINAR LA TABLA ACTUAL:
-- DROP TABLE IF EXISTS users CASCADE;

-- PASO 3: Crear la tabla correctamente
CREATE TABLE IF NOT EXISTS users (
    id_user SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password TEXT NOT NULL,
    identificacion VARCHAR(50),
    id_identificacion VARCHAR(50),
    misisdn VARCHAR(20),
    direccion TEXT,
    fecha_de_nacimiento DATE,
    id_departamento INTEGER,
    estado VARCHAR(50) DEFAULT 'activo',
    fecha_de_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_de_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PASO 4: Crear índice para búsquedas rápidas
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_estado ON users(estado);

-- PASO 5: Verificar que se creó correctamente
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- Si todo está bien, deberías ver algo como:
-- id_user | integer | NO
-- nombre | character varying | NO
-- apellido | character varying | NO
-- email | character varying | NO
-- password | text | NO
-- identificacion | character varying | YES
-- id_identificacion | character varying | YES
-- misisdn | character varying | YES
-- direccion | text | YES
-- fecha_de_nacimiento | date | YES
-- id_departamento | integer | YES
-- estado | character varying | YES
-- fecha_de_creacion | timestamp | YES
-- fecha_de_actualizacion | timestamp | YES
