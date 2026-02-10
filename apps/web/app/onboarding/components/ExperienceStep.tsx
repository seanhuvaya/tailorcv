import {Experience} from "@/lib/mockApi";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus, Trash2} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";

interface ExperienceStepProps {
    experiences: Experience[];
    onAddExperience: () => void;
    onRemoveExperience: (id: string) => void;
    onUpdateExperience: (id: string, field: keyof Experience, value: string | string[]) => void;
    onAddExperienceBullet: (id: string) => void;
    onUpdateExperienceBullet: (expId: string, index: number, value: string) => void;
    onRemoveExperienceBullet: (expId: string, index: number) => void;
}

export function ExperienceStep({
                                   experiences,
                                   onAddExperience,
                                   onRemoveExperience,
                                   onUpdateExperience,
                                   onAddExperienceBullet,
                                   onUpdateExperienceBullet,
                                   onRemoveExperienceBullet,
                               }: ExperienceStepProps) {
    return (
        <div className="space-y-6">
            {experiences.map((exp, expIndex) => (
                <Card key={exp.id} className="border-neutral-200">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                                Experience {expIndex + 1}
                            </CardTitle>
                            {experiences.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveExperience(exp.id)}
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label>Company</Label>
                                <Input
                                    value={exp.company}
                                    onChange={(e) =>
                                        onUpdateExperience(exp.id, 'company', e.target.value)
                                    }
                                    placeholder="TechCorp Inc"
                                />
                            </div>
                            <div>
                                <Label>Position</Label>
                                <Input
                                    value={exp.position}
                                    onChange={(e) =>
                                        onUpdateExperience(exp.id, 'position', e.target.value)
                                    }
                                    placeholder="Senior Data Engineer"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label>Start Date</Label>
                                <Input
                                    type="month"
                                    value={exp.startDate}
                                    onChange={(e) =>
                                        onUpdateExperience(exp.id, 'startDate', e.target.value)
                                    }
                                />
                            </div>
                            <div>
                                <Label>End Date</Label>
                                <Input
                                    type="month"
                                    value={exp.endDate}
                                    onChange={(e) =>
                                        onUpdateExperience(exp.id, 'endDate', e.target.value)
                                    }
                                    placeholder="Leave empty if current"
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Responsibilities & Achievements</Label>
                            {exp.description.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="mt-2 flex gap-2">
                                    <Input
                                        value={bullet}
                                        onChange={(e) =>
                                            onUpdateExperienceBullet(exp.id, bulletIndex, e.target.value)
                                        }
                                        placeholder="Built scalable data pipelines processing 1TB+ daily..."
                                    />
                                    {exp.description.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                onRemoveExperienceBullet(exp.id, bulletIndex)
                                            }
                                        >
                                            <Trash2 className="h-4 w-4"/>
                                        </Button>
                                    )}
                                </div>
                            ))}
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => onAddExperienceBullet(exp.id)}
                                className="mt-2"
                            >
                                <Plus className="mr-2 h-4 w-4"/>
                                Add Bullet Point
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button
                type="button"
                variant="outline"
                onClick={onAddExperience}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4"/>
                Add Experience
            </Button>
        </div>
    );
}