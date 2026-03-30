import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import useThemeStore from "#store/theme";
import { Calendar, Clock, Bell } from "lucide-react";
import dayjs from "dayjs";

const NotificationCenter = () => {
    const [isOpen, setIsOpen] = useState(false);
    const panelRef = useRef(null);
    const isDark = useThemeStore((s) => s.isDark);
    const [time, setTime] = useState(dayjs().format("h:mm A"));

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(dayjs().format("h:mm A"));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const handler = (e) => {
            if (e.detail === "notification-center") {
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
                { x: 320, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.35, ease: "power3.out" },
            );
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const today = dayjs();

    return (
        <>
            <div
                className="fixed inset-0 z-[2000]"
                onClick={() => setIsOpen(false)}
            />
            <div
                ref={panelRef}
                className="fixed top-9 right-0 bottom-20 z-[2001] w-80 overflow-y-auto"
                style={{
                    background: isDark
                        ? "rgba(30, 30, 30, 0.7)"
                        : "rgba(245, 245, 245, 0.7)",
                    backdropFilter: "blur(40px) saturate(180%)",
                    WebkitBackdropFilter: "blur(40px) saturate(180%)",
                    borderLeft: isDark
                        ? "1px solid rgba(255,255,255,0.08)"
                        : "1px solid rgba(0,0,0,0.08)",
                    boxShadow: "-10px 0 40px rgba(0,0,0,0.2)",
                }}
            >
                <div className="p-4 space-y-4">
                    {/* Welcome Notification */}
                    <div
                        className="rounded-xl p-4"
                        style={{
                            background: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(255,255,255,0.6)",
                            border: isDark
                                ? "1px solid rgba(255,255,255,0.08)"
                                : "1px solid rgba(0,0,0,0.06)",
                        }}
                    >
                        <div className="flex items-center gap-3 mb-2">
                            <Bell
                                size={14}
                                className={isDark ? "text-blue-400" : "text-blue-600"}
                            />
                            <span
                                className={`text-xs font-medium uppercase tracking-wider ${isDark ? "text-white/50" : "text-gray-500"}`}
                            >
                                Welcome
                            </span>
                        </div>
                        <p
                            className={`text-sm ${isDark ? "text-white" : "text-gray-800"}`}
                        >
                            Hey Ayaskant! 👋 Ready to explore?
                        </p>
                        <p
                            className={`text-xs mt-1 ${isDark ? "text-white/40" : "text-gray-500"}`}
                        >
                            Browse projects, check out the terminal, or open settings.
                        </p>
                    </div>

                    {/* Clock Widget */}
                    <div
                        className="rounded-xl p-4 text-center"
                        style={{
                            background: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(255,255,255,0.6)",
                            border: isDark
                                ? "1px solid rgba(255,255,255,0.08)"
                                : "1px solid rgba(0,0,0,0.06)",
                        }}
                    >
                        <Clock
                            size={20}
                            className={`mx-auto mb-2 ${isDark ? "text-white/60" : "text-gray-400"}`}
                        />
                        <p
                            className={`text-3xl font-light tracking-tight ${isDark ? "text-white" : "text-gray-800"}`}
                        >
                            {time}
                        </p>
                        <p
                            className={`text-xs mt-1 ${isDark ? "text-white/40" : "text-gray-500"}`}
                        >
                            {today.format("dddd, MMMM D")}
                        </p>
                    </div>

                    {/* Calendar Mini Widget */}
                    <div
                        className="rounded-xl p-4"
                        style={{
                            background: isDark
                                ? "rgba(255,255,255,0.06)"
                                : "rgba(255,255,255,0.6)",
                            border: isDark
                                ? "1px solid rgba(255,255,255,0.08)"
                                : "1px solid rgba(0,0,0,0.06)",
                        }}
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Calendar
                                size={14}
                                className={isDark ? "text-red-400" : "text-red-600"}
                            />
                            <span
                                className={`text-xs font-semibold uppercase tracking-wider ${isDark ? "text-white/50" : "text-gray-500"}`}
                            >
                                {today.format("MMMM YYYY")}
                            </span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center">
                            {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                                <div
                                    key={i}
                                    className={`text-[10px] font-medium ${isDark ? "text-white/40" : "text-gray-400"}`}
                                >
                                    {d}
                                </div>
                            ))}
                            {Array.from(
                                { length: today.startOf("month").day() },
                                (_, i) => (
                                    <div key={`empty-${i}`} />
                                ),
                            )}
                            {Array.from({ length: today.daysInMonth() }, (_, i) => {
                                const day = i + 1;
                                const isToday = day === today.date();
                                return (
                                    <div
                                        key={day}
                                        className={`text-xs py-1 rounded-full ${isToday
                                                ? "bg-red-500 text-white font-bold"
                                                : isDark
                                                    ? "text-white/70"
                                                    : "text-gray-700"
                                            }`}
                                    >
                                        {day}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotificationCenter;
