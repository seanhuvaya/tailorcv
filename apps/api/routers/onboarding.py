from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies.database import get_db
from schemas.resume import ResumeIn
from services.onboarding import submit_onboarding
from dependencies.security import get_current_user
from models.user import User
from schemas.user import UserOut

router = APIRouter(
    prefix="/onboarding",
    tags=["Onboarding"],
)


@router.post("/", response_model=UserOut, status_code=201)
async def onboarding(
    payload: ResumeIn,
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    return await submit_onboarding(payload, current_user, db)

