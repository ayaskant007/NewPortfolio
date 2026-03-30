# AyaskantOS — The macOS Portfolio

A highly immersive, physics-driven web portfolio built to meticulously replicate the modern macOS architecture (Sonoma/Sequoia). Engineered from the ground up using React, GSAP 3, and Tailwind CSS v4 to deliver a pixel-perfect liquid glass experience directly in the browser.

## Key Features

- **Advanced Window Management:** Fully functional Draggable windows constrained by viewport bounds. Features authentic GSAP-driven **Genie-effect** minimize animations, double-click to maximize, and intelligent z-index drop-shadow stacking based on active window focus.
- **System-Wide Dark Mode:** Deep integration with Tailwind v4's custom class variants, allowing the entire OS—from the Control Center to individual folders—to seamlessly toggle between Light and Dark mode using liquid glass `backdrop-blur` UI panels.
- **Interactive Top Bar & Control Center:** A live macOS top bar that detects active apps, alongside a functional Control Center featuring draggable brightness sliders and system toggles.
- **Fully Ported Apps:** 
  - **Terminal:** A functional CLI environment loaded with custom commands (`help`, `about`, `projects`, `matrix`) and native **Groq AI Chat integration**.
  - **Safari:** A functional `iframe`-based web browser with tab management and an active URL search bar.
  - **Finder:** Features a sidebar directory tree and a grid-based folder viewer targeting the `trash`, `work`, and `resume` files.
- **Desktop Layer Effects:** The system runs a live weather widget powered by the Open-Meteo API, a ticking real-time clock, and handles Spotlight Search overlay filtering dynamically.

## Tech Stack

- **Framework:** React 18 + Vite
- **Styling:** Tailwind CSS v4 
- **State Management:** Zustand
- **Animations:** GSAP 3 + @gsap/react
- **Icons:** Lucide React
- **Dates & Math:** Day.js
- **Assets:** `@lottiefiles/dotlottie-react`

## Quick Start

To run this repository locally, you will need Node.js installed on your machine.

**1. Clone the repository**
```bash
git clone https://github.com/ayaskant007/AyaskantOS.git
cd AyaskantOS
```

**2. Install all dependencies**
```bash
npm install
```

**3. Configure Environment Variables**
To run the interactive AI chat within the custom Terminal app, you will need a Groq API key. Create a `.env` file in the root directory and add your key:
```env
VITE_GROQ_API_KEY=your_api_key_here
```

**4. Start the Dev Server**
```bash
npm run dev
```

Navigate to `http://localhost:5173` to experience the operating system.

---
*If you find any bugs or have performance improvements, feel free to open a PR! Built with ☕ and code by Ayaskant Sahoo.*
