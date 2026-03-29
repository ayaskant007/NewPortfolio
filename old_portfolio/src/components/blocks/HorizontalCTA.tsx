"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HorizontalCTA() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map scroll progress to horizontal movement
    // Text moves from right (100%) to left (-100%)
    const x = useTransform(scrollYProgress, [0, 1], ["100%", "-100%"]);

    return (
        <section ref={containerRef} className="relative h-[300vh] bg-black">
            <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex whitespace-nowrap">
                    <h2 className="text-[15vw] md:text-[20vw] font-black text-white tracking-tighter leading-none">
                        LET'S WORK <span className="text-red-600">TOGETHER.</span>
                    </h2>
                </motion.div>
            </div>
        </section>
    );
}
