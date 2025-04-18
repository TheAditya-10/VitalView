import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env

class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL',
        'mysql+mysqlconnector://username:password@localhost/dbname'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False