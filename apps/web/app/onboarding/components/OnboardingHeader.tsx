import {FileText} from "lucide-react";

export default function OnboardingHeader() {
    return (
        <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-neutral-900">
                <FileText className="h-8 w-8 text-white"/>
            </div>
            <h1 className="text-3xl font-bold text-neutral-900">Create Your Base Resume</h1>
            <p className="mt-2 text-neutral-600">
                We'll use this to tailor resumes for specific job applications
            </p>
        </div>
    )
}