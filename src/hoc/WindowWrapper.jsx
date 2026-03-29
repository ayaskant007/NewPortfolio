import { useRef } from "react";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

/**
 * WindowWrapper HOC
 * Handles window lifecycle, Z-Index, Genie-minimize effect, and Draggable behavior.
 * 
 * UPGRADED: 
 * - Smooth Maximize animation.
 * - Synchronized Genie Warp.
 * - Softer Tahoe Glass borders.
 */
const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows, activeWindow } = useWindowStore();
    
    // Safety Fallback: Use a safe object if the key is missing to prevent destructuring errors
    const currentWindow = windows?.[windowKey] || { isOpen: false, isMinimized: false, isMaximized: false, zIndex: 0 };

    const { isOpen, isMinimized, isMaximized, zIndex } = currentWindow;
    const isActive = activeWindow === windowKey;
    
    const containerRef = useRef(null);
    const draggablesRef = useRef(null);
    const originalPos = useRef({ x: 0, y: 0, width: "", height: "" });
    const isFirstRun = useRef(true);

    // 1. Component Entrance & Draggable Setup
    useGSAP(() => {
        const el = containerRef.current;
        if (!el || !isOpen) return;

        if (isFirstRun.current) {
            gsap.fromTo(el, 
                { scale: 0.9, opacity: 0, y: 20 }, 
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
            isFirstRun.current = false;
        }

        try {
            const draggables = Draggable.create(el, {
                trigger: el.querySelector("#window-header") || el,
                bounds: "main",
                onPress: () => focusWindow(windowKey),
                zIndexBoost: false,
                onDragEnd: function() {
                    if (!isMaximized) {
                        originalPos.current.x = this.x;
                        originalPos.current.y = this.y;
                    }
                }
            });
            draggablesRef.current = draggables;
        } catch (err) {
            console.error(`Draggable failed for ${windowKey}:`, err);
        }

        return () => {
            if (draggablesRef.current) {
                draggablesRef.current.forEach(d => d.kill());
                draggablesRef.current = null;
            }
        };
    }, { dependencies: [isOpen], scope: containerRef });

    // 2. SMOOTH Maximize Logic
    useGSAP(() => {
        const el = containerRef.current;
        if (!el || !isOpen || isFirstRun.current) return;

        if (isMaximized) {
            // Store current size before maximizing
            originalPos.current.width = el.style.width;
            originalPos.current.height = el.style.height;

            gsap.to(el, {
                x: 0, y: 0, top: 32, left: 0,
                width: "100%", 
                height: "calc(100vh - 96px)",
                clipPath: "inset(0% 0% 0% 0% round 0px)", // Lose rounded corners when full screen
                duration: 0.5,
                ease: "expo.inOut",
                onStart: () => draggablesRef.current?.[0]?.disable()
            });
        } else {
            // Restore position
            gsap.to(el, {
                x: originalPos.current.x,
                y: originalPos.current.y,
                width: originalPos.current.width || "auto",
                height: originalPos.current.height || "auto",
                top: "auto", left: "auto",
                clipPath: "inset(0% 0% 0% 0% round 16px)", // Restore rounded corners
                duration: 0.5,
                ease: "expo.inOut",
                onComplete: () => draggablesRef.current?.[0]?.enable()
            });
        }
    }, { dependencies: [isMaximized], scope: containerRef });

    // 3. SYNCHRONIZED Genie Warp
    useGSAP(() => {
        const el = containerRef.current;
        if (!el || !isOpen || isFirstRun.current) return;

        const tl = gsap.timeline();

        if (isMinimized) {
            const dockIcon = document.getElementById(`dock-icon-${windowKey}`);
            let tX = window.innerWidth / 2;
            let tY = window.innerHeight;

            if (dockIcon) {
                const rect = dockIcon.getBoundingClientRect();
                tX = rect.left + rect.width / 2;
                tY = rect.top + rect.height / 2;
            }

            const elRect = el.getBoundingClientRect();
            const oX = elRect.left + elRect.width / 2;
            const oY = elRect.top + elRect.height / 2;

            tl.to(el, {
                x: `+=${tX - oX}`,
                y: `+=${tY - oY}`,
                scaleX: 0.1,
                scaleY: 0.3,
                opacity: 0,
                filter: "blur(5px)",
                clipPath: "inset(0% 45% 0% 45% round 100px)",
                duration: 0.6,
                ease: "power2.inOut",
            });
        } else {
            tl.to(el, {
                x: isMaximized ? 0 : originalPos.current.x,
                y: isMaximized ? 0 : originalPos.current.y,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                filter: "blur(0px)",
                clipPath: isMaximized ? "inset(0% 0% 0% 0% round 0px)" : "inset(0% 0% 0% 0% round 16px)",
                duration: 0.5,
                ease: "power3.out"
            });
        }
    }, { dependencies: [isMinimized], scope: containerRef });

    // 4. Focus Visuals
    useGSAP(() => {
        const el = containerRef.current;
        if (!el || !isOpen) return;

        gsap.to(el, {
            boxShadow: isActive 
                ? "0 20px 50px rgba(0,0,0,0.5), 0 0 1px rgba(255,255,255,0.1)" 
                : "0 10px 20px rgba(0,0,0,0.2)",
            duration: 0.3
        });
    }, { dependencies: [isActive], scope: containerRef });

    // Ensure state remains visible even if minimized (managed by invisibility)
    if (!windows?.[windowKey] || !isOpen) return null;

    return (
        <section
            id={windowKey}
            ref={containerRef}
            style={{ 
                zIndex,
                visibility: isMinimized ? 'hidden' : 'visible',
                pointerEvents: isMinimized ? 'none' : 'auto'
            }}
            className={`absolute border border-white/10 dark:border-white/5 shadow-2xl overflow-hidden
                bg-white/10 dark:bg-black/20 backdrop-blur-3xl saturate-150 ring-1 ring-inset ring-white/5
                ${isActive ? '' : 'brightness-90'}
            `}
            onMouseDown={() => focusWindow(windowKey)}
        >
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent z-0 opacity-20"></div>
            
            <div className="relative z-10 w-full h-full flex flex-col">
                <Component {...props} />
            </div>
        </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Window"})`;

  return Wrapped;
};

export default WindowWrapper;
