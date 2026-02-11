from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from models.user import User
from schemas.user import UserIn


async def get_or_create_user(db: AsyncSession, user_data: UserIn) -> User:
    result = await db.execute(select(User).where(User.email == user_data.email))
    user = result.scalar_one_or_none()
    if user:
        return user

    user = User(**user_data.dict())
    db.add(user)
    await db.flush()
    await db.refresh(user)
    return user