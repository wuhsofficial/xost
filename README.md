# XOST Company Site

> **Strategy. Execution. Scale.**

The XOST company website — a **React + Vite** frontend with a **Next.js 14 + MongoDB** backend API.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite 6 |
| Routing | React Router v7 |
| Animations | Framer Motion + CSS Transitions |
| Styling | CSS Modules + CSS Custom Properties |
| Icons | Font Awesome 6 (React) |
| Fonts | Space Grotesk + Inter (Google Fonts) |
| HTTP Client | Axios |
| Backend | Next.js 14 (App Router, API-only) |
| Database | MongoDB + Mongoose |

---

## Quick Start

### Prerequisites
- **Node.js** 18+ and npm

### 1. Backend (API Server)

```bash
cd backend
npm install
npm run dev
```

Backend runs on **http://localhost:3001**

> **Optional:** Add your MongoDB connection string to `backend/.env`:
> ```
> MONGODB_URI=mongodb://localhost:27017/agency-website
> ```

### 2. Frontend (React App)

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173** and opens in your browser automatically.

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Platform | Main landing — hero with particle bg, animated headline, tech stack marquee, stats counters, approach timeline |
| `/services` | Services | 11 service cards in responsive grid with hover effects and accent lines |
| `/solutions` | Solutions | 4 solution packages with feature checklists + 4-step process |
| `/insights` | Insights | Blog articles from API with category filters, featured card, newsletter signup |
| `/industries` | Industries | 8 industry cards with gradient icons |
| `/careers` | Careers | Job listings from API, application modal with form validation, perk cards |
| `/about` | About | Mission, team founders, company values |

---

## Design System

### Colors
- Background: `#F0FFFE` (primary), `#EBF9F4` (gradient end)
- Accent: `#00D4FF` (aqua) → `#00FFB3` (mint)
- Text: `#0D1B2A` (primary), `#2D3748` (secondary), `#718096` (muted)
- Cards: `rgba(255,255,255,0.65)` with aqua borders and glassmorphism
- Dark sections: `#0A0F1E`

### Typography
- **Headings:** Space Grotesk (700)
- **Body:** Inter (400/500/600)

### Animations (16 total)
1. Word-by-word headline stagger (Framer Motion)
2. Scroll-reveal fade + slide (IntersectionObserver)
3. Animated number counters (requestAnimationFrame)
4. Canvas particle background with mouse attraction
5. Floating shapes (CSS keyframes)
6. Tech stack marquee auto-scroll (CSS keyframes)
7. Canvas wave divider oscillation
8. 3D card tilt on hover (CSS perspective transform)
9. Button shimmer sweep (CSS ::after)
10. Card hover lift + glow (CSS transitions)
11. Splash screen stroke-draw logo (CSS clip-path)
12. Application success spring animation (Framer Motion)
13. Staggered value icons scale + fade
14. Filter pill active state transitions
15. Navbar glassmorphic scroll opacity
16. Social icon hover glow

---

## Project Structure

```
agency-website/
├── backend/                    # Next.js 14 API
│   ├── app/api/                # API routes (insights, careers, contact, applications)
│   ├── models/                 # Mongoose schemas
│   ├── lib/                    # MongoDB connection
│   └── middleware.ts           # CORS middleware
│
├── frontend/                   # React + Vite
│   ├── src/
│   │   ├── components/         # 11 shared components (22 files)
│   │   ├── pages/              # 7 page components (14 files)
│   │   ├── hooks/              # 3 custom hooks
│   │   ├── data/               # 4 static data files
│   │   ├── services/           # Axios API service
│   │   ├── styles/             # CSS variables, typography, global, animations
│   │   ├── main.jsx            # Entry point + routing
│   │   └── App.jsx             # Layout shell
│   └── index.html
│
└── frontend_flutter_backup/    # Original Flutter frontend (archived)
```
