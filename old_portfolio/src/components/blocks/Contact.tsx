"use client";

import React from "react";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import Magnet from "../ui/Magnet";
import Footer3D from "../ui/Footer3D";

export default function Contact() {
    const [time, setTime] = React.useState("");

    React.useEffect(() => {
        setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer id="contact" className="relative md:fixed bottom-0 left-0 w-full md:h-screen md:min-h-[800px] bg-neutral-950 text-white flex flex-col justify-between z-0 md:-z-10 px-4 md:px-10 py-20 overflow-hidden min-h-screen md:min-h-0">
            {/* Background Text */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 select-none overflow-hidden">
                <h1 className="text-[20vw] font-black text-neutral-800 tracking-tighter whitespace-nowrap">
                    SAY HELLO
                </h1>
            </div>

            <Footer3D />

            <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col justify-center">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">
                            LET'S WORK <br />
                            <span className="text-red-600">TOGETHER</span>
                        </h2>
                        <p className="text-xl text-neutral-400 max-w-md mb-12">
                            Have a project in mind? Let's build something extraordinary.
                            I'm always open to discussing new ideas and opportunities.
                        </p>

                        <div className="flex flex-col gap-6">
                            <Magnet>
                                <a href="mailto:ayaskantsahoo007@gmail.com" className="flex items-center gap-4 text-2xl hover:text-red-500 transition-colors group w-fit">
                                    <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center group-hover:border-red-500 group-hover:bg-red-500/10 transition-all">
                                        <Mail className="w-5 h-5" />
                                    </span>
                                    ayaskantsahoo007@gmail.com
                                </a>
                            </Magnet>
                            <div className="flex items-center gap-4 text-2xl text-neutral-400">
                                <span className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center">
                                    <MapPin className="w-5 h-5" />
                                </span>
                                New Delhi, India
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="flex flex-col gap-4"
                    >
                        <SocialLink
                            href="https://instagram.com/ayaskant_007"
                            icon={<Instagram className="w-6 h-6" />}
                            label="Instagram"
                            username="@ayaskant_007"
                        />
                        <SocialLink
                            href="https://www.linkedin.com/in/ayaskant-sahoo/"
                            icon={<Linkedin className="w-6 h-6" />}
                            label="LinkedIn"
                            username="Ayaskant Sahoo"
                        />
                        <SocialLink
                            href="https://github.com/ayaskant007"
                            icon={<Github className="w-6 h-6" />}
                            label="GitHub"
                            username="@ayaskant007"
                        />
                    </motion.div>
                </div>
            </div>

            <div className="w-full flex justify-between items-end border-t border-white/10 pt-8 relative z-10">
                <div className="text-neutral-500">
                    <p>© {new Date().getFullYear()} Ayaskant Sahoo.</p>
                    <p>Crafted with Next.js & R3F.</p>
                </div>
                <div className="text-right">
                    <p className="text-neutral-500 text-sm mb-2">LOCAL TIME</p>
                    <p className="text-xl font-mono text-red-500">
                        {time} IST
                    </p>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon, label, username }: { href: string; icon: React.ReactNode; label: string; username: string }) {
    return (
        <Magnet>
            <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-6 border border-neutral-800 rounded-2xl hover:bg-neutral-900 hover:border-red-500/50 transition-all group bg-black/50 backdrop-blur-sm"
            >
                <div className="flex items-center gap-6">
                    <div className="p-3 bg-neutral-900 rounded-xl text-white group-hover:text-red-500 transition-colors shadow-lg shadow-red-500/5">
                        {icon}
                    </div>
                    <div>
                        <span className="block text-xs text-neutral-500 uppercase tracking-wider mb-1">{label}</span>
                        <span className="font-bold text-xl">{username}</span>
                    </div>
                </div>
                <span className="text-neutral-600 group-hover:translate-x-1 group-hover:text-red-500 transition-all text-2xl">
                    &rarr;
                </span>
            </a>
        </Magnet>
    );
}
