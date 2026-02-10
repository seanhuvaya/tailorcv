from .config import config

from sqlmodel import SQLModel, Field  # For metadata
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, AsyncEngine
from sqlalchemy.orm import sessionmaker
from models import User

engine = create_async_engine(
    config.DATABASE_URL,
    echo=False,
    pool_size=20,
    max_overflow=0,
    pool_timeout=30,
    pool_recycle=1800
)

# Async session maker (SQLModel recommends using SQLAlchemy's for async)
AsyncSessionLocal = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)


# Startup function to create tables async-safe
async def create_db_and_tables():
    async with engine.begin() as conn:
        # Drop and recreate for dev (optional, comment out for prod)
        # await conn.run_sync(SQLModel.metadata.drop_all)
        await conn.run_sync(SQLModel.metadata.create_all)  # Creates tables if missing


# Dependency for routes (unchanged, but now works with SQLModel models)
async def get_db():
    async with AsyncSessionLocal() as session:
        try:
            yield session
            await session.commit()
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()
