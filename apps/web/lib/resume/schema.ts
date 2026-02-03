import { z } from "zod"

export const ResumeHeaderSchema = z.object({
    name: z.string().min(3),
    email: z.email().optional(),
    phone: z.string().optional(),
    website: z.url().optional(),
    linkedin: z.url().optional(),
    github: z.url().optional(),
    location: z.string().optional(),
    relocation: z.string().optional()
})

export const ResumeExperienceItemPositionSchema = z.object({
    title: z.string().min(1),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    highlights: z.array(z.string()).default([])
})

export const ResumeExperienceItemSchema = z.object({
    organization: z.string().min(1),
    location: z.string().optional(),
    positions: z.array(ResumeExperienceItemPositionSchema).default([])
})

export const ResumeEducationItemSchema = z.object({
    school: z.string().min(1),
    degree: z.string().min(1),
    location: z.string().optional(),
    graduationDate: z.string().optional()
})

export const ResumeSchema = z.object({
    version: z.string().min(1),
    header: ResumeHeaderSchema,
    summary: z.string().optional(),
    skills: z.array(
        z.object({
            category: z.string().min(1),
            items: z.array(z.string()).default([])
        })
    ).default([]),
    experience: z.array(ResumeExperienceItemSchema).default([]),
    education: z.array(ResumeEducationItemSchema)
})

export type Resume = z.infer<typeof ResumeSchema>

export type Experience = z.infer<typeof ResumeExperienceItemSchema>