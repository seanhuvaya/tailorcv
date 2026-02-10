import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Plus, Trash2} from "lucide-react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Education} from "@/lib/mockApi";

interface EducationStepProps {
    education: Education[];
    onAddEducation: () => void;
    onRemoveEducation: (id: string) => void;
    onUpdateEducation: (id: string, field: keyof Education, value: string) => void;
}

export function EducationStep({
                                  education,
                                  onAddEducation,
                                  onRemoveEducation,
                                  onUpdateEducation,
                              }: EducationStepProps) {
    return (
        <div className="space-y-6">
            {education.map((edu, eduIndex) => (
                <Card key={edu.id} className="border-neutral-200">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                                Education {eduIndex + 1}
                            </CardTitle>
                            {education.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveEducation(edu.id)}
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>School</Label>
                            <Input
                                value={edu.school}
                                onChange={(e) =>
                                    onUpdateEducation(edu.id, 'school', e.target.value)
                                }
                                placeholder="University of California"
                            />
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label>Degree</Label>
                                <Input
                                    value={edu.degree}
                                    onChange={(e) =>
                                        onUpdateEducation(edu.id, 'degree', e.target.value)
                                    }
                                    placeholder="Bachelor of Science"
                                />
                            </div>
                            <div>
                                <Label>Field of Study</Label>
                                <Input
                                    value={edu.field}
                                    onChange={(e) =>
                                        onUpdateEducation(edu.id, 'field', e.target.value)
                                    }
                                    placeholder="Computer Science"
                                />
                            </div>
                        </div>
                        <div>
                            <Label>Graduation Date</Label>
                            <Input
                                type="month"
                                value={edu.graduationDate}
                                onChange={(e) =>
                                    onUpdateEducation(edu.id, 'graduationDate', e.target.value)
                                }
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button
                type="button"
                variant="outline"
                onClick={onAddEducation}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4"/>
                Add Education
            </Button>
        </div>
    )
}