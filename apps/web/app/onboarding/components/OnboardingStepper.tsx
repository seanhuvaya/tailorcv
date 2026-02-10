'use client'

interface OnboardingStepperProps {
    currentStep: number;
    totalSteps?: number;
}

export default function OnboardingStepper({currentStep, totalSteps = 7}: OnboardingStepperProps) {
    return (
        <div className="mb-8 flex w-full items-center">
            {Array.from({length: totalSteps}, (_, i) => i + 1).flatMap((s, index) => {
                const circle = (
                    <div
                        key={`circle-${s}`}
                        className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors ${
                            s <= currentStep
                                ? 'border-neutral-900 bg-neutral-900 text-white'
                                : 'border-neutral-300 bg-white text-neutral-400'
                        }`}
                    >
                        {s}
                    </div>
                );

                if (s === totalSteps) return [circle];

                const line = (
                    <div
                        key={`line-${s}`}
                        className={`h-1 flex-1 ${
                            s < currentStep ? 'bg-neutral-900' : 'bg-neutral-300'
                        }`}
                    />
                );

                return [circle, line];
            })}
        </div>
    )
}