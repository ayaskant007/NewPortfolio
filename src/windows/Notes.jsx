import { useState } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useThemeStore from "#store/theme";
import { blogPosts } from "#constants";
import { FileText, ChevronRight } from "lucide-react";

const Notes = () => {
    const isDark = useThemeStore((s) => s.isDark);
    const [selectedPost, setSelectedPost] = useState(blogPosts[0] || null);

    return (
        <div className="flex h-full min-h-[400px]">
            {/* Sidebar */}
            <div
                className="w-56 flex-shrink-0 flex flex-col border-r overflow-y-auto rounded-bl-xl"
                style={{
                    background: isDark
                        ? "rgba(35, 35, 35, 0.95)"
                        : "rgba(245, 245, 245, 0.95)",
                    borderColor: isDark
                        ? "rgba(255,255,255,0.06)"
                        : "rgba(0,0,0,0.08)",
                }}
            >
                <div
                    id="window-header"
                    className="px-3 py-2 flex items-center gap-2"
                    style={{
                        background: isDark
                            ? "rgba(40, 40, 40, 0.95)"
                            : "rgba(246, 246, 246, 0.95)",
                        borderBottom: isDark
                            ? "1px solid rgba(255,255,255,0.06)"
                            : "1px solid rgba(0,0,0,0.08)",
                    }}
                >
                    <WindowControls target="notes" />
                    <span
                        className={`text-sm font-semibold ml-2 ${isDark ? "text-white/60" : "text-gray-500"}`}
                    >
                        Notes
                    </span>
                </div>

                <div className="p-2 space-y-0.5">
                    {blogPosts.map((post) => (
                        <button
                            key={post.id}
                            onClick={() => setSelectedPost(post)}
                            className={`w-full text-left px-3 py-2.5 rounded-lg transition-all ${selectedPost?.id === post.id
                                    ? isDark
                                        ? "bg-blue-500/30 text-white"
                                        : "bg-blue-100 text-blue-800"
                                    : isDark
                                        ? "text-white/70 hover:bg-white/5"
                                        : "text-gray-700 hover:bg-gray-200"
                                }`}
                        >
                            <div className="flex items-start gap-2">
                                <FileText
                                    size={14}
                                    className="mt-0.5 flex-shrink-0 text-yellow-500"
                                />
                                <div className="min-w-0">
                                    <p className="text-xs font-medium truncate">{post.title}</p>
                                    <p
                                        className={`text-[10px] mt-0.5 ${isDark ? "text-white/30" : "text-gray-400"}`}
                                    >
                                        {post.date}
                                    </p>
                                </div>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div
                className="flex-1 overflow-y-auto p-8 rounded-br-xl"
                style={{
                    background: isDark ? "rgba(30, 30, 30, 0.95)" : "#fff",
                }}
            >
                {selectedPost ? (
                    <article>
                        <p
                            className={`text-xs mb-2 ${isDark ? "text-white/30" : "text-gray-400"}`}
                        >
                            {selectedPost.date}
                        </p>
                        <h1
                            className={`text-xl font-bold mb-4 leading-tight ${isDark ? "text-white" : "text-gray-900"}`}
                        >
                            {selectedPost.title}
                        </h1>
                        <p
                            className={`text-sm leading-relaxed mb-6 ${isDark ? "text-white/70" : "text-gray-600"}`}
                        >
                            {selectedPost.content}
                        </p>
                        {selectedPost.link && (
                            <a
                                href={selectedPost.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-400 transition-colors"
                            >
                                View Project <ChevronRight size={14} />
                            </a>
                        )}
                    </article>
                ) : (
                    <div className="h-full flex items-center justify-center">
                        <p
                            className={`text-sm ${isDark ? "text-white/30" : "text-gray-400"}`}
                        >
                            Select a note
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

const NotesWindow = WindowWrapper(Notes, "notes");

export default NotesWindow;
