import { useState, useEffect } from "react";
import { EnhancedMessage } from "@/types/thought-process";
import ToolInvocationCard from "./tool-invocation-card";
import { generateMockResponse } from "@/lib/mock-responses";

interface EnhancedChatMessageProps {
  message: EnhancedMessage;
}

export default function EnhancedChatMessage({ message }: EnhancedChatMessageProps) {
  const [thoughtProcess, setThoughtProcess] = useState(message.thoughtProcess);

  // Progressive loading simulation
  useEffect(() => {
    if (!thoughtProcess || thoughtProcess.status === 'completed') return;

    const processSteps = async () => {
      if (thoughtProcess.status === 'initializing') {
        // Start reasoning phase
        await new Promise(resolve => setTimeout(resolve, 800));
        setThoughtProcess(prev => prev ? {
          ...prev,
          status: 'reasoning' as const
        } : undefined);
        
        // Start tool invocations
        await new Promise(resolve => setTimeout(resolve, 1200));
        setThoughtProcess(prev => prev ? {
          ...prev,
          status: 'invoking-tools' as const
        } : undefined);
        
        // Process each tool invocation
        if (thoughtProcess.toolInvocations.length > 0) {
          for (let i = 0; i < thoughtProcess.toolInvocations.length; i++) {
            await new Promise(resolve => setTimeout(resolve, 1500 + (i * 800)));
            
            setThoughtProcess(prev => {
              if (!prev) return undefined;
              const updated = { ...prev };
              updated.toolInvocations[i] = {
                ...updated.toolInvocations[i],
                status: 'loading' as const
              };
              return updated;
            });
            
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            setThoughtProcess(prev => {
              if (!prev) return undefined;
              const updated = { ...prev };
              const tool = updated.toolInvocations[i];
              updated.toolInvocations[i] = {
                ...tool,
                status: tool.error ? 'error' as const : 'completed' as const
              };
              return updated;
            });
            
            // Show progress update after tool completion (if it exists)
            if (thoughtProcess.progressUpdates && i < thoughtProcess.progressUpdates.length) {
              await new Promise(resolve => setTimeout(resolve, 800));
              // Progress updates are shown in the UI rendering, no state change needed
            }
          }
        }
        
        // Generate final response and complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockResponse = generateMockResponse(message.content, message.services || []);
        
        // Check for specific flow types
        const queryLower = message.content.toLowerCase();
        const isNotionPRDUpdate = queryLower.includes('update') && queryLower.includes('prd') && queryLower.includes('notion');
        const isSalesforceAtRisk = queryLower.includes('salesforce') && queryLower.includes('risk') && queryLower.includes('update');
        
        let finalResponseText = "";
        
        if (isNotionPRDUpdate) {
          finalResponseText = "Perfect! I've successfully updated the Venn PRD 2.0 in Notion with \"Moda Labs is helping!\" The update has been added to the Version V2 section where Moda Labs is already mentioned. The addition appears right at the beginning of that section to emphasize Moda Labs' involvement in delivering the killer demo app features. The update maintains the document's structure while highlighting the collaborative effort with Moda Labs.";
        } else if (isSalesforceAtRisk) {
          if (queryLower.includes('access')) {
            finalResponseText = "I found 3 at-risk opportunities but encountered an access permission issue when trying to update their close dates. Your current Salesforce role 'sales-access-role' doesn't have the necessary permissions to modify opportunity close dates. To resolve this, contact your Salesforce administrator to request elevated permissions for updating opportunity records. The opportunities that need attention are: Green and Sons - Enterprise Deal ($124,432), Acme Corp Expansion ($89,500), and TechFlow Solutions ($156,200).";
          } else {
            finalResponseText = "Successfully updated all 3 at-risk opportunities in Salesforce! I've extended the close dates for Green and Sons - Enterprise Deal ($124,432), Acme Corp Expansion ($89,500), and TechFlow Solutions ($156,200) to next month. This gives your sales team additional time to address the risk factors and work toward successful deal closure. The updated close dates should help reduce pressure and allow for more strategic deal management.";
          }
        } else if (mockResponse.type === 'salesforce-opportunity') {
          finalResponseText = "Based on my analysis of your Salesforce data and related communications, I found comprehensive information about the Green and Sons opportunity. The deal is progressing well in the Proposal/Price Quote stage with a value of $124,432 and a close date of June 14, 2025. Recent Gong insights show positive engagement from the CFO, though they're requesting a 5% discount for a multi-year commitment. I recommend scheduling the proposal review call by May 24 to maintain momentum.";
        } else {
          finalResponseText = "Based on my analysis across your selected enterprise data sources, I've compiled the relevant information and insights to help you with your query. The data shows consistent patterns and actionable next steps.";
        }
        
        setThoughtProcess(prev => prev ? {
          ...prev,
          status: 'completed' as const,
          finalResponse: finalResponseText
        } : undefined);
      }
    };

    processSteps();
  }, [thoughtProcess, message.content, message.services]);

  // Handle toggle functions
  const handleToggleToolInvocation = (toolId: string) => {
    setThoughtProcess(prev => {
      if (!prev) return undefined;
      return {
        ...prev,
        toolInvocations: prev.toolInvocations.map(tool =>
          tool.id === toolId ? { ...tool, isExpanded: !tool.isExpanded } : tool
        )
      };
    });
  };



  if (message.role === "user") {
    return (
      <div className="chat-message-user animate-fade-in">
        <div className="user-avatar">
          <span>TS</span>
        </div>
        <div className="chat-bubble-user">
          <p>{message.content}</p>
        </div>
      </div>  
    );
  }

  if (!thoughtProcess) {
    return null;
  }

  return (
    <div className="space-y-4 animate-slide-up">
      {/* Query Reasoning */}
      {thoughtProcess.status !== 'initializing' && (
        <div className="animate-fade-in">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-primary rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-bold">V</span>
            </div>
            <div className="flex-1">
              <p className="text-body leading-relaxed mb-4">
                {thoughtProcess.queryReasoning}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tool Invocation Cards with Progress Updates */}
      {thoughtProcess.status !== 'initializing' && thoughtProcess.status !== 'reasoning' && (
        <div className="space-y-3">
          {thoughtProcess.toolInvocations.map((tool, index) => {
            const progressUpdate = thoughtProcess.progressUpdates?.find(
              update => update.toolIndex === index && 
              thoughtProcess.toolInvocations[index].status === 'completed'
            );
            
            return (
              <div key={tool.id}>
                <div className="animate-slide-in-from-left">
                  <ToolInvocationCard
                    toolInvocation={tool}
                    onToggleExpanded={() => handleToggleToolInvocation(tool.id)}
                  />
                </div>
                
                {/* Show progress update after this tool completes */}
                {progressUpdate && (
                  <div className="mt-4 animate-fade-in">
                    <div className="text-body leading-relaxed bg-gray-50 p-3 rounded-lg border-l-4 border-purple-primary ml-9">
                      {progressUpdate.message}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Final Response */}
      {thoughtProcess.status === 'completed' && thoughtProcess.finalResponse && (
        <div className="animate-fade-in">
          <div className="border-t border-gray-200 pt-6 mt-6">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-purple-primary rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">V</span>
              </div>
              <div className="flex-1">
                <div className="venn-card">
                  <h3 className="text-section-heading mb-4">Final Response</h3>
                  <div className="text-body leading-relaxed">
                    {thoughtProcess.finalResponse}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}