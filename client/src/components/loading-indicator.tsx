import { Atom } from "lucide-react";
import { 
  SiSalesforce, 
  SiNotion, 
  SiGoogledrive, 
  SiGmail 
} from "react-icons/si";

interface LoadingIndicatorProps {
  services: string[];
}

const serviceIcons = {
  salesforce: { icon: SiSalesforce, color: "text-blue-500" },
  notion: { icon: SiNotion, color: "text-slate-800" },
  gdrive: { icon: SiGoogledrive, color: "text-yellow-500" },
  gmail: { icon: SiGmail, color: "text-red-500" },
};

export default function LoadingIndicator({ services }: LoadingIndicatorProps) {
  return (
    <div className="space-y-3 animate-fade-in">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-gradient-to-br from-venn-purple-400 to-venn-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
          <Atom className="w-3 h-3 text-white typing-indicator" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <div className="flex space-x-1">
              {services.map((service, index) => {
                const serviceConfig = serviceIcons[service as keyof typeof serviceIcons];
                if (!serviceConfig) return null;
                const Icon = serviceConfig.icon;
                return (
                  <Icon 
                    key={service} 
                    className={`w-4 h-4 ${serviceConfig.color} typing-indicator`}
                    style={{ animationDelay: `${index * 0.3}s` }}
                  />
                );
              })}
            </div>
            <span className="text-xs text-slate-500">Analyzing enterprise data...</span>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-4">
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 rounded animate-pulse"></div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-slate-200 rounded animate-pulse w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
