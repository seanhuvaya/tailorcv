"use client";

import {useEffect, useState} from "react";
import ResumePreview from "@/components/resume/ResumePreview";

export default function PreviewPage() {
    const [data, setData] = useState<any>(() =>
        typeof window !== "undefined" ? window.__RESUME_DATA__ ?? null : null
    );

    useEffect(() => {
        const handler = () => setData(window.__RESUME_DATA__ ?? null);
        window.addEventListener("resume-data", handler);
        return () => window.removeEventListener("resume-data", handler);
    }, []);

    if (!data) return null;

    return <ResumePreview resume={data}/>;
}
