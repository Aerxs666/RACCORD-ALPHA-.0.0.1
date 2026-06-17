-- Script para verificar la estructura de la tabla 'users' en Supabase
-- Copia y pega esto en el SQL Editor de Supabase

-- 1. Ver todas las columnas de la tabla users
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;

-- 2. Ver el nombre y tipo de columnas de forma más legible
\d users

-- 3. Ver el DDL (Create Table) completo
SELECT pg_get_createtablecmd('users'::regclass);

-- 4. Si lo anterior no funciona, intenta esto para ver la estructura
SELECT table_name, column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_catalog = 'postgres' 
  AND table_name = 'users'
ORDER BY ordinal_position;
