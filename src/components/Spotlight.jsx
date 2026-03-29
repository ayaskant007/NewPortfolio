import { useEffect, useState, useRef } from "react";
import { Search } from "lucide-react";
import { dockApps, locations } from "#constants";
import useWindowStore from "#store/window";

const Spotlight = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const { openWindow } = useWindowStore();
    const inputRef = useRef(null);

    useEffect(() => {
        const handleKeyDown = (e) => {
            // Cmd + Space or Ctrl + Space
            if ((e.metaKey || e.ctrlKey) && e.code === "Space") {
                e.preventDefault();
                setIsOpen(prev => !prev);
                setQuery("");
            }
            if (e.key === "Escape" && isOpen) {
                setIsOpen(false);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 50);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    // Search apps
    const apps = dockApps.filter(app => app.name.toLowerCase().includes(query.toLowerCase()) && app.canOpen);
    
    // Search files in work workspace
    let files = [];
    if (locations.work?.children) {
        locations.work.children.forEach(folder => {
            if (folder.name.toLowerCase().includes(query.toLowerCase())) {
                files.push({ ...folder, parentType: "folder" });
            }
            folder.children?.forEach(file => {
               if (file.name.toLowerCase().includes(query.toLowerCase())) {
                   files.push({ ...file, parentType: "file" });
               }
            });
        });
    }

    const results = [...apps, ...files].slice(0, 6);

    const handleSelect = (item) => {
        setIsOpen(false);
        if (item.id && typeof item.id === "string") {
            // It's a dock app
            openWindow(item.id);
        } else if (item.parentType) {
            // It's a file, open finder focused on it
            openWindow("finder");
        }
    };

    return (
        <div className="fixed inset-0 z-[999999] flex items-start justify-center pt-[20vh] bg-black/20" onClick={() => setIsOpen(false)}>
            <div 
                className="w-full max-w-2xl bg-white/70 dark:bg-[#1e1e1e]/80 backdrop-blur-3xl rounded-xl shadow-2xl border border-black/10 dark:border-white/10 overflow-hidden flex flex-col"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex items-center px-4 py-3 border-b border-black/10 dark:border-white/10 gap-3">
                    <Search className="text-black/50 dark:text-white/50" size={24} />
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        placeholder="Spotlight Search"
                        className="flex-1 bg-transparent text-2xl outline-none text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30"
                        spellCheck={false}
                    />
                </div>
                
                {query && results.length > 0 && (
                    <div className="py-2 max-h-[400px] overflow-y-auto">
                        <div className="px-4 py-1 text-xs font-semibold text-black/50 dark:text-white/50">Top Hits</div>
                        {results.map((r, i) => (
                            <div 
                                key={i} 
                                className="px-4 py-2 hover:bg-blue-500 hover:text-white cursor-pointer flex items-center gap-3 text-black dark:text-white"
                                onClick={() => handleSelect(r)}
                            >
                                <img src={`/images/${r.icon || 'placeholder.png'}`} className="w-8 h-8 object-contain" alt="icon" />
                                <div>
                                    <div className="font-medium">{r.name}</div>
                                    <div className="text-xs opacity-60 text-inherit capitalize">{r.parentType || "Application"}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Spotlight;
