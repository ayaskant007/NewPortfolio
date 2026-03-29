"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface LetterGlitchProps {
    text: string;
    className?: string;
    speed?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

export default function LetterGlitch({ text, className, speed = 50 }: LetterGlitchProps) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const iterations = useRef(0);

    useEffect(() => {
        const startGlitch = () => {
            iterations.current = 0;
            if (intervalRef.current) clearInterval(intervalRef.current);

            intervalRef.current = setInterval(() => {
                setDisplayText((prev) =>
                    text
                        .split("")
                        .map((letter, index) => {
                            if (index < iterations.current) {
                                return text[index];
                            }
                            return chars[Math.floor(Math.random() * chars.length)];
                        })
                        .join("")
                );

                if (iterations.current >= text.length) {
                    if (intervalRef.current) clearInterval(intervalRef.current);
                }

                iterations.current += 1 / 3;
            }, speed);
        };

        startGlitch();

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [text, speed]);

    return (
        <motion.span
            className={className}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            {displayText}
        </motion.span>
    );
}
