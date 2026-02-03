import base from './data/base.json'
import {Resume, ResumeSchema} from "@/lib/resume/schema";

const LOCAL_BY_VERSION: Record<string, unknown> = {
    base,
}

export async function loadResume(version: string): Promise<Resume> {
    const raw = LOCAL_BY_VERSION[version];
    if (!raw) throw new Error(`Unknown resume version: ${version}`)

    return ResumeSchema.parse(raw)
}