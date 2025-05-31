## 🎯 Vision
Build an AI-powered workflow automation platform that merges conversational AI, visual workflow building, and third-party integrations. Think: **Zapier × ChatGPT × Notion**

---

## 🧱 Tech Stack

### 🚀 Core Technologies
- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS + Custom Design System
- **Language**: TypeScript (strict mode)
- **Backend & Auth**: Mastra Framework
- **Package Manager**: pnpm
- **Animations**: Framer Motion
- **State Management**: React Context + Zustand
- **Database**: PostgreSQL + Prisma ORM (via Mastra)

### 📦 Additional Libraries
- UI: Radix UI Primitives + Custom Components
- Icons: Lucide React
- Drag & Drop: @dnd-kit/core
- Forms: React Hook Form + Zod
- Dates: date-fns
- Charts: Recharts
- Rich Text: Tiptap
- Notifications: React Hot Toast

---

## 🎨 UI/UX & Design
- **Theme**: Dark Mode with electric gradients (glassmorphism)
- **Typography**: Inter / Geist
- **Spacing**: 8px grid with generous whitespace
- **Aesthetic**: Rounded corners, soft glows, subtle shadows
- **Animation**: Framer Motion-powered page transitions and micro-interactions

---

## 📂 Project Structure

```
src/
├── app/                 # App Router structure
├── components/
│   ├── ui/              # UI primitives
│   ├── forms/           # Form elements
│   ├── layout/          # Layout components
│   └── features/        # Feature-specific
├── lib/                 # Utils & config
├── hooks/               # Custom hooks
├── stores/              # Zustand stores
├── types/               # Global TypeScript types
├── styles/              # Tailwind config & global styles
└── constants/           # App-wide constants
```

---

## 🛠️ Setup & Installation

```bash
# 1. Clone the repo
git clone https://github.com/apoorvmaurya/nexusai.git

# 2. Install dependencies
pnpm install

# 3. Create .env file with required variables
cp .env.example .env
```

### Required `.env` Variables

```env
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
OPENAI_API_KEY=
GMAIL_CLIENT_ID=
SLACK_CLIENT_ID=
NOTION_CLIENT_ID=
```

---

## 🧪 Dev Standards

- **Linting**: ESLint (Airbnb + TS)
- **Formatting**: Prettier + Husky pre-commit hooks
- **Testing**: Jest (unit) + Playwright (integration)
- **Type Safety**: 100% TypeScript + strict mode

---

## 🧩 Key Features

### ✅ Auth System (Mastra)
- Email/password, social login
- JWT tokens, refresh, 2FA, role-based access

### 👤 User Profiles
- Avatar, settings, sessions, analytics, GDPR export

### 💬 Conversations
- Real-time chat, folders/tags, export, sharing

### 🧠 Tool Calling
- AI-initiated actions (email, Slack, Notion, analytics)

### 🔧 Visual Workflow Builder
- Drag & drop nodes, conditional logic, templates

### 🔌 Integrations Hub
- Gmail, Slack, Notion w/ OAuth & webhook support

### ⭐ Feedback System
- Message-level feedback, analytics, re-generation

---

## 🌍 Routes

```
/                   → Landing Page  
/auth/*             → Auth Pages (login/register/reset)  
/dashboard          → Main Dashboard  
/conversations/*    → Chat & History  
/workflows/*        → Builder & Templates  
/integrations       → Manage Integrations  
/profile            → User Settings  
/analytics          → Usage Insights  
```

---

## 🚀 Deployment

```bash
pnpm build && pnpm dev
```

### Performance Targets
- Initial load < 2s
- Time to interactive < 3s
- JS Bundle < 1MB
- Core Web Vitals: ✅

---

## ✅ Phase-wise Plan

### 🧱 Phase 1 – Foundation
✅ Next.js setup, Tailwind + Mastra Auth, Routing

### ⚙️ Phase 2 – Core Features
✅ Profile, Conversations, AI Chat, Tool Calls

### 🧠 Phase 3 – Advanced
✅ Workflows, Integrations, Feedback, Analytics

### 🧼 Phase 4 – Polish
✅ Animations, Security, Testing, Deployment

---

## 📊 Success Metrics

| Metric                  | Target             |
|-------------------------|--------------------|
| Retention               | > 80%              |
| Avg. Session Duration   | > 10 mins          |
| Feature Adoption        | > 60%              |
| User Satisfaction       | > 4.5/5            |

---

## 💼 License
MIT

---

## 📬 Contact
For questions, collaboration, or enterprise inquiries:  
**Apoorv Maurya** · [LinkedIn](https://www.linkedin.com/in/apoorv-maurya2506/) · [Email](mailto:apoorvmauryaapoorv@gmail.com)

---

> _This platform should feel like a premium, enterprise-grade SaaS product with every pixel, interaction, and feature crafted to perfection._