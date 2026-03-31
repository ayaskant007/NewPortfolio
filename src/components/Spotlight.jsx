import { useState, useRef, useEffect, useMemo } from "react";
import gsap from "gsap";
import useThemeStore from "#store/theme";
import useWindowStore from "#store/window";
import { Search } from "lucide-react";
import { dockApps } from "#constants";

const Spotlight = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const inputRef = useRef(null);
    const containerRef = useRef(null);
    const isDark = useThemeStore((s) => s.isDark);
    const openWindow = useWindowStore((s) => s.openWindow);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.code === "Space") {
                e.preventDefault();
                setIsOpen((p) => !p);
                setQuery("");
            }
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
            if (containerRef.current) {
                gsap.fromTo(
                    containerRef.current,
                    { opacity: 0, scale: 0.95, y: -20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.2, ease: "power3.out" },
                );
            }
        }
    }, [isOpen]);

    const results = useMemo(() => {
        if (!query.trim()) return dockApps.filter((a) => a.canOpen);
        const lq = query.toLowerCase();
        return dockApps.filter(
            (a) => a.canOpen && a.name.toLowerCase().includes(lq),
        );
    }, [query]);

    const handleSelect = (appId) => {
        openWindow(appId);
        setIsOpen(false);
        setQuery("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && results.length > 0) {
            handleSelect(results[0].id);
        }
    };

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-[4000] bg-black/30 backdrop-blur-sm"
                onClick={() => setIsOpen(false)}
            />
            <div
                ref={containerRef}
                className="fixed top-1/4 left-1/2 -translate-x-1/2 z-[4001] w-[560px]"
            >
                <div
                    className="rounded-2xl overflow-hidden"
                    style={{
                        background: isDark
                            ? "rgba(40, 40, 40, 0.85)"
                            : "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(40px) saturate(200%)",
                        WebkitBackdropFilter: "blur(40px) saturate(200%)",
                        border: isDark
                            ? "1px solid rgba(255,255,255,0.12)"
                            : "1px solid rgba(0,0,0,0.08)",
                        boxShadow: "0 30px 80px rgba(0,0,0,0.4)",
                    }}
                >
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-5 py-3.5">
                        <Search
                            size={20}
                            className={isDark ? "text-white/40" : "text-gray-400"}
                        />
                        <input
                            ref={inputRef}
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Spotlight Search"
                            aria-label="Spotlight Search"
                            className={`flex-1 bg-transparent outline-none text-lg ${isDark
                                    ? "text-white placeholder:text-white/30"
                                    : "text-gray-800 placeholder:text-gray-400"
                                }`}
                        />
                    </div>

                    {/* Results */}
                    {results.length > 0 && (
                        <div
                            className={`border-t ${isDark ? "border-white/10" : "border-black/10"} max-h-72 overflow-y-auto`}
                        >
                            {results.map((app) => (
                                <button
                                    key={app.id}
                                    onClick={() => handleSelect(app.id)}
                                    className={`w-full flex items-center gap-4 px-5 py-2.5 text-left transition-colors ${isDark
                                            ? "hover:bg-blue-500/60 text-white"
                                            : "hover:bg-blue-500 hover:text-white text-gray-800"
                                        }`}
                                >
                                    <img
                                        src={`/images/${app.icon}`}
                                        alt={app.name}
                                        className="w-8 h-8"
                                    />
                                    <div>
                                        <p className="text-sm font-medium">{app.name}</p>
                                        <p
                                            className={`text-xs ${isDark ? "text-white/40" : "text-gray-500"}`}
                                        >
                                            Application
                                        </p>
                                    </div>
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Spotlight;