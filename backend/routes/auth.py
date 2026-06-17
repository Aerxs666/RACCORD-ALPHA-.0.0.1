from flask import Blueprint, request, jsonify
from controllers.auth import AuthController
from utils.decorators import token_required

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
@token_required
def get_profile():
    """Endpoint para obtener el perfil del usuario autenticado"""
    try:
        result, status_code = AuthController.get_profile(request.user_id)
        return jsonify(result), status_code
    except Exception as e:
        return jsonify({'success': False, 'message': f'Error del servidor: {str(e)}'}), 500

@auth_bp.route('/profile', methods=['PUT'])
@token_required
def update_profile():
    """Endpoint para actualizar el perfil del usuario"""
    try:
        data = request.get_json()
        result, status_code = AuthController.update_profile(request.user_id, data)
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

@auth_bp.route('/health', methods=['GET'])
def health():
    """Endpoint para verificar que el servidor está activo"""
    return jsonify({'status': 'OK'}), 200
