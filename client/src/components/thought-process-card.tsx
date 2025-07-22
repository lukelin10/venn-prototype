import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThoughtProcessCardProps {
  title: string;
  status: 'pending' | 'loading' | 'completed';
  isExpanded: boolean;
  onToggleExpanded: () => void;
  children: React.ReactNode;
  autoCollapseDelay?: number;
}

export default function ThoughtProcessCard({ 
  title, 
  status, 
  isExpanded, 
  onToggleExpanded, 
  children,
  autoCollapseDelay 
}: ThoughtProcessCardProps) {
  useEffect(() => {
    if (status === 'completed' && isExpanded && autoCollapseDelay) {
      const timer = setTimeout(() => {
        onToggleExpanded();
      }, autoCollapseDelay);
      return () => clearTimeout(timer);
    }
  }, [status, isExpanded, autoCollapseDelay, onToggleExpanded]);

  const getStatusIcon = () => {
    switch (status) {
      case 'pending':
        return <div className="w-4 h-4 rounded-full border-2 border-slate-300" />;
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin text-blue-500" />;
      case 'completed':
        return <div className="w-4 h-4 rounded-full bg-green-500" />;
    }
  };

  return (
    <Card className={cn(
      "transition-all duration-300 ease-in-out",
      status === 'pending' && "opacity-60",
      status === 'loading' && "border-blue-200 shadow-sm",
      status === 'completed' && "border-green-200"
    )}>
      <CardHeader className="pb-2">
        <Button
          variant="ghost"
          className="justify-start p-0 h-auto font-normal text-left hover:bg-transparent"
          onClick={onToggleExpanded}
          disabled={status === 'pending'}
        >
          <div className="flex items-center space-x-2 w-full">
            {getStatusIcon()}
            <span className="flex-1 text-sm font-medium">{title}</span>
            {status !== 'pending' && (
              isExpanded ? 
                <ChevronDown className="w-4 h-4" /> : 
                <ChevronRight className="w-4 h-4" />
            )}
          </div>
        </Button>
      </CardHeader>
      {isExpanded && status !== 'pending' && (
        <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-200">
          {children}
        </CardContent>
      )}
    </Card>
  );
}