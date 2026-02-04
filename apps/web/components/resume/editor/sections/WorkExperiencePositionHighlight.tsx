import {FaTrashAlt} from "react-icons/fa";

type WorkExperiencePositionHighlightProps = {
    value: string,
    index: number,
    total: number,
    onChange: (index: number, value: string) => void,
    onRemove: (index: number) => void
}

export default function WorkExperiencePositionHighlight({value, index, total, onChange, onRemove}: WorkExperiencePositionHighlightProps) {
    return (
        <div className="flex gap-2 items-start">
            <span className="text-gray-400 mt-2">•</span>

            <input
                type="text"
                placeholder="Enter highlight"
                value={value}
                onChange={(e) => onChange(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />

            {total > 1 && (
                <button
                    type="button"
                    onClick={() => onRemove(index)}
                    className="text-red-600 hover:text-red-700 p-2 cursor-pointer"
                    title="Remove Highlight"
                >
                    <FaTrashAlt size={16}/>
                </button>
            )}
        </div>
    )
}