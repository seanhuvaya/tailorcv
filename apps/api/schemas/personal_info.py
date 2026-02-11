from pydantic import BaseModel, EmailStr, Field as PydanticField, ConfigDict
from typing import Optional

class PersonalInfoIn(BaseModel):
    full_name: str = PydanticField(alias="fullName")
    email: EmailStr
    phone: str
    location: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None
           