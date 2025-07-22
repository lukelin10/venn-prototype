import { Button } from "@/components/ui/button";
import { 
  SiSalesforce, 
  SiNotion, 
  SiGoogledrive, 
  SiGmail 
} from "react-icons/si";

interface ServiceSelectorProps {
  selectedServices: string[];
  onServiceToggle: (service: string) => void;
}

const services = [
  {
    id: "salesforce",
    name: "Salesforce",
    icon: SiSalesforce,
    activeColor: "bg-blue-100 hover:bg-blue-200",
    iconColor: "text-blue-600",
    inactiveColor: "bg-slate-200 hover:bg-slate-300",
    inactiveIconColor: "text-slate-600",
  },
  {
    id: "notion",
    name: "Notion",
    icon: SiNotion,
    activeColor: "bg-slate-100 hover:bg-slate-200",
    iconColor: "text-slate-800",
    inactiveColor: "bg-slate-200 hover:bg-slate-300",
    inactiveIconColor: "text-slate-600",
  },
  {
    id: "gdrive",
    name: "Google Drive",
    icon: SiGoogledrive,
    activeColor: "bg-yellow-100 hover:bg-yellow-200",
    iconColor: "text-yellow-600",
    inactiveColor: "bg-slate-200 hover:bg-slate-300",
    inactiveIconColor: "text-slate-600",
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: SiGmail,
    activeColor: "bg-red-100 hover:bg-red-200",
    iconColor: "text-red-600",
    inactiveColor: "bg-slate-200 hover:bg-slate-300",
    inactiveIconColor: "text-slate-600",
  },
];

export default function ServiceSelector({ selectedServices, onServiceToggle }: ServiceSelectorProps) {
  return (
    <div className="px-4 py-3 border-b border-slate-100 bg-slate-50">
      <p className="text-xs text-slate-600 mb-2">Select services:</p>
      <div className="flex space-x-2">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          const Icon = service.icon;
          
          return (
            <Button
              key={service.id}
              variant="ghost"
              size="sm"
              onClick={() => onServiceToggle(service.id)}
              className={`w-8 h-8 p-0 transition-colors ${
                isSelected 
                  ? service.activeColor 
                  : service.inactiveColor
              }`}
            >
              <Icon 
                className={`w-4 h-4 ${
                  isSelected 
                    ? service.iconColor 
                    : service.inactiveIconColor
                }`} 
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
