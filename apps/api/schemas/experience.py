from pydantic import BaseModel, Field as PydanticField
from typing import List, Optional

class ExperienceIn(BaseModel):
    company: str
    location: str
    position: str
    start_date: str = PydanticField(alias="startDate")
    end_date: Optional[str] = PydanticField(alias="endDate")
    achievements: List[str]