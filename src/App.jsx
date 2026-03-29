import { useState } from "react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Navbar, Welcome, Dock, Desktop, Spotlight, ContextMenu, BootLoading } from "#components"
import { Terminal, RealTerminal, Settings, Safari, Resume, Finder, Text, Image, Contact, Journals } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  const [isBooting, setIsBooting] = useState(true);

  if (isBooting) {
    return <BootLoading onComplete={() => setIsBooting(false)} />;
  }

  return (
      <main className="relative w-full h-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: 'url(/images/wallpaper.png)' }}>
        <Navbar />
        <Desktop />
        <Welcome />
        <ContextMenu />
        <Spotlight />
        <Dock />

        {/* System Windows */}
        <Terminal />
        <RealTerminal />
        <Settings />
        <Safari />
        <Journals />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
      </main>
  )
}

export default App