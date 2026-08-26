# SmashLive — Athlete Network

A real-time badminton tournament and match management platform for athletes, referees, and organisers.

**Live App:** https://frontend-phi-brown-12.vercel.app  
**Backend API:** https://smash-live-1i84.onrender.com

---

## Tech Stack

### Frontend
- React 18 + TypeScript + Vite
- Tailwind CSS + shadcn/ui + Radix UI
- Framer Motion (animations)
- React Router v6
- TanStack Query
- Firebase Auth (Phone OTP)
- Socket.IO client (live match updates)

### Backend
- Node.js + Express + TypeScript
- MongoDB Atlas + Mongoose
- Firebase Admin SDK (token verification)
- JSON Web Tokens (session management)
- Socket.IO (real-time events)
- Zod (request validation)
- Helmet + CORS
- Fast2SMS HTTP API (SMS OTP delivery)

---

## Project Structure

```
Smash-live/
├── frontend/          # React app (deployed on Vercel)
│   ├── src/
│   │   ├── components/   # UI components (broadcast, dashboard, layout)
│   │   ├── pages/        # Route pages
│   │   ├── services/     # API + auth service
│   │   └── lib/          # Firebase config, utilities
│   └── vercel.json
│
├── backend/           # Express API (deployed on Render)
│   ├── src/
│   │   ├── controllers/  # auth, match
│   │   ├── models/       # User, Match, Tournament, Player, Otp
│   │   ├── routes/       # auth, match, player, tournament
│   │   ├── services/     # auth, firebase
│   │   ├── middlewares/  # auth, error, validate
│   │   ├── sockets/      # match real-time socket
│   │   └── validations/  # Zod schemas
│   └── firebase-service-account.json  # (gitignored)
│
└── .env               # Root env (Vite vars + backend vars)
```

---

## Auth Flow

1. User enters mobile number on the login/register page
2. Firebase Phone Auth sends a real OTP via SMS
3. User enters OTP → Firebase verifies it → returns `idToken`
4. Frontend sends `idToken` to backend (`POST /api/auth/login` or `/register`)
5. Backend verifies `idToken` with Firebase Admin SDK → extracts phone number
6. Backend finds/creates user in MongoDB → returns our own JWT
7. JWT stored in `localStorage` → used for all subsequent API calls

---

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account
- Firebase project with Phone Auth enabled

### Setup

```bash
# Clone the repo
git clone <repo-url>
cd Smash-live

# Install backend deps
cd backend && npm install

# Install frontend deps
cd ../frontend && npm install
```

### Environment Variables

**`backend/.env`**
```env
PORT=5001
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.ponjjw1.mongodb.net/smashlive
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=24h
FRONTEND_URL=http://localhost:8080
FAST2SMS_API_KEY=your_fast2sms_api_key   # optional — omit to log OTPs to console in dev
```

Also place your Firebase service account JSON at:
```
backend/firebase-service-account.json
```

**`frontend/.env`** (or root `.env`)
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_API_URL=http://localhost:5001/api
```

### Run

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Frontend runs at **http://localhost:8080**  
Backend runs at **http://localhost:5001**

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user (Firebase idToken + profile) |
| POST | `/api/auth/login` | Login existing user (Firebase idToken) |
| GET | `/api/auth/profile` | Get current user profile (JWT protected) |

### Players
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/players` | List all players |
| GET | `/api/players/:id` | Get player by ID |

### Tournaments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tournaments` | List all tournaments |
| POST | `/api/tournaments` | Create tournament |
| GET | `/api/tournaments/:id` | Get tournament details |

### Matches
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/matches` | List matches |
| POST | `/api/matches` | Create match |
| PATCH | `/api/matches/:id/score` | Update score |

---

## Deployment

### Frontend → Vercel
```bash
cd frontend
vercel --prod --yes
```

Vercel environment variables required:
- `VITE_FIREBASE_API_KEY`
- `VITE_FIREBASE_AUTH_DOMAIN`
- `VITE_FIREBASE_PROJECT_ID`
- `VITE_FIREBASE_APP_ID`
- `VITE_API_URL` → your Render backend URL

### Backend → Render
- Build command: `npm run build`
- Start command: `npm start`
- Root directory: `backend`

Render environment variables required:
- `PORT`
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRE`
- `FRONTEND_URL`
- `FIREBASE_SERVICE_ACCOUNT` → minified service account JSON
- `FAST2SMS_API_KEY` → API key from fast2sms.com (for SMS OTP delivery)

---

## Changelog

### July 2025
- Added `whatsapp-web.js` for WhatsApp-based notifications
- Added `qrcode-terminal` to display WhatsApp Web QR code in the terminal on server start

### August 2026
- Switched auth from localStorage/Supabase to MongoDB backend
- Replaced phone+hardcoded OTP with Firebase Phone Auth (real SMS)
- Added Firebase Admin SDK to backend for token verification
- Fixed MongoDB Atlas connection string
- Deployed frontend to Vercel, backend to Render
- Added `firebase-service-account.json` support (loaded from file, not env var)
- Added `Otp` model with bcrypt-hashed OTP storage and MongoDB TTL index for automatic expiry of stale OTP documents
- Replaced WhatsApp OTP delivery (whatsapp-web.js + Puppeteer) with Fast2SMS HTTP API; added `FAST2SMS_API_KEY` env var — omit in dev to fall back to console logging

### July 2025 (update)
- Removed Firebase reCAPTCHA (`setupRecaptcha`) from the frontend login flow; OTP is now fully handled by the backend via Fast2SMS, with no client-side reCAPTCHA required
