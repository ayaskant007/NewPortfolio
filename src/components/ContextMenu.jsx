import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import useThemeStore from "#store/theme";
import useWindowStore from "#store/window";

const ContextMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const menuRef = useRef(null);
    const { isDark, toggleDark } = useThemeStore();
    const openWindow = useWindowStore((s) => s.openWindow);

    useEffect(() => {
        const handleContextMenu = (e) => {
            // Only trigger on desktop background (main or #home)
            const target = e.target;
            if (
                target.closest("nav") ||
                target.closest("#dock") ||
                target.closest("section[id]:not(#home):not(#welcome)")
            ) {
                return;
            }

            e.preventDefault();

            // Measure menu dimensions and clamp position to viewport
            const menuWidth = menuRef.current?.offsetWidth || 0;
            const menuHeight = menuRef.current?.offsetHeight || 0;
            const clampedX = Math.max(0, Math.min(e.clientX, window.innerWidth - menuWidth));
            const clampedY = Math.max(0, Math.min(e.clientY, window.innerHeight - menuHeight));

            setPosition({ x: clampedX, y: clampedY });
            setIsOpen(true);
        };

        const handleClick = () => setIsOpen(false);

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("click", handleClick);

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("click", handleClick);
        };
    }, []);

    useEffect(() => {
        if (isOpen && menuRef.current) {
            gsap.fromTo(
                menuRef.current,
                { opacity: 0, scale: 0.95, y: -5 },
                { opacity: 1, scale: 1, y: 0, duration: 0.15, ease: "power2.out" },
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const items = [
        {
            label: "Change Wallpaper",
            action: () => {
                openWindow("settings");
                setIsOpen(false);
            },
        },
        {
            label: isDark ? "Switch to Light Mode" : "Switch to Dark Mode",
            action: () => {
                toggleDark();
                setIsOpen(false);
            },
        },
        { divider: true },
        {
            label: "Open Terminal",
            action: () => {
                openWindow("terminal");
                setIsOpen(false);
            },
        },
        {
            label: "Open Finder",
            action: () => {
                openWindow("finder");
                setIsOpen(false);
            },
        },
    ];

    return (
        <div
            ref={menuRef}
            className="fixed z-[3000]"
            style={{ left: position.x, top: position.y }}
        >
            <div
                className="min-w-[200px] py-1 rounded-lg overflow-hidden"
                style={{
                    background: isDark
                        ? "rgba(40, 40, 40, 0.9)"
                        : "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(30px) saturate(180%)",
                    WebkitBackdropFilter: "blur(30px) saturate(180%)",
                    border: isDark
                        ? "1px solid rgba(255,255,255,0.12)"
                        : "1px solid rgba(0,0,0,0.12)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                }}
            >
                {items.map((item, i) =>
                    item.divider ? (
                        <div
                            key={i}
                            className={`mx-2 my-1 h-px ${isDark ? "bg-white/10" : "bg-black/10"}`}
                        />
                    ) : (
                        <button
                            key={i}
                            onClick={item.action}
                            className={`w-full text-left px-4 py-1.5 text-sm transition-colors ${isDark
                                    ? "text-white/90 hover:bg-blue-500 hover:text-white"
                                    : "text-gray-800 hover:bg-blue-500 hover:text-white"
                                }`}
                        >
                            {item.label}
                        </button>
                    ),
                )}
            </div>
        </div>
    );
};

export default ContextMenu;