import type {Experience} from "@/lib/resume/schema";
import {getLatestJobTitle} from "@/lib/resume/selectors";
import {getCompanyDateRange} from "@/lib/resume/dates";

export default function ExperienceItem({
                                           experience,
                                       }: {
    experience: Experience;
}) {
    const latestTitle = getLatestJobTitle(experience);
    const companyDateRage = getCompanyDateRange(experience)

    return (
        <div className="break-inside-avoid">
            <h3 className="font-bold">
                {experience.organization}
                {latestTitle ? (
                    <>
                        {" "}
                        — <span className="font-semibold italic">{latestTitle}</span>
                    </>
                ) : null}
            </h3>

            <p className="font-semibold text-neutral-800">{experience.location} | {companyDateRage}</p>
            <div>
                {experience.positions.map((position) => (
                    <div key={position.title}>
                        { latestTitle != position.title && <h1 className="font-semibold italic text-neutral-800">{position.title}</h1>}
                        <h2>{position.startDate} — {position.endDate} </h2>
                        <ul className="text-justify list-disc pl-5">
                            {position.highlights.map((highlight) => (
                                <li key={highlight}>{highlight}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
