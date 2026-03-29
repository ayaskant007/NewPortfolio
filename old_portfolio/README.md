#  Ayaskant Sahoo | Portfolio

> A high-performance, interactive creative developer portfolio built with Next.js 16 and React Three Fiber.
> **Live Site:** [https://ayaskant007.is-a.dev/](https://ayaskant007.is-a.dev/)

![Banner](/public/avatar.png)

## Features

- **Decrypted Typography**: Custom scrambled text reveal animations using Framer Motion.
- **Magic Bento Grid**: Responsive grid layout with interactive tilt and spotlight effects.
- **Flowing Menu**: A high-end, marquee-based navigation menu with liquid image distortions (WebGL).
- **3D Elements**: Interactive `StarField` and `Iridescence` background effects using **React Three Fiber**.
- **AI Terminal ("Ghost in the Shell")**: 
  - Integrated **Groq AI (Llama 3)** chatbot running on Next.js Server Actions.
  - Interactive terminal mode via the `chat` command.
  - "AyaskantOS Kernel" persona with knowledge of the portfolio.
- **Physics Easter Eggs**:
  - **404 Space Defender**: A playable Asteroids-style game on the 404 page (Press "Launch Defense").
  - **Gravity Protocol**: Hidden trigger (pulsing red dot) in the Hero section that activates real-time 2D physics.
- **Custom UI**: Splash cursor, liquid metal hover effects, and magnetic buttons.

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router, Turbopack)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **AI**: [Groq SDK](https://groq.com/) (Llama 3 70B)
- **Animations**: [Framer Motion](https://www.framer.com/motion/), [GSAP](https://gsap.com/)
- **3D & Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber), [Maath](https://github.com/pmndrs/maath)
- **Physics**: [Matter.js](https://brm.io/matter-js/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)

## Getting Started

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/ayaskant007/portfolio.git
    cd portfolio
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    Create a `.env.local` file in the root directory:
    ```env
    GROQ_API_KEY=gsk_your_groq_api_key_here
    ```

4.  **Run development server**:
    ```bash
    npm run dev
    ```

## Easter Eggs (Spoiler Alert!)

-   **Terminal**: Press `~` or type `help` to access the command line.
-   **AI Uplink**: Type `chat` in the terminal to talk to the system kernel.
-   **Gravity**: Find the **pulsing red period** (.) in the Hero text to break the law of physics.
-   **404 Void**: Visit a non-existent page to defend the system against data corruption.

## License

This project is licensed under the MIT License.

---

Crafted by [Ayaskant Sahoo](https://ayaskant007.is-a.dev/).
