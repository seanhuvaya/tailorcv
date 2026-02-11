import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

project_root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(project_root_dir, '.env')
load_dotenv(dotenv_path=dotenv_path)


class Config(BaseSettings):
    DATABASE_URL: str
    FRONTEND_URL: str
    BACKEND_URL: str
    SECRET_KEY: str
    GOOGLE_CLIENT_ID: str
    GOOGLE_CLIENT_SECRET: str
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


config = Config()
