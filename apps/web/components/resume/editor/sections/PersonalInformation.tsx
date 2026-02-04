"use client"

import {Resume} from "@/lib/resume/schema";

type PersonalInformationProps = {
    resume: Resume,
    onChange: (updatedResume: Resume) => void
};


export default function PersonalInformation({resume, onChange}: PersonalInformationProps) {
    const updateHeader = (
        field: keyof Resume["header"],
        value: string
    ) => {
        onChange({
            ...resume,
            header: {
                ...resume.header,
                [field]: value,
            },
        });
    };

    const updateSummary = (value: string) => {
        if (onChange) {
            onChange({
                ...resume,
                summary: value,
            });
        }
    };

    return (
        <section className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
                Personal Information
            </h3>

            <div className="space-y-4">
                <input
                    type="text"
                    placeholder="Full Name"
                    value={resume.header.name}
                    onChange={(e) => updateHeader("name", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                    type="email"
                    placeholder="Email"
                    value={resume.header.email}
                    onChange={(e) => updateHeader("email", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                    type="tel"
                    placeholder="Phone"
                    value={resume.header.phone}
                    onChange={(e) => updateHeader("phone", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                    type="url"
                    placeholder="Website"
                    value={resume.header.website}
                    onChange={(e) => updateHeader("website", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                    type="url"
                    placeholder="LinkedIn"
                    value={resume.header.linkedin}
                    onChange={(e) => updateHeader("linkedin", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                    type="url"
                    placeholder="GitHub"
                    value={resume.header.github}
                    onChange={(e) => updateHeader("github", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                    type="text"
                    placeholder="Location"
                    value={resume.header.location}
                    onChange={(e) => updateHeader("location", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <input
                    type="text"
                    placeholder="Relocation"
                    value={resume.header.relocation}
                    onChange={(e) => updateHeader("relocation", e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />

                <textarea
                    placeholder="Professional Summary"
                    value={resume.summary}
                    onChange={(e) => updateSummary(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
            </div>
        </section>
    );
}