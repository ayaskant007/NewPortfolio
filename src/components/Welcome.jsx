import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const FONT_WEIGHTS = {
  subtitle: { min: 100, max: 400, default: 100 },
  title: { min: 400, max: 900, default: 400 },
};

const renderText = (text, className, baseWeight = 400) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

const setupTextHover = (container, type) => {
  if (!container) return () => {};

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = FONT_WEIGHTS[type];

  const animateLetter = (letter, weight, duration = 0.25) => {
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontVariationSettings: `'wght' ${weight}`,
    });
  };

  const handleMouseMove = (e) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 20000);

      animateLetter(letter, min + (max - min) * intensity);
    });
  };
  const handleMouseLeave = () => letters.forEach((letter) => animateLetter(letter, base, 0.3));

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

const Welcome = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const bootContainerRef = useRef(null);
  const [bootCompleted, setBootCompleted] = useState(false);

  // Boot sequence
  useGSAP(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setBootCompleted(true);
      }
    });

    // Emulate cursive 'hello' appearing and then disappearing
    tl.fromTo(
      "#hello-svg-path",
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 2, ease: "power2.inOut" }
    )
    .to("#hello-svg-path", { fill: "white", duration: 0.5, ease: "power2.out" }, "-=0.5")
    .to("#hello-svg", { opacity: 0, scale: 1.1, duration: 0.8, delay: 0.5, ease: "power2.in" })
    .to(bootContainerRef.current, { opacity: 0, duration: 1, ease: "power3.inOut" });

  }, []);

  // Post-boot text hover interactions
  useGSAP(() => {
    if (!bootCompleted) return;

    gsap.fromTo(
      "#welcome-interactive",
      { opacity: 0, scale: 0.95, y: 10 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: "power3.out" }
    );

    const titleCleanup = setupTextHover(titleRef.current, "title");
    const subtitleCleanup = setupTextHover(subtitleRef.current, "subtitle");

    return () => {
      titleCleanup();
      subtitleCleanup();
    };
  }, [bootCompleted]);

  return (
    <>
      <section id="welcome" className="relative z-0">
        <div id="welcome-interactive" className="opacity-0 flex flex-col items-center">
            <p ref={subtitleRef}>
            {renderText(
                "Hey, I'm Ayaskant! Welcome to my",
                "text-3xl font-georama",
                100,
            )}
            </p>
            <h1 ref={titleRef} className="mt-7">
            {renderText("portfolio", "text-[150px] italic font-georama tracking-tighter")}
            </h1>
        </div>

        <div className="small-screen z-50">
          <p>This Portfolio is designed for desktop/tablet screens only.</p>
        </div>
      </section>

      {/* Boot Overlay Sequence */}
      {(!bootCompleted || true) && (
        <div 
          ref={bootContainerRef} 
          className={`fixed inset-0 z-[99999] flex items-center justify-center bg-black transition-all ${bootCompleted ? "pointer-events-none hidden" : ""}`}
        >
          <svg id="hello-svg" viewBox="0 0 160 80" className="w-64 h-32">
            <path
              id="hello-svg-path"
              d="M18.6,47.8c1.3-4.8,2.7-9.5,4-14.3c1-3.6,1.9-6.9,2.8-10.1c0.2-0.8,0.4-1.5,0.6-2.2c0.6-2.2,1.2-4.1,1.8-5.7c0.1-0.3,0.2-0.6,0.2-0.9c0.4-1.5,0.9-2.6,1.4-3c0.6-0.5,1.4-0.4,2.2,0.6c0.7,0.8,1.2,2.1,1.3,3.8c0.1,1.5-0.1,3.4-0.6,5.6c-0.6,2.7-1.5,5.9-2.7,9.5c-1.2,3.8-2.6,8.1-4.1,12.7c-1.4,4.5-2.8,9-4.3,13.6c-2.3,7.2-4.5,14-6.3,20C13.4,82,12,85.8,11,88.9c-0.6,1.7-1,3.1-1.3,4c-0.6,2.1-1.1,3.2-1.3,3.3c-0.3,0.1-1,0.1-2-0.1c-0.9-0.2-1.6-0.8-2.2-1.7c-0.5-1-0.8-2.2-0.8-3.7c0-2,0.3-4.3,1-6.8c0.6-2.2,1.5-4.7,2.5-7.4c1-2.7,2.2-5.5,3.4-8.3c0.5-1.2,1-2.4,1.6-3.7c0.5-1.1,1-2.2,1.5-3.3c1.2-2.3,1.6-3.4,1.7-3.4c0.1-0.1,0.7-0.1,1.7,0.1c1.2,0.2,2,0.7,2.6,1.5c0.5,0.7,0.7,1.8,0.6,3.4M55.5,54.7c-1.9,4.4-4,8.9-6.3,13.6c-1,2-2,4.1-3,6.2c-2.2,4.5-4.2,8.6-6.1,12.1c-1.5,2.7-2.9,4.9-4.1,6.5c-0.8,1-1.5,1.5-2,1.6c-0.8,0-1.5-0.5-2.2-1.4c-0.7-0.9-1.1-2.3-1.1-4.2c0-2.3,0.6-5,1.7-8c0.9-2.5,2.1-5.1,3.5-7.9c1.2-2.3,2.4-4.5,3.7-6.8c1.2-2.1,2.5-4.2,3.8-6.1c2.2-3.3,4.4-6.3,6.6-8.9c2-2.3,4-4.4,5.9-6.1c1.9-1.7,3.9-3,6-3.8c1.5-0.6,2.9-0.8,4.2-0.6c1.1,0.1,1.9,0.7,2.6,1.5c0.5,0.7,0.7,1.6,0.6,2.9c-0.1,1-0.5,2.2-1,3.6c-0.5,1.6-1.2,3.3-2,5.2c-0.9,2-1.7,4.1-2.6,6.2c-0.9,2.2-1.8,4.3-2.6,6.4c-0.6,1.6-1.2,3.1-1.7,4.4v0.1c0,0,0,0,0,0.1c0-0.4-0.1-0.7-0.1-1.1c0-0.5-0.1-1.1-0.2-1.7c0-0.6-0.1-1.3-0.2-1.9c-0.1-0.7-0.3-1.4-0.5-2.2c-0.3-1.2-0.7-2.3-1.4-3.5c-0.6-1-1.4-2-2.3-2.8c-0.8-0.7-1.8-1.3-2.8-1.8c-0.9-0.4-1.9-0.6-3-0.7C56.6,54.8,56,54.8,55.5,54.7M93.9,18c-1.2,2.3-2.4,4.7-3.7,7.1c-0.4,0.7-0.7,1.4-1.1,2.1c-1,1.9-2,3.9-3,5.8c-0.8,1.6-1.6,3.2-2.5,4.8c-0.9,1.7-1.8,3.4-2.6,5c-1.8,3.3-3.6,6.6-5.4,9.9c-1.6,2.9-3.2,5.7-4.7,8.4c-1.4,2.5-2.8,4.9-4.1,7c-1.6,2.6-2.9,4.7-3.9,6.1c-0.3,0.5-0.7,1-1,1.4c-0.8,0.9-1.5,1.4-2.1,1.5c-0.6,0-1.2-0.4-1.7-1.2c-0.5-0.7-0.8-1.7-0.8-3c0-1,0.2-2.2,0.5-3.5c0.3-1.2,0.7-2.6,1.2-4c0.5-1.5,1.1-3,1.7-4.5c1.1-2.8,2.2-5.7,3.4-8.6c1.1-2.8,2.3-5.5,3.4-8c1-2.4,2-4.7,3-6.9c1-2.2,1.9-4.2,2.7-5.9c1-2,1.9-3.9,2.7-5.5c1.9-3.4,3.5-6.1,4.9-8C82,23.3,83.4,21,84.6,19c1-1.7,1.8-3.1,2.5-4.1c0.5-0.8,1.1-1.3,1.7-1.7c0.7-0.4,1.4-0.6,2.2-0.4c0.9,0.2,1.6,0.7,2.1,1.5C93.6,15.1,93.9,16.4,93.9,18M115.6,17.4c-1.1,1.9-2.3,4-3.5,6c-1,1.7-2,3.5-3,5.2c-1.6,2.8-3.1,5.5-4.7,8.3c-2,3.7-4.1,7.4-6.1,11c-2.2,3.9-4.3,7.7-6.2,11c-0.7,1.1-1.3,2.3-1.9,3.4c-1.2,2.1-2.3,4-3.2,5.7c-1,1.8-1.9,3.4-2.7,4.8c-0.7,1.1-1.2,2-1.7,2.7c-0.7,1-1.4,1.6-2.1,1.6c-0.9,0.1-1.6-0.3-2.1-1c-0.5-0.7-0.8-1.8-0.8-3.3c0-1.2,0.2-2.6,0.5-4.1c0.3-1.4,0.8-3.1,1.4-4.8c0.5-1.5,1.1-3.2,1.7-4.8c0.5-1.5,1.1-3,1.7-4.6c1.1-2.9,2.2-5.8,3.4-8.7c1.1-2.8,2.3-5.5,3.4-8.1c1.2-2.6,2.3-5.1,3.4-7.4c1-2.1,1.9-4.1,2.8-5.9c0.9-1.9,1.7-3.6,2.5-5.2c1.6-3.2,3-5.9,4.2-8C104,23,105.4,20.6,106.6,18.4c1-1.6,1.8-3,2.5-4c0.5-0.7,1.1-1.3,1.7-1.6c0.7-0.4,1.4-0.6,2.2-0.4c0.9,0.2,1.6,0.7,2.1,1.6C115.6,14.7,115.8,15.9,115.6,17.4M147,56.8c-1.4,2.5-3,5-4.8,7.5c-1.7,2.3-3.6,4.7-5.5,7c-1.8,2.2-3.8,4.2-5.7,6c-2.1,1.9-4.1,3.6-6,5.1c-1.7,1.3-3.4,2.3-4.9,3c-1.9,0.9-3.7,1.3-5.2,1.2c-1.6-0.1-2.9-0.8-3.9-1.9c-1-1.2-1.6-2.7-1.7-4.6c-0.1-2.1,0.3-4.4,1.1-6.9c0.7-2.3,1.7-4.7,3-7.2c1.1-2.2,2.4-4.4,4-6.5c2.1-2.7,4.4-5.3,6.9-7.7c2.4-2.2,4.8-4.2,7.2-5.8c2.2-1.4,4.2-2.4,6-3c2.1-0.7,3.9-1,5.2-0.8c1.2,0.2,2.1,0.7,2.5,1.5C145.8,51.8,146.4,54.2,147,56.8M126,59.3c-2,1.3-4,3.1-5.9,5.2c-1.8,2-3.6,4.3-5.2,6.7c-1.5,2.4-2.8,4.8-4,7.2c-0.8,1.7-1.5,3.3-2,4.8c-0.4,1.4-0.5,2.5-0.4,3.2c0.1,0.6,0.4,0.9,0.9,1.1c0.5,0.1,1.2-0.2,2.1-0.8c1.2-0.8,2.4-2.1,3.7-3.8c1.4-1.8,2.8-3.9,4.2-6.4c1.3-2.3,2.7-4.9,4-7.7C124.3,66.7,125.2,63.9,126,59.3"
              fill="none"
              stroke="currentColor"
              className="text-white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="1000"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default Welcome;
