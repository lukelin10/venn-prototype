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
  finalResponse: string;
  status: 'initializing' | 'reasoning' | 'invoking-tools' | 'completed';
}

export interface EnhancedMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  services?: string[];
  timestamp: Date;
  thoughtProcess?: ThoughtProcess;
}