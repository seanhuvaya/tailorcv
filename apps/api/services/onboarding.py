from models import Resume, PersonalInfo, Experience, Education, Skill, Project, Certification
from schemas.resume import ResumeIn
from models.user import User
from sqlalchemy.ext.asyncio import AsyncSession
from schemas.user import UserOut

async def submit_onboarding(payload: ResumeIn, current_user: User, db: AsyncSession):
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

    current_user.is_onboarded = True
    db.add(current_user)

    await db.commit()
    await db.refresh(current_user)

    return UserOut(
        id=current_user.id,
        email=current_user.email,
        name=current_user.name,
        is_onboarded=current_user.is_onboarded,
        avatar_url=current_user.avatar_url,
        created_at=current_user.created_at,
    )    