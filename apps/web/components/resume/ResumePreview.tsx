import {Resume} from "@/lib/resume/schema";
import ResumeTemplate from "@/components/resume/ResumeTemplate";

type ResumePreviewProps = {
    resume: Resume
}


export default function ResumePreview({resume}: ResumePreviewProps) {
    return (
        <ResumeTemplate data={resume}/>
    )
}