import { WindowControls } from "#components";
import { locations } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import useLocationStore from "#store/location";
import useWindowStore from "#store/window";
import useThemeStore from "#store/theme";
import clsx from "clsx";
import { Search, ChevronLeft, ChevronRight, LayoutGrid, List } from "lucide-react";

const Finder = () => {
  const { openWindow } = useWindowStore();
  const { activeLocation, setActiveLocation } = useLocationStore();
  const isDark = useThemeStore((s) => s.isDark);

  const openItem = (item) => {
    if (item.fileType === "pdf") return openWindow("resume");
    if (item.kind === "folder") return setActiveLocation(item);
    if (["url"].includes(item.fileType) && item.href)
      return window.open(item.href, "_blank");

    openWindow(`${item.fileType}${item.kind}`, item);
  };

  const renderList = (name, items) => (
    <div className="mb-4">
      <h3
        className={`text-xs font-semibold px-3 mb-1 uppercase tracking-wider ${isDark ? "text-white/40" : "text-gray-400"}`}
      >
        {name}
      </h3>
      <ul className="space-y-0.5">
        {items.map((item) => (
          <li
            key={item.id}
            onClick={() => setActiveLocation(item)}
            className={clsx(
              "flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition-colors mx-2 text-sm",
              item.id === activeLocation?.id
                ? isDark
                  ? "bg-blue-500/80 text-white"
                  : "bg-blue-500 text-white"
                : isDark
                  ? "text-white/80 hover:bg-white/10"
                  : "text-gray-800 hover:bg-black/5"
            )}
          >
            <img src={item.icon} className="w-4 h-4" alt={item.name} />
            <span className="font-medium truncate">{item.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div className="flex flex-col h-full min-h-[400px]">
      {/* Header / Toolbar */}
      <div
        id="window-header"
        className="flex items-center px-4 py-2 border-b"
        style={{
          background: isDark
            ? "rgba(40, 40, 40, 0.95)"
            : "rgba(246, 246, 246, 0.95)",
          borderColor: isDark
            ? "rgba(255,255,255,0.06)"
            : "rgba(0,0,0,0.08)",
        }}
      >
        <div className="flex items-center min-w-[150px]">
          <WindowControls target="finder" />
        </div>

        {/* Toolbar Controls */}
        <div className="flex-1 flex justify-between items-center ml-4">
          <div className="flex items-center gap-2">
            <button
              disabled
              className={`p-1 rounded transition-colors opacity-40 cursor-not-allowed ${isDark ? "text-white/40" : "text-gray-400"}`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              disabled
              className={`p-1 rounded transition-colors opacity-40 cursor-not-allowed ${isDark ? "text-white/40" : "text-gray-400"}`}
            >
              <ChevronRight size={18} />
            </button>
            <span
              className={`font-semibold ml-2 ${isDark ? "text-white" : "text-black"}`}
            >
              {activeLocation?.name || "Finder"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex bg-black/5 rounded-md overflow-hidden">
              <button
                disabled
                className={`p-1 flex items-center justify-center opacity-60 cursor-not-allowed ${isDark ? "bg-white/20 text-white" : "bg-white text-black shadow-sm"}`}
              >
                <LayoutGrid size={16} />
              </button>
              <button
                disabled
                className={`p-1 flex items-center justify-center opacity-60 cursor-not-allowed ${isDark ? "text-white/50" : "text-gray-500"}`}
              >
                <List size={16} />
              </button>
            </div>
            <div
              className={`flex items-center gap-2 px-2 py-1 rounded-md ${isDark ? "bg-black/20" : "bg-black/5"}`}
            >
              <Search
                size={14}
                className={isDark ? "text-white/40" : "text-gray-400"}
              />
              <input
                type="text"
                placeholder="Search"
                disabled
                className={`bg-transparent outline-none text-xs w-24 opacity-60 cursor-not-allowed ${isDark ? "text-white placeholder-white/40" : "text-black placeholder-gray-500"}`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div
          className="w-48 flex-shrink-0 pt-4 overflow-y-auto border-r"
          style={{
            background: isDark
              ? "rgba(35, 35, 35, 0.95)"
              : "rgba(240, 240, 240, 0.95)",
            borderColor: isDark
              ? "rgba(255,255,255,0.06)"
              : "rgba(0,0,0,0.08)",
          }}
        >
          {renderList("Favorites", Object.values(locations))}
          {renderList("My Projects", locations.work.children)}
        </div>

        {/* Content Area */}
        <div
          className="flex-1 overflow-y-auto relative p-6"
          style={{
            background: isDark ? "rgba(30, 30, 30, 0.95)" : "#fff",
          }}
        >
          {activeLocation?.children?.length > 0 ? (
            <div className="grid grid-cols-4 gap-6 content-start">
              {activeLocation.children.map((item) => (
                <div
                  key={item.id}
                  onClick={() => openItem(item)}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div
                    className={`w-16 h-16 flex items-center justify-center rounded-lg transition-colors ${isDark ? "group-hover:bg-white/10" : "group-hover:bg-black/5"}`}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="w-12 h-12 object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <span
                    className={`text-xs text-center font-medium px-1.5 py-0.5 rounded ${isDark ? "text-white/90 group-hover:bg-blue-500 group-hover:text-white" : "text-gray-800 group-hover:bg-blue-500 group-hover:text-white"}`}
                  >
                    {item.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <span
                className={`text-sm ${isDark ? "text-white/40" : "text-gray-400"}`}
              >
                This folder is empty
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;