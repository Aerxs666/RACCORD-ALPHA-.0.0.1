from functools import wraps
from flask import request, jsonify
from utils.security import Security

def token_required(f):
    """Decorador para proteger rutas que requieren autenticación"""
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        
        # Buscar el token en el header Authorization
        if 'Authorization' in request.headers:
            auth_header = request.headers['Authorization']
            try:
                token = auth_header.split(" ")[1]
            except IndexError:
                return jsonify({'success': False, 'message': 'Token inválido.'}), 401
        
        if not token:
            return jsonify({'success': False, 'message': 'Token faltante.'}), 401
        
        # Verificar el token
        payload = Security.verify_token(token)
        if not payload:
            return jsonify({'success': False, 'message': 'Token expirado o inválido.'}), 401
        
        request.user_id = payload['id_user']
        return f(*args, **kwargs)
    
    return decorated
