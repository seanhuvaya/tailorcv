
from fastapi import Depends, FastAPI, Request
from starlette.middleware.cors import CORSMiddleware

from dependencies.config import config
from dependencies.security import get_token_from_request
from routers.onboarding import router as onboarding_router
from routers.user import router as user_router
from routers.auth import router as auth_router


def _cors_origins() -> list[str]:
    origins = [config.FRONTEND_URL]
    # Allow both localhost and 127.0.0.1 so CORS works regardless of how the app is opened
    if "localhost" in config.FRONTEND_URL:
        origins.append(config.FRONTEND_URL.replace("localhost", "127.0.0.1"))
    elif "127.0.0.1" in config.FRONTEND_URL:
        origins.append(config.FRONTEND_URL.replace("127.0.0.1", "localhost"))
    return origins


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=_cors_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(prefix="/api/v1", router=onboarding_router)
app.include_router(prefix="/api/v1", router=user_router)
app.include_router(prefix="/api/v1", router=auth_router)


@app.get("/healthz")
async def healthz():
    return {"status": "ok"}


@app.get("/api/v1/debug/auth")
async def debug_auth(request: Request, token: str | None = Depends(get_token_from_request)):
    """Temporary: debug what the API receives. Remove in production."""
    from dependencies.security import COOKIE_ACCESS_TOKEN_KEY
    auth_header = request.headers.get("authorization") or request.headers.get("Authorization") or ""
    return {
        "token_present": token is not None,
        "cookie_sent": COOKIE_ACCESS_TOKEN_KEY in request.cookies,
        "authorization_header_prefix": auth_header[:20] + "..." if len(auth_header) > 20 else auth_header or "(empty)",
    }
