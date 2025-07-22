interface MockResponse {
  type: string;
  services: string[];
}

const opportunityKeywords = ['opportunity', 'deal', 'sales', 'green and sons', 'salesforce'];
const emailKeywords = ['email', 'mail', 'message', 'gmail', 'inbox'];
const documentKeywords = ['document', 'file', 'gdrive', 'drive', 'notion', 'notes'];
const generalKeywords = ['help', 'assist', 'information', 'data'];

export function generateMockResponse(query: string, availableServices: string[]): MockResponse {
  const lowercaseQuery = query.toLowerCase();
  
  // Check for specific content types
  if (opportunityKeywords.some(keyword => lowercaseQuery.includes(keyword))) {
    return {
      type: 'salesforce-opportunity',
      services: availableServices.filter(s => ['salesforce', 'gmail'].includes(s))
    };
  }
  
  if (emailKeywords.some(keyword => lowercaseQuery.includes(keyword))) {
    return {
      type: 'gmail-analysis',
      services: availableServices.filter(s => s === 'gmail')
    };
  }
  
  if (documentKeywords.some(keyword => lowercaseQuery.includes(keyword))) {
    return {
      type: 'document-search',
      services: availableServices.filter(s => ['gdrive', 'notion'].includes(s))
    };
  }
  
  // Default response
  return {
    type: "I'm analyzing your enterprise data sources to provide the most relevant information. How can I help you today?",
    services: availableServices.slice(0, 2) // Use first 2 available services
  };
}

export const mockResponses = {
  'salesforce-opportunity': {
    company: 'Green and Sons',
    stage: 'Proposal/Price Quote',
    amount: '$124,432',
    closeDate: 'June 14, 2025',
    owner: 'Jamie Chen',
    notes: 'Strong interest in bundling implementation services. Legal is reviewing MSA. Needs internal sign-off from CFO.',
    nextStep: 'Schedule proposal review call by May 24',
    gongInsights: {
      recentCall: 'May 16 with CFO and Ops Lead',
      takeaways: [
        'CFO is pushing for a 5% discount in exchange for multi-year commitment',
        'Positive feedback on our implementation timeline',
        'Questions raised about API limits and security protocols'
      ]
    }
  },
  'gmail-analysis': {
    content: 'I found 3 recent email threads related to your query. The most important conversation shows positive engagement from the client with several follow-up questions about implementation timeline.',
    threads: 3,
    lastActivity: '2 hours ago'
  },
  'document-search': {
    content: 'I found 7 relevant documents across Google Drive and Notion. The most recent proposal draft shows updated pricing and timeline information.',
    documents: 7,
    lastUpdated: 'Yesterday'
  }
};
