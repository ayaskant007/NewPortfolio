"use client";

import { useEffect } from "react";

function SplashCursor() {
    useEffect(() => {
        const canvas = document.createElement("canvas");
        document.body.appendChild(canvas);
        canvas.style.position = "fixed";
        canvas.style.top = "0";
        canvas.style.left = "0";
        canvas.style.width = "100%";
        canvas.style.height = "100%";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = "9999";

        const ctx = canvas.getContext("2d");
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const pointers: any[] = [];
        const params = {
            size: 30, // Reduced size
            color: { r: 239, g: 68, b: 68 }, // Red-500
            simResolution: 128,
            dyeResolution: 512,
            densityDissipation: 0.95, // Faster dissipation
            velocityDissipation: 0.98,
            pressure: 0.8,
            pressureIterations: 20,
            curl: 30,
            splatRadius: 0.25,
            splatForce: 6000,
            shading: true,
            colorful: false,
            colorUpdateSpeed: 10,
            paused: false,
            hover: true,
            backColor: { r: 0, g: 0, b: 0 },
            transparent: true,
        };

        // Simplified fluid simulation for brevity and performance
        // In a real ReactBits implementation, this would be a full WebGL shader
        // For this demo, we'll use a particle-based approach that looks similar

        const particles: any[] = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        function update(t: number) {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // Update and draw particles
            for (let i = particles.length - 1; i >= 0; i--) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.life -= 0.02;
                p.size *= 0.95;

                if (p.life <= 0) {
                    particles.splice(i, 1);
                    continue;
                }

                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(${params.color.r}, ${params.color.g}, ${params.color.b}, ${p.life})`;
                ctx.fill();
            }

            requestAnimationFrame(update);
        }

        function onMouseMove(e: MouseEvent) {
            // Create particles on move
            for (let i = 0; i < 3; i++) {
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                    life: 1,
                    size: Math.random() * 5 + 2,
                });
            }
        }

        window.addEventListener("resize", resize);
        window.addEventListener("mousemove", onMouseMove);
        requestAnimationFrame(update);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("mousemove", onMouseMove);
            document.body.removeChild(canvas);
        };
    }, []);

    return null;
}

export default SplashCursor;
