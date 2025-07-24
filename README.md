
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

### Demo Use Cases

#### 1. Notion PRD Update Workflow
Test a three-step document update workflow in Notion:
```
update the Venn PRD in Notion
```
This demonstrates:
- Document search in Notion workspace
- Content retrieval and analysis
- Page update with progress tracking
- Notion-branded tool invocation cards

#### 2. Salesforce At-Risk Opportunities (Success)
Test opportunity management workflow in Salesforce:
```
Find all my salesforce opportunities that are at deal risk and update their opportunity close dates to next month
```
This demonstrates:
- Salesforce opportunity search with risk assessment
- Batch update operations
- Progress updates between tool calls
- Salesforce-branded tool cards with opportunity data

#### 3. Salesforce At-Risk Opportunities (Access Error)
Test permission error handling in Salesforce:
```
Find all my access salesforce opportunities that are at deal risk and update their opportunity close dates to next month
```
This demonstrates:
- Successful search followed by permission denial
- Access error card with role information
- Admin contact guidance
- Proper error state handling

### Additional Query Types

#### 4. Regular Query
Try a standard search query to see normal functionality:
```
Tell me about green and sons on salesforce and notion
```
This will demonstrate:
- AI reasoning and planning
- Multiple tool invocations (Salesforce and Notion searches)
- Results synthesis and presentation

#### 5. General Error Scenarios
Test various error handling patterns:
```
tell me about green and sons access
tell me about green and sons error
tell me about green and sons gateblock
```
These trigger different error types: access permissions, general errors, and platform constraints.

### What You'll See
- **Multi-Step Workflows**: Complete task sequences with progress updates between each step
- **Service-Branded Tool Cards**: Visual tool invocations with proper branding (Notion, Salesforce)
- **Progress Communication**: Real-time updates showing what was found and next actions
- **Document Results**: Specific file names, amounts, and data from tool operations
- **Error Handling**: Comprehensive error scenarios including:
  - Access permission errors with role information and admin guidance
  - Connection/runtime errors (service unavailable)
  - Platform access constraints (system-level restrictions)
- **Dynamic Responses**: Context-aware final summaries based on successful operations or encountered errors

### Technical Features
- React + TypeScript frontend
- Express.js backend
- Mock data simulation for enterprise integrations
- Responsive design with Tailwind CSS
- Real-time UI updates during processing

## Development
This prototype runs on Replit and demonstrates enterprise AI sidebar capabilities without requiring actual API integrations.
