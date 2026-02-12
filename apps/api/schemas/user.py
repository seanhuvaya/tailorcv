from pydantic import BaseModel
from typing import Optional
from pydantic import EmailStr
from datetime import datetime

class UserIn(BaseModel):
    email: str
    name: str
    avatar_url: Optional[str] = None

class UserOut(BaseModel):
    id: int
    email: EmailStr
    name: str
    is_onboarded: bool
    avatar_url: Optional[str] = None
    created_at: datetime