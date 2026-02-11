from contextlib import asynccontextmanager

from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from dependencies.database import create_db_and_tables, engine
from dependencies.config import config
from routers.onboarding import router as onboarding_router

allowed_origins = [origin.strip() for origin in config.ALLOWED_ORIGINS.split(",") if origin.strip()]


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()

    yield

    await engine.dispose()


app = FastAPI(lifespan=lifespan)

app.add_middleware(CORSMiddleware, allow_origins=allowed_origins, allow_credentials=True, allow_methods=["*"])

app.include_router(prefix="/api/v1", router=onboarding_router)


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
