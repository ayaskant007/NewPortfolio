import gsap from "gsap";
import { Draggable } from "gsap/Draggable";

import { Navbar, Welcome, Dock, Home } from "#components";
import {
  Terminal,
  Safari,
  Resume,
  Finder,
  Text,
  Image,
  Contact,
  Photos,
  Notes,
  Settings,
} from "#windows";
import BootScreen from "#components/BootScreen";
import HelloScreen from "#components/HelloScreen";
import ControlCenter from "#components/ControlCenter";
import NotificationCenter from "#components/NotificationCenter";
import ContextMenu from "#components/ContextMenu";
import Spotlight from "#components/Spotlight";
import DesktopWidgets from "#components/DesktopWidgets";
import useThemeStore from "#store/theme";

gsap.registerPlugin(Draggable);

const App = () => {
  const bootPhase = useThemeStore((s) => s.bootPhase);
  const isDark = useThemeStore((s) => s.isDark);
  const wallpaper = useThemeStore((s) => s.wallpaper);
  const brightness = useThemeStore((s) => s.brightness);

  return (
    <main
      className={isDark ? "dark" : ""}
      style={{
        backgroundImage: `url(${wallpaper})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Brightness overlay */}
      {brightness < 100 && (
        <div
          className="fixed inset-0 bg-black pointer-events-none"
          style={{
            zIndex: 9990,
            opacity: (100 - brightness) / 100,
          }}
        />
      )}

      {/* Boot sequence */}
      {bootPhase === "booting" && <BootScreen />}
      {bootPhase === "hello" && <HelloScreen />}

      {/* Desktop - always rendered but hidden during boot */}
      <div
        style={{
          visibility: bootPhase === "desktop" ? "visible" : "hidden",
          opacity: bootPhase === "desktop" ? 1 : 0,
        }}
      >
        <Navbar />
        <Welcome />
        <DesktopWidgets />
        <Dock />

        <Terminal />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
        <Photos />
        <Notes />
        <Settings />

        <Home />

        <ControlCenter />
        <NotificationCenter />
        <ContextMenu />
        <Spotlight />
      </div>
    </main>
  );
};

export default App;