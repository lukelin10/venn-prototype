export interface ToolInvocation {
  id: string;
  toolName: string;
  description: string;
  parameters: string;
  resultCount: number;
  status: 'pending' | 'loading' | 'completed' | 'error';
  isExpanded: boolean;
  error?: {
    type: 'runtime' | 'access' | 'platform';
    message: string;
    code?: string;
    role?: string;
  };
}

export interface ReasoningStep {
  id: string;
  title: string;
  description: string;
  order: number;
}

export interface ProgressUpdate {
  id: string;
  message: string;
  toolIndex: number; // Which tool this update refers to
  timestamp: Date;
}

export interface ThoughtProcess {
  id: string;
  queryReasoning: string;
  toolInvocations: ToolInvocation[];
  progressUpdates?: ProgressUpdate[]; // Updates shown between tool calls
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