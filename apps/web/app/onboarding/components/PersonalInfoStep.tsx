import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    github: string;
    website: string;
}

interface PersonalInfoStepProps {
    value: PersonalInfo;
    onChange: (value: PersonalInfo) => void;
}

export default function PersonalInfoStep({value, onChange}: PersonalInfoStepProps) {
    return (
        <div className="space-y-4">
            <div>
                <Label htmlFor="fullName">Full Name *</Label>
                <Input
                    id="fullName"
                    value={value.fullName}
                    onChange={(e) => onChange({...value, fullName: e.target.value})}
                    placeholder="John Doe"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                        id="email"
                        type="email"
                        value={value.email}
                        onChange={(e) => onChange({...value, email: e.target.value})}
                        placeholder="john@example.com"
                    />
                </div>
                <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                        id="phone"
                        value={value.phone}
                        onChange={(e) => onChange({...value, phone: e.target.value})}
                        placeholder="+1 (555) 123-4567"
                    />
                </div>
            </div>
            <div>
                <Label htmlFor="location">Location</Label>
                <Input
                    id="location"
                    value={value.location}
                    onChange={(e) => onChange({...value, location: e.target.value})}
                    placeholder="San Francisco, CA"
                />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input
                        id="linkedin"
                        value={value.linkedin}
                        onChange={(e) => onChange({...value, linkedin: e.target.value})}
                        placeholder="linkedin.com/in/johndoe"
                    />
                </div>
                <div>
                    <Label htmlFor="github">GitHub</Label>
                    <Input
                        id="github"
                        value={value.github}
                        onChange={(e) => onChange({...value, github: e.target.value})}
                        placeholder="github.com/johndoe"
                    />
                </div>
                <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                        id="website"
                        value={value.website}
                        onChange={(e) => onChange({...value, website: e.target.value})}
                        placeholder="example.com"
                    />
                </div>
            </div>
        </div>
    )
}