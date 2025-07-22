import { 
  SiSalesforce, 
  SiNotion, 
  SiGoogledrive, 
  SiGmail 
} from "react-icons/si";
import VennLogo from "./venn-logo";

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
        <div className="flex-shrink-0 typing-indicator">
          <VennLogo size="sm" />
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
