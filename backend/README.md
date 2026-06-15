# Backend Python - Raccord

Backend Flask para autenticación y gestión de usuarios de Raccord.

## Estructura

```
backend/
├── config/
│   ├── config.py          # Configuración de la aplicación
│   └── database.py        # Conexión a PostgreSQL
├── models/
│   └── user.py            # Modelo de usuario
├── controllers/
│   └── auth.py            # Lógica de autenticación
├── routes/
│   └── auth.py            # Endpoints de autenticación
├── utils/
│   └── security.py        # Hashing (bcrypt) y JWT
├── app.py                 # Aplicación principal
├── requirements.txt       # Dependencias
├── .env                   # Variables de entorno
└── migrations.sql         # Script para agregar columnas a DB
```

## Instalación

### 1. Crear entorno virtual (Python 3.8+)

```bash
cd backend
python -m venv venv
# En Windows:
venv\Scripts\activate
# En macOS/Linux:
source venv/bin/activate
```

### 2. Instalar dependencias

```bash
pip install -r requirements.txt
```

### 3. Configurar variables de entorno

Edita `backend/.env` con las credenciales reales de PostgreSQL:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=raccorddb
DB_USER=tu_usuario
DB_PASSWORD=tu_contraseña
JWT_SECRET=una_clave_muy_segura
HOST=0.0.0.0
PORT=4000
DEBUG=False
```

### 4. Preparar la base de datos

Ejecuta en DBeaver el contenido de `backend/migrations.sql` para agregar las columnas necesarias a tu tabla `users`:

```sql
ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash VARCHAR(255);
ALTER TABLE users ADD COLUMN IF NOT EXISTS fecha_creacion TIMESTAMPTZ DEFAULT NOW();
```

## Ejecutar el servidor

```bash
python app.py
```

El servidor estará disponible en `http://localhost:4000`

## Endpoints

### `POST /api/auth/register`

Registra un nuevo usuario.

**Request:**
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@example.com",
  "password": "segura123"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Usuario registrado exitosamente.",
  "user": {
    "id_user": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### `POST /api/auth/login`

Inicia sesión.

**Request:**
```json
{
  "email": "juan@example.com",
  "password": "segura123"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login exitoso.",
  "user": {
    "id_user": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com"
  },
  "token": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### `POST /api/auth/recover`

Solicita recuperación de cuenta por correo.

**Request:**
```json
{
  "email": "juan@example.com"
}
```

**Response (200):**
```json
{
  "success": true,
  "message": "Se han enviado las instrucciones de recuperación al correo proporcionado."
}
```

### `GET /api/auth/profile`

Obtiene el perfil del usuario autenticado.

**Headers:**
```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id_user": 1,
    "nombre": "Juan",
    "apellido": "Pérez",
    "email": "juan@example.com"
  }
}
```

## Notas importantes

- Las contraseñas se hashean con **bcrypt** antes de guardarse
- Los tokens JWT expiran en **1 hora** (3600 segundos)
- El frontend debe enviar el token en el header `Authorization: Bearer <token>`
- La tabla `users` debe tener las columnas: `id_user`, `nombre`, `apellido`, `email`, `password_hash`
