import { locations } from "#constants"
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import { useGSAP } from "@gsap/react";
import clsx from "clsx";
import { Draggable } from "gsap/Draggable";

const projects = locations.work?.children ?? [];

const Home = () => {
    const { setActiveLocation } = useLocationStore();
    const { openWindow, focusWindow } = useWindowStore();

    const handleOpenProjectFinder = (project, e) => {
        // Only open finder if we didn't drag it
        if (!e.defaultPrevented) {
          setActiveLocation(project);
          openWindow("finder");
          focusWindow("finder");
        }
    }

    useGSAP(() => {
        Draggable.create(".folder", {
          bounds: "#home",
          inertia: true,
          onClick: function() {
            // GSAP Draggable onClick handler
            // The actual click handler is on the element itself
          }
        });
    }, [])

  return (
    <section id="home" className="absolute inset-0 z-0 pointer-events-none">
        <ul>
            {projects.map((project) => (
                <li key={project.id} 
                className={clsx("group folder absolute cursor-pointer pointer-events-auto", project.windowPosition)}
                onClick={(e) => handleOpenProjectFinder(project, e)}>
                    <img src="/images/folder.png" alt={project.name} className="w-16 h-16"/>
                    <p className="mt-1 shadow-sm">{project.name}</p>
                </li>
            ))}
        </ul>
    </section>
  )
}

export default Home