# Family Calendar Assistant - Code Context

## Overview
A Next.js 15 application that helps families create calendar events using natural language. Users describe their scheduling needs in plain text, and the AI generates downloadable .ics calendar files compatible with major calendar applications.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **UI**: React 19, Tailwind CSS, Radix UI components
- **AI Integration**: Vercel AI SDK with Groq (moonshotai/kimi-k2-instruct model)
- **Forms**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom animations
- **Theme**: Next-themes for dark/light mode support

## Architecture

### Frontend Flow
1. **Chat Interface** (`components/chat.tsx`): Main component managing conversation state
2. **Message Display** (`components/message-list.tsx`): Shows user/AI messages
3. **Input Handling** (`components/prompt.tsx`): Text area with auto-resize
4. **Event Cards** (`components/calendar-events-card.tsx`): Displays parsed calendar events with download functionality

### Backend Processing
1. **API Route** (`app/api/chat/route.ts`): 
   - Receives chat messages
   - Adds current Oslo timezone context
   - Instructs AI to parse natural language into structured calendar events
   - Returns streaming response with CALENDAR_EVENTS JSON format

### Key Features
- **Natural Language Processing**: Converts phrases like "next Saturday" into specific dates
- **ICS File Generation**: Creates standard calendar files downloadable by users
- **Timezone Awareness**: Operates in Oslo timezone by default
- **Recurring Events**: Supports daily, weekly, and monthly recurrence patterns
- **Prompt Suggestions**: Pre-built examples for common family scheduling scenarios

### Data Flow
1. User enters natural language request
2. AI processes with date/time context
3. Returns structured JSON events
4. Frontend parses and displays events
5. User can download as .ics file

## Notable Implementation Details
- Uses streaming responses for real-time AI feedback
- Implements typing indicator with 300ms delay
- Handles both download and copy-to-clipboard for ICS files
- Auto-syncs with v0.dev deployments
- Includes comprehensive Radix UI component library integration