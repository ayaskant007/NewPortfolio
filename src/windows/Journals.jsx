import { WindowControls } from "#components";
import { blogPosts } from "#constants";
import WindowWrapper from "#hoc/WindowWrapper";
import { MoveRight } from "lucide-react";

/**
 * Journals App
 * Migrated from the old Safari content.
 * Displays developer articles and blog posts.
 */
const Journals = () => {
  return (
    <div className="flex flex-col w-[800px] h-[600px] bg-white dark:bg-[#1a1a1a] text-black dark:text-white">
      <div id="window-header" className="flex items-center px-4 py-3 border-b border-black/10 dark:border-white/10 bg-gray-50 dark:bg-[#2a2a2a]">
        <WindowControls target="journals" />
        <h2 className="flex-1 text-center font-bold text-sm">Journals</h2>
      </div>

      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-3xl mx-auto space-y-12">
            <header className="border-b border-black/5 dark:border-white/5 pb-6">
                <h1 className="text-3xl font-bold text-pink-600">My Developer Blog</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2 italic">Insights, tutorials, and journeys in code.</p>
            </header>

            <div className="space-y-10">
            {blogPosts.map(({ id, image, title, date, link }) => (
                <div key={id} className="grid grid-cols-12 gap-6 group cursor-default">
                    <div className="col-span-4 overflow-hidden rounded-xl border border-black/5 dark:border-white/10">
                        <img 
                            src={image} 
                            alt={title} 
                            className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                    </div>

                    <div className="col-span-8 flex flex-col justify-center">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">{date}</p>
                        <h3 className="text-xl font-bold mt-2 leading-tight group-hover:text-pink-500 transition-colors uppercase">{title}</h3>
                        <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-600 transition-colors"
                        >
                            Read Article <MoveRight className="w-4 h-4" />
                        </a>
                    </div>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default WindowWrapper(Journals, "journals");
