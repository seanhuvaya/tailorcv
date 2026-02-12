import logging

from fastapi import Depends, HTTPException, Request, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from datetime import datetime, timedelta
from jose import JWTError, jwt
from .config import config
from .database import get_db
from sqlalchemy.ext.asyncio import AsyncSession
from models import User
from sqlmodel import select

logger = logging.getLogger(__name__)

# Optional Bearer (for API clients); cookie is primary for browser after OAuth
bearer_scheme = HTTPBearer(auto_error=False)

COOKIE_ACCESS_TOKEN_KEY = "access_token"


def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=config.ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, config.SECRET_KEY, algorithm=config.ALGORITHM)


def verify_access_token(token: str):
    try:
        payload = jwt.decode(token, config.SECRET_KEY, algorithms=[config.ALGORITHM])
        email: str = payload.get("sub")
        if email is None:
            raise JWTError("missing sub")
        return email
    except JWTError as e:
        logger.warning("JWT verify failed: %s", type(e).__name__)
        raise


def get_token_from_request(request: Request, credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme)) -> str | None:
    """Token from cookie (browser) or Authorization Bearer header."""
    cookie_token = request.cookies.get(COOKIE_ACCESS_TOKEN_KEY)
    auth_header = request.headers.get("authorization") or request.headers.get("Authorization")
    has_bearer = bool(credentials and credentials.credentials)

    if cookie_token:
        logger.debug("auth: token from cookie (len=%d)", len(cookie_token))
        return cookie_token
    if credentials and credentials.credentials:
        logger.debug("auth: token from Bearer header (len=%d)", len(credentials.credentials))
        return credentials.credentials

    logger.warning("auth: no token (cookie=%s, Authorization header=%s)", bool(cookie_token), bool(auth_header))
    return None


async def get_current_user(
    db: AsyncSession = Depends(get_db),
    token: str | None = Depends(get_token_from_request),
):
    if not token:
        logger.warning("get_current_user: no token provided")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Missing or invalid authorization",
        )
    try:
        email = verify_access_token(token)
        user = (await db.execute(select(User).where(User.email == email))).scalar_one_or_none()
        if user is None:
            logger.warning("get_current_user: user not found for email from token")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found",
            )
        return user
    except JWTError as e:
        logger.warning("get_current_user: JWT invalid (%s)", e)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
        )
    except HTTPException:
        raise
    except Exception as e:
        logger.exception("get_current_user: unexpected error")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
        )