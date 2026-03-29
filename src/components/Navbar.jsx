import { useState } from "react";
import dayjs from "dayjs";
import { navIcons, navLinks, dockApps } from "#constants";
import useWindowStore from "#store/window";

const ControlCenter = ({ isOpen, setBrightness }) => {
    if(!isOpen) return null;
    return (
        <div className="absolute top-10 right-2 w-64 bg-white/60 dark:bg-black/60 backdrop-blur-3xl rounded-2xl shadow-xl border border-black/10 dark:border-white/10 p-4 z-[10000]">
            <div className="space-y-4">
                <div className="flex gap-2 text-black dark:text-white">
                    <div className="flex-1 bg-white/50 dark:bg-white/10 rounded-xl p-3 flex flex-col items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">WIFI</span>
                        </div>
                        <span className="font-semibold text-xs">Wi-Fi</span>
                    </div>
                    <div className="flex-1 bg-white/50 dark:bg-white/10 rounded-xl p-3 flex flex-col items-start gap-2">
                        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                            <span className="text-white text-[10px] font-bold">BT</span>
                        </div>
                        <span className="font-semibold text-xs">Bluetooth</span>
                    </div>
                </div>
                <div>
                   <span className="text-xs font-semibold px-1 text-black dark:text-white">Display Brightness</span>
                   <div className="mt-2 flex items-center">
                      <input 
                        type="range" 
                        min="30" max="100" 
                        defaultValue="100" 
                        className="w-full accent-blue-500" 
                        onChange={(e) => setBrightness(e.target.value)} 
                      />
                   </div>
                </div>
            </div>
        </div>
    )
}

const Navbar = () => {
    const { openWindow, activeWindow } = useWindowStore();
    const [ccOpen, setCcOpen] = useState(false);
    const [brightness, setBrightness] = useState(100);

    const activeAppName = (activeWindow && (dockApps.find(a => a.id === activeWindow)?.name || activeWindow)) || "AyaskantOS";

    return (
     <>
        <div 
          className="fixed inset-0 pointer-events-none z-[99999] transition-opacity duration-300" 
          style={{ backgroundColor: 'black', opacity: 1 - brightness / 100 }}
        ></div>
        <nav className="fixed top-0 w-full z-[9999] flex justify-between items-center bg-white/60 dark:bg-black/40 text-black dark:text-gray-100 backdrop-blur-2xl p-1 px-4 select-none border-b border-black/10 dark:border-white/10">
            <div className="flex items-center gap-4">
                <img src="/images/logo.svg" alt="Logo" className="w-4 hover:opacity-70 cursor-pointer dark:invert" />
                <p className="font-bold text-sm cursor-pointer hover:opacity-70">{activeAppName}</p>

                <ul className="flex items-center gap-4 ml-2">
                    {navLinks.map(({ id, name, type }) => (
                        <li key={id} onClick={() => openWindow(type)}>
                            <p className="text-sm font-medium cursor-pointer hover:opacity-70">{name}</p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex items-center gap-4">
                <ul className="flex items-center gap-3">
                    {navIcons.map(({ id, img }) => (
                        <li key={id} className="cursor-pointer hover:opacity-70" onClick={() => id === 4 ? setCcOpen(!ccOpen) : null}>
                            <img src={img} className="w-4 dark:invert" alt={`icon-${id}`} />
                        </li>
                    ))}
                </ul>
                <time className="text-sm font-medium">{dayjs().format('ddd MMM D h:mm A')}</time>
            </div>
            <ControlCenter isOpen={ccOpen} setBrightness={setBrightness} />
        </nav>
     </>
    );
}

export default Navbar;