import type {Experience, Resume} from "@/lib/resume/schema";
import ExperienceItem from "@/components/resume/sections/ExperienceItem";

export default function Experience({items}: { items: Resume["experience"] }) {
    if (!items?.length) return null;

    return (
        <section className="text-xs">
            <h2 className="font-semibold tracking-wide uppercase text-neutral-800 border-b border-neutral-200">
                Experience
            </h2>

            <div className="mt-2 space-y-1">
                {items.map((exp: Experience) => (<ExperienceItem key={`${exp.organization}-${exp.location}`} experience={exp}/>))}
            </div>
        </section>
    );
}
