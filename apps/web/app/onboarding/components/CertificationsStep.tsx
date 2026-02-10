'use client';

import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Plus, Trash2} from 'lucide-react';
import type {Certification} from '@/lib/mockApi';

interface CertificationsStepProps {
    certifications: Certification[];
    onAddCertification: () => void;
    onRemoveCertification: (id: string) => void;
    onUpdateCertification: (id: string, field: keyof Certification, value: string) => void;
}

export default function CertificationsStep({
                                               certifications,
                                               onAddCertification,
                                               onRemoveCertification,
                                               onUpdateCertification,
                                           }: CertificationsStepProps) {
    return (
        <div className="space-y-6">
            {certifications.map((cert, certIndex) => (
                <Card key={cert.id} className="border-neutral-200">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-base">
                                Certification / Award {certIndex + 1}
                            </CardTitle>
                            {certifications.length > 1 && (
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => onRemoveCertification(cert.id)}
                                >
                                    <Trash2 className="h-4 w-4"/>
                                </Button>
                            )}
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <Label>Title</Label>
                            <Input
                                value={cert.title}
                                onChange={(e) =>
                                    onUpdateCertification(cert.id, 'title', e.target.value)
                                }
                                placeholder="AWS Certified Data Engineer"
                            />
                        </div>
                        <div>
                            <Label>Issuer</Label>
                            <Input
                                value={cert.issuer}
                                onChange={(e) =>
                                    onUpdateCertification(cert.id, 'issuer', e.target.value)
                                }
                                placeholder="Amazon Web Services"
                            />
                        </div>
                        <div>
                            <Label>Date</Label>
                            <Input
                                type="month"
                                value={cert.date}
                                onChange={(e) =>
                                    onUpdateCertification(cert.id, 'date', e.target.value)
                                }
                                placeholder="2024-01"
                            />
                        </div>
                    </CardContent>
                </Card>
            ))}
            <Button
                type="button"
                variant="outline"
                onClick={onAddCertification}
                className="w-full"
            >
                <Plus className="mr-2 h-4 w-4"/>
                Add Certification / Award
            </Button>
        </div>
    );
}
