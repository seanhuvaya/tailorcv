import {FaPlus, FaTrashAlt} from "react-icons/fa";
import WorkExperiencePositionHighlight from "@/components/resume/editor/sections/WorkExperiencePositionHighlight";
import {Position} from "@/lib/resume/schema";


type WorkExperiencePosition = {
    position: Position;
    totalPositions: number;

    onUpdate: (positionId: number, key: string, value: any) => void;
    onRemove: (positionId: number) => void;

    onAddHighlight: () => void;
    onUpdateHighlight: (index: number, value: string) => void;
    onRemoveHighlight: (index: number) => void;
}

export default function WorkExperiencePosition({
                                                   position,
                                                   totalPositions,
                                                   onUpdate,
                                                   onRemove,
                                                   onAddHighlight,
                                                   onUpdateHighlight,
                                                   onRemoveHighlight,
                                               }: WorkExperiencePosition) {
    return (
        <div className="border border-gray-200 rounded-lg p-3 space-y-3">
            <div className="flex items-start justify-between gap-2">
                <input
                    type="text"
                    placeholder="Position / Title"
                    value={position.title}
                    onChange={(e) => onUpdate(position.id, "title", e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                {totalPositions > 1 && (
                    <button
                        type="button"
                        onClick={() => onRemove(position.id)}
                        className="text-red-600 hover:text-red-700 p-2 cursor-pointer"
                        title="Remove position"
                    >
                        <FaTrashAlt size={16}/>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-2 gap-3">
                <input
                    type="text"
                    placeholder="Start Date"
                    value={position.startDate}
                    onChange={(e) => onUpdate(position.id, "startDate", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                    type="text"
                    placeholder="End Date"
                    value={position.endDate}
                    onChange={(e) => onUpdate(position.id, "endDate", e.target.value)}
                    disabled={position.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
            </div>

            <label className="flex items-center gap-2">
                <input
                    type="checkbox"
                    checked={position.current}
                    onChange={(e) => onUpdate(position.id, "current", e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Currently in this role</span>
            </label>

            {/* Bullet points per position */}
            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <h5 className="text-sm font-medium text-gray-700">Highlights</h5>
                    <button
                        type="button"
                        onClick={onAddHighlight}
                        disabled={(position?.highlights?.length ?? 0) > 0 &&
                            position.highlights![position.highlights.length - 1] === ""}
                        className="text-blue-600 hover:text-blue-700 text-sm flex items-center gap-1 cursor-pointer disabled:text-blue-300 disabled:cursor-not-allowed"
                    >
                        <FaPlus size={14}/>
                        Add Highlight
                    </button>
                </div>

                {(position.highlights ?? []).map((point, index) => (
                    <WorkExperiencePositionHighlight
                        key={index}
                        value={point}
                        index={index}
                        total={position.highlights?.length ?? 0}
                        onChange={onUpdateHighlight}
                        onRemove={onRemoveHighlight}
                    />
                ))}

            </div>
        </div>
    )
}