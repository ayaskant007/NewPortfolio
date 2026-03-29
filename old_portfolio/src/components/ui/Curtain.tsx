"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Curtain() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        // Simulate loading time or wait for window load
        const timer = setTimeout(() => {
            setIsVisible(false);
        }, 1000); // 1 second curtain

        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ scaleY: 1 }}
                    exit={{ scaleY: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[100] bg-red-600 origin-top"
                >
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <h1 className="text-9xl font-black text-black tracking-tighter">

                        </h1>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
