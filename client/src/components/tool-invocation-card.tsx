import { SiSalesforce, SiNotion, SiGoogledrive, SiGmail } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { ToolInvocation } from "@/types/thought-process";
import { useEffect } from "react";

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

// Mock result data for different services
interface MockResult {
  title: string;
  type: string;
  subtitle?: string;
  amount?: string;
  owner?: string;
}

const mockResults: Record<string, MockResult[]> = {
  salesforce: [
    { title: "Green and Sons - Enterprise Deal", type: "OPPORTUNITY", amount: "$124,432" },
    { title: "Green and Sons Account", type: "ACCOUNT", owner: "Jamie Chen" }
  ],
  gmail: [
    { title: "Carolina Alumni Connection", subtitle: "Williams, Matthew", type: "EMAIL" },
    { title: "Carolina Alumni Connection", subtitle: "Williams, Matthew", type: "EMAIL" },
    { title: "Re: Sonar <> Moda Follow Up", subtitle: "Luke Lin", type: "EMAIL" },
    { title: "Re: Sonar <> Moda Follow Up", subtitle: "Perry Stallings", type: "EMAIL" },
    { title: "Re: Sonar <> Moda Follow Up", subtitle: "Luke Lin", type: "EMAIL" }
  ],
  gdrive: [
    { title: "Green and Sons Proposal Draft", type: "DOCUMENT" },
    { title: "Q2 2025 Sales Pipeline", type: "SPREADSHEET" },
    { title: "Client Meeting Notes - Green and Sons", type: "DOCUMENT" }
  ],
  notion: [
    { title: "Green and Sons - Deal Notes", type: "PAGE" },
    { title: "Customer Success Framework", type: "PAGE" },
    { title: "Sales Process Documentation", type: "PAGE" }
  ]
};

export default function ToolInvocationCard({ 
  toolInvocation, 
  onToggleExpanded 
}: ToolInvocationCardProps) {
  const serviceConfig = serviceIcons[toolInvocation.toolName as keyof typeof serviceIcons];
  const Icon = serviceConfig?.icon;
  const results = mockResults[toolInvocation.toolName as keyof typeof mockResults] || [];

  // Auto-collapse after completion
  useEffect(() => {
    if (toolInvocation.status === 'completed' && toolInvocation.isExpanded) {
      const timer = setTimeout(() => {
        onToggleExpanded();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toolInvocation.status, toolInvocation.isExpanded, onToggleExpanded]);

  const getStatusIcon = () => {
    switch (toolInvocation.status) {
      case 'pending':
        return <div className="w-4 h-4 rounded-full border-2 border-slate-300" />;
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case 'completed':
        return null; // No status icon when completed, just the service icon
    }
  };

  const getResultText = () => {
    if (toolInvocation.status === 'completed') {
      return `${toolInvocation.resultCount} result${toolInvocation.resultCount !== 1 ? 's' : ''}`;
    }
    return '';
  };

  return (
    <Card className={cn(
      "transition-all duration-300 ease-in-out",
      toolInvocation.status === 'pending' && "opacity-60",
      toolInvocation.status === 'loading' && "border-blue-200 shadow-sm",
      toolInvocation.status === 'completed' && "border-slate-200"
    )}>
      <div className="p-3">
        <Button
          variant="ghost"
          className="justify-start p-0 h-auto font-normal text-left hover:bg-transparent w-full"
          onClick={onToggleExpanded}
          disabled={toolInvocation.status === 'pending'}
        >
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {toolInvocation.status === 'completed' ? (
                Icon && <Icon className={`w-4 h-4 ${serviceConfig.color} flex-shrink-0`} />
              ) : (
                <div className="flex-shrink-0">{getStatusIcon()}</div>
              )}
              <span className="text-sm font-normal text-slate-700 truncate">
                {toolInvocation.description}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              {toolInvocation.status === 'completed' && (
                <span className="text-sm text-slate-500 whitespace-nowrap">
                  {getResultText()}
                </span>
              )}
              {toolInvocation.status !== 'pending' && (
                toolInvocation.isExpanded ? 
                  <ChevronDown className="w-4 h-4 text-slate-400" /> : 
                  <ChevronRight className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </div>
        </Button>
        
        {toolInvocation.isExpanded && toolInvocation.status === 'completed' && (
          <div className="mt-3 pt-3 border-t border-slate-100 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-2">
              {results.slice(0, toolInvocation.resultCount).map((result, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                  <div className="flex-1">
                    <div className="text-sm font-medium text-slate-800">
                      {result.title}
                    </div>
                    {result.subtitle && (
                      <div className="text-xs text-slate-500">
                        {result.subtitle}
                      </div>
                    )}
                    {result.amount && (
                      <div className="text-xs text-slate-600">
                        Amount: {result.amount}
                      </div>
                    )}
                    {result.owner && (
                      <div className="text-xs text-slate-600">
                        Owner: {result.owner}
                      </div>
                    )}
                  </div>
                  <div className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded font-medium">
                    {result.type}
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