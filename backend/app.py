from flask import Flask
from flask_cors import CORS
from config.config import Config
from routes.auth import auth_bp

def create_app():
    """Factory para crear la aplicación Flask"""
    app = Flask(__name__)
    
    # Configurar CORS
    CORS(app, resources={r"/api/*": {"origins": ["http://localhost:5173", "http://localhost:3000"]}})
    
    # Registrar blueprints
    app.register_blueprint(auth_bp)
    
    # Health check
    @app.route('/api/health', methods=['GET'])
    def health():
        return {'status': 'OK'}, 200
    
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host=Config.HOST, port=Config.PORT, debug=Config.DEBUG)
