import React, { useState, useEffect } from "react";
import WindowControls from "#components/WindowControls";
import WindowWrapper from "#hoc/WindowWrapper";

const Settings = () => {
    // Attempt to track dark mode state directly from document
    const [isDark, setIsDark] = useState(false);

    useEffect(() => {
        const checkDark = () => setIsDark(document.documentElement.classList.contains('dark'));
        checkDark();
        
        // Setup observer to watch for class changes on HTML
        const observer = new MutationObserver(checkDark);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
        return () => observer.disconnect();
    }, []);

    const toggleDark = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
        } else {
            document.documentElement.classList.add('dark');
        }
    };

    return (
        <div className="w-full h-full bg-white/5 dark:bg-black/10 text-black dark:text-white flex flex-col relative select-none min-w-[600px] min-h-[400px]">
            <div id="window-header" className="flex items-center justify-between px-4 py-3 bg-white/40 dark:bg-black/30 backdrop-blur-md border-b border-black/10 dark:border-white/10 shrink-0">
                <div className="flex-1"></div>
                <span className="font-semibold absolute left-1/2 -translate-x-1/2">System Settings</span>
                <WindowControls target="settings" />
            </div>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <div className="w-1/3 border-r border-black/10 dark:border-white/10 bg-white/30 dark:bg-black/20 p-2 overflow-y-auto">
                    <div className="px-3 py-1.5 bg-black/10 dark:bg-white/10 rounded-md cursor-pointer text-sm font-medium mb-1">
                        Appearance
                    </div>
                    <div className="px-3 py-1.5 hover:bg-black/5 dark:hover:bg-white/5 rounded-md cursor-pointer text-sm font-medium">
                        Wallpaper
                    </div>
                </div>

                {/* Main Content */}
                <div className="w-2/3 p-6 space-y-6">
                    <div>
                        <h2 className="text-xl font-bold mb-4">Appearance</h2>
                        <div className="flex items-center justify-between p-4 bg-white/60 dark:bg-black/40 rounded-xl border border-black/5 dark:border-white/5">
                            <div>
                                <h3 className="font-medium">Dark Mode</h3>
                                <p className="text-xs opacity-70">Adjust system appearance</p>
                            </div>
                            <button 
                                onClick={toggleDark}
                                className={`w-12 h-6 rounded-full p-1 transition-colors duration-200 relative ${isDark ? 'bg-green-500' : 'bg-gray-300'}`}
                            >
                                <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${isDark ? 'translate-x-6' : 'translate-x-0'}`} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WindowWrapper(Settings, "settings");
