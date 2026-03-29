"use client";

import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, MotionValue } from "framer-motion";
import { Home, Briefcase, User, Mail } from "lucide-react";

export default function FloatingDock() {
    const mouseX = useMotionValue(Infinity);

    const scrollToSection = (id: string) => {
        if (id === "contact") {
            window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
            return;
        }
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    const items = [
        { id: "hero", icon: <Home className="w-full h-full" />, label: "Home" },
        { id: "projects", icon: <Briefcase className="w-full h-full" />, label: "Work" },
        { id: "experience", icon: <User className="w-full h-full" />, label: "Skills" },
        { id: "contact", icon: <Mail className="w-full h-full" />, label: "Contact" },
    ];

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
            <motion.div
                onMouseMove={(e) => mouseX.set(e.clientX)}
                onMouseLeave={() => mouseX.set(Infinity)}
                className="flex items-end gap-4 p-4 rounded-2xl bg-neutral-900/20 backdrop-blur-2xl border border-white/10 shadow-2xl"
            >
                {items.map((item) => (
                    <DockIcon
                        key={item.id}
                        mouseX={mouseX}
                        onClick={() => scrollToSection(item.id)}
                        icon={item.icon}
                        label={item.label}
                    />
                ))}
            </motion.div>
        </div>
    );
}

function DockIcon({
    mouseX,
    icon,
    label,
    onClick,
}: {
    mouseX: MotionValue;
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
}) {
    const ref = useRef<HTMLButtonElement>(null);

    const distance = useTransform(mouseX, (val) => {
        const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
        return val - bounds.x - bounds.width / 2;
    });

    const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
    const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

    return (
        <motion.button
            ref={ref}
            style={{ width, height: width }}
            onClick={onClick}
            className="relative group flex items-center justify-center rounded-full bg-neutral-800/50 border border-white/10 hover:bg-red-600 hover:border-red-500 transition-colors aspect-square"
        >
            <motion.div className="w-1/2 h-1/2 text-white/80 group-hover:text-white transition-colors">
                {icon}
            </motion.div>

            {/* Tooltip */}
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10 pointer-events-none backdrop-blur-md">
                {label}
            </span>
        </motion.button>
    );
}
