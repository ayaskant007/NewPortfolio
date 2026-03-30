import { useEffect } from "react";
import useThemeStore from "#store/theme";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import gsap from "gsap";

const HelloScreen = () => {
    const setBootPhase = useThemeStore((s) => s.setBootPhase);

    useEffect(() => {
        // Finish boot sequence after ~5 seconds
        const timer = setTimeout(() => {
            gsap.to("#hello-screen", {
                opacity: 0,
                duration: 1,
                ease: "power2.inOut",
                onComplete: () => setBootPhase("desktop"),
            });
        }, 5000);

        return () => clearTimeout(timer);
    }, [setBootPhase]);

    return (
        <div
            id="hello-screen"
            style={{
                position: "fixed",
                inset: 0,
                backgroundColor: "#000",
                display: "flex", // Centers the lottie animation perfectly on the screen
                alignItems: "center",
                justifyContent: "center",
                zIndex: 9999,
            }}
        >
            <div style={{ width: "400px", height: "400px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DotLottieReact
                    src="https://lottie.host/fb1d1037-a701-4d03-9fb6-ccc6cd25ef75/TQFV2JoSu3.lottie"
                    loop={true}
                    autoplay
                />
            </div>
        </div>
    );
};

export default HelloScreen;
