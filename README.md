# Content Broadcasting System (EduBroadcast)

Monorepo with:
- `frontend/` → Next.js 14 (App Router)
- `backend/` → Express API + MongoDB

---

## Local setup

### 1) Create environment files

**Frontend**
```bash
# from repo root
copy frontend\.env\.example frontend\.env\.local
```

**Backend**
```bash
# from repo root
copy backend\.env\.example backend\.env
```

Then edit values as needed (MongoDB connection, JWT secret, etc.).

### 2) Run frontend
```bash
cd frontend
npm install
npm run dev
```

### 3) Run backend
In a separate terminal:
```bash
cd backend
npm install
npm run dev
```

---

## Environment variables

### Frontend
- `NEXT_PUBLIC_API_URL` (used by Axios client)

### Backend
- `PORT`
- `MONGODB_URI`
- `CLIENT_URL` (CORS)
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

---

## Deploy to GitHub

GitHub is for hosting code; deployment happens on a hosting provider (Vercel/Render/Railway/etc.).

Recommended steps:
1. Create a new repository on GitHub.
2. Push this repo (from the root).
3. Configure hosting provider environment variables:
   - Frontend: `NEXT_PUBLIC_API_URL`
   - Backend: `MONGODB_URI`, `JWT_SECRET`, `CLIENT_URL`, `PORT`
4. Deploy frontend and backend.

This repo includes a CI workflow at `.github/workflows/ci.yml` to build both apps.

---

## Production notes
- Uploaded files are served from `backend/uploads/` via `/uploads`.
- Do not commit `.env` files or secrets (they’re ignored by the root `.gitignore`).

