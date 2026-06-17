# Backend - Raccord

Backend de la aplicación Raccord construido con Flask y PostgreSQL.

## Requisitos

- Python 3.8+
- PostgreSQL 12+
- pip

## Instalación

1. **Crear un entorno virtual:**

```bash
python -m venv venv
```

2. **Activar el entorno virtual:**

En Windows (PowerShell):
```powershell
.\venv\Scripts\Activate.ps1
```

En Linux/Mac:
```bash
source venv/bin/activate
```

3. **Instalar dependencias:**

```bash
pip install -r requirements.txt
```

4. **Configurar variables de entorno:**

Copiar `.env.example` a `.env` y llenar con tus credenciales:

```bash
cp .env.example .env
```

Editar `.env` con tus valores:
- `DB_HOST`: Host de PostgreSQL (ej: localhost)
- `DB_PORT`: Puerto de PostgreSQL (ej: 5432)
- `DB_NAME`: Nombre de la base de datos (ej: raccord_db)
- `DB_USER`: Usuario de PostgreSQL (ej: postgres)
- `DB_PASSWORD`: Contraseña de PostgreSQL
- `JWT_SECRET`: Clave secreta para JWT (cámbiala en producción)

5. **Crear la base de datos en PostgreSQL:**

```sql
CREATE DATABASE raccord_db;
```

6. **Ejecutar el script de base de datos:**

```bash
psql -U postgres -d raccord_db -f ../database.sql
```

## Ejecutar el servidor

```bash
python main.py
```

El servidor estará disponible en `http://127.0.0.1:4000`

## Estructura de archivos

```
backend/
├── app.py                 # Factory de la aplicación Flask
├── main.py               # Punto de entrada
├── requirements.txt      # Dependencias de Python
├── .env.example         # Template de variables de entorno
├── config/
│   ├── config.py        # Configuración de la aplicación
│   ├── database.py      # Conexión a PostgreSQL
│   └── __init__.py
├── models/
│   ├── user.py          # Modelo de Usuario
│   └── __init__.py
├── controllers/
│   ├── auth.py          # Controlador de autenticación
│   └── __init__.py
├── routes/
│   ├── auth.py          # Rutas de autenticación
│   └── __init__.py
└── utils/
    ├── security.py      # Funciones de seguridad (JWT, hashing)
    ├── decorators.py    # Decoradores (token_required)
    └── __init__.py
```

## Endpoints

### Autenticación

**POST `/api/auth/register`** - Registrar usuario
```json
{
  "nombre": "Juan",
  "apellido": "Pérez",
  "identificacion": "cedula",
  "id_identificacion": "1234567890",
  "email": "juan@example.com",
  "misisdn": "3001234567",
  "direccion": "Calle 123",
  "fecha_de_nacimiento": "1990-01-15",
  "password": "segura123",
  "id_departamento": "1"
}
```

**POST `/api/auth/login`** - Iniciar sesión
```json
{
  "email": "juan@example.com",
  "password": "segura123"
}
```

**GET `/api/auth/profile`** - Obtener perfil (requiere token)
Headers: `Authorization: Bearer <token>`

**GET `/api/auth/users`** - Listar todos los usuarios (desarrollo)

**GET `/api/health`** - Verificar estado del servidor

## Desarrollo

- El servidor se reinicia automáticamente cuando cambias archivos (si DEBUG=True)
- Las contraseñas se hashean con bcrypt
- Los tokens JWT expiran en 7 días
- CORS está configurado para aceptar peticiones desde el frontend

## Notas de seguridad

- Cambiar `JWT_SECRET` y `SECRET_KEY` en producción
- Usar HTTPS en producción
- No pushar el archivo `.env` al repositorio
- Usar variables de entorno para credenciales sensibles
