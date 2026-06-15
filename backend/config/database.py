import psycopg2
from psycopg2.extras import RealDictCursor
from config.config import Config

class Database:
    """Clase para manejar la conexión a PostgreSQL"""
    
    @staticmethod
    def get_connection():
        """Obtiene una conexión a la base de datos"""
        try:
            conn = psycopg2.connect(
                host=Config.DB_HOST,
                port=Config.DB_PORT,
                database=Config.DB_NAME,
                user=Config.DB_USER,
                password=Config.DB_PASSWORD
            )
            return conn
        except psycopg2.Error as e:
            raise Exception(f"Error al conectar a la base de datos: {str(e)}")
    
    @staticmethod
    def execute_query(query, params=None, fetch_one=False, fetch_all=False):
        """Ejecuta una query en la base de datos"""
        conn = None
        try:
            conn = Database.get_connection()
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            
            cursor.execute(query, params or ())
            
            if fetch_one:
                result = cursor.fetchone()
            elif fetch_all:
                result = cursor.fetchall()
            else:
                conn.commit()
                result = cursor.rowcount
            
            cursor.close()
            return result
        except psycopg2.Error as e:
            if conn:
                conn.rollback()
            raise Exception(f"Error en la query: {str(e)}")
        finally:
            if conn:
                conn.close()
