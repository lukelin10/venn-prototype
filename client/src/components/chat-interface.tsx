import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MoreHorizontal, ExternalLink } from "lucide-react";
import VennLogo from "./venn-logo";
import ServiceSelector from "./service-selector";
import ChatMessage from "./chat-message";
import LoadingIndicator from "./loading-indicator";
import { generateMockResponse } from "@/lib/mock-responses";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  services?: string[];
  timestamp: Date;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
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

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate API delay
    setTimeout(() => {
      const response = generateMockResponse(userMessage.content, selectedServices);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.type,
        services: response.services,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 2000);
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
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white">
        <VennLogo size="md" />
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" className="p-1.5 h-auto">
            <MoreHorizontal className="w-4 h-4 text-slate-500" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1.5 h-auto">
            <ExternalLink className="w-4 h-4 text-slate-500" />
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
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 chat-scroll"
      >
        {messages.length === 0 && !isLoading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center text-slate-500 max-w-sm px-4">
              <p className="text-lg mb-2">Ask Venn to help with anything across your enterprise</p>
              <p className="text-sm">Search through emails, documents, CRM data, and more to get the insights you need.</p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        
        {isLoading && <LoadingIndicator services={selectedServices} />}
      </div>

      {/* Chat Input */}
      <div className="border-t border-slate-200 p-4 bg-white">
        <div className="flex items-end space-x-3">
          <div className="flex-1 min-h-[44px] max-h-32">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Chat with Venn..."
              className="resize-none border-slate-300 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
              rows={1}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!input.trim() || isLoading}
            className="w-11 h-11 bg-primary hover:bg-primary/90 text-white rounded-full p-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
