import bcrypt
import jwt
from datetime import datetime, timedelta
from config.config import Config

class Security:
    """Clase para manejar seguridad: bcrypt y JWT"""
    
    @staticmethod
    def hash_password(password):
        """Hashea una contraseña usando bcrypt"""
        salt = bcrypt.gensalt(rounds=10)
        hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
        return hashed.decode('utf-8')
    
    @staticmethod
    def verify_password(password, hashed_password):
        """Verifica una contraseña contra su hash"""
        try:
            return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))
        except Exception:
            return False
    
    @staticmethod
    def generate_token(user_id):
        """Genera un JWT token"""
        payload = {
            'user_id': user_id,
            'exp': datetime.utcnow() + timedelta(seconds=Config.JWT_EXPIRY),
            'iat': datetime.utcnow()
        }
        token = jwt.encode(payload, Config.JWT_SECRET, algorithm='HS256')
        return token
    
    @staticmethod
    def verify_token(token):
        """Verifica y decodifica un JWT token"""
        try:
            payload = jwt.decode(token, Config.JWT_SECRET, algorithms=['HS256'])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
