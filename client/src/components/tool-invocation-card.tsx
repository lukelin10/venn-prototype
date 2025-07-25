import { SiSalesforce, SiNotion, SiGoogledrive, SiGmail } from "react-icons/si";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Loader2, AlertTriangle } from "lucide-react";
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
  // Notion-specific tool actions
  search: { icon: SiNotion, color: "text-slate-800", name: "Notion" },
  fetch: { icon: SiNotion, color: "text-slate-800", name: "Notion" },
  "update-page": { icon: SiNotion, color: "text-slate-800", name: "Notion" },
  // Salesforce-specific tool actions
  "salesforce-search": { icon: SiSalesforce, color: "text-blue-500", name: "Salesforce" },
  "salesforce-update": { icon: SiSalesforce, color: "text-blue-500", name: "Salesforce" },
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
  ],
  // Notion PRD update sequence results
  search: [
    { title: "Venn Core Documents", subtitle: "https://www.notion.so/1eac7fe2e0b807281b2e389919a52b3", type: "page" },
    { title: "Venn PRD 2.0", subtitle: "Document contains product requirements", type: "page" },
    { title: "Venn Architecture Overview", subtitle: "Technical documentation", type: "page" }
  ],
  fetch: [
    { title: "Venn PRD 2.0 Content Retrieved", subtitle: "Document loaded successfully", type: "document" }
  ],
  "update-page": [
    { title: "Venn PRD 2.0 Updated", subtitle: "Added collaboration note to Version V2 section", type: "page" }
  ],
  // Salesforce at-risk opportunities sequence results
  "salesforce-search": [
    { title: "Green and Sons - Enterprise Deal", subtitle: "Deal Risk: High", type: "OPPORTUNITY", amount: "$124,432" },
    { title: "Acme Corp Expansion", subtitle: "Deal Risk: High", type: "OPPORTUNITY", amount: "$89,500" },
    { title: "TechFlow Solutions", subtitle: "Deal Risk: High", type: "OPPORTUNITY", amount: "$156,200" }
  ],
  "salesforce-update": [
    { title: "Green and Sons - Enterprise Deal", subtitle: "Close date updated to next month", type: "OPPORTUNITY" },
    { title: "Acme Corp Expansion", subtitle: "Close date updated to next month", type: "OPPORTUNITY" },
    { title: "TechFlow Solutions", subtitle: "Close date updated to next month", type: "OPPORTUNITY" }
  ]
};

export default function ToolInvocationCard({ 
  toolInvocation, 
  onToggleExpanded 
}: ToolInvocationCardProps) {
  const serviceConfig = serviceIcons[toolInvocation.toolName as keyof typeof serviceIcons];
  const Icon = serviceConfig?.icon;
  const results = mockResults[toolInvocation.toolName as keyof typeof mockResults] || [];

  // Auto-collapse after completion (but not for errors)
  useEffect(() => {
    if (toolInvocation.status === 'completed' && toolInvocation.isExpanded && !toolInvocation.error) {
      const timer = setTimeout(() => {
        onToggleExpanded();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toolInvocation.status, toolInvocation.isExpanded, onToggleExpanded, toolInvocation.error]);

  const getStatusIcon = () => {
    switch (toolInvocation.status) {
      case 'pending':
        return <div className="w-3 h-3 rounded-full border-2 border-gray-300" />;
      case 'loading':
        return <Loader2 className="w-3 h-3 animate-spin text-purple-primary" />;
      case 'completed':
        return null; // No status icon when completed, just the service icon
      case 'error':
        return null; // No status icon when error, just the service icon
    }
  };

  const getResultText = () => {
    if (toolInvocation.status === 'completed' && !toolInvocation.error) {
      return `${toolInvocation.resultCount} result${toolInvocation.resultCount !== 1 ? 's' : ''}`;
    }
    return '';
  };

  return (
    <div className="ml-0"> {/* Align to left edge */}
      <Card className={cn(
        "venn-card transition-all duration-300 ease-in-out",
        toolInvocation.status === 'pending' && "opacity-60",
        toolInvocation.status === 'loading' && "border-purple-light shadow-sm",
        toolInvocation.status === 'completed' && "border-gray-200",
        toolInvocation.status === 'error' && "border-red-300 shadow-sm"
      )}>

        <Button
          variant="ghost"
          className="justify-start p-0 h-auto font-normal text-left hover:bg-transparent w-full"
          onClick={onToggleExpanded}
          disabled={toolInvocation.status === 'pending'}
        >
          <div className="flex items-center justify-between w-full gap-3">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              {(toolInvocation.status === 'completed' || toolInvocation.status === 'error') ? (
                Icon && <Icon className={`w-3 h-3 ${serviceConfig.color} flex-shrink-0`} />
              ) : (
                <div className="flex-shrink-0">{getStatusIcon()}</div>
              )}
              <span className="text-body truncate">
                {toolInvocation.description}
              </span>
            </div>
            
            <div className="flex items-center space-x-2 flex-shrink-0">
              {toolInvocation.status === 'error' ? (
                <AlertTriangle className="w-3 h-3 text-red-500" />
              ) : toolInvocation.status === 'completed' && (
                <span className="text-label whitespace-nowrap">
                  {getResultText()}
                </span>
              )}
              {toolInvocation.status !== 'pending' && (
                toolInvocation.isExpanded ? 
                  <ChevronDown className="w-3 h-3 text-gray-400" /> : 
                  <ChevronRight className="w-3 h-3 text-gray-400" />
              )}
            </div>
          </div>
        </Button>
        
        {toolInvocation.isExpanded && toolInvocation.status === 'completed' && !toolInvocation.error && (
          <div className="mt-3 pt-3 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <div className="space-y-3">
              {results.slice(0, toolInvocation.resultCount).map((result, index) => (
                <div key={index} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg hover-scale">
                  <div className="flex-1">
                    <div className="text-body font-medium">
                      {result.title}
                    </div>
                    {result.subtitle && (
                      <div className="text-label normal-case">
                        {result.subtitle}
                      </div>
                    )}
                    {result.amount && (
                      <div className="text-label normal-case">
                        Amount: {result.amount}
                      </div>
                    )}
                    {result.owner && (
                      <div className="text-label normal-case">
                        Owner: {result.owner}
                      </div>
                    )}
                  </div>
                  <div className="text-label bg-gray-200 px-2 py-1 rounded">
                    {result.type}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {toolInvocation.isExpanded && toolInvocation.status === 'error' && toolInvocation.error && (
          <div className="mt-3 pt-3 border-t border-red-200 animate-in slide-in-from-top-2 duration-200">
            <div className="p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-body font-medium text-red-800 mb-2">
                    {toolInvocation.error.type === 'access' ? 'Access Denied' : 
                     toolInvocation.error.type === 'platform' ? 'Platform Access Constraint' : 
                     'Connection Error'}
                  </div>
                  <div className="text-body text-red-700">
                    {toolInvocation.error.message}
                  </div>
                  {toolInvocation.error.code && (
                    <div className="text-label text-red-600 mt-2 normal-case">
                      Error Code: {toolInvocation.error.code}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}