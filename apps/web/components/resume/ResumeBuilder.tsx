"use client"

import ResumeEditor from "@/components/resume/editor/ResumeEditor";
import ResumePreview from "@/components/resume/ResumePreview";
import {Resume} from "@/lib/resume/schema";
import {useState} from "react";
import {FaDownload} from "react-icons/fa6";

type ResumeBuilderProps = {
    initialResume: Resume
}

export default function ResumeBuilder({initialResume}: ResumeBuilderProps) {
    const [resume, setResume] = useState<Resume>(initialResume)

    const updateResume = (updatedResume: Resume) => {
        setResume(updatedResume)
    }

    const handleDownload = () => {

    }

    return (
        <div className="h-screen flex flex-col">
            <header className="bg-white border-b border-gray-300 px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">Resume Editor</h1>
                <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <FaDownload size={18}/>
                    Download PDF
                </button>
            </header>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-1/2 border-r border-gray-300">
                    <ResumeEditor resume={resume} onChange={updateResume}/>
                </div>
                <div className="w-1/2">
                    <ResumePreview resume={resume}/>
                </div>
            </div>
        </div>
    )
}