from pydantic import BaseModel

class SkillIn(BaseModel):
    skill: str
    category: str
