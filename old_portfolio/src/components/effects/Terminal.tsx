"use client";

import { chatWithAI } from "@/app/actions/chat";

import React, { useEffect, useRef, useState } from "react";
import { X, Terminal as TerminalIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type CommandOutput = {
    type: "input" | "output" | "error" | "success";
    content: React.ReactNode;
};

export default function Terminal() {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState("");
    const [isChatMode, setIsChatMode] = useState(false);
    const [isSymphonyMode, setIsSymphonyMode] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [history, setHistory] = useState<CommandOutput[]>([
        { type: "output", content: "AyaskantOS [Version 2.0.0]" },
        { type: "output", content: "(c) 2026 Ayaskant Sahoo. All rights reserved." },
        { type: "success", content: 'Type "help" for a list of valid commands.' }
    ]);
    const inputRef = useRef<HTMLInputElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [konamiKeys, setKonamiKeys] = useState<string[]>([]);
    const KONAMI_CODE = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];
    const matrixInterval = useRef<NodeJS.Timeout | null>(null);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (matrixInterval.current) clearInterval(matrixInterval.current);
        };
    }, []);

    const stopMatrix = () => {
        if (matrixInterval.current) {
            clearInterval(matrixInterval.current);
            matrixInterval.current = null;
            return true;
        }
        return false;
    };

    useEffect(() => {
        const handleOpenEvent = () => setIsOpen(true);
        window.addEventListener("open-terminal", handleOpenEvent);

        const handleKeyDown = (e: KeyboardEvent) => {
            // Konami Code Listener
            setKonamiKeys(prev => {
                const newKeys = [...prev, e.key];
                if (newKeys.length > KONAMI_CODE.length) newKeys.shift();
                if (JSON.stringify(newKeys) === JSON.stringify(KONAMI_CODE)) {
                    setIsOpen(true);
                }
                return newKeys;
            });
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => {
            window.removeEventListener("open-terminal", handleOpenEvent);
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            // Small delay to allow animation to start before focusing
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isOpen, isTyping]);

    const handleCommand = async (cmd: string) => {
        const trimmed = cmd.trim().toLowerCase();
        const newHistory = [...history, { type: "input", content: cmd } as CommandOutput];

        // Handle Symphony Mode
        if (isSymphonyMode) {
            setIsSymphonyMode(false);
            if (trimmed === "57186706") {
                setHistory([...newHistory, { type: "success", content: "lV8NSZCa3ek" }]);
            } else {
                setHistory([...newHistory, { type: "error", content: "You entered the wrong key. Access is denied." }]);
            }
            setInput("");
            return;
        }

        // Handle AI Chat Mode
        if (isChatMode) {
            if (trimmed === "exit") {
                setIsChatMode(false);
                setHistory(prev => [...prev, { type: "input", content: cmd } as CommandOutput, { type: "success", content: "AI Connection Terminated." }]);
                setInput("");
                return;
            }

            setHistory(newHistory);
            setInput("");
            setIsTyping(true);

            try {
                const response = await chatWithAI(cmd);
                setIsTyping(false);
                if (response.success) {
                    setHistory(prev => [...prev, { type: "output", content: <span className="text-cyan-300">{response.success}</span> }]);
                } else {
                    setHistory(prev => [...prev, { type: "error", content: response.error }]);
                }
            } catch (e) {
                setIsTyping(false);
                setHistory(prev => [...prev, { type: "error", content: "Transmission disrupted." }]);
            }
            return;
        }

        switch (trimmed) {
            case "help":
                newHistory.push({
                    type: "output",
                    content: (
                        <div className="space-y-1">
                            <p>Available commands:</p>
                            <ul className="list-disc list-inside pl-4 text-neutral-400">
                                <li><span className="text-green-400">about</span> - Who am I?</li>
                                <li><span className="text-green-400">projects</span> - View my work</li>
                                <li><span className="text-green-400">skills</span> - Technical capabilities</li>
                                <li><span className="text-green-400">socials</span> - Connect with me</li>
                                <li><span className="text-green-400">chat</span> - <span className="text-cyan-400">Initialize AI Uplink</span></li>
                                <li><span className="text-green-400">matrix</span> - Toggle data stream</li>
                                <li><span className="text-green-400">coffee</span> - Fuel the dev</li>
                                <li><span className="text-green-400">stop</span> - Stop running processes</li>
                                <li><span className="text-green-400">clear</span> - Clear output</li>
                                <li><span className="text-green-400">exit</span> - Close terminal</li>
                            </ul>
                        </div>
                    )
                });
                break;
            case "chat":
                newHistory.push({
                    type: "success",
                    content: (
                        <div>
                            <p>Establishing secure uplink to AyaskantOS Core...</p>
                            <p className="text-cyan-400 mt-1">Connection Established.</p>
                            <p className="text-neutral-500 text-xs">Type 'exit' to disconnect.</p>
                        </div>
                    )
                });
                setIsChatMode(true);
                break;
            case "about":
                newHistory.push({
                    type: "output",
                    content: "I am Ayaskant Sahoo, a Developer of various disciplines. I build high-performance web experiences, games, and interactive software using diverse tech stacks. Passionate about merging design with code."
                });
                break;
            case "projects":
                newHistory.push({
                    type: "output",
                    content: (
                        <div className="space-y-2">
                            <p>Loading project modules...</p>
                            <ul className="space-y-1 mt-2">
                                <li><a href="https://github.com/foglomon/Paranoia" target="_blank" className="text-green-300 hover:underline">[DIR] Parano!a</a> - Unity/C# Thriller Game</li>
                                <li><a href="https://vikasvirasat.netlify.app/" target="_blank" className="text-green-300 hover:underline">[WEB] Vikas Bhi, Virasat Bhi</a> - GSAP 3 Website</li>
                                <li><a href="https://github.com/ayaskant007/The-Last-Ember" target="_blank" className="text-green-300 hover:underline">[DIR] The Last Ember</a> - Ren'Py Visual Novel</li>
                            </ul>
                        </div>
                    )
                });
                break;
            case "socials":
                newHistory.push({
                    type: "output",
                    content: (
                        <div className="flex gap-4 mt-1">
                            <a href="https://github.com/ayaskant007" target="_blank" className="underline hover:text-green-300">GitHub</a>
                            <a href="https://ayaskant007.is-a.dev/" target="_blank" className="underline hover:text-green-300">Live Site</a>
                        </div>
                    )
                });
                break;
            case "skills":
                newHistory.push({ type: "output", content: "Next.js 16, React Three Fiber, Tailwind CSS v4, Framer Motion, GSAP, Matter.js, Unity, Python" });
                break;
            case "symphony":
                newHistory.push({ type: "output", content: "C:\\> TERMINAL ACTIVATED. ENTER DELTA KEY:" });
                setIsSymphonyMode(true);
                break;
            case "contact":
                newHistory.push({ type: "output", content: "Email: contact@ayaskant.dev" });
                break;
            case "coffee":
                newHistory.push({
                    type: "success",
                    content: (
                        <pre className="text-amber-500 font-mono text-xs leading-tight mt-2">
                            {`    (  )   (   )  )
     ) (   )  (  (
     ( )  (    ) )
     _____________
    <_____________> ___
    |             |/ _ \\
    |  COFFEE     | | | |
    |             |_| |_|
    |_____________|
     \\___________/
`}
                        </pre>
                    )
                });
                newHistory.push({ type: "output", content: "Fueling system... [OK]" });
                break;
            case "matrix":
                if (stopMatrix()) {
                    newHistory.push({ type: "success", content: "Matrix disconnected." });
                } else {
                    matrixInterval.current = setInterval(() => {
                        const chars = "010101010101010101010101010101";
                        const line = Array(50).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join("");
                        setHistory(prev => {
                            // Keep history minimal during matrix to prevent overflow
                            const updated = [...prev, { type: "output", content: <span className="text-green-900 opacity-50">{line}</span> } as CommandOutput];
                            if (updated.length > 100) return updated.slice(updated.length - 100);
                            return updated;
                        });
                        if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
                    }, 50);
                    newHistory.push({ type: "success", content: "Wake up, Neo... (Type 'stop' or 'matrix' to exit)" });
                }
                break;
            case "stop":
                if (stopMatrix()) {
                    newHistory.push({ type: "success", content: "Process stopped." });
                } else {
                    newHistory.push({ type: "error", content: "No active process to stop." });
                }
                break;
            case "clear":
                stopMatrix();
                setHistory([]);
                return;
            case "exit":
                stopMatrix();
                setIsOpen(false);
                return;
            case "sudo":
                newHistory.push({ type: "error", content: "nice try." });
                break;
            case "":
                break;
            default:
                newHistory.push({ type: "error", content: `Command not found: ${trimmed}.` });
        }

        setHistory(newHistory);
        setInput("");
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm bg-black/50">
                    <motion.div
                        initial={{ scaleY: 0.005, scaleX: 0, opacity: 0 }}
                        animate={{
                            scaleY: [0.005, 0.005, 1],
                            scaleX: [0, 1, 1],
                            opacity: [0, 1, 1]
                        }}
                        exit={{
                            scaleY: [1, 0.005, 0.005],
                            scaleX: [1, 1, 0],
                            opacity: [1, 1, 0]
                        }}
                        transition={{ duration: 0.4, times: [0, 0.4, 1], ease: "easeInOut" }}
                        className="w-full max-w-3xl h-[80vh] bg-[#0c0c0c] border border-green-800 rounded-lg shadow-2xl flex flex-col overflow-hidden relative terminal-scanline"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-green-900">
                            <div className="flex items-center gap-2 text-green-500">
                                <TerminalIcon size={16} />
                                <span className="font-bold">root@ayaskant-portfolio:~</span>
                            </div>
                            <button onClick={() => { stopMatrix(); setIsOpen(false); }} className="text-green-700 hover:text-green-500">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Body */}
                        <div
                            ref={scrollRef}
                            className="flex-1 p-4 overflow-y-auto space-y-2 text-green-400 font-mono scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent"
                            onClick={() => inputRef.current?.focus()}
                        >
                            {history.map((entry, i) => (
                                <div key={i} className={`${entry.type === "error" ? "text-red-500" : entry.type === "success" ? "text-green-300" : "text-green-400"}`}>
                                    {entry.type === "input" ? (
                                        <div className="flex gap-2">
                                            <span className={`${isChatMode ? "text-cyan-500" : "text-green-600"}`}>➜</span>
                                            <span>{entry.content}</span>
                                        </div>
                                    ) : (
                                        <div>{entry.content}</div>
                                    )}
                                </div>
                            ))}

                            {/* Typing Indicator */}
                            {isTyping && (
                                <div className="text-cyan-500 animate-pulse">
                                    System is processing...
                                </div>
                            )}

                            {/* Input Line */}
                            <div className="flex gap-2 items-center">
                                <span className={`${isChatMode ? "text-cyan-500" : "text-green-600"}`}>➜</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") handleCommand(input);
                                    }}
                                    className={`bg-transparent border-none outline-none flex-1 placeholder-green-900 ${isChatMode ? "text-cyan-400" : "text-green-400"}`}
                                    autoFocus
                                    spellCheck={false}
                                    placeholder={isChatMode ? "Ask something..." : ""}
                                />
                                <span className={`animate-pulse w-2 h-4 block ${isChatMode ? "bg-cyan-500" : "bg-green-500"}`}></span>
                            </div>
                        </div>

                        {/* Scanline Overlay */}
                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-10 opacity-20"></div>
                        <div className={`absolute inset-0 pointer-events-none animate-pulse z-0 ${isChatMode ? "bg-cyan-900/10" : "bg-green-500/5"}`}></div>
                    </motion.div>

                    <style jsx>{`
                        .terminal-scanline {
                            box-shadow: 0 0 20px ${isChatMode ? "rgba(0, 255, 255, 0.15)" : "rgba(0, 255, 0, 0.1)"};
                        }
                    `}</style>
                </div>
            )}
        </AnimatePresence>
    );
}
