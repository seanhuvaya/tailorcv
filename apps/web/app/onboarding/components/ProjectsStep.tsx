'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '@/components/ui/textarea';
import {Plus, Trash2} from 'lucide-react';
import type {Project} from '@/lib/mockApi';

interface ProjectsStepProps {
    projects: Project[];
    onAddProject: () => void;
    onRemoveProject: (id: string) => void;
    onUpdateProject: (id: string, field: keyof Project, value: string | string[]) => void;
    onAddHighlight: (projectId: string) => void;
    onUpdateHighlight: (projectId: string, index: number, value: string) => void;
    onRemoveHighlight: (projectId: string, index: number) => void;
}

export default function ProjectsStep({
                                         projects,
                                         onAddProject,
                                         onRemoveProject,
                                         onUpdateProject,
                                         onAddHighlight,
                                         onUpdateHighlight,
                                         onRemoveHighlight,
                                     }: ProjectsStepProps) {
    return (
        <div className="space-y-6">
            {projects.map((project, projectIndex) => (
                <Card key={project.id} className="border-neutral-200">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                                Project {projectIndex + 1}
                            </CardTitle>
                            {projects.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveProject(project.id)}
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Name</Label>
                            <Input
                                value={project.name}
                                onChange={(e) =>
                                    onUpdateProject(project.id, 'name', e.target.value)
                                }
                                placeholder="Real-time Analytics Dashboard"
                            />
                        </div>
                        <div>
                            <Label>Description</Label>
                            <Textarea
                                value={project.description}
                                onChange={(e) =>
                                    onUpdateProject(project.id, 'description', e.target.value)
                                }
                                placeholder="A dashboard for monitoring data pipeline health and key metrics..."
                                rows={4}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <Label>Highlights</Label>
                            {project.highlights.map((bullet, bulletIndex) => (
                                <div key={bulletIndex} className="mt-2 flex gap-2">
                                    <Input
                                        value={bullet}
                                        onChange={(e) =>
                                            onUpdateHighlight(project.id, bulletIndex, e.target.value)
                                        }
                                        placeholder="Built with React and real-time WebSocket updates..."
                                    />
                                    {project.highlights.length > 1 && (
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() =>
                                                onRemoveHighlight(project.id, bulletIndex)
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
                                onClick={() => onAddHighlight(project.id)}
                                className="mt-2"
                            >
                                <Plus className="mr-2 h-4 w-4"/>
                                Add Bullet Point
                            </Button>
                        </div>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label>GitHub link (optional)</Label>
                                <Input
                                    value={project.githubLink}
                                    onChange={(e) =>
                                        onUpdateProject(project.id, 'githubLink', e.target.value)
                                    }
                                    placeholder="https://github.com/username/repo"
                                />
                            </div>
                            <div>
                                <Label>Website / demo link (optional)</Label>
                                <Input
                                    value={project.websiteLink}
                                    onChange={(e) =>
                                        onUpdateProject(project.id, 'websiteLink', e.target.value)
                                    }
                                    placeholder="https://demo.example.com"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button
                type="button"
                variant="outline"
                onClick={onAddProject}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4"/>
                Add Project
            </Button>
        </div>
    );
}
