# Backend Python - Resumen de archivos creados

## 📁 Estructura creada

```
backend/
├── config/
│   ├── __init__.py
│   ├── config.py              # Cargar variables de entorno
│   └── database.py            # Conexión a PostgreSQL
├── models/
│   ├── __init__.py
│   └── user.py                # Métodos para tabla users
├── controllers/
│   ├── __init__.py
│   └── auth.py                # Lógica de login/register
├── routes/
│   ├── __init__.py
│   └── auth.py                # Endpoints Flask
├── utils/
│   ├── __init__.py
│   └── security.py            # bcrypt + JWT
├── app.py                     # Aplicación Flask
├── requirements.txt           # Dependencias (Flask, psycopg2, bcrypt, JWT)
├── .env                       # Variables de entorno (edita con credenciales reales)
├── migrations.sql             # Script SQL para agregar columnas a DB
└── README.md                  # Documentación del backend
```

## 🔧 Qué hace cada archivo

### `config/config.py`
- Lee variables de entorno desde `.env`
- Centraliza configuración de DB, JWT, host, puerto

### `config/database.py`
- Crea conexión a PostgreSQL
- Método `execute_query()` para ejecutar queries

### `models/user.py`
- `find_by_email()`: busca usuario por email
- `find_by_id()`: busca usuario por ID
- `create()`: inserta nuevo usuario
- `get_password_hash()`: obtiene hash de contraseña

### `controllers/auth.py`
- `register()`: valida datos, hashea contraseña, crea usuario, retorna token
- `login()`: valida email/contraseña, compara con bcrypt, retorna token
- `get_profile()`: obtiene datos del usuario autenticado

### `routes/auth.py`
- `POST /api/auth/register`: endpoint de registro
- `POST /api/auth/login`: endpoint de login
- `GET /api/auth/profile`: endpoint de perfil (requiere token)

### `utils/security.py`
- `hash_password()`: hashea contraseña con bcrypt
- `verify_password()`: compara contraseña con hash
- `generate_token()`: crea JWT token (válido por 1 hora)
- `verify_token()`: valida y decodifica JWT

### `app.py`
- Crea aplicación Flask
- Registra blueprints (rutas)
- Configura CORS para frontend
- Incluye endpoint `/api/health` para verificar que el servidor está activo

## 📝 Variables de entorno (.env)

Tu compañero debe completar:

```env
DB_HOST=           # localhost
DB_PORT=           # 5432
DB_NAME=           # raccorddb
DB_USER=           # usuario de PostgreSQL
DB_PASSWORD=       # contraseña de PostgreSQL
JWT_SECRET=        # clave segura para JWT
```

## 🗄️ Columnas requeridas en tabla `users`

```sql
id_user          INTEGER PRIMARY KEY
nombre           VARCHAR(100)
apellido         VARCHAR(100)
email            VARCHAR(255) UNIQUE
password_hash    VARCHAR(255)           -- agregar con migration
estado           VARCHAR(50)             -- opcional
fecha_creacion   TIMESTAMPTZ             -- opcional
```

## 🚀 Cómo ejecutar

```bash
cd backend
python -m venv venv
venv\Scripts\activate           # Windows
pip install -r requirements.txt
python app.py
```

El servidor inicia en `http://localhost:4000`

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con **bcrypt** (10 rondas)
- ✅ Tokens JWT con expiración de 1 hora
- ✅ CORS configurado para frontend en localhost
- ✅ Validación de email con regex
- ✅ Validación de longitud mínima de contraseña (6 caracteres)

## 🧪 Endpoints de prueba

```
POST http://localhost:4000/api/auth/register
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "email": "juan@test.com",
  "password": "test123"
}

POST http://localhost:4000/api/auth/login
{
  "email": "juan@test.com",
  "password": "test123"
}

GET http://localhost:4000/api/auth/profile
Header: Authorization: Bearer <token_recibido>

GET http://localhost:4000/api/auth/users
(Ver todos los usuarios registrados - solo para desarrollo)
```

---

¿Preguntas? El backend está listo para que tu compañero agregue las credenciales de PostgreSQL en `.env`
