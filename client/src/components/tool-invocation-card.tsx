import { SiSalesforce, SiNotion, SiGoogledrive, SiGmail } from "react-icons/si";
import ThoughtProcessCard from "./thought-process-card";
import { ToolInvocation } from "@/types/thought-process";

interface ToolInvocationCardProps {
  toolInvocation: ToolInvocation;
  onToggleExpanded: () => void;
}

const serviceIcons = {
  salesforce: { icon: SiSalesforce, color: "text-blue-500", name: "Salesforce" },
  notion: { icon: SiNotion, color: "text-slate-800", name: "Notion" },
  gdrive: { icon: SiGoogledrive, color: "text-yellow-500", name: "Google Drive" },
  gmail: { icon: SiGmail, color: "text-red-500", name: "Gmail" },
};

export default function ToolInvocationCard({ 
  toolInvocation, 
  onToggleExpanded 
}: ToolInvocationCardProps) {
  const serviceConfig = serviceIcons[toolInvocation.toolName as keyof typeof serviceIcons];
  const Icon = serviceConfig?.icon;

  const getResultText = () => {
    if (toolInvocation.status === 'completed') {
      return `${toolInvocation.resultCount} result${toolInvocation.resultCount !== 1 ? 's' : ''}`;
    }
    return '';
  };

  return (
    <ThoughtProcessCard
      title={serviceConfig?.name || toolInvocation.toolName}
      status={toolInvocation.status}
      isExpanded={toolInvocation.isExpanded}
      onToggleExpanded={onToggleExpanded}
      autoCollapseDelay={3000}
    >
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          {Icon && <Icon className={`w-4 h-4 ${serviceConfig.color}`} />}
          <span className="text-sm text-slate-600">
            {toolInvocation.description}
          </span>
        </div>
        
        {toolInvocation.status === 'completed' && (
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">
              Search parameters: {toolInvocation.parameters}
            </span>
            <span className="text-sm text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {getResultText()}
            </span>
          </div>
        )}
      </div>
    </ThoughtProcessCard>
  );
}