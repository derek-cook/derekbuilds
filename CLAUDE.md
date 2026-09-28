# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Derek Cook's personal portfolio website (`derekbuilds.ai`) built with the Next.js 16 App Router, React 19, and TypeScript. The site presents selected AI work and experience and includes a real-time cursor demo.

## Common Commands

**Development:**
```bash
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # Run ESLint
npm run start        # Start production server
```

## Architecture

**Tech Stack:**
- Next.js 16 with App Router and React 19
- TypeScript with strict mode
- Tailwind CSS
- Custom real-time collaboration system (WebSocket-based)

**Key Directory Structure:**
- `src/app/` - App Router pages and API routes
- `src/components/` - Shared React components
- `src/lib/` - Utility libraries and configurations

**Configuration Files:**
- `src/env.mjs` - Environment variable validation with Zod

## Key Features

**Real-time Collaboration (`src/lib/realtime/`):**
- Custom WebSocket implementation with live cursors
- Channel-based communication system
- Multiple demo applications for testing

## Development Patterns

**Component Architecture:**
- Custom components follow Tailwind utility-first approach
- Path aliases configured (`~/` points to `src/`)

**API Patterns:**
- Zod for environment validation

**Styling:**
- Fixed dark visual theme
- Responsive grid layout

## Environment Setup

`NEXT_PUBLIC_WEBSITE_URL` is validated in `src/env.mjs` and is used for metadata, robots, and sitemap URLs.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
