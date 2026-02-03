import type {Experience} from "./schema";

export function parseMonthYear(value?: string): Date | null {
    if (!value) return null;

    const v = value.trim().toLowerCase();
    if (["present", "current", "now"].includes(v)) return null;

    const d = new Date(`${value} 01`);
    return Number.isNaN(d.getTime()) ? null : d;
}

export function formatMonthYear(d: Date): string {
    return d.toLocaleString("en-US", {month: "short", year: "numeric"});
}

export function getCompanyDateRange(exp: Experience): string | null {
    const positions = exp.positions ?? [];
    if (positions.length === 0) return null;

    let earliestStart: Date | null = null;
    let latestEnd: Date | null = null;
    let hasOngoing = false;

    for (const p of positions) {
        // ✅ earliest start
        const s = parseMonthYear(p.startDate);
        if (s && (!earliestStart || s < earliestStart)) {
            earliestStart = s;
        }

        // ✅ ongoing if endDate missing or is "Present"/etc
        if (!p.endDate) {
            hasOngoing = true;
            continue;
        }

        const endRaw = p.endDate.trim().toLowerCase();
        if (["present", "current", "now"].includes(endRaw)) {
            hasOngoing = true;
            continue;
        }

        // ✅ latest end (THIS was the main bug)
        const e = parseMonthYear(p.endDate);
        if (e && (!latestEnd || e > latestEnd)) {
            latestEnd = e;
        }
    }

    if (!earliestStart) return null;

    const startLabel = formatMonthYear(earliestStart);
    const endLabel = hasOngoing
        ? "Present"
        : latestEnd
            ? formatMonthYear(latestEnd)
            : "Present";

    return `${startLabel} – ${endLabel}`;
}


export function hasGraduated(graduationDate?: string): boolean {
    if (!graduationDate) return false

    const parsedGraduationDate = parseMonthYear(graduationDate)

    if (!parsedGraduationDate) return false

    const effectiveGraduationDate = new Date(parsedGraduationDate.getFullYear(), parsedGraduationDate.getMonth() + 1, 1);

    return new Date() >= effectiveGraduationDate
}