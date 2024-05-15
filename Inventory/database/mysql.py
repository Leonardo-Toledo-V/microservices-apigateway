import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class DBConnection:
    def __init__(self):
        load_dotenv()
        host = os.getenv('DB_HOST')
        port = os.getenv('DB_PORT')
        user = os.getenv('DB_USER')
        password = os.getenv('DB_PASSWORD')
        database = os.getenv('DB_DATABASE')
        try:
            self.engine = create_engine(f'mysql+pymysql://{user}:{password}@{host}:{port}/{database}')
            Base.metadata.create_all(self.engine)
            self.Session = sessionmaker(bind=self.engine)
            print("Conexión exitosa")
        except Exception as e:
            print(f"Error al conectar: {str(e)}")
            self.Session = None
    
    def get_session(self):
        if self.Session is not None:
            return self.Session()
        else:
            raise Exception("Error al conectar")