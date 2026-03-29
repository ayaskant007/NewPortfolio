"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);
    const [text, setText] = useState("");
    const fullText = "SYSTEM INITIALIZING...";

    useEffect(() => {
        let currentIndex = 0;
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";

        const interval = setInterval(() => {
            if (currentIndex <= fullText.length) {
                const glitchedText = fullText
                    .slice(0, currentIndex)
                    .split("")
                    .map((char, index) => {
                        if (index < currentIndex - 2) return char;
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("");

                setText(glitchedText);
                currentIndex++;
            } else {
                setText(fullText); // Ensure final text is correct
                clearInterval(interval);
                setTimeout(() => setIsLoading(false), 800);
            }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black text-white"
                >
                    <div className="font-mono text-xl md:text-3xl tracking-widest text-red-500">
                        {text}
                        <span className="animate-pulse">_</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
