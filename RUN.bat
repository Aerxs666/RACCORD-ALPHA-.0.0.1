@echo off
REM Script maestro para ejecutar RACCORD completo
REM REQUIERE: Dos terminales PowerShell

cls
echo.
echo =====================================================
echo   RACCORD - Guía de Ejecución
echo =====================================================
echo.
echo Este script te muestra cómo ejecutar el proyecto.
echo.

echo REQUISITOS:
echo  [1] PostgreSQL instalado y corriendo
echo  [2] Base de datos 'postgres' en Supabase
echo  [3] Python 3.8+ instalado
echo  [4] Node.js v16+ instalado
echo  [5] Dependencias Python: pip install -r backend/requirements.txt
echo  [6] Dependencias Node: npm install
echo.

echo =====================================================
echo   PASO 1: ABRIR TERMINAL #1 (Backend)
echo =====================================================
echo.
echo Abre una terminal PowerShell y ejecuta:
echo.
echo    cd RACCORD-ALPHA-.0.0.1\backend
echo    python main.py
echo.
echo Deberías ver:
echo    🚀 RACCORD BACKEND - Iniciando...
echo    ✓ Backend is running en http://localhost:4000
echo.

echo =====================================================
echo   PASO 2: ABRIR TERMINAL #2 (Frontend)
echo =====================================================
echo.
echo Abre OTRA terminal PowerShell y ejecuta:
echo.
echo    cd RACCORD-ALPHA-.0.0.1
echo    npm run dev
echo.
echo Deberías ver:
echo    ➜  Local:   http://localhost:5173/
echo.

echo =====================================================
echo   PASO 3: PROBAR LA APLICACIÓN
echo =====================================================
echo.
echo 1. Abre tu navegador: http://localhost:5173
echo 2. Deberías ver la página de login/registro
echo 3. Intenta registrar un usuario
echo 4. Si funciona, ¡felicidades! 🎉
echo.

echo =====================================================
echo   ESTADO ACTUAL
echo =====================================================
echo.

REM Verificar Python
python --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Python NO está instalado
) else (
    echo ✓ Python está instalado
    python --version
)

REM Verificar Node
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js NO está instalado
) else (
    echo ✓ Node.js está instalado
    node --version
)

REM Verificar npm
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm NO está disponible
) else (
    echo ✓ npm está disponible
    npm --version
)

REM Verificar .env backend
if exist "backend\.env" (
    echo ✓ Backend .env configurado
) else (
    echo ❌ Backend .env NO encontrado
)

REM Verificar node_modules
if exist "node_modules" (
    echo ✓ Dependencias Node instaladas
) else (
    echo ❌ Dependencias Node NO instaladas
    echo    Ejecuta: npm install
)

echo.
echo =====================================================
echo   COMANDOS RÁPIDOS
echo =====================================================
echo.
echo Backend:
echo   cd backend
echo   python main.py
echo.
echo Frontend:
echo   npm run dev
echo.
echo Ver todos los usuarios (API):
echo   http://localhost:4000/api/auth/users
echo.
echo Verificar backend:
echo   http://localhost:4000/api/health
echo.

echo =====================================================
echo   DOCUMENTACIÓN
echo =====================================================
echo.
echo Archivos útiles:
echo   - START_HERE.md (Guía completa)
echo   - BACKEND_QUICK_START.md (Guía rápida backend)
echo   - backend/README.md (Documentación backend)
echo.

pause
