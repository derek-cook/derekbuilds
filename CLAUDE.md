# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Derek Cook's personal portfolio website (`derekbuilds.ai`) built with Next.js 14 App Router, TypeScript, and the T3 Stack. The site showcases projects and includes advanced features like AI-powered resume assistance and real-time collaboration demos.

## Common Commands

**Development:**
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run start        # Start production server
```

**Database:**
```bash
npm run db:push      # Push Prisma schema changes to database
npm run db:studio    # Open Prisma Studio for database management
```

**AI Features:**
```bash
npm run generate-embeddings-supabase  # Index documents for vector search
```

## Architecture

**Tech Stack:**
- Next.js 14 with App Router
- TypeScript with strict mode
- Tailwind CSS + shadcn/ui components
- Prisma ORM with SQLite
- Clerk authentication
- tRPC for type-safe APIs
- OpenAI API for AI features
- Custom real-time collaboration system (WebSocket-based)

**Key Directory Structure:**
- `src/app/` - App Router pages and API routes
- `src/components/` - React components (includes shadcn/ui in `ui/` subdirectory)
- `src/lib/` - Utility libraries and configurations
- `src/server/` - tRPC routers and server-side code
- `src/scripts/` - Utility scripts (including AI embedding generation)

**Configuration Files:**
- `src/env.mjs` - Environment variable validation with Zod
- `components.json` - shadcn/ui configuration (uses "new-york" style)
- `kirimase.config.json` - T3 stack scaffolding configuration
- `prisma/schema.prisma` - Database schema

## Key Features

**AI Q&A System (`src/app/api/qa/route.ts`):**
- Vector search integration with Supabase
- OpenAI API for generating responses about Derek's experience
- Streaming responses for real-time chat

**Real-time Collaboration (`src/lib/realtime/`):**
- Custom WebSocket implementation with live cursors
- Channel-based communication system
- Multiple demo applications for testing

**Authentication:**
- Clerk integration with middleware protection
- Public routes: homepage, AI endpoints
- Protected routes: account management, pools

## Development Patterns

**Component Architecture:**
- Uses shadcn/ui base components with Radix UI primitives
- Custom components follow Tailwind utility-first approach
- Path aliases configured (`~/` points to `src/`)

**API Patterns:**
- tRPC for type-safe client-server communication
- Next.js API routes for external integrations (AI, webhooks)
- Zod for runtime validation

**Styling:**
- CSS custom properties for theming (light/dark mode support)
- Responsive design with container queries
- Bento grid layout for project showcases

## Environment Setup

Required environment variables are validated in `src/env.mjs`. Key integrations include:
- Clerk (authentication)
- OpenAI API (AI features)
- Supabase (vector storage)
- Ably (real-time features)

The project uses SQLite for local development with Prisma managing the database schema.