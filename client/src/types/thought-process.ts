export interface ToolInvocation {
  id: string;
  toolName: string;
  description: string;
  parameters: string;
  resultCount: number;
  status: 'pending' | 'loading' | 'completed';
  isExpanded: boolean;
}

export interface ReasoningStep {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface ThoughtProcess {
  id: string;
  queryReasoning: string;
  toolInvocations: ToolInvocation[];
  finalReasoning: {
    title: string;
    steps: ReasoningStep[];
    isExpanded: boolean;
    status: 'pending' | 'loading' | 'completed';
  };
  finalResponse: string;
  status: 'initializing' | 'reasoning' | 'invoking-tools' | 'final-reasoning' | 'completed';
}

export interface EnhancedMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  services?: string[];
  timestamp: Date;
  thoughtProcess?: ThoughtProcess;
}