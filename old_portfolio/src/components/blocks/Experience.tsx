"use client";

import React from "react";
import { motion, useScroll, useTransform, useVelocity, useSpring } from "framer-motion";
import { Code, Globe, GraduationCap, ExternalLink } from "lucide-react";
// @ts-ignore
import MagicBento from "../MagicBento";
import SplitText from "../ui/SplitText";
import DecryptedText from "../ui/DecryptedText";
import TiltedCard from "../ui/TiltedCard";

export default function Experience() {
    const { scrollY } = useScroll();
    const skewVelocity = useVelocity(scrollY);
    const skew = useTransform(skewVelocity, [0, 1000], [0, 5], { clamp: false });
    const smoothSkew = useSpring(skew, { stiffness: 400, damping: 90 });

    return (
        <section id="experience" className="py-20 px-4 md:px-10 bg-black text-white border-t border-neutral-900 relative">
            <div className="max-w-4xl mx-auto text-center relative z-10">
                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-bold mb-8 tracking-tight flex justify-center"
                >
                    <DecryptedText text="AFFILIATIONS" animateOn="view" />
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-32">
                    <TiltedCard className="h-[400px]">
                        <div className="p-8 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
                                    <Code className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2 text-white">The Tech Mobius Club</h3>
                                <p className="text-neutral-400 font-light tracking-wide">Indraprastha International School</p>
                            </div>
                            <div className="pt-6 border-t border-white/10">
                                <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Role: Lead Developer</span>
                                <a
                                    href="https://techmobius.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-red-400 transition-colors text-sm font-medium"
                                >
                                    Visit Site <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </TiltedCard>

                    <TiltedCard className="h-[400px]">
                        <div className="p-8 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
                                    <Globe className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2 text-white">Hack Club</h3>
                                <p className="text-neutral-400 font-light tracking-wide">Global Nonprofit Network</p>
                            </div>
                            <div className="pt-6 border-t border-white/10">
                                <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Role: Member</span>
                                <a
                                    href="https://hackclub.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-white hover:text-red-400 transition-colors text-sm font-medium"
                                >
                                    Visit Site <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </div>
                    </TiltedCard>

                    <TiltedCard className="h-[400px]">
                        <div className="p-8 h-full flex flex-col justify-between">
                            <div>
                                <div className="w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center mb-6 text-red-500">
                                    <GraduationCap className="w-6 h-6" />
                                </div>
                                <h3 className="text-3xl font-bold mb-2 text-white">Student</h3>
                                <p className="text-neutral-400 font-light tracking-wide">Indraprastha International School</p>
                            </div>
                            <div className="pt-6 border-t border-white/10">
                                <span className="block text-xs text-neutral-500 uppercase tracking-widest mb-2">Grade: Class 9</span>
                                <span className="text-neutral-600 text-sm font-medium">2018 - Present</span>
                            </div>
                        </div>
                    </TiltedCard>
                </div>

                <motion.h2
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl md:text-5xl font-bold mb-8 mt-16 tracking-tight relative z-20 bg-black inline-block px-4"
                >
                    <DecryptedText text="TECHNICAL SKILLS" animateOn="view" />
                </motion.h2>

                <div className="relative max-w-4xl mx-auto mt-16 min-h-[800px]">
                    {/* Sticky Background Text */}
                    <div className="sticky top-1/3 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 opacity-50 mix-blend-overlay">
                        <span className="text-[15vw] md:text-[8rem] font-bold text-neutral-800 tracking-tighter whitespace-nowrap">
                            TECH STACK
                        </span>
                    </div>

                    {/* Magic Bento Grid with Scroll Skew */}
                    <motion.div
                        className="relative z-10 w-full mt-[-100px]"
                        style={{ skewY: smoothSkew }}
                    >
                        <MagicBento
                            cards={[
                                {
                                    title: "C++",
                                    description: "Core Language",
                                    label: "Expert",
                                    color: "rgba(23, 23, 23, 0.3)", // More transparent
                                    colSpan: 2,
                                    rowSpan: 2,
                                    // @ts-ignore
                                    fontSize: "font-black font-sans tracking-tighter", // Switched to font-sans for better weight support
                                    titleStyle: { fontSize: "40cqw", lineHeight: "0.8" } // Massive container-relative size
                                },
                                {
                                    title: "Python",
                                    description: "AI & Scripting",
                                    label: "Advanced",
                                    color: "rgba(23, 23, 23, 0.3)",
                                    colSpan: 1,
                                    rowSpan: 1,
                                    // @ts-ignore
                                    fontSize: "font-black font-sans tracking-tighter",
                                    titleStyle: { fontSize: "22cqw", lineHeight: "0.8" }
                                },
                                {
                                    title: "C#",
                                    description: "Game Dev",
                                    label: "Intermediate",
                                    color: "rgba(23, 23, 23, 0.3)",
                                    colSpan: 1,
                                    rowSpan: 1,
                                    // @ts-ignore
                                    fontSize: "font-black font-sans tracking-tighter",
                                    titleStyle: { fontSize: "35cqw", lineHeight: "0.8" }
                                },
                                {
                                    title: "GSAP 3",
                                    description: "Animations",
                                    label: "Creative",
                                    color: "rgba(23, 23, 23, 0.3)",
                                    colSpan: 1,
                                    rowSpan: 2,
                                    // @ts-ignore
                                    fontSize: "font-black font-sans tracking-tighter",
                                    titleStyle: { fontSize: "25cqw", lineHeight: "0.8" }
                                },
                                {
                                    title: "Web Stack",
                                    description: "HTML, CSS, JS",
                                    label: "Full Stack",
                                    color: "rgba(23, 23, 23, 0.3)",
                                    colSpan: 1,
                                    rowSpan: 2,
                                    // @ts-ignore
                                    fontSize: "font-black font-sans tracking-tighter",
                                    titleStyle: { fontSize: "25cqw", lineHeight: "0.8" }
                                },
                                {
                                    title: "React",
                                    description: "UI Library",
                                    label: "Frontend",
                                    color: "rgba(23, 23, 23, 0.3)",
                                    colSpan: 2,
                                    rowSpan: 1,
                                    // @ts-ignore
                                    fontSize: "font-black font-sans tracking-tighter",
                                    titleStyle: { fontSize: "35cqw", lineHeight: "0.8" }
                                }
                            ] as any[]}
                            textAutoHide={false}
                            glowColor="220, 38, 38" // Stronger Red
                            enableStars={true}
                            enableSpotlight={true}
                            enableBorderGlow={true}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
