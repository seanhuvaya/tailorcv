'use client';

import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Plus, Trash2} from 'lucide-react';

interface SkillsStepProps {
    skills: string[];
    onAddSkill: () => void;
    onUpdateSkill: (index: number, value: string) => void;
    onRemoveSkill: (index: number) => void;
}

export function SkillsStep({
                               skills,
                               onAddSkill,
                               onUpdateSkill,
                               onRemoveSkill,
                           }: SkillsStepProps) {
    return (
        <div className="space-y-4">
            <Label>Skills</Label>
            <div className="space-y-2">
                {skills.map((skill, index) => (
                    <div key={index} className="flex gap-2">
                        <Input
                            value={skill}
                            onChange={(e) => onUpdateSkill(index, e.target.value)}
                            placeholder="Python, AWS, Spark, SQL..."
                        />
                        {skills.length > 1 && (
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => onRemoveSkill(index)}
                            >
                                <Trash2 className="h-4 w-4"/>
                            </Button>
                        )}
                    </div>
                ))}
            </div>
            <Button
                type="button"
                variant="outline"
                onClick={onAddSkill}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4"/>
                Add Skill
            </Button>
        </div>
    );
}
