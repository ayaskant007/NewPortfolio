import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { Navbar, Welcome, Dock, Desktop, Spotlight, ContextMenu } from "#components"
import { Terminal, RealTerminal, Settings, Safari, Resume, Finder, Text, Image, Contact } from "#windows";

gsap.registerPlugin(Draggable);

const App = () => {
  return (
      <main>
        <Navbar />
        <Desktop />
        <Welcome />
        <ContextMenu />
        <Spotlight />
        <Dock />

        <Terminal />
        <RealTerminal />
        <Settings />
        <Safari />
        <Resume />
        <Finder />
        <Text />
        <Image />
        <Contact />
      </main>
  )
}

export default App