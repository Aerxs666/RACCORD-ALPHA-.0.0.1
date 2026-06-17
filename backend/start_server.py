#!/usr/bin/env python3
"""
Script para inicializar el backend sin necesidad de parámetros
Ejecutar: python start_server.py
"""

import subprocess
import sys
import os

def main():
    # Cambiar a directorio backend
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    print("=" * 60)
    print("🚀 RACCORD BACKEND - Iniciando servidor...")
    print("=" * 60)
    print()
    
    # Verificar que .env existe
    if not os.path.exists('.env'):
        print("⚠️  Archivo .env no encontrado!")
        print("   Creando .env desde .env.example...")
        if os.path.exists('.env.example'):
            with open('.env.example', 'r') as f:
                content = f.read()
            with open('.env', 'w') as f:
                f.write(content)
            print("✓ .env creado exitosamente")
        print()
    
    # Verificar imports
    print("📦 Verificando dependencias...")
    try:
        import flask
        import flask_cors
        import psycopg2
        import bcrypt
        import jwt
        print("✓ Todas las dependencias están instaladas")
    except ImportError as e:
        print(f"✗ Falta instalar: {e}")
        print("  Ejecuta: pip install -r requirements.txt")
        sys.exit(1)
    
    print()
    print("=" * 60)
    print("📋 Información del servidor:")
    print("=" * 60)
    
    # Leer .env
    env_vars = {}
    try:
        with open('.env', 'r') as f:
            for line in f:
                if line.strip() and not line.startswith('#'):
                    key, value = line.split('=', 1)
                    env_vars[key.strip()] = value.strip()
        
        print(f"🌐 Host: {env_vars.get('HOST', 'localhost')}")
        print(f"🔌 Puerto: {env_vars.get('PORT', '4000')}")
        print(f"📚 Base de Datos: {env_vars.get('DB_NAME', 'raccord_db')}")
        print(f"👤 Usuario BD: {env_vars.get('DB_USER', 'postgres')}")
        print(f"🖥️  Host BD: {env_vars.get('DB_HOST', 'localhost')}")
    except Exception as e:
        print(f"Nota: No se pudieron leer variables de .env ({e})")
    
    print()
    print("=" * 60)
    print("💡 PRÓXIMOS PASOS:")
    print("=" * 60)
    print()
    print("1. Asegúrate de que PostgreSQL esté corriendo")
    print("2. Crea la base de datos:")
    print("   psql -U postgres -d raccord_db -f ../database.sql")
    print()
    print("3. Si hay problemas, revisa:")
    print("   - Archivo .env (credenciales PostgreSQL)")
    print("   - BACKEND_QUICK_START.md (para más ayuda)")
    print()
    print("=" * 60)
    
    # Iniciar servidor
    print()
    print("🚀 Iniciando Flask...")
    print()
    
    subprocess.run([sys.executable, 'main.py'])

if __name__ == '__main__':
    main()
