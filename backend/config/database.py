import psycopg2
from psycopg2.extras import RealDictCursor
from config.config import config
import sys

class Database:
    """Gestiona la conexión a PostgreSQL"""
    
    _connection = None
    
    @classmethod
    def get_connection(cls):
        """Obtiene la conexión a la base de datos"""
        if cls._connection is None or cls._connection.closed:
            try:
                # Construir parámetros de conexión
                conn_params = {
                    'host': config.DB_HOST,
                    'port': config.DB_PORT,
                    'database': config.DB_NAME,
                    'user': config.DB_USER,
                    'password': config.DB_PASSWORD,
                    'sslmode': config.DB_SSLMODE,
                    'connect_timeout': 10
                }
                
                print(f"📡 Conectando a: {config.DB_USER}@{config.DB_HOST}:{config.DB_PORT}/{config.DB_NAME}")
                
                cls._connection = psycopg2.connect(**conn_params)
                print("✓ Conexión a base de datos exitosa")
                
            except psycopg2.OperationalError as e:
                print(f"❌ Error conectando a la base de datos:")
                print(f"   {str(e)}")
                print(f"\n   Verifica:")
                print(f"   • Host: {config.DB_HOST}")
                print(f"   • Puerto: {config.DB_PORT}")
                print(f"   • Usuario: {config.DB_USER}")
                print(f"   • Base de datos: {config.DB_NAME}")
                print(f"   • Credenciales en .env")
                raise
            except Exception as e:
                print(f"❌ Error inesperado: {e}")
                raise
        
        return cls._connection
    
    @classmethod
    def execute_query(cls, query, params=None, fetch_one=False):
        """Ejecuta una query y retorna resultados"""
        try:
            connection = cls.get_connection()
            cursor = connection.cursor(cursor_factory=RealDictCursor)
            cursor.execute(query, params)
            
            if query.strip().upper().startswith('SELECT'):
                result = cursor.fetchone() if fetch_one else cursor.fetchall()
                cursor.close()
                return result
            else:
                connection.commit()
                cursor.close()
                return None
                
        except psycopg2.Error as e:
            print(f"❌ Error en query: {e}")
            raise
        except Exception as e:
            print(f"❌ Error ejecutando query: {e}")
            raise
    
    @classmethod
    def execute_insert(cls, query, params=None):
        """Ejecuta un INSERT y retorna el ID del registro insertado"""
        try:
            connection = cls.get_connection()
            cursor = connection.cursor(cursor_factory=RealDictCursor)
            cursor.execute(query, params)
            connection.commit()
            
            # Obtener el ID del registro insertado
            last_id = cursor.lastrowid if hasattr(cursor, 'lastrowid') else None
            cursor.close()
            return last_id
            
        except psycopg2.Error as e:
            print(f"❌ Error en insert: {e}")
            raise
        except Exception as e:
            print(f"❌ Error ejecutando insert: {e}")
            raise
    
    @classmethod
    def close_connection(cls):
        """Cierra la conexión a la base de datos"""
        if cls._connection and not cls._connection.closed:
            cls._connection.close()
            cls._connection = None
            print("✓ Conexión cerrada")
