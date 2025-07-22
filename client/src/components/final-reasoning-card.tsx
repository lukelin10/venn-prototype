import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReasoningStep } from "@/types/thought-process";
import { useEffect } from "react";

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
  // Auto-collapse after completion
  useEffect(() => {
    if (status === 'completed' && isExpanded) {
      const timer = setTimeout(() => {
        onToggleExpanded();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [status, isExpanded, onToggleExpanded]);

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 rounded-full border-2 border-slate-300" />;
      case 'loading':
        return (
          <div className="w-4 h-4 flex items-center justify-center">
            <svg className="w-4 h-4 animate-spin text-blue-500" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" />
              <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="2" strokeDasharray="6 30" strokeLinecap="round" />
            </svg>
          </div>
        );
      case 'completed':
        return (
          <div className="w-4 h-4 flex items-center justify-center">
            <svg className="w-4 h-4 text-slate-600" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="5.5" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7"/>
              <circle cx="10.5" cy="6" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7"/>
              <circle cx="8" cy="10" r="3.5" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.7"/>
              <circle cx="8" cy="7.5" r="1" fill="currentColor"/>
            </svg>
          </div>
        );
    }
  };

  const getActionText = () => {
    if (status === 'completed') {
      return `${steps.length} action${steps.length !== 1 ? 's' : ''}`;
    }
    return '';
  };

  return (
    <Card className={cn(
      "transition-all duration-300 ease-in-out",
      status === 'pending' && "opacity-60",
      status === 'loading' && "border-blue-200 shadow-sm",
      status === 'completed' && "border-slate-200"
    )}>
      <div className="p-3">
        <Button
          variant="ghost"
          className="justify-start p-0 h-auto font-normal text-left hover:bg-transparent w-full"
          onClick={onToggleExpanded}
          disabled={status === 'pending'}
        >
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="flex-shrink-0">{getStatusIcon()}</div>
              <span className="text-sm font-normal text-slate-700 truncate">
                {title}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              {status === 'completed' && (
                <span className="text-sm text-slate-500 whitespace-nowrap">
                  {getActionText()}
                </span>
              )}
              {status !== 'pending' && (
                isExpanded ? 
                  <ChevronDown className="w-4 h-4 text-slate-400" /> : 
                  <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </div>
        </Button>
        
        {isExpanded && status === 'completed' && (
          <div className="mt-3 pt-3 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
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
          </div>
        )}
      </div>
    </Card>
  );
}