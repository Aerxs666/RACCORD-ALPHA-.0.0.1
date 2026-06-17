# 🆘 DIAGNÓSTICO: Tabla Users Corrupta o Mal Estructurada

## El Problema

```
❌ Error: column "password" of relation "users" does not exist
```

Esto indica que **la tabla `users` NO tiene la estructura correcta**. Incluso falta la columna `password` que es fundamental.

---

## 🔍 DIAGNÓSTICO EN 3 PASOS

### PASO 1: Verifica si la tabla existe

Abre Supabase SQL Editor y ejecuta:

```sql
SELECT tablename FROM pg_tables WHERE tablename = 'users';
```

**Si NO aparece nada:**
- La tabla NO existe
- Ve al PASO 3

**Si aparece 'users':**
- La tabla existe pero está mal configurada
- Ve al PASO 2

---

### PASO 2: Ver la estructura actual

```sql
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
```

**Copia EXACTAMENTE qué columnas aparecen aquí** y pégalas en este chat.

---

### PASO 3: RECONSTRUIR LA TABLA (OPCIÓN RECOMENDADA)

⚠️ **ADVERTENCIA: Esto ELIMINARÁ todos los usuarios existentes** (si los hay)

1. Abre Supabase SQL Editor
2. **Primero**, verifica si hay datos importantes:

```sql
SELECT COUNT(*) FROM users;
```

3. Si el resultado es `0`, está vacía, continúa seguro
4. Si hay datos, haz un backup primero

5. Ejecuta esto para LIMPIAR:

```sql
DROP TABLE IF EXISTS users CASCADE;
```

6. Luego ejecuta esto para CREAR CORRECTAMENTE:

```sql
CREATE TABLE users (
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

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_estado ON users(estado);
```

7. Verifica que quedó bien:

```sql
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'users' 
ORDER BY ordinal_position;
```

---

## ✅ DESPUÉS DE RECONSTRUIR:

1. **No toques el código de Python**, ya está actualizado
2. **Reinicia el backend** (cierra y vuelve a abrir)
3. **Prueba registrar un usuario** desde el frontend

---

## 📋 RESUMEN DE ARCHIVOS

He creado estos scripts para ti:

- `CREAR_TABLA_USERS.sql` ← Script SQL para reconstruir todo
- `ERROR_COLUMNAS_FALTANTES.md` ← Guía anterior
- `CHECK_USERS_TABLE.sql` ← Script para verificar

---

## 🚀 AHORA:

**OPCIÓN A (Recomendada):**
1. Abre Supabase SQL Editor
2. Copia TODO el contenido de: `CREAR_TABLA_USERS.sql`
3. Pégalo en Supabase
4. Ejecuta hasta el paso donde verifica (PASO 5)
5. Dime si todo aparece correctamente

**OPCIÓN B (Si no quieres perder datos):**
1. Primero ejecuta PASO 1 y PASO 2 del script
2. Cópiame el resultado exacto de qué columnas tiene
3. Te digo exactamente qué cambiar

---

**¿Cuál prefieres? ¿O prefieres que directamente reconstruya la tabla?**
