# FitNova — Fitness Tracker

Full-stack fitness tracking app: workouts, nutrition, progress, analytics aur dashboard — saath me JWT-based authentication.

- **Frontend:** React 19 + Vite + Tailwind CSS 4 (recharts, framer-motion)
- **Backend:** Node.js + Express 5 + MongoDB (Mongoose) + JWT

## Folder Structure

```
fitnova/
├── frontend/   # React + Vite app (Vercel par deploy hota hai)
├── backend/    # Express API (Render par deploy hota hai)
├── render.yaml # Render blueprint (backend)
└── README.md
```

## Local Development

**1. Backend**

```bash
cd backend
cp .env.example .env      # phir .env me apni values bharo
npm install
npm run dev               # http://localhost:5000
```

`.env`:

```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<pass>@cluster0.xxxxx.mongodb.net/fitnova
JWT_SECRET=long-random-string
CLIENT_ORIGIN=http://localhost:5173
```

**2. Frontend**

```bash
cd frontend
npm install
npm run dev               # http://localhost:5173
```

Local dev me frontend khud `http://localhost:5000/api` use karta hai. Kuch aur URL chahiye to
`frontend/.env` me `VITE_API_URL` set karo.

## Live Deployment

| Part | Platform | URL |
| --- | --- | --- |
| Frontend | Vercel | _deploy ke baad yahan link aayega_ |
| Backend API | Render | _deploy ke baad yahan link aayega_ |
| Database | MongoDB Atlas | cloud cluster |

Deployment steps ke liye neeche diye gaye section follow karo.

### Backend — Render

1. [render.com](https://render.com) par GitHub se sign in karo.
2. **New → Web Service** → repo `anmol602/Fitness-Tracker` select karo.
3. Settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
4. **Environment Variables** add karo:
   - `MONGO_URI` — MongoDB Atlas connection string (database name ke saath, e.g. `.../fitnova`)
   - `JWT_SECRET` — lamba random string
   - `CLIENT_ORIGIN` — Vercel frontend URL (baad me update kar sakte ho, ya khali chhodo)
5. Deploy → URL milega jaise `https://fitnova-backend.onrender.com`.
6. Browser me khol ke check karo: `https://fitnova-backend.onrender.com/` → "Fitness Tracker Backend is Running!"

### Frontend — Vercel

1. [vercel.com](https://vercel.com) par GitHub se sign in karo.
2. **Add New → Project** → repo import karo.
3. **Root Directory:** `frontend` (framework auto-detect Vite hoga).
4. **Environment Variable** add karo:
   - `VITE_API_URL` = `https://fitnova-backend.onrender.com/api`
5. Deploy → live URL milega jaise `https://fitnova.vercel.app`.

### Deploy ke baad

- Render ke backend me `CLIENT_ORIGIN` ko Vercel URL par update karo aur redeploy karo.
- MongoDB Atlas → **Network Access** me `0.0.0.0/0` allow karo (Render ke IPs dynamic hote hain).

> **Note:** Render free tier 15 min inactivity ke baad sleep karta hai, pehla request 30-60s le sakta hai.

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| POST | `/api/auth/register` | Naya user |
| POST | `/api/auth/login` | Login + JWT |
| GET/POST | `/api/workouts` | Workouts |
| GET/POST | `/api/nutrition` | Nutrition entries |
| GET/POST | `/api/progress` | Progress logs |
| GET | `/api/dashboard` | Dashboard summary |
| GET/POST | `/api/feedback` | Feedback |
