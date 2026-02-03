import type { Resume } from "@/lib/resume/schema";
import EducationItem from "@/components/resume/sections/EducationItem";

export default function Education({ items }: { items: Resume["education"] }) {
  if (!items?.length) return null;

  return (
    <section className="text-xs">
      <h2 className="font-semibold tracking-wide uppercase text-neutral-800 border-b border-neutral-200">
        Education
      </h2>

      <div className="mt-2 space-y-1 text-xs">
        {items.map((e, idx) => (
            <EducationItem key={`${e.school}-${idx}`} education={e} />
        ))}
      </div>
    </section>
  );
}
