import { useState, useEffect } from "react";
import dayjs from "dayjs";
import { navLinks } from "#constants";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import {
    Wifi,
    Search,
    ChevronDown,
} from "lucide-react";

const APP_NAMES = {
    finder: "Finder",
    safari: "Safari",
    photos: "Photos",
    contact: "Contact",
    terminal: "Terminal",
    resume: "Preview",
    notes: "Notes",
    settings: "System Settings",
    txtfile: "TextEdit",
    imgfile: "Preview",
};

const Navbar = () => {
    const { openWindow, focusedWindow } = useWindowStore();
    const { isDark } = useThemeStore();
    const [time, setTime] = useState(dayjs().format("ddd MMM D h:mm A"));
    const [activeMenu, setActiveMenu] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format("ddd MMM D h:mm A"));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const appName = focusedWindow
        ? APP_NAMES[focusedWindow] || "Finder"
        : "Finder";

    const togglePanel = (panelName) => {
        window.dispatchEvent(
            new CustomEvent("toggle-panel", { detail: panelName }),
        );
    };

    const handleMenuClick = (type) => {
        openWindow(type);
        setActiveMenu(null);
    };

    const menuBg = isDark
        ? "rgba(40, 40, 40, 0.9)"
        : "rgba(255, 255, 255, 0.9)";

    const menuBorder = isDark
        ? "1px solid rgba(255,255,255,0.12)"
        : "1px solid rgba(0,0,0,0.1)";

    return (
        <nav
            className="flex justify-between items-center px-4 py-1 select-none relative z-[1500]"
            style={{
                background: isDark
                    ? "rgba(30, 30, 30, 0.65)"
                    : "rgba(255, 255, 255, 0.55)",
                backdropFilter: "blur(40px) saturate(200%)",
                WebkitBackdropFilter: "blur(40px) saturate(200%)",
                borderBottom: isDark
                    ? "1px solid rgba(255,255,255,0.06)"
                    : "1px solid rgba(0,0,0,0.06)",
            }}
            onClick={() => setActiveMenu(null)}
        >
            {/* Left side */}
            <div className="flex items-center gap-4 max-sm:w-full max-sm:justify-center">
                {/* Apple Logo */}
                <button
                    className="relative"
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(activeMenu === "apple" ? null : "apple");
                    }}
                >
                    <svg
                        className={`w-4 h-5 ${isDark ? "fill-white" : "fill-black"} hover:opacity-70 transition-opacity`}
                        viewBox="0 0 814 1000"
                    >
                        <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.8-82-101.6-209.5-101.6-330.4 0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.9zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8.7 15.6 1.3 18.1 2.6.6 6.4 1.3 10.2 1.3 45.4 0 103.5-30.4 139.5-71.3z" />
                    </svg>

                    {/* Apple dropdown */}
                    {activeMenu === "apple" && (
                        <div
                            className="absolute top-6 left-0 min-w-[220px] py-1 rounded-lg z-50"
                            style={{
                                background: menuBg,
                                backdropFilter: "blur(30px)",
                                border: menuBorder,
                                boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <p
                                className={`px-4 py-1.5 text-sm font-semibold ${isDark ? "text-white" : "text-gray-800"}`}
                            >
                                About This Mac
                            </p>
                            <div
                                className={`mx-2 my-1 h-px ${isDark ? "bg-white/10" : "bg-black/10"}`}
                            />
                            <button
                                onClick={() => handleMenuClick("settings")}
                                className={`w-full text-left px-4 py-1.5 text-sm ${isDark ? "text-white/80 hover:bg-blue-500 hover:text-white" : "text-gray-700 hover:bg-blue-500 hover:text-white"}`}
                            >
                                System Settings...
                            </button>
                            <button
                                onClick={() => handleMenuClick("finder")}
                                className={`w-full text-left px-4 py-1.5 text-sm ${isDark ? "text-white/80 hover:bg-blue-500 hover:text-white" : "text-gray-700 hover:bg-blue-500 hover:text-white"}`}
                            >
                                Recent Projects
                            </button>
                        </div>
                    )}
                </button>

                {/* Active App Name */}
                <span
                    className={`text-sm font-bold ${isDark ? "text-white" : "text-black"}`}
                >
                    {appName}
                </span>

                {/* Nav links as dropdown triggers */}
                <ul className="flex items-center gap-4 max-sm:hidden">
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} className="relative">
                            <button
                                className={`text-sm flex items-center gap-0.5 transition-opacity hover:opacity-70 ${isDark ? "text-white/80" : "text-black/80"}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleMenuClick(type);
                                }}
                            >
                                {name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-3 max-sm:hidden">
                {/* Control Center icon */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePanel("control-center");
                    }}
                    className={`p-1 rounded hover:bg-white/10 transition-colors ${isDark ? "text-white/80" : "text-black/70"}`}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="12" cy="12" r="3" />
                        <path d="M12 1v4m0 14v4M4.22 4.22l2.83 2.83m9.9 9.9l2.83 2.83M1 12h4m14 0h4M4.22 19.78l2.83-2.83m9.9-9.9l2.83-2.83" />
                    </svg>
                </button>

                {/* Wifi icon */}
                <Wifi
                    size={16}
                    className={isDark ? "text-white/80" : "text-black/70"}
                />

                {/* Search / Spotlight */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // Trigger spotlight
                        window.dispatchEvent(
                            new KeyboardEvent("keydown", {
                                key: " ",
                                code: "Space",
                                ctrlKey: true,
                                bubbles: true,
                            }),
                        );
                    }}
                    className={`p-1 rounded hover:bg-white/10 transition-colors ${isDark ? "text-white/80" : "text-black/70"}`}
                >
                    <Search size={14} />
                </button>

                {/* Date/Time → Notification Center */}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePanel("notification-center");
                    }}
                    className={`text-sm font-medium ${isDark ? "text-white/90" : "text-black/90"}`}
                >
                    {time}
                </button>
            </div>
        </nav>
    );
};

export default Navbar;