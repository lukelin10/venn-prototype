import { ThoughtProcess, ToolInvocation, ReasoningStep } from "@/types/thought-process";

const mockToolData = {
  salesforce: {
    descriptions: [
      "Searching for opportunity data in Salesforce",
      "Looking up account information in CRM",
      "Analyzing deal pipeline in Salesforce"
    ],
    parameters: [
      "company: Acme Corp, stage: all",
      "account: Green and Sons, status: active",
      "opportunity: $100K+, close date: Q2 2025"
    ],
    resultCounts: [8, 12, 5, 15, 3]
  },
  notion: {
    descriptions: [
      "Searching for documents in Notion workspace",
      "Looking up meeting notes and project docs",
      "Analyzing knowledge base entries"
    ],
    parameters: [
      "title: Acme Corp, type: all documents",
      "tags: meeting-notes, project-updates",
      "date: last 30 days, team: sales"
    ],
    resultCounts: [7, 23, 11, 4, 18]
  },
  gdrive: {
    descriptions: [
      "Searching files in Google Drive",
      "Looking up shared documents and presentations",
      "Analyzing file activity and permissions"
    ],
    parameters: [
      "name: proposal, type: documents",
      "owner: sales team, modified: last week",
      "folder: client-docs, shared: yes"
    ],
    resultCounts: [14, 6, 9, 21, 2]
  },
  gmail: {
    descriptions: [
      "Searching email conversations",
      "Analyzing recent email threads",
      "Looking up contact history"
    ],
    parameters: [
      "from: acme.com, subject: proposal",
      "to: sales@company.com, date: last month",
      "thread: client-communication"
    ],
    resultCounts: [28, 7, 15, 33, 12]
  }
};

const reasoningTemplates = [
  {
    title: "Data Analysis and Cross-referencing",
    steps: [
      { title: "Identify key data points", description: "Extract relevant information from each data source" },
      { title: "Cross-reference findings", description: "Compare data across different platforms for consistency" },
      { title: "Prioritize insights", description: "Determine the most actionable information" },
      { title: "Synthesize conclusions", description: "Combine findings into coherent recommendations" }
    ]
  },
  {
    title: "Customer Relationship Analysis",
    steps: [
      { title: "Gather communication history", description: "Compile all touchpoints with the customer" },
      { title: "Analyze engagement patterns", description: "Identify trends in customer interactions" },
      { title: "Assess relationship health", description: "Evaluate the strength of business relationship" },
      { title: "Generate next steps", description: "Recommend actions to improve customer success" }
    ]
  },
  {
    title: "Opportunity Assessment",
    steps: [
      { title: "Review deal progression", description: "Analyze current stage and probability" },
      { title: "Identify risk factors", description: "Assess potential blockers or challenges" },
      { title: "Evaluate resources needed", description: "Determine team involvement and timeline" },
      { title: "Formulate strategy", description: "Create action plan for deal advancement" }
    ]
  }
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function generateMockToolInvocations(services: string[]): ToolInvocation[] {
  return services.map((service, index) => {
    const serviceData = mockToolData[service as keyof typeof mockToolData];
    if (!serviceData) return null;
    
    return {
      id: `tool-${index}`,
      toolName: service,
      description: getRandomItem(serviceData.descriptions),
      parameters: getRandomItem(serviceData.parameters),
      resultCount: getRandomItem(serviceData.resultCounts),
      status: 'pending' as const,
      isExpanded: true
    };
  }).filter(Boolean) as ToolInvocation[];
}

function generateMockReasoningSteps(): { title: string; steps: ReasoningStep[] } {
  const template = getRandomItem(reasoningTemplates);
  
  return {
    title: template.title,
    steps: template.steps.map((step, index) => ({
      id: `step-${index}`,
      title: step.title,
      description: step.description,
      order: index + 1
    }))
  };
}

function generateQueryReasoning(query: string): string {
  const queryLower = query.toLowerCase();
  
  if (queryLower.includes('opportunity') || queryLower.includes('deal')) {
    return `You want to analyze sales opportunities and deal progression. I'll search across your CRM, emails, and documents to provide comprehensive deal insights.`;
  }
  
  if (queryLower.includes('email') || queryLower.includes('communication')) {
    return `You're looking for communication history and email insights. I'll analyze your email data and related documents to provide context.`;
  }
  
  if (queryLower.includes('document') || queryLower.includes('file')) {
    return `You need information from your documents and files. I'll search across your knowledge base and file storage to find relevant content.`;
  }
  
  if (queryLower.includes('customer') || queryLower.includes('client') || queryLower.includes('account')) {
    return `You want customer or account information. I'll gather data from your CRM, communications, and documents to provide a complete customer view.`;
  }
  
  return `I'll analyze your query and search across your enterprise data sources to find the most relevant information.`;
}

export function generateMockThoughtProcess(query: string, services: string[]): ThoughtProcess {
  const reasoning = generateMockReasoningSteps();
  
  return {
    id: `thought-${Date.now()}`,
    queryReasoning: generateQueryReasoning(query),
    toolInvocations: generateMockToolInvocations(services),
    finalReasoning: {
      title: reasoning.title,
      steps: reasoning.steps,
      isExpanded: true,
      status: 'pending'
    },
    finalResponse: '', // Will be populated later
    status: 'initializing'
  };
}