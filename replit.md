# Venn AI Enterprise Chat Interface

## Overview

This repository contains a full-stack web application designed as a Chrome extension sidebar simulation for enterprise AI chat interactions. The application integrates with multiple enterprise services (Salesforce, Gmail, Google Drive, Notion) and provides a modern chat interface for AI-powered enterprise data analysis.

## User Preferences

Preferred communication style: Simple, everyday language.
Interface simplicity: Remove unnecessary complexity from prototype (removed final reasoning cards).

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Routing**: Wouter (lightweight router)
- **State Management**: React Query (TanStack Query) for server state
- **Build Tool**: Vite with custom configuration for development and production

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: Connect-pg-simple for PostgreSQL session storage
- **Development**: Hot module replacement with Vite integration

### Database Schema
- **Users Table**: Basic authentication (id, username, password)
- **Chat Messages Table**: Message history with service tracking (id, content, role, services, timestamp)
- **Migration Strategy**: Drizzle Kit for schema management

## Key Components

### Chat Interface
- **Main Component**: `ChatInterface` - Handles message display, user input, and service selection
- **Message Rendering**: `ChatMessage` - Displays chat messages with service-specific formatting
- **Service Selection**: `ServiceSelector` - Toggle enterprise services (Salesforce, Gmail, Google Drive, Notion)
- **Loading States**: `LoadingIndicator` - Shows service analysis progress

### Enterprise Service Integration
- **Mock Implementation**: Current endpoints return placeholder responses for enterprise services
- **Extensible Design**: Router structure supports real API integrations
- **Service Icons**: React Icons for service branding (Salesforce, Gmail, etc.)

### UI Components
- **Design System**: shadcn/ui components with custom Venn AI branding
- **Responsive Design**: Tailored for sidebar/extension layout (400px width)
- **Accessibility**: Proper ARIA labels and keyboard navigation

## Data Flow

1. **User Input**: Messages entered through chat interface
2. **Service Selection**: User toggles which enterprise services to query
3. **Mock Processing**: Simulated AI analysis with service-specific responses
4. **Message Storage**: Chat history persisted to PostgreSQL database
5. **Real-time Updates**: React Query manages optimistic updates and caching

## External Dependencies

### Core Framework Dependencies
- React ecosystem (React, React DOM, React Query)
- Express.js with TypeScript support
- Drizzle ORM with PostgreSQL adapter (@neondatabase/serverless)

### UI and Styling
- Tailwind CSS with PostCSS
- Radix UI primitives for accessible components
- Lucide React for icons
- React Icons for service branding

### Development Tools
- Vite for build tooling and development server
- TypeScript for type safety
- ESBuild for production bundling
- Replit-specific plugins for development environment

### Enterprise Service Dependencies (Future)
- Prepared for Salesforce API integration
- Gmail API integration structure
- Google Drive API endpoints
- Notion API connectivity

## Deployment Strategy

### Development Environment
- **Local Development**: `npm run dev` runs concurrent frontend/backend
- **Database**: Environment variable `DATABASE_URL` for PostgreSQL connection
- **Hot Reload**: Vite middleware integration for seamless development

### Production Build
- **Frontend**: Vite builds React app to `dist/public`
- **Backend**: ESBuild bundles Express server to `dist/index.js`
- **Database Migrations**: `npm run db:push` applies schema changes
- **Deployment**: Single Node.js process serves both static files and API

### Database Configuration
- **Provider**: Neon PostgreSQL (serverless-friendly)
- **ORM**: Drizzle with automatic schema validation
- **Migrations**: Version-controlled schema changes in `./migrations`
- **Connection**: Pooled connections for production scalability

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NODE_ENV`: Development/production environment flag
- Session configuration for user authentication (when implemented)

The architecture prioritizes developer experience with hot reloading, type safety, and a component-driven UI while maintaining production readiness with proper database integration, session management, and scalable deployment patterns.

## Recent Changes

### January 2025 - Notion PRD Update Test Flow
- Added specialized test flow for Notion PRD updates with query: "update the Venn PRD in Notion"
- Implemented three-step tool sequence: search → fetch → update-page
- Added progress updates between tool calls showing agent's thought process
- Configured Notion branding for all document-related tool actions
- Removed final reasoning cards to simplify prototype interface (per user preference)
- Enhanced tool invocation cards to support custom Notion workflow tools

### Interface Simplifications
- Eliminated complex final reasoning/opportunity assessment cards
- Streamlined thought process to focus on tool invocations and final responses
- Removed unnecessary complexity from prototype while maintaining core functionality