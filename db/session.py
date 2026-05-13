import psycopg2
from core.config import settings

def get_db_connection():
    """
    Creates and returns a connection to the database.
    """
    try:
        connection = psycopg2.connect(settings.DATABASE_URL)
        return connection
    except Exception as e:
        print(f"Database connection error: {e}")
        raise
