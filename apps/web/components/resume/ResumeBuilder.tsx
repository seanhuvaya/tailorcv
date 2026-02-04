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
    const [resume, setResume] = useState<Resume>(initialResume);
    const [isDownloading, setIsDownloading] = useState(false);

    const updateResume = (updatedResume: Resume) => {
        setResume(updatedResume)
    }

    const handleDownload = async () => {
        try {
            setIsDownloading(true);

            const res = await fetch("/api/resume/pdf?version=base", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(resume),
            });

            if (!res.ok) {
                const text = await res.text().catch(() => "");
                throw new Error(`PDF generation failed: ${res.status} ${text}`);
            }

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "resume.pdf"; // or include version/date
            document.body.appendChild(a);
            a.click();
            a.remove();

            URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Failed to generate PDF. Check console for details.");
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="h-screen flex flex-col">
            <header className="bg-white border-b border-gray-300 px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">TailorCV</h1>

                <button
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                    <FaDownload size={18}/>
                    {isDownloading ? "Generating..." : "Download PDF"}
                </button>
            </header>

            <div className="flex flex-col md:flex-row flex-1 md:overflow-hidden">
                <div className="md:w-1/2 border-r border-gray-300">
                    <ResumeEditor resume={resume} onChange={updateResume}/>
                </div>
                <div className="md:w-1/2">
                    <ResumePreview resume={resume}/>
                </div>
            </div>
        </div>
    )
}