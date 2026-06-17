from flask import Flask, jsonify
from flask_cors import CORS
from config.config import config
from routes.auth import auth_bp
import sys

def create_app():
    """Factory para crear la aplicación Flask"""
    app = Flask(__name__)
    
    # Configuración
    app.config['SECRET_KEY'] = config.SECRET_KEY
    app.config['DEBUG'] = config.DEBUG
    app.config['JSON_SORT_KEYS'] = False
    
    # CORS - Permitir peticiones desde el frontend
    CORS(app, 
        origins=[
            "http://localhost:5173",      # Vite (desarrollo)
            "http://localhost:3000",      # Node alternative
            "http://127.0.0.1:5173",      # Local
            "http://127.0.0.1:3000",
            "http://0.0.0.0:5173",
            "*"                            # Temporalmente permitir todos (comentar en producción)
        ],
        methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
        allow_headers=["Content-Type", "Authorization"],
        supports_credentials=True,
        max_age=86400
    )
    
    # Registrar blueprints
    app.register_blueprint(auth_bp)
    
    # Rutas de salud
    @app.route('/api/health', methods=['GET', 'OPTIONS'])
    def health():
        return jsonify({
            'status': 'OK', 
            'message': 'Backend is running',
            'debug': config.DEBUG,
            'database': config.DB_NAME
        }), 200
    
    @app.route('/api/ping', methods=['GET'])
    def ping():
        return jsonify({'pong': True}), 200
    
    # Manejador de errores global
    @app.errorhandler(404)
    def not_found(error):
        return jsonify({'success': False, 'message': 'Endpoint no encontrado'}), 404
    
    @app.errorhandler(500)
    def internal_error(error):
        return jsonify({'success': False, 'message': 'Error interno del servidor'}), 500
    
    @app.before_request
    def log_request():
        """Log de peticiones (útil para debugging)"""
        pass
    
    return app

if __name__ == '__main__':
    app = create_app()
    print(f"\n{'='*60}")
    print(f"🚀 RACCORD BACKEND - Iniciando...")
    print(f"{'='*60}")
    print(f"🌐 Host: {config.HOST}")
    print(f"🔌 Puerto: {config.PORT}")
    print(f"📚 Base de datos: {config.DB_NAME}")
    print(f"🐛 Debug mode: {config.DEBUG}")
    print(f"{'='*60}\n")
    app.run(host=config.HOST, port=config.PORT, debug=config.DEBUG)
