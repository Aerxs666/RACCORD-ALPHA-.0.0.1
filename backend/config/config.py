import os
from dotenv import load_dotenv

# Cargar variables de entorno desde .env
load_dotenv()

class Config:
    """Configuración de la aplicación"""
    # Base de datos
    DB_HOST = os.getenv('DB_HOST', 'localhost')
    DB_PORT = int(os.getenv('DB_PORT', '5432'))
    DB_NAME = os.getenv('DB_NAME', 'raccord_db')
    DB_USER = os.getenv('DB_USER', 'postgres')
    DB_PASSWORD = os.getenv('DB_PASSWORD', 'password')
    DB_SSLMODE = os.getenv('PGSSLMODE', 'prefer')  # Para Supabase: 'require'
    
    # JWT
    JWT_SECRET = os.getenv('JWT_SECRET', 'tu-clave-secreta-aqui')
    JWT_ALGORITHM = 'HS256'
    
    # Flask
    SECRET_KEY = os.getenv('SECRET_KEY', 'dev-secret-key')
    DEBUG = os.getenv('DEBUG', 'False').lower() in ('true', '1', 'yes')
    
    # Server
    HOST = os.getenv('HOST', '0.0.0.0')
    PORT = int(os.getenv('PORT', 4000))

config = Config()
