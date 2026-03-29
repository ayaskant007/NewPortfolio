"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export const useAudio = () => {
    const audioContext = useRef<AudioContext | null>(null);
    const [isMuted, setIsMuted] = useState(false);

    useEffect(() => {
        // Initialize AudioContext only on user interaction to comply with browser policies
        const initAudio = () => {
            if (!audioContext.current) {
                audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            if (audioContext.current.state === "suspended") {
                audioContext.current.resume();
            }
        };

        window.addEventListener("click", initAudio);
        window.addEventListener("keydown", initAudio);
        return () => {
            window.removeEventListener("click", initAudio);
            window.removeEventListener("keydown", initAudio);
        };
    }, []);

    const playTone = useCallback((frequency: number, type: OscillatorType, duration: number, volume: number = 0.1) => {
        if (isMuted || !audioContext.current) return;

        const osc = audioContext.current.createOscillator();
        const gainNode = audioContext.current.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(frequency, audioContext.current.currentTime);

        gainNode.gain.setValueAtTime(volume, audioContext.current.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.current.currentTime + duration);

        osc.connect(gainNode);
        gainNode.connect(audioContext.current.destination);

        osc.start();
        osc.stop(audioContext.current.currentTime + duration);
    }, [isMuted]);

    const playHover = useCallback(() => {
        // High pitch blip
        playTone(800, "sine", 0.05, 0.05);
    }, [playTone]);

    const playClick = useCallback(() => {
        // Low interaction thud
        playTone(300, "square", 0.1, 0.05);
    }, [playTone]);

    const playType = useCallback(() => {
        // Mechanical typing sound
        playTone(600 + Math.random() * 200, "sawtooth", 0.03, 0.02);
    }, [playTone]);

    const toggleMute = () => setIsMuted(prev => !prev);

    return { playHover, playClick, playType, toggleMute, isMuted };
};
