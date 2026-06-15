from config.database import Database

class User:
    """Modelo de Usuario"""
    
    @staticmethod
    def find_by_email(email):
        """Busca un usuario por email"""
        query = "SELECT id_user, nombre, apellido, email, estado FROM users WHERE email = %s"
        return Database.execute_query(query, (email,), fetch_one=True)
    
    @staticmethod
    def find_by_id(user_id):
        """Busca un usuario por ID"""
        query = "SELECT id_user, nombre, apellido, email, estado FROM users WHERE id_user = %s"
        return Database.execute_query(query, (user_id,), fetch_one=True)
    
    @staticmethod
    def create(nombre, apellido, email, password_hash):
        """Crea un nuevo usuario"""
        query = """
            INSERT INTO users (nombre, apellido, email, password_hash, estado, fecha_creacion)
            VALUES (%s, %s, %s, %s, 'activo', NOW())
            RETURNING id_user, nombre, apellido, email
        """
        result = Database.execute_query(query, (nombre, apellido, email, password_hash), fetch_one=True)
        return result
    
    @staticmethod
    def get_password_hash(email):
        """Obtiene el hash de contraseña de un usuario"""
        query = "SELECT password_hash FROM users WHERE email = %s"
        result = Database.execute_query(query, (email,), fetch_one=True)
        if result:
            return result.get('password_hash')
        return None
    
    @staticmethod
    def get_all():
        """Obtiene todos los usuarios (sin contraseñas)"""
        query = "SELECT id_user, nombre, apellido, email, estado FROM users ORDER BY id_user"
        return Database.execute_query(query, fetch_all=True)
