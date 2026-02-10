import {Textarea} from "@/components/ui/textarea";
import {Label} from "@/components/ui/label";

interface SummaryStepProps {
    value: string;
    onChange: (value: string) => void;
}

export default function SummaryStep({value, onChange}: SummaryStepProps) {
    return (
        <div>
            <Label htmlFor="summary">Professional Summary *</Label>
            <Textarea
                id="summary"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder="Experienced Data Engineer with 5+ years of expertise in building scalable data pipelines..."
                rows={8}
                className="mt-2"
            />
            <p className="mt-2 text-sm text-neutral-500">
                {value.length} characters (minimum 50)
            </p>
        </div>
    )
}