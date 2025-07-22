
# venn-prototype
Prototype code from Replit

## Overview
This is a prototype for an AI-powered sidebar that demonstrates intelligent search and reasoning across multiple enterprise platforms including Salesforce, Notion, Google Drive, and Gmail.

## Live Demo
Access the prototype at: https://venn-ai-sidebar-lukelin101.replit.app/

## How to Use the Prototype

### Getting Started
1. Visit the prototype URL above
2. You'll see a chat interface with a query input field
3. Type your query and press Enter or click Send
4. Watch as the AI processes your request, showing its thought process and tool invocations

### Query Types to Try

#### 1. Regular Query
Try a standard search query to see normal functionality:
```
Tell me about green and sons on salesforce and notion
```
This will demonstrate:
- AI reasoning and planning
- Multiple tool invocations (Salesforce and Notion searches)
- Results synthesis and presentation

#### 2. Access Error Query
Test error handling for access permissions:
```
tell me about green and sons access
```
This triggers an access error scenario to show how the system handles permission issues.

#### 3. Standard Error Query
Test general error handling:
```
tell me about green and sons error
```
This demonstrates how the system gracefully handles and displays error conditions.

#### 4. Platform Access Constraint Query
Test platform-level access restrictions:
```
tell me about green and sons gateblock
```
This triggers a platform access constraint error, showing how the system handles cases where Venn AI itself is not authorized to access certain enterprise services due to security policies.

### What You'll See
- **Thought Process**: Real-time display of AI reasoning steps
- **Tool Invocations**: Visual representation of searches across different platforms
- **Loading States**: Animated indicators showing active processing
- **Results**: Synthesized information from multiple sources
- **Error Handling**: Graceful degradation when issues occur, including:
  - Access permission errors (user-level restrictions)
  - Connection/runtime errors (service unavailable)
  - Platform access constraints (system-level restrictions)

### Technical Features
- React + TypeScript frontend
- Express.js backend
- Mock data simulation for enterprise integrations
- Responsive design with Tailwind CSS
- Real-time UI updates during processing

## Development
This prototype runs on Replit and demonstrates enterprise AI sidebar capabilities without requiring actual API integrations.
