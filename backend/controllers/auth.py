from models.user import User
from utils.security import Security
import re

class AuthController:
    """Controlador para autenticación"""
    
    @staticmethod
    def validate_email(email):
        """Valida el formato de email"""
        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        return re.match(pattern, email) is not None
    
    @staticmethod
    def register(data):
        """Registra un nuevo usuario"""
        # Validaciones
        if not data.get('nombre') or not data.get('apellido') or not data.get('email') or not data.get('password'):
            return {'success': False, 'message': 'Faltan datos obligatorios.'}, 400
        
        if not AuthController.validate_email(data['email']):
            return {'success': False, 'message': 'Email inválido.'}, 400
        
        if len(data['password']) < 6:
            return {'success': False, 'message': 'La contraseña debe tener al menos 6 caracteres.'}, 400
        
        # Verificar si el usuario ya existe
        existing_user = User.find_by_email(data['email'])
        if existing_user:
            return {'success': False, 'message': 'El email ya está registrado.'}, 409
        
        # Hashear contraseña
        password_hash = Security.hash_password(data['password'])
        
        # Crear usuario
        try:
            user = User.create(data['nombre'], data['apellido'], data['email'], password_hash)
            
            if user:
                token = Security.generate_token(user['id_user'])
                return {
                    'success': True,
                    'message': 'Usuario registrado exitosamente.',
                    'user': {
                        'id_user': user['id_user'],
                        'nombre': user['nombre'],
                        'apellido': user['apellido'],
                        'email': user['email']
                    },
                    'token': token
                }, 201
            else:
                return {'success': False, 'message': 'Error al crear el usuario.'}, 500
        except Exception as e:
            return {'success': False, 'message': f'Error: {str(e)}'}, 500
    
    @staticmethod
    def login(data):
        """Inicia sesión de un usuario"""
        # Validaciones
        if not data.get('email') or not data.get('password'):
            return {'success': False, 'message': 'Email y contraseña son obligatorios.'}, 400
        
        # Buscar usuario
        user = User.find_by_email(data['email'])
        if not user:
            return {'success': False, 'message': 'Credenciales inválidas.'}, 401
        
        # Verificar contraseña
        password_hash = User.get_password_hash(data['email'])
        if not password_hash or not Security.verify_password(data['password'], password_hash):
            return {'success': False, 'message': 'Credenciales inválidas.'}, 401
        
        # Generar token
        token = Security.generate_token(user['id_user'])
        
        return {
            'success': True,
            'message': 'Login exitoso.',
            'user': {
                'id_user': user['id_user'],
                'nombre': user['nombre'],
                'apellido': user['apellido'],
                'email': user['email']
            },
            'token': token
        }, 200
    
    @staticmethod
    def recover(data):
        """Recupera cuenta por correo"""
        if not data.get('email'):
            return {'success': False, 'message': 'El email es obligatorio.'}, 400
        
        if not AuthController.validate_email(data['email']):
            return {'success': False, 'message': 'Email inválido.'}, 400
        
        user = User.find_by_email(data['email'])
        if not user:
            return {
                'success': True,
                'message': 'Si el correo existe en nuestros registros, recibirás instrucciones para recuperar tu cuenta.'
            }, 200
        
        # Placeholder: aquí se debería generar token de recuperación y enviar email.
        return {
            'success': True,
            'message': 'Se han enviado las instrucciones de recuperación al correo proporcionado.'
        }, 200
    
    @staticmethod
    def get_profile(user_id):
        """Obtiene el perfil del usuario autenticado"""
        user = User.find_by_id(user_id)
        
        if not user:
            return {'success': False, 'message': 'Usuario no encontrado.'}, 404
        
        return {
            'success': True,
            'user': {
                'id_user': user['id_user'],
                'nombre': user['nombre'],
                'apellido': user['apellido'],
                'email': user['email']
            }
        }, 200
    
    @staticmethod
    def get_all_users():
        """Obtiene lista de todos los usuarios (solo para desarrollo)"""
        try:
            users = User.get_all()
            
            return {
                'success': True,
                'message': f'{len(users)} usuarios encontrados.',
                'users': users
            }, 200
        except Exception as e:
            return {'success': False, 'message': f'Error: {str(e)}'}, 500
