'use client'

import {useState} from "react";

import OnboardingHeader from "@/app/onboarding/components/OnboardingHeader";
import OnboardingStepper from "@/app/onboarding/components/OnboardingStepper";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import PersonalInfoStep from "@/app/onboarding/components/PersonalInfoStep";
import SummaryStep from "@/app/onboarding/components/SummaryStep";
import {ExperienceStep} from "@/app/onboarding/components/ExperienceStep";
import {BaseResume, Certification, Education, Experience, Project, Skill} from "@/lib/types/resume";
import { saveBaseResume } from "@/lib/onboardingService";
import {EducationStep} from "@/app/onboarding/components/EducationStep";
import {SkillsStep} from "@/app/onboarding/components/SkillsStep";
import {Loader2} from "lucide-react";
import {useRouter} from "next/navigation";
import {toast} from "sonner";
import ProjectsStep from "@/app/onboarding/components/ProjectsStep";
import CertificationsStep from "@/app/onboarding/components/CertificationsStep";

const STEP_TITLES: Record<number, string> = {
    1: 'Personal Information',
    2: 'Professional Summary',
    3: 'Work Experience',
    4: 'Education',
    5: 'Skills',
    6: 'Projects',
    7: 'Certifications / Awards',
};

const STEP_DESCRIPTIONS: Record<number, string> = {
    1: 'Enter your contact details',
    2: 'Tell us about your professional background',
    3: 'Add your work history',
    4: 'Add your educational background',
    5: 'List your technical and soft skills',
    6: 'Add your projects and side work',
    7: 'List your certifications and awards',
};

export default function OnBoardingPage() {

    const router = useRouter();
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false);
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
    });
    const [summary, setSummary] = useState('');
    const [experiences, setExperiences] = useState<Experience[]>([
        {
            id: '1',
            company: '',
            location: '',
            position: '',
            startDate: '',
            endDate: '',
            achievements: [''],
        },
    ]);
    const [education, setEducation] = useState<Education[]>([
        {
            id: '1',
            school: '',
            degree: '',
            field: '',
            location: '',
            graduationDate: '',
        },
    ]);
    const [skills, setSkills] = useState<Skill[]>([
        {
            id: '1',
            skill: '',
            category: '',
        },
    ]);
    const [projects, setProjects] = useState<Project[]>([
        {
            id: '1',
            name: '',
            highlights: [''],
            githubLink: '',
            websiteLink: '',
        },
    ]);

    const [certifications, setCertifications] = useState<Certification[]>([
        {
            id: '1',
            title: '',
            issuer: '',
            date: '',
        },
    ]);

    const addExperience = () => {
        setExperiences([
            ...experiences,
            {
                id: Date.now().toString(),
                company: '',
                location: '',
                position: '',
                startDate: '',
                endDate: '',
                achievements: [''],
            },
        ]);
    };

    const removeExperience = (id: string) => {
        if (experiences.length > 1) {
            setExperiences(experiences.filter((exp) => exp.id !== id));
        }
    };

    const updateExperience = (id: string, field: keyof Experience, value: string | string[]) => {
        setExperiences(
            experiences.map((exp) => (exp.id === id ? {...exp, [field]: value} : exp))
        );
    };

    const addExperienceBullet = (id: string) => {
        setExperiences(
            experiences.map((exp) =>
                exp.id === id ? {...exp, achievements: [...exp.achievements, '']} : exp
            )
        );
    };

    const updateExperienceBullet = (expId: string, index: number, value: string) => {
        setExperiences(
            experiences.map((exp) =>
                exp.id === expId
                    ? {
                        ...exp,
                        achievements: exp.achievements.map((desc, i) => (i === index ? value : desc)),
                    }
                    : exp
            )
        );
    };

    const removeExperienceBullet = (expId: string, index: number) => {
        setExperiences(
            experiences.map((exp) =>
                exp.id === expId
                    ? {...exp, achievements: exp.achievements.filter((_, i) => i !== index)}
                    : exp
            )
        );
    };

    const addEducation = () => {
        setEducation([
            ...education,
            {
                id: Date.now().toString(),
                school: '',
                degree: '',
                location: '',
                field: '',
                graduationDate: '',
            },
        ]);
    };

    const removeEducation = (id: string) => {
        if (education.length > 1) {
            setEducation(education.filter((edu) => edu.id !== id));
        }
    };

    const updateEducation = (id: string, field: keyof Education, value: string) => {
        setEducation(
            education.map((edu) => (edu.id === id ? {...edu, [field]: value} : edu))
        );
    };

    const addSkill = () => {
        setSkills([...skills, {
            id: Date.now().toString(),
            skill: '',
            category: '',
        }]);
    };

    const updateSkill = (index: number, field: keyof Skill, value: string) => {
        setSkills(skills.map((skill, i) => (i === index ? {...skill, [field]: value} : skill)));
    };

    const removeSkill = (index: number) => {
        if (skills.length > 1) {
            setSkills(skills.filter((_, i) => i !== index));
        }
    };

    const addProject = () => {
        setProjects([
            ...projects,
            {
                id: Date.now().toString(),
                name: '',
                highlights: [''],
                githubLink: '',
                websiteLink: '',
            },
        ]);
    };

    const removeProject = (id: string) => {
        if (projects.length > 1) {
            setProjects(projects.filter((p) => p.id !== id));
        }
    };

    const updateProject = (id: string, field: keyof Project, value: string | string[]) => {
        setProjects(
            projects.map((p) => (p.id === id ? {...p, [field]: value} : p))
        );
    };

    const addProjectHighlight = (projectId: string) => {
        setProjects(
            projects.map((p) =>
                p.id === projectId ? {...p, highlights: [...p.highlights, '']} : p
            )
        );
    };

    const updateProjectHighlight = (projectId: string, index: number, value: string) => {
        setProjects(
            projects.map((p) =>
                p.id === projectId
                    ? {
                        ...p,
                        highlights: p.highlights.map((h, i) => (i === index ? value : h)),
                    }
                    : p
            )
        );
    };

    const removeProjectHighlight = (projectId: string, index: number) => {
        setProjects(
            projects.map((p) =>
                p.id === projectId
                    ? {...p, highlights: p.highlights.filter((_, i) => i !== index)}
                    : p
            )
        );
    };

    const addCertification = () => {
        setCertifications([
            ...certifications,
            {
                id: Date.now().toString(),
                title: '',
                issuer: '',
                date: '',
            },
        ]);
    };

    const removeCertification = (id: string) => {
        if (certifications.length > 1) {
            setCertifications(certifications.filter((c) => c.id !== id));
        }
    };

    const updateCertification = (id: string, field: keyof Certification, value: string) => {
        setCertifications(
            certifications.map((c) => (c.id === id ? {...c, [field]: value} : c))
        );
    };

    const canProceed = () => {
        if (step === 1) {
            return personalInfo.fullName && personalInfo.email && personalInfo.phone;
        }
        if (step === 2) {
            return summary.length > 50;
        }
        if (step === 3) {
            return experiences.some((exp) => exp.company && exp.position);
        }
        if (step === 4) {
            return education.some((edu) => edu.school && edu.degree);
        }
        if (step === 6) {
            return projects.some((p) => p.name.trim() !== '');
        }
        return true;
    };

    const handleSave = async () => {
        setLoading(true);

        try {
            const resume: BaseResume = {
                personalInfo,
                summary,
                experiences: experiences.filter((exp) => exp.company && exp.position),
                education: education.filter((edu) => edu.school && edu.degree),
                skills: skills.filter((skill) => skill.skill && skill.category),
            };

            console.log(resume)

            const response = await saveBaseResume(resume);

            if (response.success) {
                toast.success(response.message)
                // router.push('/dashboard');
            }
        } catch (error) {
            toast.error('Failed to save resume. Please try again.')
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-neutral-50 to-neutral-100 py-12 px-4">
            <div className="mx-auto max-w-3xl">
                <OnboardingHeader/>
                <OnboardingStepper currentStep={step}/>

                <Card>
                    <CardHeader>
                        <CardTitle>{STEP_TITLES[step]}</CardTitle>
                        <CardDescription>{STEP_DESCRIPTIONS[step]}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {step === 1 && (
                            <PersonalInfoStep value={personalInfo} onChange={setPersonalInfo}/>
                        )}
                        {step === 2 && (
                            <SummaryStep value={summary} onChange={setSummary}/>
                        )}
                        {step === 3 && (
                            <ExperienceStep
                                experiences={experiences}
                                onAddExperience={addExperience}
                                onRemoveExperience={removeExperience}
                                onUpdateExperience={updateExperience}
                                onAddExperienceBullet={addExperienceBullet}
                                onUpdateExperienceBullet={updateExperienceBullet}
                                onRemoveExperienceBullet={removeExperienceBullet}
                            />
                        )}
                        {step === 4 && (
                            <EducationStep
                                education={education}
                                onAddEducation={addEducation}
                                onRemoveEducation={removeEducation}
                                onUpdateEducation={updateEducation}
                            />
                        )}
                        {step === 5 && (
                            <SkillsStep
                                skills={skills}
                                onAddSkill={addSkill}
                                onUpdateSkill={updateSkill}
                                onRemoveSkill={removeSkill}
                            />
                        )}
                        {step === 6 && (
                            <ProjectsStep
                                projects={projects}
                                onAddProject={addProject}
                                onRemoveProject={removeProject}
                                onUpdateProject={updateProject}
                                onAddHighlight={addProjectHighlight}
                                onUpdateHighlight={updateProjectHighlight}
                                onRemoveHighlight={removeProjectHighlight}
                            />
                        )}
                        {step === 7 && (
                            <CertificationsStep
                                certifications={certifications}
                                onAddCertification={addCertification}
                                onRemoveCertification={removeCertification}
                                onUpdateCertification={updateCertification}
                            />
                        )}

                        <div className="mt-6 flex justify-between">
                            {step > 1 && (
                                <Button variant="outline" onClick={() => setStep(step - 1)}>
                                    Previous
                                </Button>
                            )}
                            <div className="ml-auto">
                                {step < 7 ? (
                                    <Button onClick={() => setStep(step + 1)} disabled={!canProceed()}>
                                        Next
                                    </Button>
                                ) : (
                                    <Button onClick={handleSave} disabled={loading || !canProceed()}>
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Resume'
                                        )}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}