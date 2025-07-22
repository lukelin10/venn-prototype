import { Button } from "@/components/ui/button";
import { 
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
import VennLogo from "./venn-logo";

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
    <div className="space-y-4 text-sm leading-relaxed">
      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <SiSalesforce className="w-4 h-4 text-blue-500" />
          <span className="font-medium text-slate-800">Salesforce Opportunity Summary:</span>
        </div>
        
        <div className="space-y-1 ml-6">
          <div><span className="font-medium">Company:</span> Green and Sons</div>
          <div><span className="font-medium">Stage:</span> Proposal/Price Quote</div>
          <div><span className="font-medium">Amount:</span> $124,432</div>
          <div><span className="font-medium">Close Date:</span> June 14, 2025</div>
          <div><span className="font-medium">Owner:</span> Jamie Chen</div>
          <div><span className="font-medium">Account Executive Notes:</span> "Strong interest in bundling implementation services. Legal is reviewing MSA. Needs internal sign-off from CFO."</div>
          <div><span className="font-medium">Next Step:</span> Schedule proposal review call by May 24</div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-slate-600" />
          <span className="font-medium text-slate-800">Gong Insights</span>
        </div>
        
        <div className="space-y-1 ml-6">
          <div><span className="font-medium">Recent Call:</span> May 16 with CFO and Ops Lead</div>
          <div><span className="font-medium">Key Takeaways:</span></div>
          <ul className="ml-4 space-y-1">
            <li>• CFO is pushing for a 5% discount in exchange for multi-year commitment</li>
            <li>• Positive feedback on our implementation timeline</li>
            <li>• Questions raised about API limits and security protocols</li>
          </ul>
        </div>
      </div>
    </div>
  );
}



export default function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === "user") {
    return (
      <div className="flex items-start space-x-3 animate-fade-in">
        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">LL</span>
        </div>
        <div className="max-w-md bg-slate-100 text-slate-900 px-4 py-3 rounded-2xl">
          <p className="text-sm">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3 animate-slide-up">
      {message.services && message.services.length > 0 && (
        <div className="flex items-center space-x-2 mb-2">
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
      
      <div className="text-slate-900">
        {message.content === "salesforce-opportunity" ? (
          <SalesforceOpportunityResponse />
        ) : (
          <div className="text-sm leading-relaxed">
            <p>{message.content}</p>
          </div>
        )}
      </div>
    </div>
  );
}
