import hashlib
import re
from datetime import datetime, timedelta
import jwt
from config.config import config
from models.user import User
from utils.security import Security

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
        required_fields = ['nombre', 'apellido', 'email', 'password']
        
        for field in required_fields:
            if not data.get(field):
                return {'success': False, 'message': f'El campo {field} es obligatorio.'}, 400
        
        if not AuthController.validate_email(data['email']):
            return {'success': False, 'message': 'Email inválido.'}, 400
        
        if len(data['password']) < 6:
            return {'success': False, 'message': 'La contraseña debe tener al menos 6 caracteres.'}, 400
        
        # Verificar si el usuario ya existe
        try:
            existing_user = User.find_by_email(data['email'])
            if existing_user:
                return {'success': False, 'message': 'El email ya está registrado.'}, 409
        except Exception as e:
            print(f"Error verificando email: {e}")
            return {'success': False, 'message': f'Error en la base de datos: {str(e)}'}, 500
        
        # Hashear contraseña
        password_hash = Security.hash_password(data['password'])
        
        # Crear usuario
        try:
            user = User.create(
                nombre=data['nombre'],
                apellido=data['apellido'],
                identificacion=data.get('identificacion', ''),
                id_identificacion=data.get('id_identificacion', ''),
                email=data['email'],
                misisdn=data.get('misisdn', ''),
                direccion=data.get('direccion', ''),
                fecha_de_nacimiento=data.get('fecha_de_nacimiento'),
                password_hash=password_hash,
                id_departamento=data.get('id_departamento')
            )
            
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
            error_msg = str(e)
            print(f"❌ Error registrando usuario: {error_msg}")
            
            # Mensajes más específicos para errores comunes
            if "does not exist" in error_msg:
                return {'success': False, 'message': f'Error de estructura de base de datos. Contacta al administrador.'}, 500
            elif "unique" in error_msg.lower():
                return {'success': False, 'message': 'Este email ya está registrado.'}, 409
            else:
                return {'success': False, 'message': f'Error: {error_msg}'}, 500
    
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
            return {'success': False, 'message': 'Email es obligatorio.'}, 400
        
        user = User.find_by_email(data['email'])
        if not user:
            # No revelar si el email existe o no
            return {'success': True, 'message': 'Si el email existe, recibirás instrucciones de recuperación.'}, 200
        
        # Aquí iría la lógica para enviar email
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
                'email': user['email'],
                'identificacion': user.get('identificacion'),
                'id_identificacion': user.get('id_identificacion'),
                'misisdn': user.get('misisdn'),
                'direccion': user.get('direccion'),
                'fecha_de_nacimiento': user.get('fecha_de_nacimiento')
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
    
    @staticmethod
    def update_profile(user_id, data):
        """Actualiza el perfil del usuario"""
        try:
            # Validaciones básicas
            if data.get('email'):
                if not AuthController.validate_email(data['email']):
                    return {'success': False, 'message': 'Email inválido.'}, 400
                
                # Verificar que el nuevo email no esté en uso
                existing = User.find_by_email(data['email'])
                if existing and existing['id_user'] != user_id:
                    return {'success': False, 'message': 'El email ya está en uso.'}, 409
            
            # Actualizar usuario
            user = User.update(user_id, **data)
            
            if not user:
                return {'success': False, 'message': 'Usuario no encontrado.'}, 404
            
            return {
                'success': True,
                'message': 'Perfil actualizado exitosamente.',
                'user': {
                    'id_user': user['id_user'],
                    'nombre': user['nombre'],
                    'apellido': user['apellido'],
                    'email': user['email'],
                    'identificacion': user.get('identificacion'),
                    'id_identificacion': user.get('id_identificacion'),
                    'misisdn': user.get('misisdn'),
                    'direccion': user.get('direccion'),
                    'fecha_de_nacimiento': user.get('fecha_de_nacimiento')
                }
            }, 200
        except Exception as e:
            error_msg = str(e)
            print(f"❌ Error actualizando perfil: {error_msg}")
            if "unique" in error_msg.lower():
                return {'success': False, 'message': 'Este email ya está en uso.'}, 409
            return {'success': False, 'message': f'Error: {error_msg}'}, 500
