import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import useThemeStore from "#store/theme";
import { Wifi, Bluetooth, Send, Sun, Moon, Volume2, Monitor } from "lucide-react";

const ControlCenter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef(null);
    const { isDark, toggleDark, brightness, setBrightness } = useThemeStore();
    const [wifiOn, setWifiOn] = useState(true);
    const [bluetoothOn, setBluetoothOn] = useState(false);
    const [airdropOn, setAirdropOn] = useState(false);
    const [volume, setVolume] = useState(75);

    useEffect(() => {
        const handler = (e) => {
            if (e.detail === "control-center") {
                setIsOpen((p) => !p);
            }
        };
        window.addEventListener("toggle-panel", handler);
        return () => window.removeEventListener("toggle-panel", handler);
    }, []);

    useEffect(() => {
        if (isOpen && panelRef.current) {
            gsap.fromTo(
                panelRef.current,
                { opacity: 0, y: -10, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, duration: 0.25, ease: "power3.out" },
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const PillToggle = ({ label, icon: Icon, isOn, onToggle }) => (
        <button
            onClick={onToggle}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-medium transition-all duration-200 ${isOn
                    ? "bg-blue-500 text-white shadow-lg shadow-blue-500/30"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
        >
            <Icon size={14} />
            {label}
        </button>
    );

    return (
        <>
            <div
                className="fixed inset-0 z-[2000]"
                onClick={() => setIsOpen(false)}
            />
            <div
                ref={panelRef}
                className="fixed top-9 right-4 z-[2001] w-80 rounded-2xl overflow-hidden"
                style={{
                    background: isDark
                        ? "rgba(30, 30, 30, 0.85)"
                        : "rgba(255, 255, 255, 0.75)",
                    backdropFilter: "blur(40px) saturate(180%)",
                    WebkitBackdropFilter: "blur(40px) saturate(180%)",
                    border: isDark
                        ? "1px solid rgba(255,255,255,0.1)"
                        : "1px solid rgba(255,255,255,0.6)",
                    boxShadow: "0 25px 50px rgba(0,0,0,0.3)",
                }}
            >
                <div className="p-4 space-y-4">
                    {/* Connection Toggles */}
                    <div
                        className="rounded-xl p-3"
                        style={{
                            background: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(0,0,0,0.04)",
                        }}
                    >
                        <div className="flex flex-wrap gap-2">
                            <PillToggle
                                label="Wi-Fi"
                                icon={Wifi}
                                isOn={wifiOn}
                                onToggle={() => setWifiOn(!wifiOn)}
                            />
                            <PillToggle
                                label="Bluetooth"
                                icon={Bluetooth}
                                isOn={bluetoothOn}
                                onToggle={() => setBluetoothOn(!bluetoothOn)}
                            />
                            <PillToggle
                                label="AirDrop"
                                icon={Send}
                                isOn={airdropOn}
                                onToggle={() => setAirdropOn(!airdropOn)}
                            />
                        </div>
                    </div>

                    {/* Dark Mode Toggle */}
                    <div
                        className="rounded-xl p-3 flex items-center justify-between"
                        style={{
                            background: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(0,0,0,0.04)",
                        }}
                    >
                        <div className="flex items-center gap-3">
                            {isDark ? (
                                <Moon size={16} className={isDark ? "text-white" : "text-gray-700"} />
                            ) : (
                                <Sun size={16} className="text-gray-700" />
                            )}
                            <span
                                className={`text-sm font-medium ${isDark ? "text-white" : "text-gray-700"}`}
                            >
                                {isDark ? "Dark Mode" : "Light Mode"}
                            </span>
                        </div>
                        <button
                            onClick={toggleDark}
                            className={`w-11 h-6 rounded-full transition-all duration-300 relative ${isDark ? "bg-blue-500" : "bg-gray-300"
                                }`}
                        >
                            <div
                                className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 ${isDark ? "translate-x-5.5" : "translate-x-0.5"
                                    }`}
                            />
                        </button>
                    </div>

                    {/* Brightness Slider */}
                    <div
                        className="rounded-xl p-3"
                        style={{
                            background: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(0,0,0,0.04)",
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <Monitor
                                size={16}
                                className={isDark ? "text-white/70" : "text-gray-500"}
                            />
                            <span
                                className={`text-xs font-medium ${isDark ? "text-white/70" : "text-gray-500"}`}
                            >
                                Display
                            </span>
                        </div>
                        <input
                            type="range"
                            min="20"
                            max="100"
                            value={brightness}
                            onChange={(e) => setBrightness(Number(e.target.value))}
                            className="w-full mt-2 accent-yellow-400 h-1.5 rounded-full appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, ${isDark ? "#fbbf24" : "#f59e0b"} 0%, ${isDark ? "#fbbf24" : "#f59e0b"} ${((brightness - 20) / 80) * 100}%, ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} ${((brightness - 20) / 80) * 100}%, ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 100%)`,
                            }}
                        />
                    </div>

                    {/* Sound Slider */}
                    <div
                        className="rounded-xl p-3"
                        style={{
                            background: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(0,0,0,0.04)",
                        }}
                    >
                        <div className="flex items-center gap-3">
                            <Volume2
                                size={16}
                                className={isDark ? "text-white/70" : "text-gray-500"}
                            />
                            <span
                                className={`text-xs font-medium ${isDark ? "text-white/70" : "text-gray-500"}`}
                            >
                                Sound
                            </span>
                        </div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={(e) => setVolume(Number(e.target.value))}
                            className="w-full mt-2 accent-white h-1.5 rounded-full appearance-none cursor-pointer"
                            style={{
                                background: `linear-gradient(to right, ${isDark ? "#fff" : "#374151"} 0%, ${isDark ? "#fff" : "#374151"} ${volume}%, ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} ${volume}%, ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} 100%)`,
                            }}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default ControlCenter;
