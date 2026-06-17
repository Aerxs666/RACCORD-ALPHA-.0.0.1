# 🚀 Guía Rápida - Backend Raccord

## 1️⃣ Primeros pasos

### Verificar que todo está instalado
```powershell
python --version   # Debe ser 3.8+
pip list           # Debe mostrar Flask, bcrypt, PyJWT, etc.
```

### Verificar PostgreSQL
```powershell
# En PowerShell, verifica que PostgreSQL esté instalado
psql --version
```

## 2️⃣ Configuración de Base de Datos

### Crear la base de datos
```powershell
# Abre psql (si no está en PATH, usa la ruta completa)
psql -U postgres

# Dentro de psql:
CREATE DATABASE raccord_db;
\q

# Aplicar el schema
psql -U postgres -d raccord_db -f ../database.sql
```

### Verificar conexión (.env ya está configurado)
El archivo `.env` está listo con valores por defecto:
- Host: localhost
- Puerto: 5432
- Base: raccord_db
- Usuario: postgres
- Contraseña: postgres

Si tus credenciales de PostgreSQL son diferentes, edita `.env`

## 3️⃣ Ejecutar el Backend

```powershell
# Desde la carpeta RACCORD-ALPHA-.0.0.1
cd backend

# Ejecutar el servidor
python main.py
```

Deberías ver:
```
🚀 Servidor iniciado en http://127.0.0.1:4000
📦 Base de datos: raccord_db @ localhost:5432
 * Running on http://127.0.0.1:4000
```

## 4️⃣ Probar la API

### Registrar un usuario
```powershell
$body = @{
    nombre = "Juan"
    apellido = "Pérez"
    identificacion = "cedula"
    id_identificacion = "1234567890"
    email = "juan@example.com"
    misisdn = "3001234567"
    direccion = "Calle 123, Apt 45"
    fecha_de_nacimiento = "1990-01-15"
    password = "test123456"
    id_departamento = "1"
} | ConvertTo-Json

Invoke-WebRequest -Uri "http://localhost:4000/api/auth/register" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $body
```

### Iniciar sesión
```powershell
$login = @{
    email = "juan@example.com"
    password = "test123456"
} | ConvertTo-Json

$response = Invoke-WebRequest -Uri "http://localhost:4000/api/auth/login" `
  -Method POST `
  -Headers @{"Content-Type"="application/json"} `
  -Body $login

$response.Content | ConvertFrom-Json
```

### Ver todos los usuarios
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/auth/users" -Method GET
```

### Verificar que el servidor está activo
```powershell
Invoke-WebRequest -Uri "http://localhost:4000/api/health" -Method GET
```

## 5️⃣ Conectar con el Frontend

El frontend está en: `src/api/auth.js`

Ya está configurado para conectarse a:
- `http://localhost:4000/api/auth/register`
- `http://localhost:4000/api/auth/login`
- `http://localhost:4000/api/auth/profile`

El frontend utiliza Vite en puerto 5173

## 📋 Estructura Backend

```
backend/
├── app.py              # Factory de Flask (crea la app)
├── main.py             # Punto de entrada (ejecuta: python main.py)
├── config/
│   ├── config.py       # Carga variables de .env
│   └── database.py     # Conexión a PostgreSQL
├── models/
│   └── user.py         # Consultas SQL para usuarios
├── controllers/
│   └── auth.py         # Lógica de autenticación
├── routes/
│   └── auth.py         # Endpoints API
└── utils/
    ├── security.py     # JWT, bcrypt
    └── decorators.py   # @token_required
```

## 🔧 Troubleshooting

### Error: "pg_config executable not found"
- Instala PostgreSQL completo (no solo el cliente)
- O usa: `pip install psycopg2-binary`

### Error: "Cannot connect to database"
- Verifica que PostgreSQL está corriendo
- Verifica credenciales en `.env`
- Verifica que la base de datos existe: `psql -l`

### Error: "ModuleNotFoundError"
- Asegúrate de estar en la carpeta correcta
- Verifica que las carpetas tienen `__init__.py`

### El servidor inicia pero no conecta
- Verifica CORS: debe permitir `http://localhost:5173`
- Verifica que el frontend envía requests al puerto 4000

## 📝 Endpoints Disponibles

| Método | Endpoint | Requiere Token | Descripción |
|--------|----------|---|---|
| POST | `/api/auth/register` | No | Registrar usuario |
| POST | `/api/auth/login` | No | Iniciar sesión |
| GET | `/api/auth/profile` | Sí | Ver perfil |
| GET | `/api/auth/users` | No | Listar usuarios |
| GET | `/api/health` | No | Verificar servidor |

## 🔐 Seguridad

- Las contraseñas se hashean con bcrypt
- Los tokens JWT expiran en 7 días
- CORS solo permite frontend local
- Cambiar JWT_SECRET en producción

¡Listo! 🎉
