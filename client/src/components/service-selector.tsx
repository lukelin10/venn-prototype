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
  },
  {
    id: "notion", 
    name: "Notion",
    icon: SiNotion,
  },
  {
    id: "gdrive",
    name: "Google Drive", 
    icon: SiGoogledrive,
  },
  {
    id: "gmail",
    name: "Gmail",
    icon: SiGmail,
  },
];

export default function ServiceSelector({ selectedServices, onServiceToggle }: ServiceSelectorProps) {
  return (
    <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
      <p className="text-label mb-3">Select services:</p>
      <div className="grid grid-cols-4 gap-3 md:flex md:space-x-3 md:grid-cols-none">
        {services.map((service) => {
          const isSelected = selectedServices.includes(service.id);
          const Icon = service.icon;
          
          return (
            <Button
              key={service.id}
              variant="ghost"
              size="sm"
              onClick={() => onServiceToggle(service.id)}
              className={`service-icon hover-lift active-scale ${
                isSelected ? 'active' : ''
              }`}
            >
              <Icon 
                className={`w-3 h-3 ${
                  isSelected ? 'text-white' : 'text-gray-500'
                }`} 
              />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
