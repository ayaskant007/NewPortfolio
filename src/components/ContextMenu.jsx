import { useEffect, useState } from "react";
import useWindowStore from "#store/window";

const ContextMenu = () => {
    const [menuState, setMenuState] = useState({ visible: false, x: 0, y: 0 });
    const { openWindow } = useWindowStore();

    useEffect(() => {
        const handleContextMenu = (e) => {
            // If they clicked on the dock or a window, maybe ignore, but globally is fine for portfolio
            e.preventDefault();
            
            // Keep menu within screen bounds
            let x = e.pageX;
            let y = e.pageY;
            
            if (x + 200 > window.innerWidth) x = window.innerWidth - 200;
            if (y + 150 > window.innerHeight) y = window.innerHeight - 150;

            setMenuState({
                visible: true,
                x,
                y
            });
        };

        const handleClick = () => {
            if (menuState.visible) {
                setMenuState({ ...menuState, visible: false });
            }
        };

        // Attach to main wrapper
        const mainEl = document.querySelector('main');
        if (mainEl) {
            mainEl.addEventListener("contextmenu", handleContextMenu);
        }
        document.addEventListener("click", handleClick);
        document.addEventListener("scroll", handleClick);

        return () => {
            if (mainEl) {
                mainEl.removeEventListener("contextmenu", handleContextMenu);
            }
            document.removeEventListener("click", handleClick);
            document.removeEventListener("scroll", handleClick);
        };
    }, [menuState.visible]);

    if (!menuState.visible) return null;

    return (
        <div 
            className="fixed z-[999999] bg-white/70 dark:bg-black/70 backdrop-blur-3xl border border-white/40 dark:border-white/10 rounded-lg shadow-2xl py-1 w-56 select-none text-sm text-black dark:text-white"
            style={{ left: menuState.x, top: menuState.y }}
            onContextMenu={(e) => e.preventDefault()}
        >
            <div className="px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer mx-1 rounded" onClick={() => openWindow('settings')}>
                System Settings...
            </div>
            <div className="px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer mx-1 rounded" onClick={() => {
                document.documentElement.classList.toggle('dark');
            }}>
                Toggle Appearance
            </div>
            <div className="h-[1px] bg-black/10 dark:bg-white/10 my-1 mx-2"></div>
            <div className="px-4 py-1.5 hover:bg-blue-500 hover:text-white cursor-pointer mx-1 rounded" onClick={() => openWindow('realterminal')}>
                New Terminal Window
            </div>
        </div>
    );
};

export default ContextMenu;
