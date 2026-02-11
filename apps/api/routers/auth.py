from fastapi import APIRouter, Depends, HTTPException, Response, Request
from fastapi.responses import RedirectResponse
from sqlalchemy.ext.asyncio import AsyncSession
from services.auth import authenticate_google
from dependencies.database import get_db
from dependencies.config import config
from uuid import uuid4

router = APIRouter(prefix="/auth/google", tags=["auth"])

@router.get("/login")
async def google_login() -> Response:
    state = str(uuid4())  # Generate random state for CSRF protection

    google_auth_url = (
        f"https://accounts.google.com/o/oauth2/v2/auth?"
        f"client_id={config.GOOGLE_CLIENT_ID}&"
        f"redirect_uri={config.BACKEND_URL}/api/v1/auth/google/callback&"
        f"response_type=code&scope=email%20profile&state={state}"
    )

    redirect = RedirectResponse(google_auth_url)
    # Attach state cookie to the same response object that is returned
    redirect.set_cookie(
        key="oauth_state",
        value=state,
        httponly=True,
        max_age=300,
        samesite="lax",
    )
    return redirect

@router.get("/callback")
async def google_callback(
    code: str, 
    state: str, 
    request: Request,  # Add this to access incoming cookies
    db: AsyncSession = Depends(get_db)
):
    cookie_state = request.cookies.get("oauth_state")  

    if state != cookie_state:
        raise HTTPException(status_code=400, detail="Invalid state parameter")
    
    user, access_token = await authenticate_google(code=code, db=db)

    redirect = RedirectResponse(config.FRONTEND_URL)
    redirect.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # secure=True in prod
        max_age=1800,
        samesite="lax",
    )
    redirect.delete_cookie("oauth_state")
    return redirect