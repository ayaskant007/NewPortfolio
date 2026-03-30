import { useState, useRef } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useThemeStore from "#store/theme";
import {
  ChevronLeft,
  ChevronRight,
  Lock,
  Plus,
  PanelLeft,
  Share,
  RotateCcw,
} from "lucide-react";

const DEFAULT_URL = "https://ayaskant007.is-a.dev/";

const Safari = () => {
  const isDark = useThemeStore((s) => s.isDark);
  const [url, setUrl] = useState(DEFAULT_URL);
  const [loadedUrl, setLoadedUrl] = useState(DEFAULT_URL);
  const [tabs, setTabs] = useState([
    { id: 1, title: "Portfolio", url: DEFAULT_URL },
  ]);
  const [activeTab, setActiveTab] = useState(1);
  const iframeRef = useRef(null);

  const handleNavigate = (e) => {
    e.preventDefault();
    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http")) {
      targetUrl = "https://" + targetUrl;
    }
    setLoadedUrl(targetUrl);
    setTabs((prev) =>
      prev.map((t) =>
        t.id === activeTab ? { ...t, url: targetUrl, title: targetUrl.replace(/https?:\/\//, "").split("/")[0] } : t,
      ),
    );
  };

  const addTab = () => {
    const newId = Math.max(...tabs.map((t) => t.id)) + 1;
    const newTab = {
      id: newId,
      title: "New Tab",
      url: "about:blank",
    };
    setTabs([...tabs, newTab]);
    setActiveTab(newId);
    setUrl("");
    setLoadedUrl("about:blank");
  };

  const closeTab = (id) => {
    if (tabs.length <= 1) return;
    const remaining = tabs.filter((t) => t.id !== id);
    setTabs(remaining);
    if (activeTab === id) {
      setActiveTab(remaining[0].id);
      setUrl(remaining[0].url);
      setLoadedUrl(remaining[0].url);
    }
  };

  const switchTab = (tab) => {
    setActiveTab(tab.id);
    setUrl(tab.url);
    setLoadedUrl(tab.url);
  };

  const glassToolbar = {
    background: isDark
      ? "rgba(40, 40, 40, 0.85)"
      : "rgba(246, 246, 246, 0.9)",
    backdropFilter: "blur(20px)",
    borderBottom: isDark
      ? "1px solid rgba(255,255,255,0.06)"
      : "1px solid rgba(0,0,0,0.08)",
  };

  return (
    <div className="flex flex-col h-full w-full h-[65vh] min-h-[400px]">
      {/* Toolbar */}
      <div id="window-header" style={glassToolbar}>
        <WindowControls target="safari" />

        <PanelLeft className="ml-8 icon" size={16} />

        <div className="flex items-center gap-1 ml-4">
          <button className="p-1 rounded hover:bg-black/5">
            <ChevronLeft size={16} className="text-gray-400" />
          </button>
          <button className="p-1 rounded hover:bg-black/5">
            <ChevronRight size={16} className="text-gray-400" />
          </button>
        </div>

        {/* URL Bar */}
        <form
          onSubmit={handleNavigate}
          className="flex-1 flex items-center justify-center mx-4"
        >
          <div
            className="flex items-center gap-2 w-2/3 rounded-lg px-3 py-1.5"
            style={{
              background: isDark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.04)",
              border: isDark
                ? "1px solid rgba(255,255,255,0.1)"
                : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            <Lock size={12} className="text-gray-400 flex-shrink-0" />
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Search or enter website name"
              className={`flex-1 bg-transparent outline-none text-sm ${isDark
                  ? "text-white placeholder:text-white/30"
                  : "text-gray-800 placeholder:text-gray-400"
                }`}
            />
          </div>
        </form>

        <div className="flex items-center gap-3">
          <Share size={16} className="text-gray-400 cursor-pointer" />
          <button onClick={addTab}>
            <Plus size={16} className="text-gray-400 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Tab Bar */}
      {tabs.length > 1 && (
        <div
          className="flex items-center px-2 py-1 gap-1 overflow-x-auto"
          style={{
            background: isDark
              ? "rgba(35, 35, 35, 0.9)"
              : "rgba(240, 240, 240, 0.9)",
          }}
        >
          {tabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => switchTab(tab)}
              className={`flex items-center gap-2 px-3 py-1 rounded-lg text-xs cursor-pointer transition-all max-w-[180px] ${activeTab === tab.id
                  ? isDark
                    ? "bg-white/10 text-white"
                    : "bg-white text-gray-800 shadow-sm"
                  : isDark
                    ? "text-white/50 hover:bg-white/5"
                    : "text-gray-500 hover:bg-black/5"
                }`}
            >
              <span className="truncate">{tab.title}</span>
              {tabs.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    closeTab(tab.id);
                  }}
                  className="text-gray-400 hover:text-gray-600 ml-1"
                >
                  ×
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Content - iframe */}
      <div className="flex-1 bg-white relative">
        {loadedUrl === "about:blank" ? (
          <div
            className={`h-full flex flex-col items-center justify-center ${isDark ? "bg-neutral-900" : "bg-gray-50"}`}
          >
            <p
              className={`text-lg font-medium ${isDark ? "text-white/40" : "text-gray-400"}`}
            >
              New Tab
            </p>
            <p
              className={`text-sm mt-1 ${isDark ? "text-white/20" : "text-gray-300"}`}
            >
              Type a URL above to browse
            </p>
          </div>
        ) : (
          <iframe
            ref={iframeRef}
            src={loadedUrl}
            title="Safari Browser"
            className="w-full h-full border-0 absolute inset-0"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        )}
      </div>
    </div>
  );
};

const SafariWindow = WindowWrapper(Safari, "safari");

export default SafariWindow;
