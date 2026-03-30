import { useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useThemeStore from "#store/theme";
import { wallpapers } from "#constants";
import { Sun, Moon, Monitor, Paintbrush } from "lucide-react";

const Settings = () => {
    const { isDark, setDark, wallpaper, setWallpaper } = useThemeStore();
    const [activeTab, setActiveTab] = useState("appearance");

    const tabs = [
        { id: "appearance", label: "Appearance", icon: Paintbrush },
        { id: "wallpaper", label: "Wallpaper", icon: Monitor },
    ];

    return (
        <div className="flex h-full min-h-[380px]">
            {/* Sidebar */}
            <div
                className="w-52 flex-shrink-0 flex flex-col border-r rounded-bl-xl"
                style={{
                    background: isDark
                        ? "rgba(35, 35, 35, 0.95)"
                        : "rgba(245, 245, 245, 0.95)",
                    borderColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.08)",
                }}
            >
                <div
                    id="window-header"
                    className="px-3 py-2 flex items-center gap-2"
                    style={{
                        background: isDark
                            ? "rgba(40, 40, 40, 0.95)"
                            : "rgba(246, 246, 246, 0.95)",
                        borderBottom: isDark
                            ? "1px solid rgba(255,255,255,0.06)"
                            : "1px solid rgba(0,0,0,0.08)",
                    }}
                >
                    <WindowControls target="settings" />
                    <span
                        className={`text-sm font-semibold ml-2 ${isDark ? "text-white/60" : "text-gray-500"}`}
                    >
                        Settings
                    </span>
                </div>

                <div className="p-2 space-y-0.5">
                    {tabs.map(({ id, label, icon: Icon }) => (
                        <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${activeTab === id
                                    ? isDark
                                        ? "bg-blue-500/30 text-white"
                                        : "bg-blue-100 text-blue-800"
                                    : isDark
                                        ? "text-white/70 hover:bg-white/5"
                                        : "text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <Icon size={16} />
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div
                className="flex-1 overflow-y-auto p-6 rounded-br-xl"
                style={{
                    background: isDark ? "rgba(30, 30, 30, 0.95)" : "#fff",
                }}
            >
                {activeTab === "appearance" && (
                    <div>
                        <h2
                            className={`text-lg font-semibold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                            Appearance
                        </h2>

                        <div className="flex gap-4">
                            {/* Light */}
                            <button
                                onClick={() => setDark(false)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${!isDark
                                        ? "border-blue-500 bg-blue-50"
                                        : isDark
                                            ? "border-white/10 bg-white/5 hover:bg-white/10"
                                            : "border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                <div className="w-16 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                                    <Sun size={20} className="text-yellow-500" />
                                </div>
                                <span
                                    className={`text-xs font-medium ${isDark ? "text-white" : "text-gray-700"}`}
                                >
                                    Light
                                </span>
                            </button>

                            {/* Dark */}
                            <button
                                onClick={() => setDark(true)}
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${isDark
                                        ? "border-blue-500 bg-blue-500/10"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                <div className="w-16 h-12 rounded-lg bg-gray-900 border border-gray-700 flex items-center justify-center">
                                    <Moon size={20} className="text-blue-400" />
                                </div>
                                <span
                                    className={`text-xs font-medium ${isDark ? "text-white" : "text-gray-700"}`}
                                >
                                    Dark
                                </span>
                            </button>

                            {/* Auto */}
                            <button
                                className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${isDark
                                        ? "border-white/10 bg-white/5 hover:bg-white/10"
                                        : "border-gray-200 hover:bg-gray-50"
                                    }`}
                            >
                                <div className="w-16 h-12 rounded-lg bg-gradient-to-r from-white to-gray-900 border border-gray-300 flex items-center justify-center">
                                    <Monitor size={20} className="text-gray-500" />
                                </div>
                                <span
                                    className={`text-xs font-medium ${isDark ? "text-white" : "text-gray-700"}`}
                                >
                                    Auto
                                </span>
                            </button>
                        </div>
                    </div>
                )}

                {activeTab === "wallpaper" && (
                    <div>
                        <h2
                            className={`text-lg font-semibold mb-6 ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                            Wallpaper
                        </h2>

                        <div className="grid grid-cols-2 gap-3">
                            {wallpapers.map((wp) => (
                                <button
                                    key={wp.id}
                                    onClick={() => setWallpaper(wp.path)}
                                    className={`relative rounded-xl overflow-hidden border-2 transition-all aspect-video ${wallpaper === wp.path
                                            ? "border-blue-500 ring-2 ring-blue-500/30"
                                            : isDark
                                                ? "border-white/10 hover:border-white/30"
                                                : "border-gray-200 hover:border-gray-400"
                                        }`}
                                >
                                    <img
                                        src={wp.path}
                                        alt={wp.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = "none";
                                            e.target.nextSibling.style.display = "flex";
                                        }}
                                    />
                                    <div
                                        className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 items-center justify-center text-white text-sm hidden"
                                        style={{ display: "none" }}
                                    >
                                        {wp.name}
                                    </div>
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                                        <p className="text-xs text-white font-medium">{wp.name}</p>
                                    </div>
                                    {wallpaper === wp.path && (
                                        <div className="absolute top-1.5 right-1.5 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                                            <svg
                                                width="12"
                                                height="12"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                stroke="white"
                                                strokeWidth="3"
                                            >
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const SettingsWindow = WindowWrapper(Settings, "settings");

export default SettingsWindow;
