import { useState, useRef, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";

const SYSTEM_PROMPT = `You are "AyaskantOS Kernel", a cyberpunk-themed system interface for Ayaskant Sahoo's portfolio.
DATA: Name: Ayaskant Sahoo. Role: Developer & Student. Location: New Delhi, India.
Tech: C++, Python, C#, JavaScript, React, GSAP, Unity, Ren'Py.
Projects: Parano!a (Unity Horror), Vikas Bhi Virasat Bhi (GSAP Website), The Last Ember (Ren'Py Novel).
Contact: ayaskantsahoo007@gmail.com. GitHub: @ayaskant007.
RULES: Keep responses short and terminal-like (under 50 words). Use tech jargon. Refuse unrelated topics.`;

const Terminal = () => {
  const [input, setInput] = useState("");
  const [isChatMode, setIsChatMode] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [history, setHistory] = useState([
    { type: "output", content: "AyaskantOS [Version 2.0.0]" },
    { type: "output", content: "(c) 2026 Ayaskant Sahoo. All rights reserved." },
    { type: "success", content: 'Type "help" for a list of valid commands.' },
  ]);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const matrixInterval = useRef(null);

  useEffect(() => {
    return () => {
      if (matrixInterval.current) clearInterval(matrixInterval.current);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => inputRef.current?.focus(), 100);
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const stopMatrix = () => {
    if (matrixInterval.current) {
      clearInterval(matrixInterval.current);
      matrixInterval.current = null;
      return true;
    }
    return false;
  };

  const chatWithAI = async (message) => {
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (!apiKey) return { error: "System Error: GROQ API Key not found in environment." };

    try {
      const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: message },
          ],
          model: "llama-3.3-70b-versatile",
          temperature: 0.7,
          max_tokens: 150,
        }),
      });

      const data = await res.json();
      if (data.choices?.[0]?.message?.content) {
        return { success: data.choices[0].message.content };
      }
      return { error: data.error?.message || "No response received." };
    } catch (e) {
      return { error: `Connection failed: ${e.message}` };
    }
  };

  const handleCommand = async (cmd) => {
    const trimmed = cmd.trim().toLowerCase();
    const newHistory = [...history, { type: "input", content: cmd }];

    // AI Chat mode
    if (isChatMode) {
      if (trimmed === "exit") {
        setIsChatMode(false);
        setHistory([
          ...newHistory,
          { type: "success", content: "AI Connection Terminated." },
        ]);
        setInput("");
        return;
      }

      setHistory(newHistory);
      setInput("");
      setIsTyping(true);

      const response = await chatWithAI(cmd);
      setIsTyping(false);
      if (response.success) {
        setHistory((prev) => [
          ...prev,
          { type: "output", content: response.success, isAI: true },
        ]);
      } else {
        setHistory((prev) => [
          ...prev,
          { type: "error", content: response.error },
        ]);
      }
      return;
    }

    switch (trimmed) {
      case "help":
        newHistory.push({
          type: "output",
          content: "help_menu",
          isMenu: true,
        });
        break;
      case "chat":
        newHistory.push({
          type: "success",
          content: "Establishing secure uplink to AyaskantOS Core... Connection Established. Type 'exit' to disconnect.",
        });
        setIsChatMode(true);
        break;
      case "about":
        newHistory.push({
          type: "output",
          content:
            "I am Ayaskant Sahoo, a Developer & Student from New Delhi. I build web experiences, games, and interactive software using C++, Python, React, GSAP, Unity, and more.",
        });
        break;
      case "projects":
        newHistory.push({
          type: "output",
          content: "project_list",
          isProjects: true,
        });
        break;
      case "socials":
        newHistory.push({
          type: "output",
          content: "social_list",
          isSocials: true,
        });
        break;
      case "skills":
        newHistory.push({
          type: "output",
          content:
            "C++, Python, C#, JavaScript, React, Next.js, GSAP 3, Framer Motion, Tailwind CSS, Unity, Ren'Py, Blender",
        });
        break;
      case "contact":
        newHistory.push({
          type: "output",
          content: "Email: ayaskantsahoo007@gmail.com",
        });
        break;
      case "coffee":
        newHistory.push({
          type: "success",
          content: "coffee_art",
          isCoffee: true,
        });
        break;
      case "matrix":
        if (stopMatrix()) {
          newHistory.push({
            type: "success",
            content: "Matrix disconnected.",
          });
        } else {
          matrixInterval.current = setInterval(() => {
            const chars = "01";
            const line = Array(50)
              .fill(0)
              .map(() => chars[Math.floor(Math.random() * chars.length)])
              .join("");
            setHistory((prev) => {
              const updated = [
                ...prev,
                { type: "output", content: line, isMatrix: true },
              ];
              if (updated.length > 100) return updated.slice(-100);
              return updated;
            });
          }, 50);
          newHistory.push({
            type: "success",
            content: "Wake up, Neo... (Type 'stop' or 'matrix' to exit)",
          });
        }
        break;
      case "stop":
        if (stopMatrix()) {
          newHistory.push({ type: "success", content: "Process stopped." });
        } else {
          newHistory.push({
            type: "error",
            content: "No active process to stop.",
          });
        }
        break;
      case "clear":
        stopMatrix();
        setHistory([]);
        setInput("");
        return;
      case "exit":
        stopMatrix();
        setInput("");
        return;
      case "sudo":
        newHistory.push({ type: "error", content: "nice try." });
        break;
      case "":
        break;
      default:
        newHistory.push({
          type: "error",
          content: `Command not found: ${trimmed}. Type "help" for available commands.`,
        });
    }

    setHistory(newHistory);
    setInput("");
  };

  const renderEntry = (entry, i) => {
    const colorClass =
      entry.type === "error"
        ? "text-red-500"
        : entry.type === "success"
          ? "text-green-300"
          : "text-green-400";

    if (entry.type === "input") {
      return (
        <div key={i} className="flex gap-2">
          <span className={isChatMode ? "text-cyan-500" : "text-green-600"}>
            ➜
          </span>
          <span className="text-green-400">{entry.content}</span>
        </div>
      );
    }

    if (entry.isMatrix) {
      return (
        <div key={i} className="text-green-900 opacity-50 font-mono text-xs">
          {entry.content}
        </div>
      );
    }

    if (entry.isAI) {
      return (
        <div key={i} className="text-cyan-300">
          {entry.content}
        </div>
      );
    }

    if (entry.isMenu) {
      return (
        <div key={i} className="text-green-400 space-y-1">
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
      );
    }

    if (entry.isProjects) {
      return (
        <div key={i} className="text-green-400 space-y-1">
          <p>Loading project modules...</p>
          <ul className="space-y-1 mt-2">
            <li>
              <a href="https://github.com/foglomon/Paranoia" target="_blank" className="text-green-300 hover:underline">[DIR] Parano!a</a> - Unity/C# Thriller Game
            </li>
            <li>
              <a href="https://vikasvirasat.netlify.app/" target="_blank" className="text-green-300 hover:underline">[WEB] Vikas Bhi, Virasat Bhi</a> - GSAP 3 Website
            </li>
            <li>
              <a href="https://github.com/ayaskant007/The-Last-Ember" target="_blank" className="text-green-300 hover:underline">[DIR] The Last Ember</a> - Ren'Py Visual Novel
            </li>
          </ul>
        </div>
      );
    }

    if (entry.isSocials) {
      return (
        <div key={i} className="text-green-400 flex gap-4 mt-1">
          <a href="https://github.com/ayaskant007" target="_blank" className="underline hover:text-green-300">GitHub</a>
          <a href="https://www.linkedin.com/in/ayaskant-sahoo/" target="_blank" className="underline hover:text-green-300">LinkedIn</a>
          <a href="https://instagram.com/ayaskant_007" target="_blank" className="underline hover:text-green-300">Instagram</a>
        </div>
      );
    }

    if (entry.isCoffee) {
      return (
        <div key={i} className="text-green-300">
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
     \\___________/`}
          </pre>
          <p className="mt-1">Fueling system... [OK]</p>
        </div>
      );
    }

    return (
      <div key={i} className={colorClass}>
        {entry.content}
      </div>
    );
  };

  return (
    <>
      <div
        id="window-header"
        className="flex items-center justify-between px-4 py-2 bg-[#1a1a1a] border-b border-green-900/30"
      >
        <WindowControls target="terminal" />
        <span className="text-green-500 font-bold text-sm flex-1 text-center">
          root@ayaskant-portfolio:~
        </span>
        <div className="w-16" />
      </div>

      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto space-y-1 text-green-400 font-mono text-sm bg-[#0c0c0c] min-h-[300px] max-h-[60vh]"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map(renderEntry)}

        {isTyping && (
          <div className="text-cyan-500 animate-pulse">
            System is processing...
          </div>
        )}

        {/* Input Line */}
        <div className="flex gap-2 items-center">
          <span className={isChatMode ? "text-cyan-500" : "text-green-600"}>
            ➜
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCommand(input);
            }}
            className={`bg-transparent border-none outline-none flex-1 placeholder-green-900 ${isChatMode ? "text-cyan-400" : "text-green-400"
              }`}
            autoFocus
            spellCheck={false}
            placeholder={isChatMode ? "Ask something..." : ""}
          />
          <span
            className={`animate-pulse w-2 h-4 block ${isChatMode ? "bg-cyan-500" : "bg-green-500"}`}
          />
        </div>
      </div>

      {/* Scanline overlay */}
      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_2px] opacity-10 rounded-xl" />
    </>
  );
};

const TerminalWindow = WindowWrapper(Terminal, "terminal");

export default TerminalWindow;
