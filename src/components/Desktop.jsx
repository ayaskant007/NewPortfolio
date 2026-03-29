import { locations } from "#constants";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import { useRef } from "react";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";

const Desktop = () => {
  const containerRef = useRef(null);
  const { openWindow, focusWindow } = useWindowStore();
  const { setActiveLocation } = useLocationStore();

  const handleDoubleClick = (item) => {
    setActiveLocation(item);
    openWindow("finder");
    focusWindow("finder");
  };

  useGSAP(() => {
    if (!containerRef.current) return;
    
    const draggables = Draggable.create(".desktop-icon", {
      type: "x,y",
      bounds: containerRef.current,
      zIndexBoost: false,
    });

    return () => {
      draggables.forEach((d) => d.kill());
    };
  }, { scope: containerRef });

  return (
    <section id="home" className="absolute inset-0 w-full h-full pt-16 z-0" ref={containerRef}>
      <ul className="w-full h-full relative">
        {locations.work.children.map((project) => (
          <li
            key={project.id}
            className={`desktop-icon group cursor-pointer ${project.windowPosition}`}
            onDoubleClick={() => handleDoubleClick(project)}
            onTouchEnd={() => handleDoubleClick(project)}
          >
            <img src={project.icon} alt={project.name} className="w-16 h-16 mx-auto object-contain drop-shadow-lg" />
            <p className="mt-1 font-medium">{project.name}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Desktop;
