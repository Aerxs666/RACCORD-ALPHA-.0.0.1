@echo off
REM Script para ejecutar el FRONTEND de RACCORD con NPM

cls
echo.
echo ========================================
echo   RACCORD FRONTEND - Iniciador
echo ========================================
echo.

REM Verificar que Node.js está instalado
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js no está instalado
    echo Descargalo desde: https://nodejs.org/
    pause
    exit /b 1
)

echo Node version:
node --version
echo.

REM Verificar que npm está instalado
npm --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: npm no está disponible
    pause
    exit /b 1
)

echo NPM version:
npm --version
echo.

REM Ir a la carpeta raíz del proyecto
cd /d "%~dp0"

REM Verificar que node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    call npm install
    echo.
)

echo.
echo Iniciando frontend en modo desarrollo...
echo El servidor estará disponible en: http://localhost:5173
echo.

REM Ejecutar el servidor de desarrollo
call npm run dev

pause
