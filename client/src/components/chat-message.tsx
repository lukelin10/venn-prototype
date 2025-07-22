import { Button } from "@/components/ui/button";
import { 
  Atom, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  MoreHorizontal,
  Building,
  Phone
} from "lucide-react";
import { 
  SiSalesforce, 
  SiNotion, 
  SiGoogledrive, 
  SiGmail 
} from "react-icons/si";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  services?: string[];
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const serviceIcons = {
  salesforce: { icon: SiSalesforce, color: "text-blue-500" },
  notion: { icon: SiNotion, color: "text-slate-800" },
  gdrive: { icon: SiGoogledrive, color: "text-yellow-500" },
  gmail: { icon: SiGmail, color: "text-red-500" },
};

function SalesforceOpportunityResponse() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <SiSalesforce className="w-4 h-4 text-blue-500" />
        <span className="text-xs text-slate-500">Salesforce Opportunity Summary</span>
      </div>
      
      <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Building className="w-4 h-4 text-slate-600" />
          <span className="font-medium text-slate-800">Green and Sons</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-600">Company:</span>
            <span className="font-medium text-slate-800">Green and Sons</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Stage:</span>
            <span className="font-medium text-slate-800">Proposal/Price Quote</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Amount:</span>
            <span className="font-semibold text-green-600">$124,432</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Close Date:</span>
            <span className="font-medium text-slate-800">June 14, 2025</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-600">Owner:</span>
            <span className="font-medium text-slate-800">Jamie Chen</span>
          </div>
        </div>
        
        <div className="pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-600 mb-1">Account Executive Notes:</p>
          <p className="text-sm text-slate-700">"Strong interest in bundling implementation services. Legal is reviewing MSA. Needs internal sign-off from CFO."</p>
        </div>
        
        <div className="pt-3 border-t border-slate-200">
          <p className="text-xs text-slate-600 mb-1">Next Step:</p>
          <p className="text-sm text-slate-700">Schedule proposal review call by May 24</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 space-y-3">
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-slate-600" />
          <span className="font-medium text-slate-800">Gong Insights</span>
        </div>
        
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-xs text-slate-600">Recent Call:</span>
            <span className="font-medium text-slate-800 ml-1">May 16 with CFO and Ops Lead</span>
          </div>
          
          <div>
            <p className="text-xs text-slate-600 mb-2">Key Takeaways:</p>
            <ul className="space-y-1 text-slate-700">
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>CFO is pushing for a 5% discount in exchange for multi-year commitment</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Positive feedback on our implementation timeline</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full mt-2 flex-shrink-0"></span>
                <span>Questions raised about API limits and security protocols</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function GenericResponse({ content }: { content: string }) {
  return (
    <div className="bg-slate-50 rounded-2xl p-4">
      <p className="text-sm text-slate-700">{content}</p>
    </div>
  );
}

export default function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end animate-fade-in">
        <div className="max-w-xs bg-venn-purple-500 text-white px-4 py-2 rounded-2xl rounded-br-md">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-slide-up">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-venn-purple-400 to-venn-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Atom className="w-3 h-3 text-white" />
        </div>
        
        <div className="flex-1 space-y-3">
          {message.services && message.services.length > 0 && (
            <div className="flex items-center space-x-2">
              {message.services.map((service) => {
                const serviceConfig = serviceIcons[service as keyof typeof serviceIcons];
                if (!serviceConfig) return null;
                const Icon = serviceConfig.icon;
                return (
                  <Icon key={service} className={`w-4 h-4 ${serviceConfig.color}`} />
                );
              })}
              <span className="text-xs text-slate-500">
                {message.services.includes("salesforce") && message.content === "salesforce-opportunity"
                  ? "Salesforce & Gong Analysis"
                  : "Enterprise Data Analysis"
                }
              </span>
            </div>
          )}
          
          {message.content === "salesforce-opportunity" ? (
            <SalesforceOpportunityResponse />
          ) : (
            <GenericResponse content={message.content} />
          )}

          <div className="flex items-center space-x-2 pt-2">
            <Button variant="ghost" size="sm" className="p-2 h-auto">
              <Copy className="w-4 h-4 text-slate-500" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 h-auto">
              <ThumbsUp className="w-4 h-4 text-slate-500" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 h-auto">
              <ThumbsDown className="w-4 h-4 text-slate-500" />
            </Button>
            <Button variant="ghost" size="sm" className="p-2 h-auto">
              <MoreHorizontal className="w-4 h-4 text-slate-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
