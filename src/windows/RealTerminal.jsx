import React, { useEffect, useRef, useState } from "react";
import { Terminal as TerminalIcon } from "lucide-react";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";

const RealTerminal = () => {
    const [input, setInput] = useState("");
    const [isChatMode, setIsChatMode] = useState(false);
    const [isSymphonyMode, setIsSymphonyMode] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [history, setHistory] = useState([
        { type: "output", content: "AyaskantOS [Version 2.0.0]" },
        { type: "output", content: "(c) 2026 Ayaskant Sahoo. All rights reserved." },
        { type: "success", content: 'Type "help" for a list of valid commands.' }
    ]);
    const inputRef = useRef(null);
    const scrollRef = useRef(null);
    const matrixInterval = useRef(null);

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
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history, isTyping]);

    const handleCommand = async (cmd) => {
        const trimmed = cmd.trim().toLowerCase();
        const newHistory = [...history, { type: "input", content: cmd }];

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

        if (isChatMode) {
            if (trimmed === "exit") {
                setIsChatMode(false);
                setHistory(prev => [...prev, { type: "input", content: cmd }, { type: "success", content: "AI Connection Terminated." }]);
                setInput("");
                return;
            }

            setHistory(newHistory);
            setInput("");
            setIsTyping(true);

            setTimeout(() => {
                setIsTyping(false);
                setHistory(prev => [...prev, { type: "output", content: <span className="text-cyan-300">Uplink simulated: I am offline in this environment. Try native web commands.</span> }]);
            }, 1000);
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
                            const updated = [...prev, { type: "output", content: <span className="text-green-900 opacity-50">{line}</span> }];
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
        <div className="w-full h-full bg-[#0c0c0c]/90 text-green-400 font-mono flex flex-col relative overflow-hidden min-w-[600px] min-h-[400px]" onClick={() => inputRef.current?.focus()}>
            {/* Header mapped via standard macOS wrapper UI but customized inside */}
            <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/10 select-none">
                <div className="flex items-center gap-2 text-green-500">
                    <TerminalIcon size={16} />
                    <span className="font-bold">root@ayaskant-portfolio:~</span>
                </div>
                <WindowControls target="realterminal" />
            </div>

            {/* Body */}
            <div
                ref={scrollRef}
                className="flex-1 p-4 overflow-y-auto space-y-2 text-sm z-10 custom-scrollbar"
                style={{
                    scrollbarWidth: 'thin',
                    scrollbarColor: '#064e3b transparent',
                }}
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

                {isTyping && (
                    <div className="text-cyan-500 animate-pulse">
                        System is processing...
                    </div>
                )}

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
                        className={`bg-transparent border-none outline-none flex-1 ${isChatMode ? "text-cyan-400" : "text-green-400"}`}
                        autoFocus
                        spellCheck={false}
                        placeholder={isChatMode ? "Ask something..." : ""}
                    />
                    <span className={`animate-pulse w-2 h-4 block ${isChatMode ? "bg-cyan-500" : "bg-green-500"}`}></span>
                </div>
            </div>

            {/* Scanline Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] z-20 opacity-20"></div>
            <div className={`absolute inset-0 pointer-events-none animate-pulse z-0 ${isChatMode ? "bg-cyan-900/10" : "bg-green-500/5"}`}></div>

            <style>{`
                #realterminal {
                    box-shadow: 0 0 20px ${isChatMode ? "rgba(0, 255, 255, 0.15)" : "rgba(0, 255, 0, 0.1)"};
                }
            `}</style>
        </div>
    );
};

export default WindowWrapper(RealTerminal, "realterminal");
