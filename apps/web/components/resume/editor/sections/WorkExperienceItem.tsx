import {Experience, Resume} from "@/lib/resume/schema";
import {FaPlus, FaTrashAlt} from "react-icons/fa";
import WorkExperiencePosition from "@/components/resume/editor/sections/WorkExperiencePosition";

type WorkExperienceProps = {
    experience: Experience;

    onRemoveExperience: (experienceId: number) => void;
    onUpdateExperience: (experienceId: number, key: string, value: any) => void;

    onAddPosition: (experienceId: number) => void;
    onUpdatePosition: (
        experienceId: number,
        positionId: number,
        key: string,
        value: any
    ) => void;
    onRemovePosition: (experienceId: number, positionId: number) => void;

    onAddHighlight: (experienceId: number, positionId: number) => void;
    onUpdateHighlight: (
        experienceId: number,
        positionId: number,
        index: number,
        value: string
    ) => void;
    onRemoveHighlight: (
        experienceId: number,
        positionId: number,
        index: number
    ) => void;
}

export default function WorkExperienceItem({
                                           experience,
                                           onRemoveExperience,
                                           onUpdateExperience,
                                           onAddPosition,
                                           onUpdatePosition,
                                           onRemovePosition,
                                           onAddHighlight,
                                           onUpdateHighlight,
                                           onRemoveHighlight,
                                       }: WorkExperienceProps) {

    return (
        <section className="mb-8">
            <div className="flex justify-between items-start mb-3">
                <h4 className="font-medium text-gray-700">Experience</h4>
                <button
                    onClick={() => onRemoveExperience(experience.id)}
                    className="text-red-600 hover:text-red-700"
                >
                    <FaTrashAlt size={18}/>
                </button>
            </div>

            <div className="space-y-3">
                <input
                    type="text"
                    placeholder="Company"
                    value={experience.organization}
                    onChange={(e) =>
                        onUpdateExperience(experience.id, "organization", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={experience.location}
                    onChange={(e) =>
                        onUpdateExperience(experience.id, "location", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <div className="flex items-center justify-between">
                    <h5 className="text-sm font-medium text-gray-700">Positions</h5>

                    <button
                        type="button"
                        onClick={() => onAddPosition(experience.id)}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1"
                    >
                        <FaPlus size={14}/>
                        Add Position
                    </button>
                </div>

                <div className="space-y-4">
                    {experience.positions.map((pos) => (
                        <WorkExperiencePosition
                            key={pos.id}
                            position={pos}
                            totalPositions={experience.positions.length}
                            onUpdate={(positionId, key, value) =>
                                onUpdatePosition(experience.id, positionId, key, value)
                            }
                            onRemove={(positionId) =>
                                onRemovePosition(experience.id, positionId)
                            }
                            onAddHighlight={() => onAddHighlight(experience.id, pos.id)}
                            onUpdateHighlight={(index, value) =>
                                onUpdateHighlight(experience.id, pos.id, index, value)
                            }
                            onRemoveHighlight={(index) =>
                                onRemoveHighlight(experience.id, pos.id, index)
                            }
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}