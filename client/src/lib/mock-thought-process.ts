import { ThoughtProcess, ToolInvocation, ReasoningStep } from "@/types/thought-process";

const mockToolData = {
  salesforce: {
    descriptions: [
      "Searched for Green and Sons on Salesforce",
      "Searched for account information in CRM",
      "Searched for deal pipeline in Salesforce"
    ],
    parameters: [
      "company: Acme Corp, stage: all",
      "account: Green and Sons, status: active",
      "opportunity: $100K+, close date: Q2 2025"
    ],
    resultCounts: [2, 3, 5, 1, 4]
  },
  notion: {
    descriptions: [
      "Searched for documents in Notion workspace",
      "Searched for meeting notes and project docs",
      "Searched for knowledge base entries"
    ],
    parameters: [
      "title: Acme Corp, type: all documents",
      "tags: meeting-notes, project-updates",
      "date: last 30 days, team: sales"
    ],
    resultCounts: [3, 7, 4, 2, 6]
  },
  // Special tools for Notion PRD update flow
  search: {
    descriptions: [
      "Searched for Venn PRD in Notion workspace"
    ],
    parameters: [
      "query: \"Venn PRD\", query_type: \"internal\""
    ],
    resultCounts: [3]
  },
  fetch: {
    descriptions: [
      "Fetched Venn PRD 2.0 document content"
    ],
    parameters: [
      "document_id: \"abc123\", include_content: true"
    ],
    resultCounts: [1]
  },
  "update-page": {
    descriptions: [
      "Updated Venn PRD 2.0 with collaboration details"
    ],
    parameters: [
      "page_id: \"abc123\", section: \"Version V2\", content: \"Moda Labs is helping!\""
    ],
    resultCounts: [1]
  },
  gdrive: {
    descriptions: [
      "Searched files in Google Drive",
      "Searched for shared documents and presentations",
      "Searched for file activity and permissions"
    ],
    parameters: [
      "name: proposal, type: documents",
      "owner: sales team, modified: last week",
      "folder: client-docs, shared: yes"
    ],
    resultCounts: [3, 4, 2, 5, 1]
  },
  gmail: {
    descriptions: [
      "Searched messages",
      "Searched for recent email threads",
      "Searched for contact history"
    ],
    parameters: [
      "from: acme.com, subject: proposal",
      "to: sales@company.com, date: last month",
      "thread: client-communication"
    ],
    resultCounts: [5, 3, 8, 4, 7]
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

function generateNotionPRDUpdateSequence(): ToolInvocation[] {
  return [
    {
      id: 'tool-0',
      toolName: 'search',
      description: 'Searched for Venn PRD in Notion workspace',
      parameters: 'query: "Venn PRD", query_type: "internal"',
      resultCount: 3,
      status: 'pending' as const,
      isExpanded: true
    },
    {
      id: 'tool-1',
      toolName: 'fetch',
      description: 'Fetched Venn PRD 2.0 document content',
      parameters: 'document_id: "abc123", include_content: true',
      resultCount: 1,
      status: 'pending' as const,
      isExpanded: true
    },
    {
      id: 'tool-2',
      toolName: 'update-page',
      description: 'Updated Venn PRD 2.0 with collaboration details',
      parameters: 'page_id: "abc123", section: "Version V2", content: "Moda Labs is helping!"',
      resultCount: 1,
      status: 'pending' as const,
      isExpanded: true
    }
  ];
}

function generateMockToolInvocations(services: string[], query: string): ToolInvocation[] {
  const queryLower = query.toLowerCase();
  
  // Check for Notion PRD update scenario
  if (queryLower.includes('update') && queryLower.includes('prd') && queryLower.includes('notion')) {
    return generateNotionPRDUpdateSequence();
  }
  
  const hasRuntimeError = queryLower.includes('error');
  const hasAccessError = queryLower.includes('access');
  const hasPlatformError = queryLower.includes('gateblock');
  
  return services.map((service, index) => {
    const serviceData = mockToolData[service as keyof typeof mockToolData];
    if (!serviceData) return null;
    
    // Determine if this tool should error based on keywords
    const shouldError = (hasRuntimeError || hasAccessError || hasPlatformError) && Math.random() < 0.5; // 50% chance if error keywords present
    const errorType = hasPlatformError ? 'platform' : (hasAccessError ? 'access' : 'runtime');
    
    const tool: ToolInvocation = {
      id: `tool-${index}`,
      toolName: service,
      description: getRandomItem(serviceData.descriptions),
      parameters: getRandomItem(serviceData.parameters),
      resultCount: shouldError ? 0 : getRandomItem(serviceData.resultCounts),
      status: 'pending' as const,
      isExpanded: true
    };
    
    if (shouldError) {
      tool.error = {
        type: errorType,
        message: errorType === 'platform'
          ? `Platform access constraint: Venn AI is not authorized to access ${service}. This service is restricted by enterprise security policies and cannot be accessed by automated systems.`
          : errorType === 'access' 
            ? `Access denied: Unable to access ${service} with role "sales-access-role". Contact your system administrator to address access concerns.`
            : `Failed to complete search in ${service}. Error code: ${Math.floor(Math.random() * 9000) + 1000}. The agent attempted to perform the task but was unable to connect to the service.`,
        code: errorType === 'runtime' ? `ERR_${Math.floor(Math.random() * 9000) + 1000}` : undefined,
        role: errorType === 'access' ? 'sales-access-role' : undefined
      };
    }
    
    return tool;
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
  
  if (queryLower.includes('update') && queryLower.includes('prd') && queryLower.includes('notion')) {
    return `I'll help you update the Venn PRD in Notion. Let me first search for the document to locate it.`;
  }
  
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
  const queryLower = query.toLowerCase();
  const isNotionPRDUpdate = queryLower.includes('update') && queryLower.includes('prd') && queryLower.includes('notion');
  
  // Generate progress updates for Notion PRD flow
  const progressUpdates = isNotionPRDUpdate ? [
    {
      id: 'progress-0',
      message: 'I found several Venn PRD documents. The most recent one appears to be "Venn PRD 2.0". Let me fetch it to see the current content and then update it with "Moda Labs is helping!"',
      toolIndex: 0,
      timestamp: new Date()
    },
    {
      id: 'progress-1', 
      message: 'Now I\'ll update the Venn PRD 2.0 document by adding "Moda Labs is helping!" in an appropriate location. I\'ll add it to the Version V2 section where Moda Labs is already mentioned.',
      toolIndex: 1,
      timestamp: new Date()
    }
  ] : undefined;
  
  return {
    id: `thought-${Date.now()}`,
    queryReasoning: generateQueryReasoning(query),
    toolInvocations: generateMockToolInvocations(services, query),
    progressUpdates,
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