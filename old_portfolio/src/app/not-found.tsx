"use client";

import { useState } from "react";
import Link from "next/link";
import LetterGlitch from "@/components/ui/LetterGlitch";
import Asteroids404 from "@/components/games/Asteroids404";

export default function NotFound() {
    const [playGame, setPlayGame] = useState(false);

    if (playGame) {
        return <Asteroids404 />;
    }

    return (
        <div className="h-screen w-full flex flex-col items-center justify-center bg-black text-white p-4">
            <h1 className="text-9xl font-black text-red-600 mb-4 tracking-tighter">
                <LetterGlitch text="404" speed={50} />
            </h1>
            <h2 className="text-2xl md:text-4xl font-bold mb-8 text-neutral-400">
                SYSTEM FAILURE: PAGE NOT FOUND
            </h2>
            <div className="flex gap-4">
                <Link
                    href="/"
                    className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-neutral-200 transition-colors"
                >
                    RETURN TO BASE
                </Link>
                <button
                    onClick={() => setPlayGame(true)}
                    className="px-8 py-4 border border-red-600 text-red-600 font-bold rounded-full hover:bg-red-600 hover:text-white transition-all uppercase"
                >
                    Launch Defense
                </button>
            </div>
        </div>
    );
}
