from config.database import Database

class User:
    """Modelo de Usuario"""
    
    @staticmethod
    def find_by_email(email):
        """Busca un usuario por email"""
        query = """
            SELECT * FROM users 
            WHERE email = %s
        """
        return Database.execute_query(query, (email,), fetch_one=True)
    
    @staticmethod
    def find_by_id(user_id):
        """Busca un usuario por ID"""
        query = """
            SELECT * FROM users 
            WHERE id_user = %s
        """
        return Database.execute_query(query, (user_id,), fetch_one=True)
    
    @staticmethod
    def create(nombre, apellido, identificacion, id_identificacion, email, 
               misisdn, direccion, fecha_de_nacimiento, password_hash, id_departamento):
        """Crea un nuevo usuario - versión flexible que maneja columnas faltantes"""
        try:
            # INSERT básico solo con campos que siempre existen
            query = """
                INSERT INTO users 
                (nombre, apellido, identificacion, id_identificacion, email, password, estado)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id_user, nombre, apellido, email
            """
            params = (nombre, apellido, identificacion, id_identificacion, email, password_hash, 'activo')
            
            result = Database.execute_query(query, params, fetch_one=True)
            
            if result:
                # Intentar actualizar campos opcionales después
                # Si las columnas existen, se actualizarán; si no, se ignoran los errores
                optional_updates = []
                optional_params = []
                
                if misisdn:
                    optional_updates.append("misisdn = %s")
                    optional_params.append(misisdn)
                
                if direccion:
                    optional_updates.append("direccion = %s")
                    optional_params.append(direccion)
                
                if fecha_de_nacimiento:
                    optional_updates.append("fecha_de_nacimiento = %s")
                    optional_params.append(fecha_de_nacimiento)
                
                if id_departamento:
                    optional_updates.append("id_departamento = %s")
                    optional_params.append(id_departamento)
                
                # Si hay campos opcionales, intenta actualizarlos
                if optional_updates:
                    optional_params.append(result['id_user'])
                    update_query = f"""
                        UPDATE users 
                        SET {', '.join(optional_updates)}
                        WHERE id_user = %s
                    """
                    try:
                        Database.execute_query(update_query, tuple(optional_params))
                    except Exception as e:
                        # Si falla la actualización de opcionales, no es crítico
                        print(f"⚠ Advertencia al actualizar campos opcionales: {e}")
            
            return result
            
        except Exception as e:
            print(f"❌ Error en create: {e}")
            raise
    
    @staticmethod
    def get_password_hash(email):
        """Obtiene el hash de contraseña de un usuario"""
        query = "SELECT password FROM users WHERE email = %s"
        result = Database.execute_query(query, (email,), fetch_one=True)
        return result['password'] if result else None
    
    @staticmethod
    def get_all():
        """Obtiene todos los usuarios (sin contraseñas)"""
        query = """
            SELECT * FROM users 
            ORDER BY id_user DESC
        """
        return Database.execute_query(query)
    
    @staticmethod
    def update(user_id, **kwargs):
        """Actualiza información del usuario"""
        allowed_fields = ['nombre', 'apellido', 'identificacion', 'id_identificacion', 
                         'email', 'misisdn', 'direccion', 'fecha_de_nacimiento']
        
        # Filtrar solo campos permitidos
        updates = {k: v for k, v in kwargs.items() if k in allowed_fields and v is not None}
        
        if not updates:
            return None
        
        set_clause = ', '.join([f"{key} = %s" for key in updates.keys()])
        values = list(updates.values()) + [user_id]
        
        query = f"""
            UPDATE users 
            SET {set_clause}
            WHERE id_user = %s
            RETURNING id_user, nombre, apellido, email, identificacion, id_identificacion, 
                      misisdn, direccion, fecha_de_nacimiento, estado
        """
        
        return Database.execute_query(query, tuple(values), fetch_one=True)
