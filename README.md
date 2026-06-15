# Raccord - Frontend + Backend

Sistema de gestión de proyectos con autenticación en React/Flask.

## Estructura del proyecto

```
RACCORD/
├── src/                    # Frontend React/Vite
│   ├── componentes/        # Componentes React
│   ├── api/               # Funciones API
│   ├── App.jsx
│   └── main.jsx
├── backend/               # Backend Flask (Python)
│   ├── config/           # Configuración
│   ├── models/           # Modelos de datos
│   ├── controllers/      # Lógica de negocio
│   ├── routes/           # Endpoints
│   ├── utils/            # Utilidades (bcrypt, JWT)
│   ├── app.py            # Aplicación Flask
│   ├── requirements.txt
│   └── .env
├── package.json          # Dependencias Frontend
├── vite.config.js        # Config Vite
└── .env                  # Variables de entorno Frontend
```

## Requisitos

- **Frontend**: Node.js 18+ (ya instalado)
- **Backend**: Python 3.8+ con pip
- **Base de datos**: PostgreSQL con tabla `users`

## Configuración de la base de datos

Tu tabla `users` debe tener al menos estas columnas:

```sql
- id_user (INT PRIMARY KEY)
- nombre (VARCHAR)
- apellido (VARCHAR)
- email (VARCHAR UNIQUE)
- password_hash (VARCHAR)
- estado (VARCHAR) - opcional
- fecha_creacion (TIMESTAMPTZ) - opcional
```

Si necesitas agregar las columnas que falten, ejecuta en DBeaver:

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS fecha_creacion TIMESTAMPTZ DEFAULT NOW();
```

## Instalación y ejecución

### 1. Backend (Flask - Python)

#### Paso 1: Crear entorno virtual

```bash
cd backend

# Crear entorno virtual
python -m venv venv

# Activar entorno (Windows - ejecuta esto en PowerShell o CMD)
venv\Scripts\activate

# Si estás en macOS/Linux
source venv/bin/activate
```

Deberías ver `(venv)` al inicio del prompt, indicando que el entorno está activado.

#### Paso 2: Instalar dependencias

```bash
pip install -r requirements.txt
```

Esto instalará:
- Flask (servidor web)
- psycopg2 (conector a PostgreSQL)
- bcrypt (encriptación de contraseñas)
- PyJWT (tokens de autenticación)
- Flask-CORS (permitir solicitudes desde el frontend)

#### Paso 3: **IMPORTANTE - Conectar la base de datos PostgreSQL**

Edita el archivo `backend/.env` con tus credenciales reales de PostgreSQL.

**¿Cómo encontrar tus credenciales?**

1. Abre **DBeaver**
2. Busca tu conexión a PostgreSQL (lado izquierdo)
3. Click derecho → **Edit Connection**
4. En la pestaña **Main**:
   - **Server Host**: aparece aquí (normalmente `localhost`)
   - **Port**: aparece aquí (normalmente `5432`)
   - **Database**: el nombre de tu base de datos (ej: `raccorddb`)
   - **Username**: tu usuario PostgreSQL (ej: `postgres`)
   - **Password**: tu contraseña

**Ejemplo de credenciales completas:**

Si en DBeaver ves:
- Host: `localhost`
- Port: `5432`
- Database: `raccorddb`
- User: `postgres`
- Password: `micontraseña123`

**Entonces en `backend/.env` escribe exactamente:**

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=raccorddb
DB_USER=postgres
DB_PASSWORD=micontraseña123
JWT_SECRET=clave_super_segura_aqui
HOST=0.0.0.0
PORT=4000
DEBUG=False
```

**⚠️ Importante:**
- `DB_PASSWORD` debe ser tu contraseña real (sin comillas)
- `JWT_SECRET` puede ser cualquier texto seguro (evita caracteres especiales)
- No guardes este archivo en repositorios públicos (contiene contraseñas)

#### Paso 4: Preparar la tabla de usuarios

Antes de ejecutar el backend, la tabla `users` de tu base de datos debe tener estas columnas:

**Ejecuta esto en DBeaver** (copia y pega en el editor SQL):

```sql
-- Crear tabla de usuarios si no existe
CREATE TABLE IF NOT EXISTS users (
  id_user SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  estado VARCHAR(50) DEFAULT 'activo',
  fecha_creacion TIMESTAMPTZ DEFAULT NOW()
);

-- Si la tabla ya existe, agregar las columnas que falten
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS fecha_creacion TIMESTAMPTZ DEFAULT NOW();
```

**Cómo ejecutar en DBeaver:**
1. Abre tu base de datos `raccorddb`
2. Click derecho → **SQL Editor** → **Open SQL Script**
3. Copia y pega el código SQL anterior
4. Presiona `Ctrl+Enter` o click en el botón **Execute**

✅ Si no ves errores, la tabla está lista.

#### Paso 5: Ejecutar el servidor

```bash
python app.py
```

Deberías ver algo como:

```
WARNING: This is a development server. Do not use it in production.
 * Running on http://0.0.0.0:4000
 * Press CTRL+C to quit
```

✅ El backend está corriendo en `http://localhost:4000`



### 2. Frontend (React - Vite)

**⚠️ IMPORTANTE: El backend debe estar corriendo antes de iniciar el frontend**

En otra terminal separada, desde la raíz del proyecto (`RACCORD/`):

#### Paso 1: Instalar dependencias

```bash
npm install
```

Este comando lee `package.json` e instala todas las dependencias necesarias en la carpeta `node_modules/`.

Si npm no es reconocido, ejecuta:
```bash
# Windows - usa la ruta completa si npm no está en PATH
"C:\Program Files\nodejs\npm.cmd" install
```

#### Paso 2: Ejecutar servidor de desarrollo

```bash
npm run dev
```

O si necesitas la ruta completa:
```bash
"C:\Program Files\nodejs\npm.cmd" run dev
```

Deberías ver algo como:

```
  VITE v8.0.12  ready in 194 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h + enter to show help
```

✅ El frontend estará en `http://localhost:5173`

#### Paso 3: Prueba el login

1. Abre `http://localhost:5173` en tu navegador
2. Ve a la pestaña **Registrar**
3. Completa el formulario:
   - Nombres: `Juan`
   - Apellidos: `Pérez`
   - Email: `juan@test.com`
   - Contraseña: `test123`
4. Click en **Registrar**

Si todo está bien:
- ✅ El usuario se guarda en PostgreSQL (puedes verlo en DBeaver)
- ✅ La contraseña se encripta con bcrypt
- ✅ Recibes un token JWT automáticamente
- ✅ Entras a la pantalla de **Proyectos**

Si hay error:
- 🔴 Revisa que el backend está corriendo (`http://localhost:4000`)
- 🔴 Abre la consola del navegador (presiona **F12**) y busca errores rojos
- 🔴 Verifica que en `backend/.env` las credenciales de PostgreSQL son correctas
- 🔴 Asegúrate de que PostgreSQL está corriendo (prueba en DBeaver)

---

## Flujo de autenticación

1. Usuario ingresa email y contraseña en el login
2. Frontend envía `POST /api/auth/login` al backend
3. Backend valida credenciales contra PostgreSQL
4. Backend retorna token JWT y datos del usuario
5. Frontend guarda token en `localStorage`
6. Frontend usa token para llamadas autenticadas (`Authorization: Bearer <token>`)

## Endpoints del backend

### Registro

```bash
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "password": "segura123"
}
```

### Login

```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "segura123"
}
```

### Obtener perfil (autenticado)

```bash
GET /api/auth/profile
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

## Desarrollo

- **Frontend hot-reload**: Vite recarga automáticamente al editar archivos `src/`
- **Backend**: Reinicia manualmente al cambiar archivos en `backend/`
- **Base de datos**: Conecta DBeaver para ver cambios en tiempo real

## Troubleshooting - Solucionar problemas

### ❌ Error: "No se puede conectar a la base de datos"

**Síntomas:**
- Terminal del backend muestra: `Error al conectar a la base de datos`
- O: `(psycopg2.OperationalError)`

**Solución:**

1. **Verifica que PostgreSQL está corriendo**
   - Abre DBeaver
   - Si ves la lista de bases de datos, PostgreSQL está activo ✅
   - Si no ves nada, PostgreSQL no está corriendo, reinicia el servicio

2. **Revisa las credenciales en `backend/.env`**
   ```bash
   # Abre backend/.env y verifica línea por línea:
   DB_HOST=localhost              # ¿Es correcto?
   DB_PORT=5432                   # ¿Coincide con el puerto en DBeaver?
   DB_NAME=raccorddb              # ¿Existe esta BD en PostgreSQL?
   DB_USER=postgres               # ¿Es tu usuario?
   DB_PASSWORD=micontraseña123    # ¿Es tu contraseña real (SIN comillas)?
   ```

3. **Prueba la conexión manualmente desde DBeaver**
   - En DBeaver, crea una nueva conexión con los mismos datos
   - Si DBeaver se conecta, entonces los datos son correctos
   - Si DBeaver no se conecta, verifica el usuario/contraseña/puerto

4. **Reinicia todo**
   ```bash
   # En terminal del backend
   Ctrl+C  # para detener el servidor
   python app.py  # vuelve a intentar
   ```

---

### ❌ Error: "Backend no inicia" o "ModuleNotFoundError"

**Síntomas:**
- Terminal muestra: `ModuleNotFoundError: No module named 'flask'`
- O: `No module named 'psycopg2'`

**Solución:**

1. **Verifica que estás en el entorno virtual correcto**
   ```bash
   # Deberías ver (venv) al inicio del prompt
   # Si no lo ves, activalo:
   
   # Windows:
   cd backend
   venv\Scripts\activate
   
   # macOS/Linux:
   source venv/bin/activate
   ```

2. **Verifica que instalaste las dependencias**
   ```bash
   # En la carpeta backend/, con (venv) activado:
   pip list | grep Flask
   # Deberías ver: Flask 3.0.0
   
   # Si no sale nada, instala:
   pip install -r requirements.txt
   ```

3. **Si aún no funciona, reinstala todo**
   ```bash
   # Elimina el entorno virtual
   rm -r venv  # en Windows: rmdir /s venv
   
   # Crea uno nuevo
   python -m venv venv
   venv\Scripts\activate  # Windows
   
   # Instala dependencias
   pip install -r requirements.txt
   ```

---

### ❌ Error: "npm no se encuentra"

**Síntomas:**
- Terminal muestra: `npm: The term 'npm' is not recognized`

**Solución:**

Node.js está instalado pero npm no está en el PATH de la terminal. Usa la ruta completa:

```bash
# En Windows, en la raíz del proyecto (no en backend/):
"C:\Program Files\nodejs\npm.cmd" install
"C:\Program Files\nodejs\npm.cmd" run dev
```

O agrega Node.js al PATH permanentemente:
1. Abre **Variables de entorno** (búsqueda de Windows)
2. Click en **Variables de entorno...**
3. En **Variables del sistema**, busca `Path`
4. Click **Editar...**
5. Click **Nuevo** y agrega: `C:\Program Files\nodejs`
6. Click **OK** varias veces
7. Reinicia la terminal

---

### ❌ Error: "Frontend no conecta con backend" o "CORS error"

**Síntomas:**
- Pantalla de login se muestra
- Al intentar registrarse: error en consola del navegador (F12)
- Error tipo: `CORS policy: No 'Access-Control-Allow-Origin' header`
- O: `Failed to fetch /api/auth/register`

**Solución:**

1. **Verifica que el backend está corriendo**
   ```bash
   # En tu terminal del backend, deberías ver:
   Running on http://0.0.0.0:4000
   ```
   
   Si no ves eso, ejecuta:
   ```bash
   cd backend
   (venv) python app.py
   ```

2. **Verifica que el frontend puede llegar al backend**
   - Abre una pestaña nueva en el navegador
   - Ve a: `http://localhost:4000/api/health`
   - Deberías ver: `{"status":"OK"}`
   - Si ves error, el backend no está accesible

3. **Revisa la consola del navegador (F12)**
   - Abre el navegador en `http://localhost:5173`
   - Presiona **F12** → **Console**
   - Intenta registrarte
   - Busca mensajes de error rojos
   - Copia el error completo y revísalo

4. **Si todo lo anterior funciona, reinicia todo**
   ```bash
   # Terminal backend: Ctrl+C
   # Terminal frontend: Ctrl+C
   
   # Vuelve a iniciar ambos
   # Backend:
   cd backend && python app.py
   
   # Frontend (en otra terminal):
   npm run dev
   ```

---

### ❌ Error: "Email ya está registrado" pero es la primera vez

**Síntomas:**
- Intento registrar usuario nuevo
- Error: `El email ya está registrado`

**Solución:**

Alguien ya registró ese email antes. Prueba con otro:

```
Email anterior: juan@test.com  ❌
Email nuevo: juan2@test.com    ✅
```

O limpia la tabla de usuarios en PostgreSQL (si necesitas):

```sql
-- ⚠️ SOLO si necesitas borrar TODOS los usuarios
DELETE FROM users;

-- Ver qué usuarios existen
SELECT id_user, nombre, apellido, email FROM users;
```

---

### ✅ Verificación: ¿Está todo correcto?

Ejecuta esto para verificar que TODO funciona:

```bash
# 1. ¿Python 3.8+ instalado?
python --version
# Debe mostrar: Python 3.x.x

# 2. ¿Node.js instalado?
node --version
# Debe mostrar: vxx.x.x

# 3. ¿PostgreSQL corriendo?
# Abre DBeaver y verifica que te conectas a la BD

# 4. ¿Backend funciona?
cd backend
python app.py
# Presiona Ctrl+C

# 5. ¿Frontend funciona?
npm run dev
# Presiona Ctrl+C
```

Si todos los comandos funcionan, ¡estás listo para empezar! 🚀

---

## 🎯 Verificar que los datos se guardan en la Base de Datos

Una vez que todo esté corriendo (backend + frontend), puedes verificar que los usuarios se guardan en PostgreSQL de **3 formas diferentes**:

### Método 1: Ver en la API (Frontend o Postman)

El backend tiene un endpoint especial para ver todos los usuarios registrados:

#### Opción A: Desde el navegador

1. Abre una pestaña nueva
2. Ve a: `http://localhost:4000/api/auth/users`
3. Deberías ver JSON con todos los usuarios registrados:

```json
{
  "success": true,
  "message": "2 usuarios encontrados.",
  "users": [
    {
      "id_user": 1,
      "nombre": "Juan",
      "apellido": "Pérez",
      "email": "juan@test.com",
      "estado": "activo"
    },
    {
      "id_user": 2,
      "nombre": "María",
      "apellido": "López",
      "email": "maria@test.com",
      "estado": "activo"
    }
  ]
}
```

**Nota:** Las contraseñas NO aparecen (están hasheadas y seguras en la BD) ✅

#### Opción B: Desde Postman (si lo tienes)

1. Abre Postman
2. Nuevo request: **GET**
3. URL: `http://localhost:4000/api/auth/users`
4. Click **Send**
5. Ves los usuarios en formato JSON

---

### Método 2: Ver en DBeaver (en PostgreSQL)

Esta es la forma más visual y confiable:

1. **Abre DBeaver**
2. **Expande tu conexión PostgreSQL**
3. **Navega a**: `Databases` → `raccorddb` → `Schemas` → `public` → `Tables` → `users`
4. **Click derecho en `users`** → **View Data**

Verás una tabla con:

| id_user | nombre | apellido | email | password_hash | estado | fecha_creacion |
|---------|--------|----------|-------|---|---|---|
| 1 | Juan | Pérez | juan@test.com | $2b$10$... (hasheada) | activo | 2026-06-15 20:30:45 |
| 2 | María | López | maria@test.com | $2b$10$... (hasheada) | activo | 2026-06-15 20:31:12 |

**La contraseña está hasheada con bcrypt**, no está en texto plano ✅

---

### Método 3: Query SQL en DBeaver

Ejecuta directamente una query SQL para ver los datos:

1. **En DBeaver**, abre **SQL Editor** (botón en la barra superior)
2. **Copia y ejecuta** cualquiera de estas queries:

#### Ver todos los usuarios

```sql
SELECT id_user, nombre, apellido, email, estado, fecha_creacion 
FROM users 
ORDER BY fecha_creacion DESC;
```

#### Contar cuántos usuarios hay

```sql
SELECT COUNT(*) as total_usuarios FROM users;
```

#### Buscar un usuario específico

```sql
SELECT * FROM users WHERE email = 'juan@test.com';
```

#### Ver cómo se almacena la contraseña (hasheada)

```sql
SELECT email, password_hash FROM users WHERE email = 'juan@test.com';
```

Verás algo como: `$2b$10$sKZF5HgC8B6Q3eYmW7sN2u.VvCJzVCdGhX9pZ6cF8m4L2eX3Q` (no es la contraseña real)

---

## 🔄 Flujo completo de prueba

### Paso 1: Arranca todo

**Terminal 1 - Backend:**
```bash
cd backend
venv\Scripts\activate  # Windows
python app.py
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Deberías ver:
```
✓ VITE ready in 194 ms
➜ Local: http://localhost:5173/
```

### Paso 2: Registra un usuario

1. Abre `http://localhost:5173` en el navegador
2. Pestaña **Registrar**
3. Completa:
   - Nombres: `Juan`
   - Apellidos: `Pérez`
   - Email: `juan@test.com`
   - Contraseña: `test123`
4. Click **Registrar**

✅ Si ves la pantalla de **Proyectos**, significa que se guardó correctamente

### Paso 3: Verifica en la API

Opción 1 (más fácil):
- Abre otra pestaña: `http://localhost:4000/api/auth/users`
- Deberías ver el usuario que acabas de registrar en JSON

Opción 2 (más profesional):
- Abre DBeaver
- Ve a tabla `users`
- Verás el registro insertado

### Paso 4: Registra otro usuario

Repite el Paso 2 con datos diferentes:
- Nombres: `María`
- Apellidos: `López`
- Email: `maria@test.com`
- Contraseña: `test456`

### Paso 5: Verifica en API nuevamente

- `http://localhost:4000/api/auth/users`

Ahora deberías ver **2 usuarios** en JSON.

### Paso 6: Verifica en DBeaver

- En DBeaver, refresh la tabla `users` (F5)
- Verás ambos registros insertados
- Puedes ver la fecha exacta en que se creó cada usuario

---

## 📊 Comparación de métodos

| Método | Ventaja | Desventaja |
|--------|---------|-----------|
| **API JSON** | Rápido, desde navegador | No ves todas las columnas |
| **DBeaver UI** | Visualización clara | Requiere DBeaver abierto |
| **SQL Query** | Máximo control, filtros | Requiere conocer SQL |

**Recomendación:** Usa la **API** para pruebas rápidas y **DBeaver** para inspecciones detalladas.

---

## ✨ Datos importantes

- **Contraseñas:** Nunca se guardan en texto plano. Se hashean con bcrypt (10 rondas).
- **Email único:** No puedes registrar el mismo email dos veces.
- **Token JWT:** Se genera en `POST /api/auth/register` y `POST /api/auth/login`.
- **Seguridad:** El endpoint `/api/auth/users` es solo para desarrollo. En producción, deberías protegerlo o borrarlo.

---

- [ ] Implementar logout
- [ ] Proteger rutas en el frontend
- [ ] Agregar validaciones más robustas
- [ ] Crear endpoints para gestión de proyectos
- [ ] Agregar tests para backend
