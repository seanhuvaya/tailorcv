from fastapi import APIRouter, Depends
from schemas.user import UserOut
from dependencies.security import get_current_user
from models.user import User

router = APIRouter(prefix="/users", tags=["users"])

@router.get("/me", response_model=UserOut)
async def get_me(current_user: User = Depends(get_current_user)) -> UserOut:
    return UserOut(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        is_onboarded=current_user.is_onboarded,
        avatar_url=current_user.avatar_url,
        created_at=current_user.created_at
    )