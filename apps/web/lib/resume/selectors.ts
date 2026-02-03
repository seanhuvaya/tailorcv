import {Experience} from "@/lib/resume/schema";

import { parseMonthYear } from "./dates";

export function getLatestJobTitle(exp: Experience): string | null {
  if (!exp.positions?.length) return null;

  const latest = exp.positions.reduce((latest, current) => {
    const latestEnd = parseMonthYear(latest.end_date);
    const currentEnd = parseMonthYear(current.end_date);

    return currentEnd > latestEnd ? current : latest;
  });

  return latest.title;
}
