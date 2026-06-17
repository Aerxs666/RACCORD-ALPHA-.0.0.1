import bcrypt
import jwt
from datetime import datetime, timedelta
from config.config import config

class Security:
    """Utilidades de seguridad"""
    
    @staticmethod
    def hash_password(password):
        """Genera un hash de la contraseña"""
        salt = bcrypt.gensalt()
        return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')
    
    @staticmethod
    def verify_password(password, password_hash):
        """Verifica si la contraseña coincide con el hash"""
        try:
            return bcrypt.checkpw(password.encode('utf-8'), password_hash.encode('utf-8'))
        except Exception:
            return False
    
    @staticmethod
    def generate_token(user_id):
        """Genera un token JWT"""
        payload = {
            'id_user': user_id,
            'exp': datetime.utcnow() + timedelta(days=7),
            'iat': datetime.utcnow()
        }
        return jwt.encode(payload, config.JWT_SECRET, algorithm=config.JWT_ALGORITHM)
    
    @staticmethod
    def verify_token(token):
        """Verifica y decodifica un token JWT"""
        try:
            payload = jwt.decode(token, config.JWT_SECRET, algorithms=[config.JWT_ALGORITHM])
            return payload
        except jwt.ExpiredSignatureError:
            return None
        except jwt.InvalidTokenError:
            return None
