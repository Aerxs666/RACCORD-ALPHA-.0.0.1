from flask import Blueprint, request, jsonify
from controllers.auth import AuthController
from utils.security import Security

auth_bp = Blueprint('auth', __name__, url_prefix='/api/auth')

@auth_bp.route('/register', methods=['POST'])
def register():
    """Endpoint para registrar un nuevo usuario"""
    try:
        data = request.get_json()
        result, status_code = AuthController.register(data)
        return jsonify(result), status_code
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error del servidor: {str(e)}'}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    """Endpoint para iniciar sesión"""
    try:
        data = request.get_json()
        result, status_code = AuthController.login(data)
        return jsonify(result), status_code
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error del servidor: {str(e)}'}), 500

@auth_bp.route('/recover', methods=['POST'])
def recover():
    """Endpoint para recuperar cuenta"""
    try:
        data = request.get_json()
        result, status_code = AuthController.recover(data)
        return jsonify(result), status_code
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error del servidor: {str(e)}'}), 500

@auth_bp.route('/profile', methods=['GET'])
def get_profile():
    """Endpoint para obtener el perfil del usuario autenticado"""
    try:
        # Obtener token del header
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({'success': False, 'message': 'Token no enviado.'}), 401
        
        token = auth_header.split(' ')[1]
        
        # Verificar token
        payload = Security.verify_token(token)
        if not payload:
            return jsonify({'success': False, 'message': 'Token inválido o expirado.'}), 401
        
        # Obtener perfil
        result, status_code = AuthController.get_profile(payload['user_id'])
        return jsonify(result), status_code
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error del servidor: {str(e)}'}), 500

@auth_bp.route('/users', methods=['GET'])
def get_all_users():
    """Endpoint para ver todos los usuarios registrados (solo para desarrollo)"""
    try:
        result, status_code = AuthController.get_all_users()
        return jsonify(result), status_code
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error del servidor: {str(e)}'}), 500
