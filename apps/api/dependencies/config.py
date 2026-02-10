import os

from dotenv import load_dotenv
from pydantic_settings import BaseSettings

project_root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
dotenv_path = os.path.join(project_root_dir, '.env')
load_dotenv(dotenv_path=dotenv_path)


class Config(BaseSettings):
    DATABASE_URL: str
    ALLOWED_ORIGINS: str

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


config = Config()
