import { useState, useEffect } from "react";
import useThemeStore from "#store/theme";
import dayjs from "dayjs";
import { Cloud, Sun, CloudRain } from "lucide-react";

const DesktopWidgets = () => {
    const isDark = useThemeStore((s) => s.isDark);
    const [time, setTime] = useState(dayjs());
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const interval = setInterval(() => setTime(dayjs()), 1000);
        return () => clearInterval(interval);
    }, []);

    // Fetch weather for New Delhi from Open-Meteo (free, no API key)
    useEffect(() => {
        fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=28.6139&longitude=77.209&current_weather=true&timezone=Asia/Kolkata",
        )
            .then((r) => r.json())
            .then((data) => {
                if (data.current_weather) {
                    setWeather({
                        temp: Math.round(data.current_weather.temperature),
                        code: data.current_weather.weathercode,
                    });
                }
            })
            .catch(() => {
                setWeather({ temp: 28, code: 0 });
            });
    }, []);

    const getWeatherIcon = (code) => {
        if (code >= 61) return <CloudRain size={28} />;
        if (code >= 2) return <Cloud size={28} />;
        return <Sun size={28} />;
    };

    const getWeatherText = (code) => {
        if (code >= 61) return "Rainy";
        if (code >= 45) return "Foggy";
        if (code >= 2) return "Cloudy";
        if (code >= 1) return "Partly Cloudy";
        return "Sunny";
    };

    const glassStyle = {
        background: isDark
            ? "rgba(30, 30, 30, 0.5)"
            : "rgba(255, 255, 255, 0.45)",
        backdropFilter: "blur(25px) saturate(150%)",
        WebkitBackdropFilter: "blur(25px) saturate(150%)",
        border: isDark
            ? "1px solid rgba(255,255,255,0.1)"
            : "1px solid rgba(255,255,255,0.5)",
        boxShadow: isDark
            ? "0 8px 32px rgba(0,0,0,0.3)"
            : "0 8px 32px rgba(0,0,0,0.1)",
    };

    return (
        <div className="fixed top-14 right-6 z-[1] flex flex-col gap-3 select-none max-sm:hidden">
            {/* Clock Widget */}
            <div className="rounded-2xl p-4 w-40" style={glassStyle}>
                <p
                    className={`text-3xl font-light tracking-tight text-center ${isDark ? "text-white" : "text-gray-800"}`}
                >
                    {time.format("h:mm")}
                </p>
                <p
                    className={`text-xs text-center mt-0.5 ${isDark ? "text-white/50" : "text-gray-500"}`}
                >
                    {time.format("A")}
                </p>
                <p
                    className={`text-[10px] text-center mt-1 ${isDark ? "text-white/30" : "text-gray-400"}`}
                >
                    {time.format("ddd, MMM D")}
                </p>
            </div>

            {/* Weather Widget */}
            {weather && (
                <div className="rounded-2xl p-4 w-40" style={glassStyle}>
                    <div className="flex items-center justify-between">
                        <div>
                            <p
                                className={`text-2xl font-light ${isDark ? "text-white" : "text-gray-800"}`}
                            >
                                {weather.temp}°
                            </p>
                            <p
                                className={`text-[10px] mt-0.5 ${isDark ? "text-white/50" : "text-gray-500"}`}
                            >
                                {getWeatherText(weather.code)}
                            </p>
                        </div>
                        <div className={isDark ? "text-white/60" : "text-yellow-500"}>
                            {getWeatherIcon(weather.code)}
                        </div>
                    </div>
                    <p
                        className={`text-[10px] mt-2 ${isDark ? "text-white/30" : "text-gray-400"}`}
                    >
                        New Delhi, India
                    </p>
                </div>
            )}

            {/* Calendar Mini Widget */}
            <div className="rounded-2xl p-3 w-40" style={glassStyle}>
                <p
                    className={`text-xs font-semibold text-center uppercase tracking-wider mb-2 ${isDark ? "text-red-400" : "text-red-600"}`}
                >
                    {time.format("MMMM")}
                </p>
                <p
                    className={`text-4xl font-light text-center ${isDark ? "text-white" : "text-gray-800"}`}
                >
                    {time.format("D")}
                </p>
                <p
                    className={`text-xs text-center mt-1 ${isDark ? "text-white/40" : "text-gray-500"}`}
                >
                    {time.format("dddd")}
                </p>
            </div>
        </div>
    );
};

export default DesktopWidgets;
