import { useRef, useEffect } from "react";
import gsap from "gsap";
import useThemeStore from "#store/theme";

const BootScreen = () => {
    const progressRef = useRef(null);
    const containerRef = useRef(null);
    const setBootPhase = useThemeStore((s) => s.setBootPhase);

    useEffect(() => {
        const tl = gsap.timeline({
            onComplete: () => setBootPhase("hello"),
        });

        // Fade in Apple logo
        tl.fromTo(
            ".boot-logo",
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        );

        // Animate progress bar fill
        tl.fromTo(
            progressRef.current,
            { scaleX: 0 },
            { scaleX: 1, duration: 2.5, ease: "power1.inOut" },
            "+=0.3",
        );

        // Fade out entire screen
        tl.to(containerRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.in",
        });

        return () => tl.kill();
    }, [setBootPhase]);

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center select-none"
        >
            {/* Apple Logo */}
            <svg
                className="boot-logo w-20 h-24 mb-16"
                viewBox="0 0 814 1000"
                fill="white"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76.5 0-103.7 40.8-165.9 40.8s-105.6-57.8-155.5-127.4c-58.8-82-101.6-209.5-101.6-330.4 0-194.3 126.4-297.5 250.8-297.5 66.1 0 121.2 43.4 162.7 43.4 39.5 0 101.1-46 176.3-46 28.5 0 130.9 2.6 198.3 99.9zm-234-181.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8.7 15.6 1.3 18.1 2.6.6 6.4 1.3 10.2 1.3 45.4 0 103.5-30.4 139.5-71.3z" />
            </svg>

            {/* Progress Bar */}
            <div className="w-52 h-1.5 bg-white/20 rounded-full overflow-hidden">
                <div
                    ref={progressRef}
                    className="h-full bg-white rounded-full origin-left"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>
        </div>
    );
};

export default BootScreen;
