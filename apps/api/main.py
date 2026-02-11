
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

from dependencies.config import config
from routers.onboarding import router as onboarding_router
from routers.user import router as user_router
from routers.auth import router as auth_router


app = FastAPI()

app.add_middleware(CORSMiddleware, allow_origins=config.FRONTEND_URL, allow_credentials=True, allow_methods=["*"])

app.include_router(prefix="/api/v1", router=onboarding_router)
app.include_router(prefix="/api/v1", router=user_router)
app.include_router(prefix="/api/v1", router=auth_router)


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}
