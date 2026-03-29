import { useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/**
 * BootLoading Component
 * High-fidelity macOS boot sequence with Apple logo and loading bar.
 */
const BootLoading = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: () => {
                // Fade out the entire boot screen
                gsap.to("#boot-screen", {
                    opacity: 0,
                    duration: 1,
                    ease: "power2.inOut",
                    onComplete: onComplete
                });
            }
        });

        // 1. Initial Logo Fade In
        tl.fromTo("#apple-logo", 
            { opacity: 0, scale: 0.8 }, 
            { opacity: 1, scale: 1, duration: 1.5, ease: "power4.out" }
        );

        // 2. Loading Bar Appearance
        tl.fromTo("#loading-bar-container",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
            "-=0.5"
        );

        // 3. Progress Animation
        tl.to({}, {
            duration: 3,
            onUpdate: function() {
                const p = Math.round(this.progress() * 100);
                setProgress(p);
            },
            ease: "none"
        });

        // 4. Final Hold
        tl.to({}, { duration: 1 });

    }, []);

    return (
        <div 
            id="boot-screen" 
            className="fixed inset-0 z-[100000] bg-black flex flex-col items-center justify-center select-none"
        >
            <div className="flex flex-col items-center gap-12 -mt-20">
                {/* Apple Logo SVG */}
                <svg 
                    id="apple-logo"
                    viewBox="0 0 170 200" 
                    className="w-24 h-24 text-white fill-current"
                >
                    <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.197-2.12-9.973-3.17-14.34-3.17-4.58 0-9.492 1.05-14.746 3.17-5.262 2.13-9.501 3.24-12.742 3.35-4.929.21-9.842-1.96-14.746-6.52-3.13-2.73-7.045-7.41-11.735-14.04-5.032-7.08-9.169-15.29-12.41-24.65-3.471-10.11-5.211-19.9-5.211-29.35 0-10.823 2.29-19.828 6.87-27.015 4.58-7.187 10.565-11.504 17.954-12.952 3.456-.724 7.72-1.086 12.783-1.086 3.118 0 7.428.845 12.91 2.531 5.483 1.687 9.134 2.531 10.954 2.531 1.206 0 5.46-1.055 12.763-3.163 7.303-2.109 12.463-3.163 15.481-3.163 7.62-.351 14.28 1.43 19.974 5.353 5.69 3.922 9.41 9.275 11.16 16.059-10.98 6.578-16.48 15.367-16.48 26.381 0 8.356 2.5 15.263 7.5 20.725 4.09 4.43 9.07 7.24 14.94 8.44-.02 4.08-.12 8.16-.29 12.24zM113.84 31.79c0-8.22 2.92-15.23 8.77-21.05 5.85-5.81 12.73-8.91 20.64-9.3 1.02 9.15-2.13 17-9.45 23.54-7.33 6.54-15.03 9.46-23.1 8.75-.11-1.31-.11-2.95-.11-5.04c.12-.12.18-.24.25-.36z" />
                </svg>

                {/* Loading Bar */}
                <div 
                    id="loading-bar-container"
                    className="w-48 h-1.5 bg-white/20 rounded-full overflow-hidden relative"
                >
                    <div 
                        className="h-full bg-white transition-all duration-100 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default BootLoading;
