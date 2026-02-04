"use client"

import {Resume} from "@/lib/resume/schema";
import PersonalInformation from "@/components/resume/editor/sections/PersonalInformation";
import WorkExperience from "@/components/resume/editor/sections/WorkExperience";

type ResumeEditorProps = {
    resume: Resume,
    onChange: (updatedResume: Resume) => void
}

export default function ResumeEditor({resume, onChange}: ResumeEditorProps) {
    return (
        <div className="h-full overflow-y-auto p-4">
            <PersonalInformation resume={resume} onChange={onChange} />
            <WorkExperience resume={resume} onChange={onChange} />
        </div>
    )
}