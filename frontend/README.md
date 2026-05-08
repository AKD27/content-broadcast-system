# EduBroadcast — Content Broadcasting System

A full-featured frontend for an educational content broadcasting platform built with **Next.js 14**, **Tailwind CSS**, and a clean service-layer architecture.

## Features

- 🔐 **Role-based authentication** (Teacher / Principal)
- 📚 **Teacher dashboard** — upload, track, and manage content
- ✅ **Principal dashboard** — approve or reject content with mandatory reasons
- 📡 **Public live page** — `/live/:teacherId` with auto-polling
- 🖼️ **Drag-and-drop file upload** with preview
- ⏰ **Scheduling UI** — start/end time with active/scheduled/expired indicators
- 💀 **Skeleton loaders** for every async operation
- 🚦 **Empty states** and full **error handling**
- 🔍 **Search + filter** on principal content page
- 📱 **Responsive** layout

---

## Tech Stack

| Layer         | Technology                                |
|---------------|-------------------------------------------|
| Framework     | Next.js 14 (App Router)                   |
| Language      | JavaScript (ES6+)                         |
| Styling       | Tailwind CSS                              |
| Forms         | React Hook Form + Zod                     |
| HTTP Client   | Axios (with interceptors)                 |
| State         | React Context + custom hooks              |
| Notifications | react-hot-toast                           |

---

## Folder Structure

```
src/
├── app/               # Next.js pages (App Router)
├── components/
│   ├── ui/            # Reusable UI primitives
│   ├── layout/        # Sidebar, DashboardLayout, ProtectedRoute
│   └── shared/        # ContentCard, FileUpload
├── services/          # API service layer (auth, content, approval)
├── hooks/             # useAsync, useDebounce, usePolling
├── context/           # AuthContext
├── lib/               # apiClient (Axios), mockData
└── utils/             # constants, helpers, validations (Zod)
```

---

## Setup & Installation

### Prerequisites
- Node.js 18+
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/content-broadcast-system.git
cd content-broadcast-system

# 2. Install dependencies
npm install

# 3. Create environment file
cp .env.example .env.local
# Edit .env.local and set NEXT_PUBLIC_API_URL if using a real backend

# 4. Run development server
npm run dev

# 5. Open in browser
# http://localhost:3000
```

---

## Demo Credentials

| Role      | Email                    | Password    |
|-----------|--------------------------|-------------|
| Teacher   | teacher@school.com       | password123 |
| Principal | principal@school.com     | password123 |

**Live public page:** `http://localhost:3000/live/user-1`

---

## Environment Variables

```env
NEXT_PUBLIC_API_URL=https://your-backend-api.com
```

If `NEXT_PUBLIC_API_URL` is not set, the app runs in **mock mode** with in-memory data.

---

## Connecting to a Real Backend

Each service file (`src/services/`) contains commented-out sections marked:

```js
// ── Real backend replacement ──────────────────────────────────────────
```

To switch to a real backend:
1. Uncomment the `apiClient` lines
2. Remove the mock logic above
3. Set `NEXT_PUBLIC_API_URL` in `.env.local`

The Axios interceptor in `src/lib/apiClient.js` already handles:
- Bearer token injection
- 401 → redirect to login
- Error message normalization

---

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint
```

---

## Architecture Decisions

See `Frontend-notes.txt` for detailed explanation of:
- Authentication flow
- Role-based routing
- API integration approach
- State management
- Assumptions made
