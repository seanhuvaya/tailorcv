from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from dependencies.database import get_db
from models import Resume, PersonalInfo, Experience, Education, Skill, Project, Certification
from schemas.resume import ResumeIn


router = APIRouter(
    prefix="/onboarding",
    tags=["Onboarding"],
)


@router.post("/", status_code=201)
async def submit_onboarding(
    payload: ResumeIn,
    db: AsyncSession = Depends(get_db),
):
    resume = Resume(summary=payload.summary)

    # Personal info (one-to-one)
    resume.personal_info = PersonalInfo(
        full_name=payload.personal_info.full_name,
        email=payload.personal_info.email,
        phone=payload.personal_info.phone,
        location=payload.personal_info.location,
        linkedin=payload.personal_info.linkedin,
        github=payload.personal_info.github,
        website=payload.personal_info.website,
    )

    # Experiences
    if payload.experiences:
        resume.experiences = [
            Experience(
                company=exp.company,
                location=exp.location,
                position=exp.position,
                start_date=exp.start_date,
                end_date=exp.end_date,
                achievements=exp.achievements,
            )
            for exp in payload.experiences
        ]

    # Education
    if payload.education:
        resume.education = [
            Education(
                school=edu.school,
                degree=edu.degree,
                field_of_study=edu.field_of_study,
                location=edu.location,
                graduation_date=edu.graduation_date,
            )
            for edu in payload.education
        ]

    # Skills
    if payload.skills:
        resume.skills = [
            Skill(
                skill=skill.skill,
                category=skill.category,
            )
            for skill in payload.skills
        ]

    # Projects
    if payload.projects:
        resume.projects = [
            Project(
                name=project.name,
                github_link=project.github_link,
                website_link=project.website_link,
                highlights=project.highlights,
            )
            for project in payload.projects
        ]

    # Certifications
    if payload.certifications:
        resume.certifications = [
            Certification(
                title=cert.title,
                issuer=cert.issuer,
                date=cert.date,
            )
            for cert in payload.certifications
        ]

    db.add(resume)
    await db.commit()
    await db.refresh(resume)

    return {"message": "Onboarding submitted successfully.", "resume_id": resume.id}

