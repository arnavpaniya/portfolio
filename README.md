# ⚡ Arnav Paniya — Portfolio System

> Portfolio · System · Playground · Product · Digital Identity

**Live URLs (post-deploy):**
- 🌐 Portfolio → `arnavpaniya.com`
- 🎮 VoidLab → `play.arnavpaniya.com`
- ⚙️ Admin → `admin.arnavpaniya.com`

---

## 🧠 What This Is

Not a traditional portfolio. A fully immersive, gesture-controlled, 3D digital system built on a Turborepo monorepo with three Next.js apps sharing common packages.

---

## 🗂️ Monorepo Structure

```
arnav-paniya/
├── apps/
│   ├── portfolio/               → arnavpaniya.com
│   │   ├── app/
│   │   │   ├── page.tsx         → Homepage (hero + preloader)
│   │   │   ├── projects/
│   │   │   ├── about/
│   │   │   ├── achievements/
│   │   │   └── contact/
│   │   ├── components/
│   │   │   ├── preloader/
│   │   │   ├── hero/
│   │   │   ├── navbar/
│   │   │   └── sections/
│   │   ├── hooks/
│   │   └── public/
│   │       ├── models/
│   │       │   ├── drone.glb
│   │       │   └── laptop.glb
│   │       ├── images/
│   │       │   ├── arnav.png
│   │       │   ├── logo.png
│   │       │   ├── logo-nobg.png
│   │       │   ├── adency.png
│   │       │   ├── vantedge.png
│   │       │   └── szkaerox.png
│   │       ├── fonts/
│   │       │   ├── Orbitron/
│   │       │   └── Inter/
│   │       └── sounds/
│   │           └── interface/   → whoosh, tick, chime, hum
│   │
│   ├── playground/              → play.arnavpaniya.com  (VoidLab)
│   │   ├── app/
│   │   │   ├── page.tsx         → VoidLab game selector
│   │   │   └── games/
│   │   │       ├── fruit-ninja/
│   │   │       ├── air-drawing/
│   │   │       ├── bubble-pop/
│   │   │       ├── ninjutsu/
│   │   │       ├── drone-sim/
│   │   │       ├── hack-system/
│   │   │       ├── neural-builder/
│   │   │       └── reaction-test/
│   │   ├── components/
│   │   │   ├── camera-feed/     → webcam background base
│   │   │   ├── mediapipe/       → hand tracking hook
│   │   │   ├── mobile-gate/     → desktop-only gate + notice
│   │   │   └── game-ui/
│   │   └── public/
│   │       ├── models/
│   │       │   ├── drone.glb
│   │       │   └── food/        → all kenney food GLBs
│   │       └── sounds/
│   │           ├── impact/      → slash, splat, boom
│   │           └── scifi/       → hum, buzz, terminal
│   │
│   └── admin/                   → admin.arnavpaniya.com
│       ├── app/
│       │   ├── login/
│       │   ├── projects/
│       │   ├── achievements/
│       │   └── playground/
│       └── components/
│
├── packages/
│   ├── ui/                      → shared components
│   │   ├── Button.tsx
│   │   ├── GlowCard.tsx
│   │   ├── Navbar.tsx
│   │   └── index.ts
│   ├── three-kit/               → shared Three.js utils
│   │   ├── loaders.ts           → GLTFLoader wrapper
│   │   ├── lights.ts            → neon light presets
│   │   ├── particles.ts         → particle system base
│   │   └── index.ts
│   ├── db/                      → Supabase schema + queries
│   │   ├── client.ts
│   │   ├── projects.ts
│   │   ├── achievements.ts
│   │   └── index.ts
│   └── config/                  → shared configs
│       ├── tailwind.config.ts
│       ├── eslint.config.js
│       └── tsconfig.json
│
├── turbo.json
├── package.json                 → root workspace
└── README.md
```

---

## 🛠️ Tech Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| 3D | Three.js + React Three Fiber + Drei |
| Gesture AI | MediaPipe Hands (WASM, runs in browser) |
| Monorepo | Turborepo |
| Database | Supabase |
| Deploy | Vercel (all 3 apps from one repo) |

---

## 🎨 Design System

```
Background:   #050505
Primary:      #2563EB  (blue)
Secondary:    #7C3AED  (purple)
Accent:       #EC4899  (pink)
Text:         #F9FAFB
Muted:        #6B7280

Font Heading: Orbitron (futuristic, cinematic)
Font Body:    Inter (clean, readable)

Effects:      Glassmorphism · Glow · Neon borders · Depth blur
Motion:       Framer Motion · GSAP for complex sequences
```

---

## 🎬 Pages & Build Phases

### Phase 1 — Setup
```bash
npx create-turbo@latest arnav-paniya
# Select: Next.js, pnpm
cd arnav-paniya
```

Install shared deps across all apps:
```bash
pnpm add three @react-three/fiber @react-three/drei framer-motion
pnpm add @mediapipe/hands @mediapipe/camera_utils
pnpm add @supabase/supabase-js
pnpm add -D tailwindcss typescript @types/three
```

---

### Phase 2 — Preloader

**Concept:** Cinematic system boot sequence

**Antigravity Prompt:**
```
Build a fullscreen Next.js preloader component with:
- Black background (#050505)
- 2000 white particles spawning from center using Three.js Points
- "AP" logo (logo-nobg.png) materializing with opacity 0→1 over 1.5s
- Rotating torus ring around logo using TorusGeometry, blue neon glow (#2563EB)
- System boot text lines appearing sequentially:
  "INITIALIZING SYSTEM..."
  "LOADING ASSETS..."
  "CALIBRATING ENVIRONMENT..."
  "READY."
- Font: Orbitron, letter-spacing: wide, color: #2563EB
- After 3.5s: zoom transition (scale 1→20, opacity 1→0) revealing hero
- Use Framer Motion for text sequencing and exit animation
- Play interface/hum.ogg on mount using Howler.js, fade out on exit
```

---

### Phase 3 — Hero Section

**Concept:** Interactive Tech Universe

**3D Scene contents:**
- Central energy core: animated shader sphere, blue/purple glow
- Orbiting ring: `TorusGeometry`, rotates on Y axis
- Floating project cards (3D planes with texture):
  - `adency.png` → labeled "Adency"
  - `vantedge.png` → labeled "RF Dashboard"
  - `szkaerox.png` + `drone.glb` → labeled "SZK-AeroX"
- Mouse parallax: camera shifts subtly on mousemove
- Scroll depth: objects scale/drift on scroll

**Antigravity Prompt:**
```
Build a React Three Fiber hero section with:
- Canvas fills viewport, bg transparent over #050505 page
- Central IcosahedronGeometry r=1.2, wireframe, color #2563EB, slow rotation
- TorusGeometry r=2, tube=0.02, rotates opposite direction to core
- 3 floating PlaneGeometry cards at positions (-3,1,-2), (0,2.5,-3), (3,1,-2)
  each with a texture loaded from /images/adency.png, /images/vantedge.png, /images/szkaerox.png
  cards hover up/down using Math.sin(clock.elapsedTime) per card with offset
  on hover: scale 1→1.1, blue border glow
  on click: navigate to /projects
- PointLight blue #2563EB intensity 2 at (5,5,5)
- PointLight purple #7C3AED intensity 1 at (-5,-5,-5)
- Mouse parallax: useFrame updates camera.position.x/y by mouse delta * 0.01
- Below canvas: name "ARNAV PANIYA" in Orbitron 72px, subtitle in Inter 18px
- Scroll indicator: animated chevron bouncing at bottom
```

---

### Phase 4 — Navbar

**Antigravity Prompt:**
```
Build a floating glassmorphism navbar in Next.js with:
- Fixed position, centered horizontally, top: 24px
- backdrop-filter: blur(20px), bg: rgba(5,5,5,0.6)
- border: 1px solid rgba(37,99,235,0.3), border-radius: 9999px
- Links: Home · Projects · About · Achievements · Playground · Contact
- Font: Inter, size: 14px, color: #6B7280, hover: #F9FAFB with blue underline
- Active link: color #2563EB
- AP logo left side (logo-nobg.png, 32px)
- On scroll > 50px: border glow intensifies rgba(37,99,235,0.6)
- Command palette: press "/" → modal opens with search + quick nav
- Mobile: collapses to hamburger, slides down full screen menu
- Framer Motion: mount animation slides down from top, opacity 0→1
```

---

### Phase 5 — Projects Page

**Antigravity Prompt:**
```
Build a /projects page in Next.js with:
- Dark bg #050505, Orbitron headings, Inter body
- 3 project cards in case-study format, each containing:
  - Project screenshot (full width, rounded-xl)
  - Title in Orbitron 32px
  - Tags row: tech used as neon pill badges (bg: rgba(37,99,235,0.1), border: #2563EB)
  - Problem → Solution → Impact in 3 column layout
  - Live Demo button: glowing blue border, hover fills blue
  - GitHub button if applicable
- Card entrance: Framer Motion, slides up + fade in on scroll (useInView)
- Between cards: thin blue horizontal divider line
- Projects data: fetch from Supabase projects table
  (fallback to hardcoded if no DB yet)
```

---

### Phase 6 — About Page (Neural Network)

**Antigravity Prompt:**
```
Build a /about page with an interactive neural network visualization using Three.js:
- Nodes as SphereGeometry r=0.15, different colors per type:
  - Origin (hometown): #EC4899 pink
  - Skills: #2563EB blue  
  - Projects: #7C3AED purple
  - Achievements: #F59E0B amber
  - Future: #10B981 green
- Connections as LineSegments between related nodes
- Node positions: random but clustered by type
- Interactions:
  - Hover node: scale 1→1.5, show label tooltip, highlight connections
  - Click node: center camera on it, show detail panel right side
  - Drag: OrbitControls, rotate entire graph
  - Scroll: zoom in/out
- Detail panel (right side, glassmorphism card):
  - Node title, description, date/year
  - Related nodes listed
- Left side: short bio paragraph in Inter 16px
- Animate: nodes gently pulse (sin wave opacity), connections flicker
```

---

### Phase 7 — Achievements Page

**Antigravity Prompt:**
```
Build a /achievements page with a rotating radial milestone wheel:
- Central circle: "ACHIEVEMENTS" label in Orbitron
- 4 achievement nodes arranged radially (rotate on scroll/drag):
  - "Top 10 · IEEE WOP 2025"
  - "Top 20 · Spectre 2026"
  - "Developer Intern · Devzbazzar"
  - "Alterino Club · BMSIT"
- Each node: glassmorphism card, icon + title + description
- Interaction: mouse drag rotates wheel, scroll also rotates
- Focused node (bottom position): scales up 1→1.3, shows full detail
- Rotation: smooth spring physics using Framer Motion
- Background: faint rotating particle ring behind wheel
- Unlock animation: nodes fly in from edges on first load
```

---

### Phase 8 — VoidLab (`play.arnavpaniya.com`)

**Mobile Gate Antigravity Prompt:**
```
Build a mobile detection gate component:
- On mount: check window.innerWidth < 1024 OR userAgent mobile
- If mobile: show fullscreen notice (dark bg, Orbitron heading):
  "VOIDLAB REQUIRES A DESKTOP"
  "You're missing:"
  List: 🎮 Fruit Ninja 3D · ✋ Air Drawing · 🚁 Drone Simulator
        💻 Hack the System · 🥷 Ninjutsu · ⚡ Reaction Test
  CTA: "Visit on Desktop → play.arnavpaniya.com"
  Below: link back to arnavpaniya.com
- If desktop: render children (games)
```

**MediaPipe Hook Antigravity Prompt:**
```
Build a useMediaPipe React hook in TypeScript:
- Initializes @mediapipe/hands with maxNumHands: 1, modelComplexity: 1
- Accesses webcam via getUserMedia
- On each frame: sends video frame to hands.send()
- Returns: { landmarks, handedness, isLoading, error }
- landmarks = array of 21 {x,y,z} normalized coordinates
- Key landmarks exported as named constants:
  WRIST=0, INDEX_TIP=8, MIDDLE_TIP=12, RING_TIP=16, PINKY_TIP=20, THUMB_TIP=4
- Cleanup: stops camera on unmount
```

**Fruit Ninja Antigravity Prompt:**
```
Build a Fruit Ninja game component using Three.js + MediaPipe:
- Webcam feed as fullscreen video background (mirrored with scaleX(-1))
- Three.js canvas overlay, transparent background (setClearColor 0x000000, 0)
- Fruits spawn from bottom edges, arc upward using parabolic trajectory
- Fruit models: load from /models/food/ GLBs (apple, banana, watermelon, orange)
- Each fruit: random spin on X/Y/Z axes while airborne
- Slash detection:
  - Track INDEX_TIP landmark position each frame
  - Calculate velocity: current - previous position
  - If velocity magnitude > 0.08: slash registered
  - Draw neon slash trail on 2D canvas overlay: blue→purple gradient line
- On slash hitting fruit:
  - Split fruit: show -half GLB, apply explosion force
  - Particle burst: 20 particles, fruit color, scatter outward
  - Play impact/slice.ogg
  - Score += 10
- Miss fruit (exits top): lives -= 1, play interface/error.ogg
- Lives: 3 (shown as ❤️ icons top right)
- Score: top left, Orbitron font, neon blue
- Game over: dramatic slow motion, screen flash, score summary card
```

---

### Phase 9 — Hack the System

**Antigravity Prompt:**
```
Build a terminal-style puzzle game at /games/hack-system:
- Full dark terminal UI: bg #0A0A0A, green (#00FF41) monospace font (Courier New)
- Scanline CSS overlay effect
- 5 levels of puzzles, each harder:
  Level 1: Decode base64 string → type answer
  Level 2: Fix broken code snippet (fill in the blank)
  Level 3: Binary → ASCII decode
  Level 4: Logic puzzle as fake error logs to parse
  Level 5: Multi-step: decode + fix + answer riddle
- Each level: fake "hacking" progress bar fills on correct answer
- Wrong answer: red flash, "ACCESS DENIED", terminal shakes
- Correct: green flash, "ACCESS GRANTED", next level loads
- Play scifi/terminal.ogg on every keystroke
- Timer counts up, shown top right
- On complete all 5: "SYSTEM COMPROMISED" animation
  ASCII art skull + confetti particle explosion
```

---

### Phase 10 — Admin Panel

**Antigravity Prompt:**
```
Build a minimal admin panel at admin.arnavpaniya.com:
- Login page: email + password → Supabase auth
- Dashboard sidebar: Projects · Achievements · Playground · Logout
- Projects section:
  - Table list of all projects (title, tags, live)
  - Add/Edit form: title, description, tags, screenshot URL, links, problem/solution/impact
  - Delete with confirmation
- Achievements section: same CRUD pattern
- Playground section: toggle switches to enable/disable each game
- All changes → update Supabase → portfolio auto-reflects
- Styling: clean minimal, dark bg, no 3D needed here
- Auth guard: redirect to /login if not authenticated
```

---

## 🔊 Sound Map

```
/sounds/interface/
  hum.ogg          → preloader ambient loop
  whoosh.ogg       → page transitions
  tick.ogg         → navbar hover
  chime.ogg        → achievement unlock

/sounds/impact/
  slice.ogg        → fruit ninja slash
  splat.ogg        → fruit hit/death
  boom.ogg         → ninjutsu explosion

/sounds/scifi/
  terminal.ogg     → hack-system keypress
  buzz.ogg         → air drawing trail
  powerup.ogg      → game start
```

---

## 🎮 VoidLab Game Registry

| Game | Type | Controls | Status |
|---|---|---|---|
| Fruit Ninja | MediaPipe | Hand slash | Build first |
| Air Drawing | MediaPipe | Index fingertip | Build second |
| Bubble Pop | MediaPipe | Palm + pinch | Build third |
| Ninjutsu | MediaPipe | Gesture combos | Build fourth |
| Drone Simulator | Three.js | Keyboard/mouse | Build fifth |
| Hack the System | Normal | Keyboard | Build sixth |
| Neural Builder | Normal | Mouse drag | Build seventh |
| Reaction Test | Normal | Click/tap | Build eighth |

---

## 🚀 Deploy Config (Vercel)

In Vercel dashboard → import monorepo → add 3 projects:

```
Project 1:
  Root: apps/portfolio
  Domain: arnavpaniya.com

Project 2:
  Root: apps/playground
  Domain: play.arnavpaniya.com

Project 3:
  Root: apps/admin
  Domain: admin.arnavpaniya.com
```

All share same repo. Turborepo cache speeds up builds.

---

## ⚡ Performance Rules

- Lazy load ALL Three.js scenes (`dynamic(() => import(...), { ssr: false })`)
- Destroy WebGL renderer on page unmount
- Compress all GLBs with `gltf-pipeline` before production
- Target: 60 FPS on hero, 30+ FPS on games
- Fonts: use `next/font` for Orbitron + Inter (no FOUT)
- Images: all screenshots as `next/image` with blur placeholder

---

## 📦 Asset Inventory

```
✅ drone.glb                    → hero + drone sim
✅ laptop.glb                   → hero floating card
✅ kenney food kit GLBs         → fruit ninja
✅ arnav.png                    → about / og image
✅ logo.png + logo-nobg.png     → navbar + preloader
✅ adency.png                   → project screenshot
✅ vantedge.png                 → project screenshot
✅ szkaerox.png                 → project screenshot
✅ Orbitron font                → headings
✅ Inter font                   → body
✅ kenney interface sounds      → UI
✅ kenney impact sounds         → games
✅ kenney sci-fi sounds         → terminal + effects
```

---

## 👤 Author

**Arnav Paniya**
ECE Student · BMSIT&M (2024–2028) · CGPA 8.89
Hardware × Software Builder · Tech Explorer

📧 arnavpaniya@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/arnav-paniya/)
💻 [GitHub](https://github.com/arnavpaniya)
# portfolio
