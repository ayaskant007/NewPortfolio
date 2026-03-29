import { useRef } from "react";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

/**
 * WindowWrapper HOC
 * Handles window lifecycle, Z-Index, Genie-minimize effect, and Draggable behavior.
 * 
 * IMPORTANT: All hooks (useWindowStore, useRef, useGSAP) must be called 
 * unconditionally at the top level to avoid React Hook Violations.
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
        // Even if we return early, the hook has been called!
        if (!el || !isOpen) return;

        // Perform entrance animation only on first mount when open
        if (isFirstRun.current) {
            gsap.fromTo(el, 
                { scale: 0.9, opacity: 0, y: 20 }, 
                { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
            );
            isFirstRun.current = false;
        }

        // Initialize GSAP Draggable
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

    // 2. Maximize Logic
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
                duration: 0.4,
                ease: "power3.inOut",
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
                duration: 0.4,
                ease: "power3.inOut",
                onComplete: () => draggablesRef.current?.[0]?.enable()
            });
        }
    }, { dependencies: [isMaximized], scope: containerRef });

    // 3. Advanced Genie Minimize Effect (Squish & Warp)
    useGSAP(() => {
        const el = containerRef.current;
        if (!el || !isOpen || isFirstRun.current) return;

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

            const tl = gsap.timeline();
            
            tl.to(el, {
                x: `+=${tX - oX}`,
                y: `+=${tY - oY}`,
                scaleX: 0.1,
                scaleY: 0.3,
                opacity: 0,
                filter: "blur(10px) brightness(1.5)",
                clipPath: "inset(0% 45% 0% 45% round 100px)", // Warp into a pill-like shape
                duration: 0.65,
                ease: "power2.inOut",
            });
        } else {
            // Restore from minimized
            gsap.to(el, {
                x: isMaximized ? 0 : originalPos.current.x,
                y: isMaximized ? 0 : originalPos.current.y,
                scaleX: 1,
                scaleY: 1,
                opacity: 1,
                filter: "blur(0px) brightness(1)",
                clipPath: "inset(0% 0% 0% 0% round 16px)", // Smooth restore to rounded rect
                duration: 0.5,
                ease: "power3.out"
            });
        }
    }, { dependencies: [isMinimized], scope: containerRef });

    // 4. Focus Visuals (Managing shadows/filter via GSAP to avoid CSS transition conflicts)
    useGSAP(() => {
        const el = containerRef.current;
        if (!el || !isOpen) return;

        gsap.to(el, {
            boxShadow: isActive 
                ? "0 20px 40px rgba(0,0,0,0.4), 0 0 1px rgba(255,255,255,0.2)" 
                : "0 10px 20px rgba(0,0,0,0.1)",
            filter: isActive ? "brightness(1)" : "brightness(0.95)",
            duration: 0.3
        });
    }, { dependencies: [isActive], scope: containerRef });

    // Conditional render must ONLY happen at the very end to avoid hook violations.
    if (!windows?.[windowKey] || !isOpen) return null;

    // Advanced "Tahoe" Glass & Distortion Container
    return (
        <section
            id={windowKey}
            ref={containerRef}
            style={{ 
                zIndex,
                visibility: isMinimized ? 'hidden' : 'visible',
                pointerEvents: isMinimized ? 'none' : 'auto'
            }}
            className={`absolute rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden
                bg-white/15 dark:bg-black/25 backdrop-blur-3xl saturate-150 ring-1 ring-inset ring-white/10
                ${isActive ? 'drop-shadow-2xl' : 'brightness-95 contrast-105'}
            `}
            onMouseDown={() => focusWindow(windowKey)}
        >
            {/* Liquid Reflection Overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent z-0 opacity-30"></div>
            
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
