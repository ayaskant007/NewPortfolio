export interface Project {
    title: string;
    category: string;
    description: string;
    tech: string[];
    link?: string;
    image?: string;
}

// Placeholder images from Unsplash
export const projects: Project[] = [
    {
        title: "Parano!a",
        category: "Game Development",
        description: "A psychological thriller game with 3 intense levels. Experience fear and uncertainty in this immersive journey.",
        tech: ["Unity", "C#", "3D Modeling"],
        link: "https://github.com/foglomon/Paranoia",
        image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=2070", // Horror/Tech vibe
    },
    {
        title: "Vikas Bhi, Virasat Bhi",
        category: "Web Development",
        description: "Responsive website for CRYPTICON 2025. Powered by GSAP 3 for smooth animations and hosted on Netlify.",
        tech: ["HTML", "CSS", "JS", "GSAP 3"],
        link: "https://vikasvirasat.netlify.app/",
        image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&q=80&w=2070", // Architecture/Culture
    },
    {
        title: "The Last Ember",
        category: "Game Development",
        description: "A narrative-driven game built using Ren'Py. Explore a story of survival and sacrifice.",
        tech: ["Ren'Py", "Python", "Digital Art"],
        link: "https://github.com/ayaskant007/The-Last-Ember",
        image: "https://images.unsplash.com/photo-1496564203457-11bb12075d90?auto=format&fit=crop&q=80&w=2070", // Ember/Fire
    },
];
