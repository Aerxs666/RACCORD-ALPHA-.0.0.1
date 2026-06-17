import sys
import os

# Agregar el directorio backend al path para que encuentre los imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

try:
    from app import create_app
    from config.config import config
except ImportError as e:
    print(f"❌ Error importando módulos: {e}")
    print("   Asegúrate de estar en la carpeta backend/")
    print("   Y que las dependencias están instaladas: pip install -r requirements.txt")
    sys.exit(1)

if __name__ == '__main__':
    try:
        app = create_app()
        print(f"\n{'='*60}")
        print(f"🚀 RACCORD BACKEND - Iniciando...")
        print(f"{'='*60}")
        print(f"🌐 Host: {config.HOST}")
        print(f"🔌 Puerto: {config.PORT}")
        print(f"📚 Base de datos: {config.DB_NAME}")
        print(f"🐛 Debug mode: {config.DEBUG}")
        print(f"{'='*60}")
        print(f"\n✓ Abre en el navegador: http://localhost:{config.PORT}/api/health")
        print(f"✓ Frontend debe estar en: http://localhost:5173")
        print(f"{'='*60}\n")
        
        app.run(host=config.HOST, port=config.PORT, debug=config.DEBUG)
    except Exception as e:
        print(f"\n❌ Error fatal: {e}")
        sys.exit(1)
