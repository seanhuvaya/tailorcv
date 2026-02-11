import httpx
from dependencies.config import config
from schemas.user import UserIn, UserOut
from services.user import get_or_create_user
from dependencies.security import create_access_token
from sqlalchemy.ext.asyncio import AsyncSession


async def authenticate_google(code: str, db: AsyncSession):
    token_url = "https://oauth2.googleapis.com/token"
    token_data = {
        "client_id": config.GOOGLE_CLIENT_ID,
        "client_secret": config.GOOGLE_CLIENT_SECRET,
        "redirect_uri": f"{config.BACKEND_URL}/api/v1/auth/google/callback",
        "grant_type": "authorization_code",
        "code": code,
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(token_url, data=token_data)
        response.raise_for_status()
        tokens = response.json()

    userinfo_url = "https://www.googleapis.com/oauth2/v2/userinfo"
    headers = {"Authorization": f"Bearer {tokens['access_token']}"}
    async with httpx.AsyncClient() as client:
        user_response = await client.get(userinfo_url, headers=headers)
        user_response.raise_for_status()
        user_info = user_response.json()

    if not user_info.get("verified_email"):
        raise ValueError("Email not verified")

    user_data = UserIn(email=user_info["email"], name=user_info["name"], avatar_url=user_info.get("picture"))
    user = await get_or_create_user(db, user_data)
    access_token = create_access_token(data={"sub": user.email})
    return UserOut(id=user.id, email=user.email, name=user.name, avatar_url=user.avatar_url, created_at=user.created_at), access_token