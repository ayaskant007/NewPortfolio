import { useState, useRef } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import { 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Search, 
  ShieldCheck, 
  Share, 
  Plus, 
  Grid
} from "lucide-react";

/**
 * Functional Safari Browser
 * Features: Address bar, search integration, and iframe content.
 * Note: Some sites (LinkedIn, Google) block iframes.
 */
const Safari = () => {
    const [url, setUrl] = useState("ayaskant.dev/linkedin"); // Mock Home Page initially
    const [inputValue, setInputValue] = useState("ayaskant.dev/linkedin");
    const [isIframeBlocked, setIsIframeBlocked] = useState(true);
    const iframeRef = useRef(null);

    const handleSearch = (e) => {
        if (e.key === "Enter") {
            let input = inputValue.trim();
            if (!input.includes(".") && !input.startsWith("http")) {
                // Search Google/Bing if not a URL
                input = `https://www.bing.com/search?q=${encodeURIComponent(input)}`;
            } else if (!input.startsWith("http")) {
                input = `https://${input}`;
            }
            setUrl(input);
            setIsIframeBlocked(false);
        }
    };

    const isLinkedIn = url.includes("linkedin");

    return (
        <div className="flex flex-col w-full h-full bg-[#f6f6f6] dark:bg-[#1e1e1e] text-black dark:text-white rounded-xl overflow-hidden min-w-[800px] min-h-[500px]">
            {/* Browser Toolbar */}
            <div id="window-header" className="flex items-center gap-4 px-4 py-2 bg-[#ebebeb] dark:bg-[#2d2d2d] border-b border-black/10 dark:border-white/5">
                <WindowControls target="safari" />
                
                <div className="flex items-center gap-4 ml-4">
                    <ChevronLeft className="w-5 h-5 text-gray-400 cursor-not-allowed" />
                    <ChevronRight className="w-5 h-5 text-gray-400 cursor-not-allowed" />
                </div>

                <div className="flex-1 flex items-center justify-center">
                    <div className="relative w-full max-w-2xl group">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                           <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
                           <Search className="w-3.5 h-3.5 text-gray-400" />
                        </div>
                        <input 
                            type="text" 
                            className="w-full bg-white dark:bg-[#1e1e1e] border border-black/5 dark:border-white/10 rounded-lg py-1.5 px-16 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/30 transition-all font-medium"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleSearch}
                            placeholder="Search or enter website"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            <RotateCw className="w-3.5 h-3.5 text-gray-400 cursor-pointer hover:text-black dark:hover:text-white" />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <Share className="w-4 h-4 text-gray-500 cursor-pointer hover:text-black dark:hover:text-white" />
                    <Plus className="w-4 h-4 text-gray-500 cursor-pointer hover:text-black dark:hover:text-white" />
                    <Grid className="w-4 h-4 text-gray-500 cursor-pointer hover:text-black dark:hover:text-white" />
                </div>
            </div>

            {/* Browser Content */}
            <div className="flex-1 relative bg-white dark:bg-black">
                {isLinkedIn ? (
                    /* High-Fidelity LinkedIn Mock (since LinkedIn blocks iframes) */
                    <div className="w-full h-full flex flex-col bg-[#f3f2ef] overflow-y-auto">
                        <nav className="h-12 bg-white border-b border-black/10 flex items-center px-40 sticky top-0 z-10">
                            <div className="text-blue-600 font-bold text-xl">Linked<span className="bg-blue-600 text-white rounded p-0.5 ml-0.5">in</span></div>
                            <div className="flex-1"></div>
                            <div className="flex gap-6 text-gray-500 text-xs font-semibold">
                                <span>Home</span>
                                <span>My Network</span>
                                <span>Jobs</span>
                                <span className="text-black border-b-2 border-black pb-3">Profile</span>
                            </div>
                        </nav>
                        
                        <div className="max-w-6xl mx-auto w-full mt-6 grid grid-cols-12 gap-6 p-4">
                            <div className="col-span-8 space-y-4">
                                <div className="bg-white rounded-xl border border-black/10 overflow-hidden">
                                    <div className="h-48 bg-gradient-to-r from-blue-400 to-indigo-500 relative">
                                        <div className="absolute -bottom-16 left-8 bg-white p-1 rounded-full">
                                            <div className="w-32 h-32 rounded-full bg-gray-200 border-4 border-white overflow-hidden">
                                                <img src="/images/adrian.jpg" alt="Ayaskant" className="w-full h-full object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pt-20 pb-8 px-8">
                                        <h1 className="text-2xl font-bold">Ayaskant Sahoo</h1>
                                        <p className="text-lg text-gray-600">Full Stack Developer | Game Designer | System Architect</p>
                                        <p className="text-sm text-gray-400 mt-2">Bhubaneswar, Odisha, India</p>
                                        <div className="mt-4 flex gap-2">
                                            <button className="bg-blue-600 text-white px-4 py-1.5 rounded-full font-semibold hover:bg-blue-700 transition">Follow</button>
                                            <button className="border border-blue-600 text-blue-600 px-4 py-1.5 rounded-full font-semibold hover:bg-blue-50 transition">Message</button>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="bg-white rounded-xl border border-black/10 p-6">
                                    <h2 className="text-xl font-bold mb-4 italic">About</h2>
                                    <p className="text-gray-700 leading-relaxed uppercase">
                                       I am a developer driven by creating immersive digital experiences. Currently building the future of web interfaces with modern macOS replicas, interactive tech stacks, and modular game engines.
                                    </p>
                                </div>
                            </div>
                            
                            <div className="col-span-4 space-y-4">
                                <div className="bg-white rounded-xl border border-black/10 p-4">
                                    <h2 className="font-bold mb-3">Promoted</h2>
                                    <div className="space-y-4">
                                        <div className="flex gap-3">
                                            <div className="w-10 h-10 bg-gray-200 rounded shrink-0"></div>
                                            <div>
                                                <p className="text-xs font-bold uppercase">Work with Ayaskant</p>
                                                <p className="text-[10px] text-gray-500">Hire the best talent for your NextJS projects.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <iframe 
                        ref={iframeRef}
                        src={url} 
                        className="w-full h-full border-none"
                        title="Safari Browser Frame"
                    />
                )}
            </div>
        </div>
    );
};

export default WindowWrapper(Safari, "safari");
