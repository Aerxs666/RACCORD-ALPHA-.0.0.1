# 🎯 GUÍA COMPLETA - EJECUTAR RACCORD

Este documento muestra cómo ejecutar el proyecto completo (Frontend + Backend).

## 📋 Checklist Pre-Inicio

- [ ] PostgreSQL instalado y corriendo
- [ ] Base de datos `raccord_db` creada
- [ ] Tabla `users` importada desde `database.sql`
- [ ] Archivo `backend/.env` configurado
- [ ] Dependencias Python instaladas (`pip install -r backend/requirements.txt`)
- [ ] Dependencias Node instaladas (`npm install`)

## 🚀 OPCIÓN 1: Iniciar ambos servicios (2 terminales)

### Terminal 1: Backend

```powershell
# 1. Navega a la carpeta del proyecto
cd C:\Users\carlo\Downloads\RACCORD-2\RACCORD-ALPHA-.0.0.1

# 2. Inicia el backend
cd backend
python start_server.py

# Deberías ver:
# 🚀 Servidor iniciado en http://127.0.0.1:4000
# 📦 Base de datos: raccord_db @ localhost:5432
# * Running on http://127.0.0.1:4000
```

### Terminal 2: Frontend

```powershell
# 1. Abre una nueva terminal PowerShell

# 2. Navega a la carpeta del proyecto
cd C:\Users\carlo\Downloads\RACCORD-2\RACCORD-ALPHA-.0.0.1

# 3. Inicia el frontend
npm run dev

# Deberías ver:
#   VITE v8.x.x  ready in xxx ms
#   ➜  Local:   http://localhost:5173/
#   ➜  press h to show help
```

## 🧪 Probar que funciona

### 1. Abrir el navegador

```
http://localhost:5173
```

Deberías ver la página de login/registro de Raccord

### 2. Registrar un usuario

- Haz clic en la pestaña "Registrar"
- Completa el formulario:
  - **Nombres**: Juan
  - **Apellidos**: Pérez
  - **Tipo de Identificación**: Cédula
  - **Número de Identificación**: 1234567890
  - **Email**: juan@test.com
  - **Celular**: 3001234567
  - **Dirección**: Calle Principal 123
  - **Fecha de Nacimiento**: 1990-01-15
  - **Departamento**: (Selecciona uno)
  - **Contraseña**: test123456
  - **Confirmar**: test123456
- Haz clic en "Registrar"

### 3. Verificar en la Base de Datos

```powershell
# Abre otra terminal
psql -U postgres -d raccord_db

# En psql:
SELECT * FROM users;

# Deberías ver el usuario que acabas de crear
```

### 4. Probar login

- En el navegador, vuelve a la pestaña "Ingresar"
- Ingresa:
  - **Email**: juan@test.com
  - **Contraseña**: test123456
- Haz clic en "Ingresar"

Deberías ver el dashboard del usuario 🎉

## 📡 Verificar Conexión API

### Desde PowerShell

```powershell
# 1. Verificar que el backend está activo
Invoke-WebRequest -Uri "http://localhost:4000/api/health" -Method GET

# Respuesta esperada:
# StatusCode        : 200
# Content           : {"status":"OK","message":"Backend is running"}

# 2. Ver todos los usuarios registrados
Invoke-WebRequest -Uri "http://localhost:4000/api/auth/users" -Method GET

# Respuesta esperada:
# {
#   "success": true,
#   "message": "1 usuarios encontrados.",
#   "users": [
#     {
#       "id_user": 1,
#       "nombre": "Juan",
#       "apellido": "Pérez",
#       "email": "juan@test.com",
#       ...
#     }
#   ]
# }
```

## 🛠️ Comandos Útiles

### Frontend

```powershell
# Desarrollar (con hot-reload)
npm run dev

# Compilar para producción
npm run build

# Preview de la compilación
npm run preview

# Linting
npm run lint
```

### Backend

```powershell
# Ejecutar con validaciones automáticas
python backend/start_server.py

# Ejecutar directamente
python backend/main.py

# Instalar dependencias
pip install -r backend/requirements.txt

# Actualizar requirements
pip freeze > backend/requirements.txt
```

### Base de Datos

```powershell
# Conectar a PostgreSQL
psql -U postgres

# Ver todas las bases de datos
\l

# Conectar a raccord_db
\c raccord_db

# Ver todas las tablas
\dt

# Ver estructura de tabla users
\d users

# Ver usuarios
SELECT * FROM users;

# Salir
\q
```

## 🔄 Flujo Completo de Funcionalidad

```
[Usuario en Frontend] → [Formulario de Registro]
         ↓
[Frontend: src/api/auth.js] → [POST http://localhost:4000/api/auth/register]
         ↓
[Backend: routes/auth.py] → [controllers/auth.py]
         ↓
[Validar datos] → [Hashear contraseña con bcrypt]
         ↓
[models/user.py] → [INSERT INTO users]
         ↓
[PostgreSQL: raccord_db.users]
         ↓
[Respuesta: JWT token + user data]
         ↓
[Frontend: localStorage.setItem('authToken', token)]
         ↓
[Dashboard del Usuario]
```

## 🐛 Troubleshooting

### "Cannot connect to database"
```powershell
# Verificar que PostgreSQL está corriendo
# En Windows, busca "Services" y asegúrate que PostgreSQL está iniciado

# Verificar credenciales en backend/.env
# Edita DB_HOST, DB_PORT, DB_USER, DB_PASSWORD
```

### "ModuleNotFoundError: No module named 'flask'"
```powershell
# Instala las dependencias
cd backend
pip install -r requirements.txt
```

### "Port 4000 is already in use"
```powershell
# Cambia el puerto en backend/.env
# O mata el proceso anterior:
Get-Process -Name python | Stop-Process -Force
```

### "Frontend no se conecta a backend"
```powershell
# Verifica que:
# 1. Backend está corriendo en puerto 4000
# 2. Frontend está corriendo en puerto 5173
# 3. CORS está configurado (revisar backend/app.py)
# 4. Abre DevTools (F12) → Network → verifica que las requests llegan a /api/...
```

## 📚 Archivos Importantes

| Archivo | Propósito |
|---------|-----------|
| `src/api/auth.js` | Cliente API del frontend |
| `src/componentes/login/login.jsx` | Formulario de registro/login |
| `backend/app.py` | Factory de Flask |
| `backend/main.py` | Punto de entrada backend |
| `backend/.env` | Variables de entorno |
| `backend/routes/auth.py` | Endpoints API |
| `database.sql` | Script de base de datos |
| `BACKEND_QUICK_START.md` | Guía rápida backend |

## 🎓 Stack Tecnológico

### Frontend
- **React 19.2.6** - UI
- **Vite 8.0.12** - Build tool
- **Bootstrap 5.3.8** - Estilos
- **JavaScript (ES6)** - Lenguaje

### Backend
- **Python 3.8+** - Lenguaje
- **Flask 3.1.3** - Framework web
- **PostgreSQL** - Base de datos
- **bcrypt** - Seguridad
- **JWT** - Autenticación

## 📞 Soporte

Si algo no funciona:

1. Revisa los archivos de documentación:
   - `BACKEND_QUICK_START.md`
   - `BACKEND_SETUP_COMPLETE.md`
   - `backend/README.md`

2. Verifica que:
   - PostgreSQL está corriendo
   - Puertos 4000 (backend) y 5173 (frontend) están libres
   - Las credenciales de BD son correctas
   - Las dependencias están instaladas

3. Revisa la consola:
   - Terminal del backend: errores de conexión BD
   - DevTools del frontend (F12): errores CORS

## ✅ Success Checklist

- [ ] Puedes registrarte en el frontend
- [ ] Los datos aparecen en la BD
- [ ] Puedes hacer login
- [ ] Ves el dashboard después de login
- [ ] Puedes ver tu perfil
- [ ] La API responde en `http://localhost:4000/api/health`

¡Disfruta! 🎉
