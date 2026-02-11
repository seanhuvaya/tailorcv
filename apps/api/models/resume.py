from datetime import datetime
from typing import List, Optional

from sqlalchemy import Column, JSON
from sqlmodel import SQLModel, Field, Relationship


class Resume(SQLModel, table=True):
    """
    Root resume entity. All other resume-related records (personal info,
    experiences, education, skills, projects, certifications) are linked
    to this table via foreign keys.
    """

    __tablename__ = "resumes"

    id: int | None = Field(default=None, primary_key=True)
    summary: Optional[str] = None
    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

    # One-to-one
    personal_info: Optional["PersonalInfo"] = Relationship(back_populates="resume")

    # One-to-many
    experiences: List["Experience"] = Relationship(back_populates="resume")
    education: List["Education"] = Relationship(back_populates="resume")
    skills: List["Skill"] = Relationship(back_populates="resume")
    projects: List["Project"] = Relationship(back_populates="resume")
    certifications: List["Certification"] = Relationship(back_populates="resume")


class PersonalInfo(SQLModel, table=True):
    __tablename__ = "resume_personal_info"

    id: int | None = Field(default=None, primary_key=True)
    resume_id: int = Field(foreign_key="resumes.id", nullable=False, index=True)

    full_name: str
    email: str
    phone: str
    location: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None

    resume: Resume = Relationship(back_populates="personal_info")


class Experience(SQLModel, table=True):
    __tablename__ = "resume_experiences"

    id: int | None = Field(default=None, primary_key=True)
    resume_id: int = Field(foreign_key="resumes.id", nullable=False, index=True)

    company: str
    location: str
    position: str
    start_date: str
    end_date: Optional[str] = None

    # Bullet points as a JSON array for simplicity
    achievements: Optional[list[str]] = Field(default=None, sa_column=Column(JSON))

    resume: Resume = Relationship(back_populates="experiences")


class Education(SQLModel, table=True):
    __tablename__ = "resume_education"

    id: int | None = Field(default=None, primary_key=True)
    resume_id: int = Field(foreign_key="resumes.id", nullable=False, index=True)

    school: str
    degree: str
    field_of_study: str
    location: Optional[str] = None
    graduation_date: str

    resume: Resume = Relationship(back_populates="education")


class Skill(SQLModel, table=True):
    __tablename__ = "resume_skills"

    id: int | None = Field(default=None, primary_key=True)
    resume_id: int = Field(foreign_key="resumes.id", nullable=False, index=True)

    skill: str
    category: str

    resume: Resume = Relationship(back_populates="skills")


class Project(SQLModel, table=True):
    __tablename__ = "resume_projects"

    id: int | None = Field(default=None, primary_key=True)
    resume_id: int = Field(foreign_key="resumes.id", nullable=False, index=True)

    name: str
    github_link: Optional[str] = None
    website_link: Optional[str] = None

    # Project bullet points as a JSON array
    highlights: Optional[list[str]] = Field(default=None, sa_column=Column(JSON))

    resume: Resume = Relationship(back_populates="projects")


class Certification(SQLModel, table=True):
    __tablename__ = "resume_certifications"

    id: int | None = Field(default=None, primary_key=True)
    resume_id: int = Field(foreign_key="resumes.id", nullable=False, index=True)

    title: str
    issuer: str
    date: str

    resume: Resume = Relationship(back_populates="certifications")

from datetime import datetime

from sqlalchemy import Column, JSON
from sqlmodel import SQLModel, Field


class Resume(SQLModel, table=True):
    __tablename__ = "resumes"

    id: int | None = Field(default=None, primary_key=True)

    # Basic identity / contact
    full_name: str
    email: str
    phone: str
    location: str | None = None
    linkedin: str | None = None
    github: str | None = None
    website: str | None = None

    # Core resume content
    summary: str

    experiences: list[dict] | None = Field(default=None, sa_column=Column(JSON))
    education: list[dict] | None = Field(default=None, sa_column=Column(JSON))
    skills: list[str] | None = Field(default=None, sa_column=Column(JSON))
    projects: list[dict] | None = Field(default=None, sa_column=Column(JSON))
    certifications: list[dict] | None = Field(default=None, sa_column=Column(JSON))

    created_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)

