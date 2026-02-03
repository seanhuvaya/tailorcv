import {hasGraduated} from "@/lib/resume/dates";

export default function EducationItem({education}: {education: any}) {
    const graduated = hasGraduated(education.graduationDate)
    return (
        <div className="break-inside-avoid">
            <div className="flex items-baseline justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-neutral-900">{education.school} – {education.location && <span className="text-xs font-normal text-neutral-800">{education.location}</span>}</p>
                <p className="text-xs text-neutral-900 italic">{education.degree}</p>
              </div>
              {(education.graduationDate) && (
                <p className="text-xs text-neutral-900 whitespace-nowrap">
                    <span>{ graduated ? "Graduated " : "Expected "}</span>{education.graduationDate}
                </p>
              )}
            </div>
          </div>
    )
}