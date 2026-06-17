# 🚀 CÓMO EJECUTAR RACCORD - Guía Final

## ✅ Checklist Previo

Antes de iniciar, verifica que tienes todo:

- [x] Python 3.8+ instalado (`python --version`)
- [x] Node.js v16+ instalado (`node --version`)
- [x] PostgreSQL/Supabase configurado en `.env`
- [x] Dependencias Python instaladas: `pip install -r backend/requirements.txt`
- [x] Dependencias Node instaladas: `npm install`
- [x] Archivo `.env` actualizado con credenciales reales

## 🎯 Paso 1: Verificar Configuración

```powershell
# Verifica que tu .env está correcto
cat backend/.env
```

Deberías ver algo así (con TUS valores):
```
DB_HOST=aws-1-sa-east-1.pooler.supabase.com
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres.xxxxx
DB_PASSWORD=xxxxx
PGSSLMODE=require
JWT_SECRET=xxxxx
HOST=0.0.0.0
PORT=4000
DEBUG=False
```

## 🎯 Paso 2: Abrir Terminal #1 (Backend)

**Abre PowerShell #1:**

```powershell
# 1. Navega a la carpeta del backend
cd C:\Users\carlo\Downloads\RACCORD-2\RACCORD-ALPHA-.0.0.1\backend

# 2. Ejecuta el servidor
python main.py
```

**Deberías ver en la consola:**
```
============================================================
🚀 RACCORD BACKEND - Iniciando...
============================================================
🌐 Host: 0.0.0.0
🔌 Puerto: 4000
📚 Base de datos: postgres
🐛 Debug mode: False
============================================================

✓ Abre en el navegador: http://localhost:4000/api/health
✓ Frontend debe estar en: http://localhost:5173
============================================================

 * Running on http://0.0.0.0:4000
 * WARNING: This is a development server. Do not use it in production.
```

✅ **Si ves esto, el backend está corriendo correctamente**

Si hay error de conexión:
- Verifica que Supabase está corriendo
- Verifica credenciales en `.env`
- Verifica que tienes internet (Supabase es en la nube)

## 🎯 Paso 3: Abrir Terminal #2 (Frontend)

**Abre PowerShell #2 (NUEVA terminal, no en la del backend):**

```powershell
# 1. Navega a la carpeta raíz del proyecto
cd C:\Users\carlo\Downloads\RACCORD-2\RACCORD-ALPHA-.0.0.1

# 2. Ejecuta el servidor frontend
npm run dev
```

**Deberías ver en la consola:**
```
  VITE v8.0.12  ready in xxx ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

✅ **Si ves esto, el frontend está corriendo correctamente**

## 🎯 Paso 4: Probar la Aplicación

### En el Navegador

1. **Abre:** `http://localhost:5173`

2. Deberías ver:
   - Página de login con dos pestañas: "Ingresar" y "Registrar"
   - Logo de Raccord
   - Formulario de login/registro

3. **Haz clic en "Registrar"**

4. **Completa el formulario:**
   - Nombres: Juan
   - Apellidos: Pérez
   - Tipo de Identificación: Cédula
   - Número de Identificación: 1234567890
   - Email: juan@test.com
   - Celular: 3001234567
   - Dirección: Calle 123, Apt 45
   - Fecha de Nacimiento: 1990-01-15
   - Departamento: (selecciona uno)
   - Contraseña: test123456
   - Confirmar: test123456

5. **Haz clic en "Registrar"**

### Lo que debería pasar:

✅ **Si funciona correctamente:**
- Ves un mensaje de éxito
- Te redirige al dashboard
- Ves tu nombre y información

❌ **Si hay error:**
- Ve a la Terminal #2 (Frontend) y mira si hay errores
- Presiona F12 en el navegador → Network → verifica que las peticiones van a `http://localhost:4000/api/auth/register`

## 🔍 Verificar que Todo Funciona

### Test Backend en PowerShell

**Abre otra terminal PowerShell:**

```powershell
# Verificar que el backend responde
Invoke-WebRequest -Uri "http://localhost:4000/api/health" -Method GET

# Deberías ver:
# StatusCode        : 200
# Content           : {"status":"OK","message":"Backend is running",...}
```

### Ver Usuarios Registrados

```powershell
# Listar todos los usuarios
Invoke-WebRequest -Uri "http://localhost:4000/api/auth/users" -Method GET

# Deberías ver tu usuario registrado en JSON
```

## 📋 Estructura de Ejecución

```
TU MÁQUINA
│
├─ Terminal #1 (Backend)
│  ├─ Puerto: 4000
│  ├─ URL: http://localhost:4000/api
│  └─ Estado: 🟢 Running
│
├─ Terminal #2 (Frontend)
│  ├─ Puerto: 5173
│  ├─ URL: http://localhost:5173
│  └─ Estado: 🟢 Running
│
└─ Navegador
   ├─ URL: http://localhost:5173
   └─ Conecta a Backend en: http://localhost:4000/api/auth/*
```

## 🛑 Detener los Servidores

**Para Backend (Terminal #1):**
```
Presiona: Ctrl + C
```

**Para Frontend (Terminal #2):**
```
Presiona: Ctrl + C
```

## ⚠️ Problemas Comunes

### "Cannot connect to database"
```
❌ La conexión a Supabase falla

✓ Soluciones:
  1. Verifica que tienes internet
  2. Verifica credenciales en backend/.env
  3. Verifica que la base de datos existe en Supabase
  4. Verifica que el usuario tiene permisos
```

### "Port 4000 already in use"
```
❌ El puerto 4000 ya está en uso

✓ Soluciones:
  1. Cierra la Terminal #1 anterior (si existe)
  2. O cambia PORT=5000 en backend/.env
  3. O ejecuta: Get-Process -Name python | Stop-Process -Force
```

### "Module not found"
```
❌ Faltan dependencias Python

✓ Soluciones:
  cd backend
  pip install -r requirements.txt
```

### Frontend no se conecta a Backend
```
❌ Los requests no llegan al backend

✓ Soluciones:
  1. Verifica que Backend está running (Terminal #1)
  2. Presiona F12 en el navegador
  3. Abre tab Network
  4. Intenta registrarte
  5. Verifica que ves requests a http://localhost:4000/api/...
```

## 📚 Archivos de Referencia

| Archivo | Descripción |
|---------|-------------|
| `backend/main.py` | Punto de entrada Backend |
| `backend/app.py` | Configuración Flask |
| `backend/.env` | Variables de entorno Backend |
| `backend/README.md` | Documentación Backend |
| `src/api/auth.js` | Cliente API Frontend |
| `src/componentes/login/login.jsx` | Formulario Login/Registro |
| `START_HERE.md` | Guía inicial completa |
| `BACKEND_QUICK_START.md` | Guía rápida Backend |

## 🎓 Tech Stack

**Backend:**
- Python 3
- Flask (Web Framework)
- PostgreSQL (Database) - en Supabase
- bcrypt (Password Security)
- JWT (Authentication)

**Frontend:**
- React 19
- Vite (Build Tool)
- Bootstrap 5
- JavaScript (ES6)

## ✨ Próximos Pasos

Una vez que todo funciona:

1. **Explorar Dashboard:** Registra más usuarios, haz login, ve al dashboard
2. **Base de Datos:** Verifica los registros en Supabase SQL Editor
3. **Personalización:** Modifica estilos en CSS, agrega más campos, etc.
4. **Deployment:** Cuando esté listo, despliega a producción

## 🆘 Ayuda Adicional

Si algo no funciona:

1. **Lee los archivos:**
   - START_HERE.md
   - BACKEND_QUICK_START.md
   - backend/README.md

2. **Revisa los logs:**
   - Terminal Backend: busca mensajes de error
   - Navegador F12 → Console: busca errores JavaScript
   - Navegador F12 → Network: busca requests fallidas

3. **Verifica la BD:**
   - Abre Supabase Dashboard
   - Verifica que la tabla `users` existe
   - Verifica que tienes registros insertados

## 🎉 Success!

Si llegaste aquí y todo funciona, **¡FELICIDADES!**

Tu aplicación Raccord está:
✅ Backend corriendo en `http://localhost:4000`
✅ Frontend corriendo en `http://localhost:5173`
✅ Base de datos conectada a Supabase
✅ Login/Registro funcionando
✅ Usuarios siendo almacenados

¡A disfrutarlo! 🚀
