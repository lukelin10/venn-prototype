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
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-start space-x-3">
        <div className="w-8 h-8 bg-purple-primary rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-bold">V</span>
        </div>
        <div className="flex-1 space-y-4">
          <div className="flex items-center space-x-3">
            <div className="flex space-x-2">
              {services.map((service, index) => {
                const serviceConfig = serviceIcons[service as keyof typeof serviceIcons];
                if (!serviceConfig) return null;
                const Icon = serviceConfig.icon;
                return (
                  <div key={service} className="service-icon typing-indicator" style={{ animationDelay: `${index * 0.3}s` }}>
                    <Icon className={`w-4 h-4 ${serviceConfig.color}`} />
                  </div>
                );
              })}
            </div>
            <span className="text-label">Analyzing enterprise data...</span>
          </div>
          
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
