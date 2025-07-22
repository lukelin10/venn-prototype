import { useState, useEffect } from "react";
import { EnhancedMessage } from "@/types/thought-process";
import ToolInvocationCard from "./tool-invocation-card";
import FinalReasoningCard from "./final-reasoning-card";
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
              updated.toolInvocations[i] = {
                ...updated.toolInvocations[i],
                status: 'completed' as const
              };
              return updated;
            });
          }
        }
        
        // Start final reasoning
        await new Promise(resolve => setTimeout(resolve, 1000));
        setThoughtProcess(prev => prev ? {
          ...prev,
          status: 'final-reasoning' as const,
          finalReasoning: {
            ...prev.finalReasoning,
            status: 'loading' as const
          }
        } : undefined);
        
        // Complete final reasoning
        await new Promise(resolve => setTimeout(resolve, 2500));
        setThoughtProcess(prev => prev ? {
          ...prev,
          finalReasoning: {
            ...prev.finalReasoning,
            status: 'completed' as const
          }
        } : undefined);
        
        // Generate final response and complete
        await new Promise(resolve => setTimeout(resolve, 1000));
        const mockResponse = generateMockResponse(message.content, message.services || []);
        const finalResponseText = mockResponse.type === 'salesforce-opportunity' 
          ? "Based on my analysis of your Salesforce data and related communications, I found comprehensive information about the Green and Sons opportunity. The deal is progressing well in the Proposal/Price Quote stage with a value of $124,432 and a close date of June 14, 2025. Recent Gong insights show positive engagement from the CFO, though they're requesting a 5% discount for a multi-year commitment. I recommend scheduling the proposal review call by May 24 to maintain momentum."
          : "Based on my analysis across your selected enterprise data sources, I've compiled the relevant information and insights to help you with your query. The data shows consistent patterns and actionable next steps.";
        
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

  const handleToggleFinalReasoning = () => {
    setThoughtProcess(prev => {
      if (!prev) return undefined;
      return {
        ...prev,
        finalReasoning: {
          ...prev.finalReasoning,
          isExpanded: !prev.finalReasoning.isExpanded
        }
      };
    });
  };

  if (message.role === "user") {
    return (
      <div className="flex items-start space-x-3 animate-fade-in">
        <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
          <span className="text-white text-sm font-medium">LL</span>
        </div>
        <div className="max-w-md bg-slate-100 text-slate-900 px-4 py-3 rounded-2xl">
          <p className="text-sm">{message.content}</p>
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
          <p className="text-sm text-slate-700 leading-relaxed mb-4">
            {thoughtProcess.queryReasoning}
          </p>
        </div>
      )}

      {/* Tool Invocation Cards */}
      {thoughtProcess.status !== 'initializing' && thoughtProcess.status !== 'reasoning' && (
        <div className="space-y-3">
          {thoughtProcess.toolInvocations.map((tool) => (
            <div key={tool.id} className="animate-slide-in-from-left">
              <ToolInvocationCard
                toolInvocation={tool}
                onToggleExpanded={() => handleToggleToolInvocation(tool.id)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Final Reasoning Card */}
      {thoughtProcess.status === 'final-reasoning' || thoughtProcess.status === 'completed' ? (
        <div className="animate-slide-in-from-left">
          <FinalReasoningCard
            title={thoughtProcess.finalReasoning.title}
            steps={thoughtProcess.finalReasoning.steps}
            status={thoughtProcess.finalReasoning.status}
            isExpanded={thoughtProcess.finalReasoning.isExpanded}
            onToggleExpanded={handleToggleFinalReasoning}
          />
        </div>
      ) : null}

      {/* Final Response */}
      {thoughtProcess.status === 'completed' && thoughtProcess.finalResponse && (
        <div className="animate-fade-in">
          <div className="border-t pt-4 mt-6">
            <h3 className="font-semibold text-slate-800 text-sm mb-3">Final Response</h3>
            <div className="text-sm text-slate-700 leading-relaxed">
              {thoughtProcess.finalResponse}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}