import {loadResume} from "@/lib/resume/load";
import ResumeBuilder from "@/components/resume/ResumeBuilder";

export default async function ResumeBuilderPage({
  searchParams,
}: {
  searchParams: { version?: string; print?: string };
}) {
  const version = searchParams.version ?? "base";

  const resume = await loadResume(version);

  return <ResumeBuilder initialResume={resume}/>;
}