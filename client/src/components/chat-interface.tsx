import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MoreHorizontal, ExternalLink } from "lucide-react";
import VennLogo from "./venn-logo";
import ServiceSelector from "./service-selector";
import EnhancedChatMessage from "./enhanced-chat-message";
import LoadingIndicator from "./loading-indicator";
import { generateMockThoughtProcess } from "@/lib/mock-thought-process";
import { EnhancedMessage } from "@/types/thought-process";

export default function ChatInterface() {
  const [messages, setMessages] = useState<EnhancedMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "salesforce",
    "gdrive",
    "gmail",
  ]);
  
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 128) + "px";
    }
  }, [input]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: EnhancedMessage = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate brief delay before starting thought process
    setTimeout(() => {
      const thoughtProcess = generateMockThoughtProcess(userMessage.content, selectedServices);
      const assistantMessage: EnhancedMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: userMessage.content, // Store original query
        services: selectedServices,
        timestamp: new Date(),
        thoughtProcess: thoughtProcess
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-white">
        <VennLogo size="md" />
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-1.5 h-auto hover-lift">
            <MoreHorizontal className="w-4 h-4 text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1.5 h-auto hover-lift">
            <ExternalLink className="w-4 h-4 text-gray-600" />
          </Button>
        </div>
      </div>

      {/* Service Selection */}
      <ServiceSelector
        selectedServices={selectedServices}
        onServiceToggle={(service) => {
          setSelectedServices(prev =>
            prev.includes(service)
              ? prev.filter(s => s !== service)
              : [...prev, service]
          );
        }}
      />

      {/* Chat Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto py-6 space-y-6 chat-scroll bg-gray-50"
      >
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center max-w-md px-4">
              <h2 className="text-section-heading mb-4">Ask Venn to help with anything across your enterprise</h2>
              <p className="text-body">Search through emails, documents, CRM data, and more to get the insights you need.</p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <EnhancedChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && <LoadingIndicator services={selectedServices} />}
      </div>

      {/* Chat Input */}
      <div className="border-t border-gray-200 p-6 bg-white">
        <div className="flex items-end space-x-4">
          <div className="flex-1 min-h-[44px] max-h-32">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Chat with Venn..."
              className="chat-input resize-none rounded-2xl"
              rows={1}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="btn-primary w-11 h-11 rounded-full p-0 hover-lift active-scale"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
