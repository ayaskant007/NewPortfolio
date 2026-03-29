"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface DecryptedTextProps {
    text: string;
    speed?: number;
    maxIterations?: number;
    className?: string;
    revealDirection?: "start" | "end" | "center";
    useOriginalCharsOnly?: boolean;
    animateOn?: "view" | "hover";
}

export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    className = "",
    revealDirection = "start",
    useOriginalCharsOnly = false,
    animateOn = "hover",
}: DecryptedTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isScrambling, setIsScrambling] = useState(false);
    const containerRef = useRef<HTMLSpanElement>(null);
    const isInView = useInView(containerRef, { once: true, amount: 0.5 });

    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";

    useEffect(() => {
        let interval: any;
        let currentIteration = 0;

        const getScrambledText = (progress: number) => {
            return text
                .split("")
                .map((char, index) => {
                    const shouldReveal =
                        revealDirection === "start"
                            ? index < progress * text.length
                            : revealDirection === "end"
                                ? index > (1 - progress) * text.length
                                : true; // center unimplemented for brevity

                    if (shouldReveal) return char;
                    if (useOriginalCharsOnly) {
                        const randomOriginal = text[Math.floor(Math.random() * text.length)];
                        return randomOriginal === ' ' ? ' ' : randomOriginal;
                    }
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join("");
        };

        if (isScrambling) {
            interval = setInterval(() => {
                const progress = currentIteration / maxIterations;
                setDisplayText(getScrambledText(progress));
                currentIteration++;

                if (currentIteration > maxIterations) {
                    clearInterval(interval);
                    setDisplayText(text);
                    setIsScrambling(false);
                }
            }, speed);
        }

        return () => clearInterval(interval);
    }, [isScrambling, text, speed, maxIterations, revealDirection, useOriginalCharsOnly, chars]);

    useEffect(() => {
        if (animateOn === "view" && isInView) {
            setIsScrambling(true);
        }
    }, [isInView, animateOn]);

    return (
        <span
            ref={containerRef}
            className={`inline-block whitespace-nowrap ${className}`}
            onMouseEnter={() => animateOn === "hover" && setIsScrambling(true)}
        >
            <span className="sr-only">{text}</span>
            <span aria-hidden="true">{displayText}</span>
        </span>
    );
}
