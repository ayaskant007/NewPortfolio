import { useRef } from "react";
import { Tooltip } from "react-tooltip";
import gsap from "gsap";

import { dockApps } from "#constants/index.js";
import { useGSAP } from "@gsap/react";
import useWindowStore from "#store/window.js";
import useLocationStore from "#store/location.js";
import { locations } from "#constants";
import useThemeStore from "#store/theme";

const Dock = () => {
  const { openWindow, closeWindow, restoreWindow, windows } = useWindowStore();
  const { setActiveLocation } = useLocationStore();
  const isDark = useThemeStore((s) => s.isDark);
  const dockRef = useRef(null);

  useGSAP(() => {
    const dock = dockRef.current;
    if (!dock) return;

    const icons = dock.querySelectorAll(".dock-icon");

    const animateIcons = (mouseX) => {
      const { left } = dock.getBoundingClientRect();

      icons.forEach((icon) => {
        const { left: iconLeft, width } = icon.getBoundingClientRect();
        const center = iconLeft - left + width / 2;
        const distance = Math.abs(mouseX - center);

        const intensity = Math.exp(-(distance ** 2.5) / 20000);

        gsap.to(icon, {
          scale: 1 + 0.25 * intensity,
          y: -15 * intensity,
          duration: 0.2,
          ease: "power1.out",
        });
      });
    };

    const handleMouseMove = (e) => {
      const { left } = dock.getBoundingClientRect();
      animateIcons(e.clientX - left);
    };

    const resetIcons = () =>
      icons.forEach((icon) =>
        gsap.to(icon, {
          scale: 1,
          y: 0,
          duration: 0.3,
          ease: "power1.out",
        }),
      );

    dock.addEventListener("mousemove", handleMouseMove);
    dock.addEventListener("mouseleave", resetIcons);

    return () => {
      dock.removeEventListener("mousemove", handleMouseMove);
      dock.removeEventListener("mouseleave", resetIcons);
    };
  }, []);

  const toggleApp = (app) => {
    if (!app.canOpen) return;

    // Bounce animation on click
    const iconEl = document.getElementById(`dock-${app.id}`);
    if (iconEl) {
      gsap.fromTo(
        iconEl,
        { y: 0 },
        { y: -25, ease: "power2.out", yoyo: true, repeat: 1, duration: 0.25 }
      );
    }

    // Special handling for trash → open finder at trash location
    if (app.id === "trash") {
      setActiveLocation(locations.trash);
      if (!windows.finder.isOpen) {
        openWindow("finder");
      } else {
        // Already open, just focus
        useWindowStore.getState().focusWindow("finder");
        restoreWindow("finder");
      }
      return;
    }

    const win = windows[app.id];

    if (!win) {
      console.error("Window config not found for", app.id);
      return;
    }

    if (win.isMinimized) {
      restoreWindow(app.id);
    } else if (win.isOpen) {
      closeWindow(app.id);
    } else {
      openWindow(app.id);
    }
  };

  return (
    <section id="dock">
      <div
        ref={dockRef}
        className="dock-container"
        style={{
          background: isDark
            ? "rgba(30, 30, 30, 0.45)"
            : "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(25px) saturate(180%)",
          WebkitBackdropFilter: "blur(25px) saturate(180%)",
          border: isDark
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(255,255,255,0.4)",
          boxShadow: isDark
            ? "0 10px 40px rgba(0,0,0,0.4)"
            : "0 10px 40px rgba(0,0,0,0.15)",
        }}
      >
        {dockApps.map(({ id, name, icon, canOpen }, index) => {
          const win = windows[id];
          const isOpen = win?.isOpen && !win?.isMinimized;

          return (
            <div key={id} className="relative flex flex-col items-center">
              {/* Separator before trash */}
              {id === "trash" && (
                <div
                  className={`absolute -left-1.5 top-1 bottom-1 w-px ${isDark ? "bg-white/15" : "bg-black/15"}`}
                />
              )}
              <button
                type="button"
                id={`dock-${id}`}
                className="dock-icon"
                aria-label={name}
                data-tooltip-id="dock-tooltip"
                data-tooltip-content={name}
                data-tooltip-delay-show={150}
                onClick={() => toggleApp({ id, canOpen })}
              >
                <img
                  src={`/images/${icon}`}
                  alt={name}
                  loading="lazy"
                  className={canOpen ? "" : "opacity-60"}
                />
              </button>
              {/* Open indicator dot */}
              {isOpen && (
                <div
                  className={`w-1 h-1 rounded-full mt-0.5 ${isDark ? "bg-white/60" : "bg-black/40"}`}
                />
              )}
            </div>
          );
        })}

        <Tooltip id="dock-tooltip" place="top" className="tooltip" />
      </div>
    </section>
  );
};

export default Dock;
