from pydantic import BaseModel, Field as PydanticField
from typing import Optional, List

class ProjectIn(BaseModel):
    name: str
    highlights: Optional[List[str]] = None
    github_link: Optional[str] = None
    website_link: Optional[str] = None