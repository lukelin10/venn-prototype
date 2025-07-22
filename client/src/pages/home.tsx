import { useState } from "react";
import ChatInterface from "@/components/chat-interface";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      {/* Chrome Extension Sidebar Simulation */}
      <div className="sidebar-container bg-white border border-slate-200 rounded-lg overflow-hidden">
        <ChatInterface />
      </div>
    </div>
  );
}
