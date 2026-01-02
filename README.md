👗 memi.az – Frontend Web Application

📌 Project Overview

memi.az is a recommerce platform focused on second-hand clothes, shoes, bags, and accessories.

This repository contains the web frontend, built using Next.js and based on the Nextmerce (Free) template as a UI starter.

The goal is not to build a marketplace clone, but a focused, fast MVP that validates:
• User interest
• Engagement
• Seller activity
• Buyer–seller interaction

⸻

🎯 FRONTEND MVP GOALS 1. Let users browse fashion listings easily 2. Let sellers create & manage listings 3. Enable buyer ↔ seller chat 4. Support favorites & discovery 5. Provide admin with full analytics visibility 6. Keep UI clean, fast, and simple

⸻

🧱 TECH STACK

Layer Technology
Framework Next.js (App Router)
Language TypeScript
UI Base Nextmerce (Free)
Styling Tailwind CSS
State Zustand
Data Fetching React Query
Auth JWT (via backend)
Realtime WebSockets
Charts Recharts / Chart.js
Forms React Hook Form
Validation Zod
Deployment Vercel-compatible

⸻

🧠 DESIGN PRINCIPLES
• Mobile-first
• Minimal UI clutter
• Business-first UX
• No unnecessary animations
• Analytics-aware UI
• Admin-first visibility

⸻

🗂️ PROJECT STRUCTURE (EXPECTED)

src/
├── app/
│ ├── (public)/
│ ├── (auth)/
│ ├── (user)/
│ ├── (seller)/
│ ├── (admin)/
│ └── layout.tsx
│
├── components/
│ ├── common/
│ ├── product/
│ ├── chat/
│ ├── analytics/
│ └── admin/
│
├── services/
│ ├── api/
│ ├── auth/
│ ├── analytics/
│ └── socket/
│
├── store/
│ ├── auth.store.ts
│ ├── user.store.ts
│ └── ui.store.ts
│
├── hooks/
├── utils/
├── constants/
└── types/

⸻

🧩 CORE FRONTEND FEATURES (MVP)

⸻

🏠 Public Pages

Home
• Featured listings
• Categories
• New arrivals
• Trending items

Category / Search
• Filters:
• Price
• Size
• Brand
• Condition
• Location
• Sorting:
• Newest
• Price
• Popularity

Product Detail Page
• Image gallery
• Seller info
• Price
• Condition
• Description
• Favorite button
• Contact seller button

⸻

🔐 Authentication Pages
• Login
• Register
• Forgot password
• Email verification (optional)

Auth must:
• Persist session
• Handle token refresh
• Protect routes via middleware

⸻

👤 User Area

Profile
• Personal info
• Avatar
• City
• Listings count

Favorites
• List of saved items

My Chats
• Product-based chat threads
• Real-time updates

⸻

🧥 Seller Area

My Listings
• Active
• Reserved
• Sold

Create / Edit Listing
• Multi-image upload
• Preview
• Validation
• Draft saving (optional)

⸻

💬 Chat UI

Rules
• One chat per product
• Seller cannot initiate chat
• WebSocket based
• Typing indicator (optional MVP+)

⸻

📊 ANALYTICS (FRONTEND RESPONSIBILITY)

Frontend must send analytics events to backend.

Events to Emit
• PAGE_VIEW
• PRODUCT_VIEW
• SEARCH_PERFORMED
• FILTER_APPLIED
• FAVORITE_CLICKED
• CHAT_OPENED
• MESSAGE_SENT
• LISTING_CREATED
• LISTING_EDITED

Analytics Rules
• Never block UI
• Fire-and-forget
• Central analytics service
• No PII in payloads

⸻

🧑‍💼 ADMIN PANEL (MANDATORY)

Admin UI is not optional.

⸻

📈 Admin Dashboard

Cards:
• Total users
• Active users
• Total listings
• Sold listings
• Chats created
• Conversion rates

Charts:
• Users growth
• Listings per day
• Sales over time
• Engagement trends

⸻

👤 Admin → Users
• List users
• View profile
• See analytics per user
• Block / unblock user

⸻

🧥 Admin → Listings
• Review listings
• Remove listings
• View product analytics
• See reports

⸻

🚨 Admin → Reports
• User reports
• Product reports
• Chat reports
• Resolution status

⸻

🛠️ Admin → System Analytics
• Failed logins
• Abuse attempts
• Rate limit triggers
• Upload failures

⸻

🔐 ROLE-BASED ACCESS (IMPORTANT)

Frontend must respect roles:

Role Access
USER Public + User + Seller
ADMIN Full access

Use:
• Route guards
• UI hiding (not only backend protection)

⸻

🌐 API COMMUNICATION RULES
• Use centralized API client
• Handle 401 globally
• Retry on refresh token
• Typed API responses
• No inline fetch logic in components

⸻

🧪 FRONTEND QUALITY RULES
• Components must be reusable
• Avoid prop drilling
• Use hooks for logic
• No business logic in UI
• No hardcoded strings
• Prioritize SSR and server-side fetching
• i18n-ready (future)

⸻

🤖 AI AGENT INSTRUCTIONS (CRITICAL)

AI agents must: 1. Extend Nextmerce template, not rewrite it 2. Respect existing layout & theme 3. Build features incrementally 4. Match backend API contracts 5. Implement analytics calls everywhere 6. Keep admin panel powerful but simple 7. Avoid premature optimizations

DO NOT
• Add unnecessary animations
• Build custom UI kits
• Mix admin and user logic
• Skip error states
• Assume backend behavior

⸻

✅ MVP SUCCESS CRITERIA (FRONTEND)
• User can browse listings
• User can create listing
• User can favorite item
• User can chat with seller
• Seller can manage items
• Admin sees full analytics
• UI feels fast & clean

⸻

🚀 NEXT STEPS 1. Integrate Nextmerce template 2. Setup routing groups 3. Setup auth middleware 4. Implement product browsing 5. Implement seller flow 6. Implement chat 7. Implement admin analytics UI

⸻

🧠 READY-TO-USE PROMPT FOR FRONTEND AI AGENT

You are building the frontend for memi.az using Next.js (App Router) and the free Nextmerce template.
Follow the provided README strictly.
Implement public marketplace pages, seller dashboard, chat UI, favorites, authentication, admin panel, and analytics event tracking.
Use Tailwind, Zustand, React Query, and typed API services.
Do not overengineer.
Focus on MVP first, extensible later.

🎨 UX & DESIGN SYSTEM (MANDATORY – FOUNDATION FIRST)

The UI of memi.az must be:
• Easy to understand
• Comfortable to navigate
• Predictable
• Calm and trust-building
• Optimized for frequent daily use

Before building any page or component, the design system and tokens must be defined first.

⸻

🧠 UX CORE PRINCIPLES (NON-NEGOTIABLE) 1. Cognitive simplicity
• User should never “think” where to click
• One primary action per screen 2. Consistency over creativity
• Same actions always look and behave the same
• No visual surprises 3. Mobile-first navigation
• Thumb-friendly
• Clear bottom / top navigation logic 4. Visual hierarchy
• Primary → Secondary → Tertiary actions
• Clear contrast between content and controls 5. Fast feedback
• Loading states
• Empty states
• Error states
• Success confirmations 6. Trust-first UI
• Clear prices
• Clear seller info
• Clear product status
• No dark patterns

⸻

🎨 DESIGN TOKENS (MUST BE CREATED FIRST)

❗ Rule

No hardcoded colors, spacing, font sizes, or shadows are allowed anywhere in the project.
Everything must come from design tokens.

⸻

📁 DESIGN TOKEN STRUCTURE

src/design-system/
├── tokens/
│ ├── colors.ts
│ ├── spacing.ts
│ ├── typography.ts
│ ├── radius.ts
│ ├── shadows.ts
│ ├── zIndex.ts
│ └── transitions.ts
│
├── theme.ts
└── index.ts

⸻

🎨 COLOR TOKENS (EXAMPLE STRUCTURE)

colors.ts

export const colors = {
brand: {
primary: '#111827', // main text / primary buttons
secondary: '#6B7280', // secondary text
accent: '#2563EB', // links / highlights
},

background: {
page: '#FFFFFF',
surface: '#F9FAFB',
elevated: '#FFFFFF',
},

text: {
primary: '#111827',
secondary: '#4B5563',
muted: '#9CA3AF',
inverse: '#FFFFFF',
},

border: {
default: '#E5E7EB',
focus: '#2563EB',
subtle: '#F3F4F6',
},

state: {
success: '#16A34A',
warning: '#D97706',
error: '#DC2626',
info: '#2563EB',
}
};

Rules:
• No RGB or HEX outside tokens
• State colors used only for state
• Accent color used sparingly

⸻

📐 SPACING TOKENS

export const spacing = {
xs: '4px',
sm: '8px',
md: '12px',
lg: '16px',
xl: '24px',
xxl: '32px',
};

Rules:
• Use spacing tokens only
• No arbitrary margins/paddings
• Consistent vertical rhythm

⸻

✍️ TYPOGRAPHY TOKENS

export const typography = {
fontFamily: {
base: 'Inter, sans-serif',
},

size: {
xs: '12px',
sm: '14px',
md: '16px',
lg: '18px',
xl: '22px',
xxl: '28px',
},

weight: {
regular: 400,
medium: 500,
semibold: 600,
bold: 700,
},
};

⸻

🔲 RADIUS & SHADOWS

export const radius = {
sm: '6px',
md: '10px',
lg: '14px',
};

export const shadows = {
sm: '0 1px 2px rgba(0,0,0,0.04)',
md: '0 4px 8px rgba(0,0,0,0.08)',
};

Rule:
Use shadows sparingly → focus on spacing instead.

⸻

🧩 BASE UI COMPONENTS (MUST EXIST FIRST)

Before pages, agents must build base components using tokens:
• Button
• Input
• Select
• Textarea
• Badge
• Card
• Modal
• Dropdown
• Tabs
• Tooltip
• Skeleton Loader
• Empty State
• Toast / Snackbar

All components must:
• Use tokens only
• Support states (hover, focus, disabled, loading)
• Be accessible (ARIA where needed)

⸻

🧭 NAVIGATION UX RULES

Public Navigation
• Logo → Home
• Categories
• Search
• Login / Register

Authenticated User
• Home
• Favorites
• Messages
• Sell Item
• Profile

Admin Navigation
• Dashboard
• Users
• Listings
• Reports
• Analytics
• System

Rules:
• Max 5 primary nav items
• Active state always visible
• Admin visually separated from user UI

⸻

🧠 PAGE UX PATTERNS (STANDARDIZED)

Product Card
• Image
• Price (strong)
• Title (1–2 lines)
• Condition
• Favorite icon

Product Page 1. Images 2. Price 3. Title 4. Seller info 5. Condition + size 6. Description 7. Actions (Chat / Favorite)

Forms
• Labels always visible
• Inline validation
• Disabled submit until valid
• Clear success/error feedback

⸻

📊 ANALYTICS-AWARE UX

UX must support analytics, not hide behavior.

Examples:
• Clear CTA buttons → clean conversion tracking
• Explicit filters → measurable usage
• Clear empty states → friction detection
• Predictable flows → funnel clarity

⸻

🤖 AI AGENT UX RULES (CRITICAL)

AI agents must: 1. Create tokens before any UI 2. Never hardcode styles 3. Reuse base components 4. Keep layouts predictable 5. Prefer fewer choices 6. Respect visual hierarchy 7. Avoid novelty UI 8. Match admin UX to power users 9. Match user UX to comfort users

DO NOT
• Invent new colors
• Add gradients
• Use flashy animations
• Mix spacing scales
• Break hierarchy

⸻

✅ UX SUCCESS DEFINITION
• First-time user understands app in <30 seconds
• User can list item without guidance
• Admin can find any metric quickly
• UI feels calm, not busy
• UI scales without redesign

⸻

🧠 READY PROMPT FOR FRONTEND AI AGENT (UX-FIRST)

Before implementing any page or component:

1. Create a design system with color, spacing, typography, radius, shadow tokens.
2. Build base UI components using tokens only.
3. Enforce UX simplicity, consistency, and accessibility.
4. Extend the Nextmerce template without visual chaos.
5. No hardcoded styles allowed.

⸻

Final note (important)

If you lock tokens + UX rules now, you will:
• Avoid design drift
• Avoid refactors
• Make AI agents predictable
• Make admin analytics readable
• Ship faster with confidence

If you want next, I can:

✅ Create final color palette (brand-ready)
✅ Define exact UX flows (screens + steps)
✅ Map Nextmerce components → design system
✅ Create admin dashboard UX logic
✅ Generate token-based Tailwind config

Just tell me what to generate next.
