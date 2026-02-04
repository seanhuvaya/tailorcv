import {Experience, Resume} from "@/lib/resume/schema";
import {FaPlus} from "react-icons/fa";
import WorkExperienceItem from "@/components/resume/editor/sections/WorkExperienceItem";

type WorkExperienceProps = {
    resume: Resume;
    onChange: (updatedResume: Resume) => void;
};

const createEmptyExperience = (id: number): Experience => {
    return {
        id,
        organization: "",
        location: "",
        current: false,
        positions: [
            {
                id: 1,
                title: "",
                startDate: "",
                endDate: "",
                current: false,
                highlights: [""],
            },
        ],
    }
};

export default function WorkExperience({resume, onChange}: WorkExperienceProps) {
    const addWorkExperience = () => {
        const newExperienceId = Math.max(0, ...resume.experience.map((exp) => exp.id)) + 1
        const newExperience = createEmptyExperience(newExperienceId)

        onChange({
            ...resume,
            experience: [...resume.experience, newExperience]
        })
    };

    const removeWorkExperience = (experienceId: number) => {
        const updatedExperiences = resume.experience.filter((exp) => exp.id !== experienceId)

        onChange({
            ...resume,
            experience: updatedExperiences
        })
    };

    const updateWorkExperience = (experienceId: number, key: string, value: any) => {
        const updatedExperiences = resume.experience.map((exp) => exp.id === experienceId ? {
            ...exp,
            [key]: value
        } : exp)

        onChange({
            ...resume,
            experience: updatedExperiences
        })
    };

    const addPosition = (experienceId: number) => {
        const newPositionId = Math.max(
            0,
            ...resume.experience
                .filter(exp => exp.id === experienceId)
                .flatMap(exp => exp.positions)
                .map(pos => Number(pos.id))
        ) + 1;

        const newExperienceId = Math.max(
            0,
            ...resume.experience.map(exp => Number(exp.id))
        ) + 1;

        const position = {
            id: newExperienceId,
            organization: "",
            location: "",
            current: false,
            positions: [
                {
                    id: newPositionId,
                    title: "",
                    startDate: "",
                    endDate: "",
                    current: "",
                    highlights: []
                }
            ]
        }

        const updatedExperiences = resume.experience.map((exp) => exp.id === experienceId ? {
            ...exp,
            positions: [...exp.positions, position]
        } : exp)

        onChange({
            ...resume,
            experience: updatedExperiences
        })
    };

    const updatePosition = (
        experienceId: number,
        positionId: number,
        key: string,
        value: any
    ) => {
        const updatedExperiences = resume.experience.map((exp) => exp.id === experienceId ? {
            ...exp,
            positions: exp.positions.map((pos) => pos.id === positionId ? {
                ...pos,
                [key]: value
            } : pos)
        } : exp)

        onChange({
            ...resume,
            experience: updatedExperiences
        })
    };

    const removePosition = (experienceId: number, positionId: number) => {
        const updatedExperiences = resume.experience.map((exp) => exp.id === experienceId ? {
            ...exp,
            positions: exp.positions.filter((pos) => pos.id !== positionId)
        } : exp)

        onChange({
            ...resume,
            experience: updatedExperiences
        })
    };

    const addHighlight = (experienceId: number, positionId: number) => {
        const updatedExperiences = resume.experience.map((exp) => exp.id === experienceId ? {
            ...exp,
            positions: exp.positions.map((pos) => pos.id === positionId ? {
                ...pos,
                highlights: pos.highlights ? [...pos.highlights, ""] : [""]
            } : pos)
        } : exp)

        onChange({
            ...resume,
            experience: updatedExperiences
        })
    };

    const updateHighlight = (
        experienceId: number,
        positionId: number,
        index: number,
        value: string
    ) => {
        const updatedExperiences = resume.experience.map((exp) => exp.id === experienceId ? {
            ...exp,
            positions: exp.positions.map((pos) => pos.id === positionId ? {
                ...pos,
                highlights: pos.highlights.map(
                    (p, i) => i === index ? value : p
                )
            } : pos)
        } : exp)

        onChange({
            ...resume,
            experience: updatedExperiences
        })
    };

    const removeHighlight = (experienceId: number, positionId: number, index: number) => {
        const updatedExperiences = resume.experience.map((exp) => exp.id === experienceId ? {
            ...exp,
            positions: exp.positions.map((pos) => pos.id === positionId ? {
                ...pos,
                highlights: pos.highlights.filter(
                    (_, i) => i !== index
                )
            } : pos)
        } : exp)

        onChange({
            ...resume,
            experience: updatedExperiences
        })
    };

    return (
        <section className="mb-8">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-700">Work Experience</h3>
                <button
                    onClick={addWorkExperience}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FaPlus size={18}/>
                    Add
                </button>
            </div>

            <div className="space-y-6">
                {resume.experience.map((exp) => (
                    <WorkExperienceItem
                        key={exp.id}
                        experience={exp}
                        onRemoveExperience={removeWorkExperience}
                        onUpdateExperience={updateWorkExperience}
                        onAddPosition={addPosition}
                        onUpdatePosition={updatePosition}
                        onRemovePosition={removePosition}
                        onAddHighlight={addHighlight}
                        onUpdateHighlight={updateHighlight}
                        onRemoveHighlight={removeHighlight}
                    />
                ))}
            </div>
        </section>
    );
}
