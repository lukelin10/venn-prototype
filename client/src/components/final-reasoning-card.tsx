import ThoughtProcessCard from "./thought-process-card";
import { ReasoningStep } from "@/types/thought-process";

interface FinalReasoningCardProps {
  title: string;
  steps: ReasoningStep[];
  status: 'pending' | 'loading' | 'completed';
  isExpanded: boolean;
  onToggleExpanded: () => void;
}

export default function FinalReasoningCard({ 
  title, 
  steps, 
  status, 
  isExpanded, 
  onToggleExpanded 
}: FinalReasoningCardProps) {
  return (
    <ThoughtProcessCard
      title={title}
      status={status}
      isExpanded={isExpanded}
      onToggleExpanded={onToggleExpanded}
      autoCollapseDelay={4000}
    >
      <div className="space-y-3">
        {steps
          .sort((a, b) => a.order - b.order)
          .map((step) => (
            <div key={step.id} className="flex items-start space-x-3">
              <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                {step.order}
              </div>
              <div className="space-y-1">
                <div className="font-medium text-sm text-slate-700">
                  {step.title}
                </div>
                <div className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
      </div>
    </ThoughtProcessCard>
  );
}