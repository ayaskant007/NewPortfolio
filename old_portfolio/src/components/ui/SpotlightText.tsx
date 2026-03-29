"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpotlightTextProps {
    text: string;
    className?: string;
}

export default function SpotlightText({ text, className = "" }: SpotlightTextProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    return (
        <div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={`relative overflow-hidden cursor-default select-none ${className}`}
        >
            {/* Base Text (Dimmed) */}
            <h2 className="relative z-10 text-neutral-800 mix-blend-overlay">
                {text}
            </h2>

            {/* Spotlight Overlay */}
            <motion.div
                className="absolute inset-0 z-20 pointer-events-none"
                animate={{
                    opacity: isHovered ? 1 : 0,
                }}
                transition={{ type: "tween", ease: "backOut", duration: 0.2 }}
                style={{
                    maskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 45%, transparent 100%)`,
                    WebkitMaskImage: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, black 45%, transparent 100%)`,
                }}
            >
                <h2 className="text-white text-shadow-glow">
                    {text}
                </h2>
            </motion.div>

            {/* Fallback for non-hover state or mobile */}
            <h2 className="absolute inset-0 z-0 text-neutral-700 opacity-20">
                {text}
            </h2>
        </div>
    );
}
