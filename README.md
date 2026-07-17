# PromptVerse AI — React Final Frontend Project

AI Prompt Management Platform, built with React + React Router DOM, satisfying all session-topic requirements.

## Pages / Routing (6 top-level menus, min requirement 5)
1. **Home** (`/`) — hero, live stats, feature highlights
2. **About** (`/about`) — mission, audience, timeline
3. **Services** (`/services`) — **nested routing parent**
   - Overview (`/services` index)
   - Prompt Library (`/services/library`)
   - AI Idea Generator (`/services/generator`)
   - Analytics (`/services/analytics`)
4. **Prompts** (`/prompts`) — full CRUD list, and detail page (`/prompts/:id`)
5. **Contact** (`/contact`) — validated contact form
6. **Profile** (`/profile`) — user info + theme preference
- `*` — 404 Not Found catch-all

## Session Topics — where to find each one
| Topic | Where |
|---|---|
| Components & Props | Every file in `src/components` and `src/pages` |
| useState | Forms, filters, modals, search inputs |
| useEffect | `document.title` updates, localStorage sync, debounce timers |
| useRef | `Contact.jsx` (auto-focus), `AiGenerator.jsx` (focus after fetch) |
| useContext | `ThemeContext`, `UserContext`, `PromptsContext` — used in `Navbar`, `Profile`, all Prompts pages |
| useReducer | `reducer/promptsReducer.js` + `context/PromptsContext.jsx` — handles all CRUD actions |
| Conditional Rendering | Empty states, loading/error states, favorite icon, 404 |
| List Rendering | Prompt grids, feature cards, category bars, favorites list |
| API Integration | `Services/AiGenerator.jsx` — live fetch from `api.quotable.io` |
| Custom Hooks | `hooks/useLocalStorage.js`, `hooks/useDebounce.js`, `usePrompts()`, `useTheme()`, `useUser()` |
| Routing / Nested Routing | `App.jsx` — `/services` has 4 child routes via `<Outlet />` |
| useParams | `Prompts/PromptDetail.jsx` reads `/prompts/:id` |
| useSearchParams | `Prompts/PromptsList.jsx` — `?category=&sort=&q=` stay in the URL |
| CRUD Operations | Create/Edit (`PromptForm.jsx`), Read (list + detail), Delete — all via `useReducer` |
| Form Validation | `PromptForm.jsx` and `Contact.jsx` — required fields, min length, email regex |
| Responsive UI | `index.css` — mobile hamburger nav, responsive grids, breakpoints at 900px/760px |

## Setup (local run in VS Code)
```
npm install
npm run dev
```
Open the printed `localhost` link (usually `http://localhost:5173`).

## Deploying to Netlify (needed for submission)
Since deployment needs your own Netlify account, do this part yourself — 5 minute process:

**Option A — Drag & Drop (fastest)**
1. Run `npm run build` locally — this creates a `dist/` folder.
2. Go to https://app.netlify.com/drop
3. Drag the `dist` folder into the browser window.
4. Netlify gives you a live URL instantly (e.g. `random-name-123.netlify.app`) — submit that link.

**Option B — Connect GitHub (better for updates later)**
1. Push this project folder to a new GitHub repo.
2. Go to https://app.netlify.com → "Add new site" → "Import an existing project" → connect GitHub → pick the repo.
3. Build command: `npm run build`, Publish directory: `dist`.
4. Deploy — Netlify gives you the domain link.

Note: `public/_redirects` file is already included (`/* /index.html 200`) so that React Router's client-side routes (like `/prompts/3`) work correctly on Netlify instead of showing a 404 on refresh.

## Project Structure
```
src/
├── main.jsx, App.jsx, index.css
├── context/          → ThemeContext, UserContext, PromptsContext
├── reducer/           → promptsReducer.js (useReducer logic)
├── hooks/             → useLocalStorage, useDebounce
├── data/               → initialPrompts.js, serviceTemplates.js
├── components/     → Navbar, Footer, PromptCard, PromptForm, Modal, Loader
└── pages/
    ├── Home.jsx, About.jsx, Contact.jsx, Profile.jsx, NotFound.jsx
    ├── Services/    → Services.jsx (layout), ServicesOverview, PromptLibrary, AiGenerator, Analytics
    └── Prompts/      → PromptsList.jsx, PromptDetail.jsx
```
