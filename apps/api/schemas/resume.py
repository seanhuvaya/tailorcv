from pydantic import BaseModel
from typing import List, Optional
from .personal_info import PersonalInfoIn
from .experience import ExperienceIn
from .education import EducationIn
from pydantic import Field as PydanticField
from .skill import SkillIn
from .project import ProjectIn
from .certification import CertificationIn

class ResumeIn(BaseModel):
    personal_info: PersonalInfoIn = PydanticField(alias="personalInfo")
    summary: Optional[str] = None
    skills: Optional[List[SkillIn]] = None
    experiences: Optional[List[ExperienceIn]] = None
    education: Optional[List[EducationIn]] = None
    projects: Optional[List[ProjectIn]] = None
    certifications: Optional[List[CertificationIn]] = None