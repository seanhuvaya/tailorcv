"use client"

import type { Resume } from "@/lib/resume/schema";
import Header from "./sections/Header";
import Summary from "./sections/Summary";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Education from "./sections/Eduction";

export default function ResumeTemplate({
  data,
}: {
  data: Resume;
}) {
  return (
    <main
      className="mx-auto max-w-210.25 bg-white text-neutral-900 w-full p-4"
    >
      <div className="space-y-1 w-full">
        <Header data={data.header} />
        <Summary text={data.summary} />
        <Experience items={data.experience} />
        {/*<Projects items={data.projects} />*/}
        <Education items={data.education} />
        <Skills groups={data.skills} />
      </div>
    </main>
  );
}
