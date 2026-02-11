from pydantic import BaseModel, Field as PydanticField
from typing import Optional

class EducationIn(BaseModel):
    school: str
    degree: str
    field_of_study: str = PydanticField(alias="field")
    location: Optional[str] = None
    graduation_date: str = PydanticField(alias="graduationDate")

