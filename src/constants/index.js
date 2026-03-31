// ── Ayaskant Sahoo's Personal Portfolio Data ──
// All data sourced from old_portfolio

const navLinks = [
  { id: 1, name: "Projects", type: "finder" },
  { id: 2, name: "Contact", type: "contact" },
  { id: 3, name: "Resume", type: "resume" },
];

const navIcons = [
  { id: 1, img: "/icons/wifi.svg" },
  { id: 2, img: "/icons/search.svg" },
  { id: 3, img: "/icons/user.svg" },
  { id: 4, img: "/icons/mode.svg" },
];

const dockApps = [
  { id: "finder", name: "Finder", icon: "finder.png", canOpen: true },
  { id: "safari", name: "Safari", icon: "safari.png", canOpen: true },
  { id: "notes", name: "Notes", icon: "notes.png", canOpen: true },
  { id: "photos", name: "Gallery", icon: "photos.png", canOpen: true },
  { id: "contact", name: "Contact", icon: "contact.png", canOpen: true },
  { id: "terminal", name: "Terminal", icon: "terminal.png", canOpen: true },
  { id: "settings", name: "Settings", icon: "settings.png", canOpen: true },
  { id: "trash", name: "Trash", icon: "trash.png", canOpen: true },
];

const blogPosts = [
  {
    id: 1,
    date: "Mar 15, 2026",
    title: "Building Parano!a: A Deep Dive into Unity Horror Game Development",
    content:
      "Parano!a is a psychological thriller game I built with Unity and C#. The game features 3 intense levels designed to evoke fear and uncertainty. Key challenges included implementing dynamic lighting for atmosphere, creating an AI-driven enemy patrol system. The major challenge was how to host the entire project on Github, since the project size exceeded the limits. I overcame this by using Git LFS to manage large files and optimizing assets to reduce overall size. The result is a gripping horror experience that you can play for free on itch.io! Created for Daydream Delhi 2025 & Daydream Global 2025 (Ranked #150 Globablly)",
    link: "https://github.com/foglomon/Paranoia",
  },
  {
    id: 2,
    date: "Feb 28, 2026",
    title: "GSAP 3 Animations: How I Built the Vikas Bhi, Virasat Bhi Website",
    content:
      "For CRYPTICON 2025, I built a fully responsive website powered by GSAP 3. The site features scroll-triggered animations, parallax effects, and smooth page transitions. I used vanilla HTML, CSS, and JavaScript to keep things lightweight while maximizing performance. The GSAP ScrollTrigger plugin was essential for creating the immersive scrolling experience.",
    link: "https://vikasvirasat.netlify.app/",
  },
  {
    id: 3,
    date: "Jan 10, 2026",
    title: "The Last Ember: Creating a Narrative Game with Ren'Py",
    content:
      "The Last Ember is a narrative-driven visual novel built using Ren'Py and Python. The game explores themes of survival and sacrifice through branching storylines. I created the digital art assets and wrote the entire narrative. The difficulty system was tuned to create a genuinely challenging survival experience where every choice matters.",
    link: "https://github.com/ayaskant007/The-Last-Ember",
  },
  {
    id: 4,
    date: "March 3, 2026",
    title: "Xeon Horizon: A high-performance, 35mm tall programmer's macropad",
    content:
      "Xeon Horizon is a high performance, 35mm tall programmer's macropad powered by a Seed Studio XIAO RP2040. It is designed for ultra-fast workflows in code editors, featuring dedicated refactoring/debugging shortcuts, a rotary encoder for rapid code navigation, and a status 0.91\" OLED Display for real-time feedback. A unique feature of the Horizon is its upward-facing SK6812-MINI-E RBG Lighting, which shines directly through hollowed-out text on the top plate, to act as an agressive, high contrast indicator light. The Xeon Horizon is built with a custom PCB designed in KiCad, and the firmware is developed using QMK for advanced configuration and performance. It is housed in a frosted 3D printed case with a sleek, minimalist design. The project is open source and available on GitHub.",
    link: "https://github.com/ayaskant007/Xeon-Horizon",
  },
  {
    id: 5,
    date: "March 14, 2026",
    title: "Echo Motions: [Blog WIP]",
    content: "[Blog WIP]",
    link: "https://github.com/ayaskant007/Echo-Motions",
  },
  {
    id: 6,
    date: "March 14, 2026",
    title: ".ayas Studio: [Blog WIP]",
    content: "[Blog WIP]",
    link: "https://github.com/ayaskant007/.ayas",
  },
];

const techStack = [
  { category: "Languages", items: ["C++", "Python", "C#", "JavaScript"] },
  { category: "Frontend", items: ["React", "Next.js", "HTML/CSS"] },
  { category: "Animation", items: ["GSAP 3", "Framer Motion"] },
  { category: "Styling", items: ["Tailwind CSS", "CSS"] },
  { category: "Game Dev", items: ["Unity", "Ren'Py", "Blender"] },
  { category: "Dev Tools", items: ["Git", "GitHub", "VS Code"] },
];

const socials = [
  {
    id: 1,
    text: "Github",
    icon: "/icons/github.svg",
    bg: "#333333",
    link: "https://github.com/ayaskant007",
  },
  {
    id: 2,
    text: "Instagram",
    icon: "/icons/instagram.svg",
    bg: "#E1306C",
    link: "https://instagram.com/ayaskant_007",
  },
  {
    id: 3,
    text: "LinkedIn",
    icon: "/icons/linkedin.svg",
    bg: "#0077B5",
    link: "https://www.linkedin.com/in/ayaskant-sahoo/",
  },
  {
    id: 4,
    text: "Email",
    icon: "/icons/mail.svg",
    bg: "#EA4335",
    link: "mailto:ayaskantsahoo007@gmail.com",
  },
];

const photosLinks = [
  { id: 1, icon: "/icons/gicon1.svg", title: "Library" },
  { id: 2, icon: "/icons/gicon2.svg", title: "Memories" },
  { id: 3, icon: "/icons/file.svg", title: "Places" },
  { id: 4, icon: "/icons/gicon4.svg", title: "People" },
  { id: 5, icon: "/icons/gicon5.svg", title: "Favorites" },
];

const gallery = [
  { id: 1, img: "/images/gal1.png" },
  { id: 2, img: "/images/gal2.png" },
  { id: 3, img: "/images/gal3.png" },
  { id: 4, img: "/images/gal4.png" },
  { id: 5, img: "/images/gal5.png" },
];

const wallpapers = [
  { id: 1, name: "Tahoe", path: "/images/wallpaper.png" },
  { id: 2, name: "Sequoia", path: "/images/wallpaper-2.png" },
  { id: 3, name: "Sonoma", path: "/images/wallpaper-3.png" },
  { id: 4, name: "Ventura", path: "/images/wallpaper-4.png" },
];

export {
  navLinks,
  navIcons,
  dockApps,
  blogPosts,
  techStack,
  socials,
  photosLinks,
  gallery,
  wallpapers,
};

// ── Finder Locations ──

const WORK_LOCATION = {
  id: 1,
  type: "work",
  name: "Projects",
  icon: "/icons/work.svg",
  kind: "folder",
  children: [
    {
      id: 5,
      name: "Parano!a",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-5",
      windowPosition: "top-[5vh] left-5",
      children: [
        {
          id: 1,
          name: "Paranoia Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Parano!a is a psychological thriller game with 3 intense levels, built using Unity and C#.",
            "The game delivers a gripping experience of fear and uncertainty through dynamic lighting, AI-driven enemies, and responsive sound design.",
            "All 3D models were created in Blender with custom shaders for the eerie atmosphere.",
            "Built with Unity, C#, and Blender for a fully immersive horror experience.",
          ],
        },
        {
          id: 2,
          name: "paranoia.github",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/foglomon/Paranoia",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "paranoia.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-1.png",
        },
      ],
    },
    {
      id: 6,
      name: "Vikas Bhi, Virasat Bhi",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-[5vh] left-5",
      windowPosition: "top-[20vh] left-5",
      children: [
        {
          id: 1,
          name: "Vikas Virasat Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 right-10",
          description: [
            "A fully responsive website built for CRYPTICON 2025, powered by GSAP 3 for smooth animations.",
            "Features scroll-triggered animations, parallax effects, and fluid page transitions.",
            "Built with vanilla HTML, CSS, and JavaScript for maximum performance.",
            "Hosted on Netlify with continuous deployment from GitHub.",
          ],
        },
        {
          id: 2,
          name: "vikasvirasat.netlify.app",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://vikasvirasat.netlify.app/",
          position: "top-20 left-20",
        },
        {
          id: 4,
          name: "vikas-virasat.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 left-80",
          imageUrl: "/images/project-2.png",
        },
      ],
    },
    {
      id: 7,
      name: "The Last Ember",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-10 left-80",
      windowPosition: "top-[33vh] left-5",
      children: [
        {
          id: 1,
          name: "Last Ember Project.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "The Last Ember is a narrative-driven visual novel built using Ren'Py and Python.",
            "Explore a story of survival and sacrifice through branching storylines where every choice matters.",
            "Features custom digital art assets and a carefully tuned difficulty system.",
            "Built with Ren'Py, Python, and hand-crafted digital art.",
          ],
        },
        {
          id: 2,
          name: "last-ember.github",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/ayaskant007/The-Last-Ember",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "last-ember.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-3.png",
        },
      ],
    },
    {
      id: 8,
      name: "Xeon Horizon",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-30 left-5",
      windowPosition: "top-[50vh] left-5",
      children: [
        {
          id: 1,
          name: "Xeon Horizon Macropad.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Xeon Horizon is a high performance, 35mm tall programmer's macropad powered by a Seed Studio XIAO RP2040.",
            'It is designed for ultra-fast workflows in code editors, featuring dedicated refactoring/debugging shortcuts, a rotary encoder for rapid code navigation, and a status 0.91" OLED Display for real-time feedback.',
            "A unique feature of the Horizon is its upward-facing SK6812-MINI-E RBG Lighting, which shines directly through hollowed-out text on the top plate, to act as an agressive, high contrast indicator light.",
            "The Xeon Horizon is built with a custom PCB designed in KiCad, and the firmware is developed using QMK for advanced configuration and performance. It is housed in a frosted 3D printed case with a sleek, minimalist design. The project is open source and available on GitHub.",
          ],
        },
        {
          id: 2,
          name: "Xeon_Horizon.github",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/ayaskant007/Xeon-Horizon",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "Xeon_Horizon.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-4.png",
        },
      ],
    },
    {
      id: 9,
      name: "Echo Motions",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-30 left-5",
      windowPosition: "top-[60vh] left-5",
      children: [
        {
          id: 1,
          name: "Echo Motions.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Xeon Horizon is a high performance, 35mm tall programmer's macropad powered by a Seed Studio XIAO RP2040.",
            "It is designed for ultra-fast workflows in code editors, featuring dedicated refactoring/debugging shortcuts, a rotary encoder for rapid code navigation, and a status 0.91\"",
            "A unique feature of the Horizon is its upward-facing SK6812-MINI-E RBG Lighting, which shines directly through hollowed-out text on the top plate, to act as an agressive, high contrast indicator light.",
            "The Xeon Horizon is built with a custom PCB designed in KiCad, and the firmware is developed using QMK for advanced configuration and performance. It is housed in a frosted 3D printed case with a sleek, minimalist design. The project is open source and available on GitHub.",
          ],
        },
        {
          id: 2,
          name: "Echo_Motions.github",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/ayaskant007/Echo-Motions",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "Echo_Motion.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-5.png",
        },
      ],
    },
    {
      id: 10,
      name: "Echo Motions",
      icon: "/images/folder.png",
      kind: "folder",
      position: "top-30 left-5",
      windowPosition: "top-[70vh] left-5",
      children: [
        {
          id: 1,
          name: "Echo Motions.txt",
          icon: "/images/txt.png",
          kind: "file",
          fileType: "txt",
          position: "top-5 left-10",
          description: [
            "Xeon Horizon is a high performance, 35mm tall programmer's macropad powered by a Seed Studio XIAO RP2040.",
            "It is designed for ultra-fast workflows in code editors, featuring dedicated refactoring/debugging shortcuts, a rotary encoder for rapid code navigation, and a status 0.91\"",
            "A unique feature of the Horizon is its upward-facing SK6812-MINI-E RBG Lighting, which shines directly through hollowed-out text on the top plate, to act as an agressive, high contrast indicator light.",
            "The Xeon Horizon is built with a custom PCB designed in KiCad, and the firmware is developed using QMK for advanced configuration and performance. It is housed in a frosted 3D printed case with a sleek, minimalist design. The project is open source and available on GitHub.",
          ],
        },
        {
          id: 2,
          name: "Echo_Motions.github",
          icon: "/images/safari.png",
          kind: "file",
          fileType: "url",
          href: "https://github.com/ayaskant007/Echo-Motions",
          position: "top-10 right-20",
        },
        {
          id: 4,
          name: "Echo_Motion.png",
          icon: "/images/image.png",
          kind: "file",
          fileType: "img",
          position: "top-52 right-80",
          imageUrl: "/images/project-5.png",
        },
      ],
    },
  ],
};

const ABOUT_LOCATION = {
  id: 2,
  type: "about",
  name: "About me",
  icon: "/icons/info.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "me.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-5",
      imageUrl: "/images/marinapp.jpg",
    },
    {
      id: 4,
      name: "about-me.txt",
      icon: "/images/txt.png",
      kind: "file",
      fileType: "txt",
      position: "top-60 left-5",
      subtitle: "Meet the Developer Behind the Code",
      image: "/images/ProfileP.png",
      description: [
        "Hey! I'm Ayaskant Sahoo 👋 - a Developer and Student from New Delhi, India.",
        "I build high-performance web experiences, games, and interactive software using diverse tech stacks including React, GSAP, Unity, and Python.",
        "I'm the Lead Developer at The Tech Mobius Club at Indraprastha International School, and an active member of Hack Club.",
        "When I'm not coding, you'll find me designing game levels, experimenting with animations, or building something new just for fun.",
      ],
    },
  ],
};

const RESUME_LOCATION = {
  id: 3,
  type: "resume",
  name: "Resume",
  icon: "/icons/file.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "Resume.pdf",
      icon: "/images/pdf.png",
      kind: "file",
      fileType: "pdf",
    },
  ],
};

const TRASH_LOCATION = {
  id: 4,
  type: "trash",
  name: "Trash",
  icon: "/icons/trash.svg",
  kind: "folder",
  children: [
    {
      id: 1,
      name: "old-design-v1.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-10 left-10",
      imageUrl: "/images/trash-1.png",
    },
    {
      id: 2,
      name: "deprecated-code.png",
      icon: "/images/image.png",
      kind: "file",
      fileType: "img",
      position: "top-40 left-80",
      imageUrl: "/images/trash-2.png",
    },
  ],
};

export const locations = {
  work: WORK_LOCATION,
  about: ABOUT_LOCATION,
  resume: RESUME_LOCATION,
  trash: TRASH_LOCATION,
};

const INITIAL_Z_INDEX = 1000;

const WINDOW_CONFIG = {
  finder: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
  contact: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
  resume: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
  safari: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
  photos: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
  terminal: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
  txtfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
  imgfile: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
  notes: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
  settings: { isOpen: false, zIndex: INITIAL_Z_INDEX, data: null, isMinimized: false, isMaximized: false },
};

export { INITIAL_Z_INDEX, WINDOW_CONFIG };