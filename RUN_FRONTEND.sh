#!/bin/bash
# Script para ejecutar el FRONTEND de RACCORD

clear

echo "========================================="
echo "  RACCORD FRONTEND - Iniciador"
echo "========================================="
echo ""

# Verificar que Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "ERROR: Node.js no está instalado"
    echo "Descargalo desde: https://nodejs.org/"
    exit 1
fi

echo "Node version:"
node --version
echo ""

echo "NPM version:"
npm --version
echo ""

# Ir a la carpeta raíz del proyecto
cd "$(dirname "$0")"

# Verificar que node_modules existe
if [ ! -d "node_modules" ]; then
    echo "Instalando dependencias..."
    npm install
    echo ""
fi

echo ""
echo "Iniciando frontend en modo desarrollo..."
echo "El servidor estará disponible en: http://localhost:5173"
echo ""

# Ejecutar el servidor de desarrollo
npm run dev
