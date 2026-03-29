"use client";

import React from "react";
import StarField from "../ui/StarField";
import LetterGlitch from "../ui/LetterGlitch";
import Magnet from "../ui/Magnet";
import Iridescence from "../ui/Iridescence";

export default function Hero() {
    return (
        <section id="hero" className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
            <StarField />
            <div className="absolute inset-0 z-0 opacity-40">
                <Iridescence />
            </div>
            <div className="z-10 text-center space-y-4 flex flex-col items-center">
                <div className="relative w-32 h-32 md:w-40 md:h-40 mb-6 rounded-full overflow-hidden border-2 border-white/10 shadow-2xl shadow-red-500/20">
                    <Magnet strength={5}>
                        <img
                            src="/avatar.png"
                            alt="Ayaskant Sahoo"
                            className="w-full h-full object-cover"
                        />
                    </Magnet>
                </div>
                <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-white flex items-end justify-center">
                    <LetterGlitch text="AYASKANT SAHOO" speed={75} />
                    <span
                        id="gravity-trigger"
                        className="text-red-500 hover:text-red-400 cursor-pointer transition-all duration-300 ml-1 inline-block animate-pulse hover:animate-none hover:scale-125 hover:drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                        title="Initialize System..."
                        onClick={() => window.dispatchEvent(new Event("open-terminal"))}
                    >.</span>
                </h1>
                <p className="text-xl md:text-2xl text-neutral-400 font-light tracking-wide">
                    <LetterGlitch text="DEVELOPER / STUDENT" speed={50} />
                </p>
            </div>
            <div className="absolute bottom-10 animate-bounce text-neutral-500">
                <p className="text-sm">Scroll to explore</p>
            </div>
        </section>
    );
}
