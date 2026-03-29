"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Magnet from "./Magnet";

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="fixed bottom-8 right-8 z-40"
                >
                    <Magnet>
                        <button
                            onClick={scrollToTop}
                            className="p-4 bg-red-600 text-white rounded-full shadow-lg hover:bg-red-700 transition-colors"
                        >
                            <ArrowUp className="w-6 h-6" />
                        </button>
                    </Magnet>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
