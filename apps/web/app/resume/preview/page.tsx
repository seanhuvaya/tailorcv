import ResumeTemplate from "@/components/resume/ResumeTemplate";
import { loadResume } from "@/lib/resume/load";

export default async function ResumePreviewPage({
  searchParams,
}: {
  searchParams: { version?: string; print?: string };
}) {
  const version = searchParams.version ?? "base";

  const resume = await loadResume(version);

  return (
    <div className="min-h-screen">
      <ResumeTemplate data={resume} />
    </div>
  );
}
