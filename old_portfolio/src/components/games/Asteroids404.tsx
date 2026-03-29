"use client";

import React, { useEffect, useRef, useState } from "react";

export default function Asteroids404() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [highScore, setHighScore] = useState(0);
    const [shake, setShake] = useState(0);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (!gameStarted || gameOver) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Game Limits
        let difficulty = 1;

        // Game State
        const player = { x: canvas.width / 2, y: canvas.height - 50, size: 20, speed: 7, angle: 0 }; // Faster player
        const bullets: { x: number; y: number; vx: number; vy: number }[] = [];
        const enemies: { x: number; y: number; vx: number; vy: number; size: number; text: string; color: string }[] = [];
        const particles: { x: number; y: number; vx: number; vy: number; life: number; color: string; size: number }[] = [];
        const stars: { x: number; y: number; speed: number; size: number }[] = [];
        const keys: { [key: string]: boolean } = {};
        let frameId: number;
        let lastEnemyTime = 0;
        let spawnRate = 1000;

        // Init Stars
        for (let i = 0; i < 100; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                speed: Math.random() * 2 + 0.5,
                size: Math.random() * 2
            });
        }

        // Utils
        const spawnEnemy = () => {
            const size = 30 + Math.random() * 30;
            const x = Math.random() * (canvas.width - size);
            // Difficulty text
            const texts = ["404", "ERR", "NULL", "VOID", "BUG", "NaN", "undefined"];
            const colors = ["#ff0000", "#ff4444", "#ff8888", "#ff00ff"];

            enemies.push({
                x,
                y: -50,
                vx: (Math.random() - 0.5) * (1 + difficulty), // More erratic horizontal movement
                vy: (1 + Math.random() * 2) * (0.5 + difficulty * 0.2), // Faster downward speed
                size,
                text: texts[Math.floor(Math.random() * texts.length)],
                color: colors[Math.floor(Math.random() * colors.length)]
            });
        };

        const createExplosion = (x: number, y: number, color: string, count: number = 15) => {
            for (let i = 0; i < count; i++) {
                particles.push({
                    x, y,
                    vx: (Math.random() - 0.5) * 15,
                    vy: (Math.random() - 0.5) * 15,
                    life: 1.0,
                    color,
                    size: Math.random() * 4 + 1
                });
            }
        };

        // Inputs
        const handleKeyDown = (e: KeyboardEvent) => keys[e.code] = true;
        const handleKeyUp = (e: KeyboardEvent) => keys[e.code] = false;
        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        // Resize
        const resize = () => {
            if (!canvas) return;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            player.x = canvas.width / 2;
            player.y = canvas.height - 100;
        };
        resize();
        window.addEventListener("resize", resize);

        // Loop
        const loop = (timestamp: number) => {
            if (gameOver) return;

            // Difficulty Scaling
            difficulty = 1 + Math.floor(score / 500);
            spawnRate = Math.max(200, 1000 - difficulty * 50); // Cap spawn rate at 200ms

            // Level Up Message
            if (score > 0 && score % 1000 === 0 && !message) {
                setMessage(`THREAT LEVEL ${difficulty}`);
                setTimeout(() => setMessage(""), 2000);
            }

            // Update Player
            if (keys["ArrowLeft"] || keys["KeyA"]) player.x -= player.speed;
            if (keys["ArrowRight"] || keys["KeyD"]) player.x += player.speed;
            player.x = Math.max(player.size, Math.min(canvas.width - player.size, player.x));

            // Spawn Enemies
            if (timestamp - lastEnemyTime > spawnRate) {
                spawnEnemy();
                lastEnemyTime = timestamp;
            }

            // Update Bullets
            for (let i = bullets.length - 1; i >= 0; i--) {
                bullets[i].y += bullets[i].vy;
                if (bullets[i].y < 0) bullets.splice(i, 1);
            }

            // Update Enemies
            for (let i = enemies.length - 1; i >= 0; i--) {
                const e = enemies[i];
                e.x += e.vx;
                e.y += e.vy;

                // Bounce off walls
                if (e.x < 0 || e.x > canvas.width) e.vx *= -1;

                // Collision with player
                const dx = player.x - e.x;
                const dy = player.y - e.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < player.size + e.size * 0.8) {
                    setGameOver(true);
                    setShake(20); // Screen shake
                    createExplosion(player.x, player.y, "red", 50);
                }

                if (e.y > canvas.height) enemies.splice(i, 1);
            }

            // Bullet Collision
            for (let i = bullets.length - 1; i >= 0; i--) {
                for (let j = enemies.length - 1; j >= 0; j--) {
                    const b = bullets[i];
                    const e = enemies[j];
                    if (!b || !e) continue;

                    const dx = b.x - e.x;
                    const dy = b.y - e.y;
                    if (Math.sqrt(dx * dx + dy * dy) < e.size) {
                        createExplosion(e.x, e.y, "white");
                        enemies.splice(j, 1);
                        bullets.splice(i, 1);
                        setScore(s => s + 100);
                        break;
                    }
                }
            }

            // Update Particles
            for (let i = particles.length - 1; i >= 0; i--) {
                particles[i].x += particles[i].vx;
                particles[i].y += particles[i].vy;
                particles[i].life -= 0.03;
                if (particles[i].life <= 0) particles.splice(i, 1);
            }

            // Update Stars
            stars.forEach(s => {
                s.y += s.speed * (0.5 + difficulty * 0.1); // Move faster with level
                if (s.y > canvas.height) {
                    s.y = 0;
                    s.x = Math.random() * canvas.width;
                }
            });

            // Draw
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Draw Stars
            ctx.fillStyle = "#ffffff55";
            stars.forEach(s => {
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
                ctx.fill();
            });

            // Draw Player
            ctx.save();
            ctx.translate(player.x, player.y);
            ctx.beginPath();
            ctx.moveTo(0, -player.size);
            ctx.lineTo(-player.size, player.size);
            ctx.lineTo(player.size, player.size);
            ctx.closePath();
            ctx.fillStyle = "#00ff00"; // Hacker Green
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#00ff00";
            ctx.fill();
            ctx.restore();

            // Draw Enemies
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            enemies.forEach(e => {
                ctx.font = `bold ${e.size}px monospace`;
                ctx.fillStyle = e.color;
                ctx.shadowBlur = 10;
                ctx.shadowColor = e.color;
                ctx.fillText(e.text, e.x, e.y);
            });

            // Draw Bullets
            ctx.fillStyle = "cyan";
            bullets.forEach(b => {
                ctx.fillRect(b.x - 2, b.y - 10, 4, 20);
            });

            // Draw Particles
            particles.forEach(p => {
                ctx.globalAlpha = p.life;
                ctx.fillStyle = p.color;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.globalAlpha = 1;
            });

            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame(loop);

        const shoot = (e: KeyboardEvent) => {
            if (e.code === "Space") {
                bullets.push({ x: player.x, y: player.y - 20, vx: 0, vy: -20 }); // Faster bullets
            }
        };
        window.addEventListener("keydown", shoot);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("keydown", shoot);
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(frameId);
        };
    }, [gameStarted, gameOver]);

    return (
        <div
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
            style={{
                transform: `translate(${Math.random() * shake - shake / 2}px, ${Math.random() * shake - shake / 2}px)`
            }}
        >
            {!gameStarted && !gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/80 backdrop-blur-sm">
                    <div className="text-center animate-pulse mb-8">
                        <h2 className="text-6xl font-black text-red-600 mb-2 glitch-text">SYSTEM DEFENSE</h2>
                        <p className="text-green-500 font-mono text-sm max-w-md mx-auto">
                            CRITICAL ERROR: VOID BREACH DETECTED.<br />
                            <span className="text-white">DIFFICULTY INCREASES WITH TIME.</span>
                        </p>
                    </div>
                    <button
                        onClick={() => setGameStarted(true)}
                        className="px-10 py-4 bg-red-600 text-black font-black text-xl rounded-none hover:bg-white hover:scale-105 transition duration-200 border-2 border-transparent hover:border-red-600 pointer-events-auto"
                    >
                        INITIALIZE PROTOCOL
                    </button>
                    <p className="mt-4 text-xs text-neutral-600 font-mono">ARROWS to MOVE | SPACE to FIRE</p>
                </div>
            )}

            {message && (
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
                    <h3 className="text-6xl font-black text-yellow-500 animate-bounce stroke-text">{message}</h3>
                </div>
            )}

            {gameOver && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 bg-black/90 backdrop-blur-md">
                    <h2 className="text-9xl font-black text-red-600 mb-4 animate-glitch">FAILURE</h2>
                    <p className="text-4xl mb-8 font-mono text-white">SCORE: {score}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-white text-black font-bold rounded-none hover:bg-red-600 hover:text-white transition"
                    >
                        RETRY SYSTEM REBOOT
                    </button>
                    <a href="/" className="mt-8 text-neutral-500 hover:text-white underline font-mono text-sm">Return to Safe Mode</a>
                </div>
            )}

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            {gameStarted && (
                <div className="absolute top-10 left-10 z-10 font-mono text-xl text-green-500 border border-green-900 bg-black/50 p-2 shadow-[0_0_15px_rgba(0,255,0,0.3)]">
                    THREATS ELIMINATED: {score}
                </div>
            )}
        </div>
    );
}
