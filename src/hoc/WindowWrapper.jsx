import { useRef, useEffect } from "react";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

const WindowWrapper = (Component, windowKey) => {
  const Wrapped = (props) => {
    const { focusWindow, windows, focusedWindow, maximizeWindow } = useWindowStore();
    const { isOpen, zIndex, isMinimized, isMaximized } = windows[windowKey];
    const ref = useRef(null);
    const prevMaximized = useRef(false);
    const savedMinimizePosition = useRef({ x: 0, y: 0 });
    const savedMaximizePosition = useRef({ x: 0, y: 0, width: null, height: null });

    useGSAP(
      () => {
        const el = ref.current;
        if (!el || !isOpen) return;

        if (isMinimized) {
          // Save position before minimizing so we know exactly where to restore it
          savedMinimizePosition.current.x = gsap.getProperty(el, "x");
          savedMinimizePosition.current.y = gsap.getProperty(el, "y");

          let targetX = window.innerWidth / 2;
          let targetY = window.innerHeight;
          const dockIcon = document.getElementById(`dock-${windowKey}`);

          if (dockIcon) {
            const dockRect = dockIcon.getBoundingClientRect();
            targetX = dockRect.left + dockRect.width / 2;
            targetY = dockRect.top + dockRect.height / 2;
          }

          const rect = el.getBoundingClientRect();
          const elCenterX = rect.left + rect.width / 2;
          const elCenterY = rect.top + rect.height / 2;

          // Genie minimize effect
          gsap.to(el, {
            scale: 0.1,
            opacity: 0,
            x: savedMinimizePosition.current.x + (targetX - elCenterX),
            y: savedMinimizePosition.current.y + (targetY - elCenterY),
            duration: 0.45,
            ease: "back.in(1)", // A slight pull-back before zooming down
            onComplete: () => {
              gsap.set(el, { visibility: "hidden" });
            }
          });
          return;
        }

        // Restore from minimize
        if (el._wasMinimized) {
          gsap.set(el, { visibility: "visible" });
          gsap.to(el, {
            scale: 1,
            x: savedMinimizePosition.current.x || 0,
            y: savedMinimizePosition.current.y || 0,
            opacity: 1,
            duration: 0.5,
            ease: "back.out(1)", // A slight pop-out past 100% scale
          });
          el._wasMinimized = false;
        }

        // Handle maximize toggle
        if (isMaximized && !prevMaximized.current) {
          // Save current position for unmaximize
          const transform = gsap.getProperty(el, "x");
          savedMaximizePosition.current.x = typeof transform === "number" ? transform : 0;
          savedMaximizePosition.current.y = gsap.getProperty(el, "y") || 0;

          gsap.to(el, {
            position: "fixed",
            top: 28,
            left: 0,
            width: "100vw",
            height: "calc(100vh - 104px)",
            x: 0,
            y: 0,
            borderRadius: 0,
            duration: 0.5,
            ease: "expo.inOut",
          });
          prevMaximized.current = true;
        } else if (!isMaximized && prevMaximized.current) {
          // Restore from maximize
          gsap.to(el, {
            position: "absolute",
            top: "",
            left: "",
            width: "",
            height: "",
            x: savedMaximizePosition.current.x,
            y: savedMaximizePosition.current.y,
            borderRadius: "0.75rem",
            duration: 0.5,
            ease: "expo.inOut",
          });
          prevMaximized.current = false;
        }

        // First open animation
        if (!el._hasOpened) {
          gsap.fromTo(
            el,
            { scale: 0.6, opacity: 0, y: 60 },
            { scale: 1, opacity: 1, y: 0, duration: 0.6, ease: "elastic.out(1, 0.75)" },
          );
          el._hasOpened = true;
        }

        // Initialize Draggable & Header Double Click
        const header = el.querySelector("#window-header") || el;
        
        const handleDoubleClick = (e) => {
          // Prevent double click on window controls from maximizing
          if (e.target.closest("#window-controls")) return;
          maximizeWindow(windowKey);
        };
        
        header.addEventListener("dblclick", handleDoubleClick);

        if (!isMaximized) {
          const draggables = Draggable.create(el, {
            trigger: header,
            bounds: {
              minX: -(el.offsetWidth - 100),
              maxX: window.innerWidth - 100,
              minY: 0,
              maxY: window.innerHeight - 80,
            },
            onPress: () => focusWindow(windowKey),
            zIndexBoost: false,
            dragClickables: false,
          });

          return () => {
            header.removeEventListener("dblclick", handleDoubleClick);
            draggables.forEach((d) => d.kill());
          };
        }

        return () => {
          header.removeEventListener("dblclick", handleDoubleClick);
        };
      },
      { dependencies: [isOpen, isMinimized, isMaximized], scope: ref },
    );

    // Track minimize state for restore
    useEffect(() => {
      if (ref.current && isMinimized) {
        ref.current._wasMinimized = true;
      }
    }, [isMinimized]);

    if (!isOpen) return null;

    const isFocused = focusedWindow === windowKey;

    return (
      <section
        id={windowKey}
        ref={ref}
        style={{
          zIndex,
          boxShadow: isFocused
            ? "0 20px 60px rgba(0,0,0,0.35), 0 0 0 0.5px rgba(0,0,0,0.1)"
            : "0 8px 30px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.06)",
          transition: "box-shadow 0.3s ease",
          pointerEvents: isMinimized ? "none" : "auto",
        }}
        className="absolute rounded-xl overflow-hidden"
        onMouseDown={() => focusWindow(windowKey)}
      >
        <Component {...props} />
      </section>
    );
  };

  Wrapped.displayName = `WindowWrapper(${Component.displayName || Component.name || "Component"})`;

  return Wrapped;
};

export default WindowWrapper;