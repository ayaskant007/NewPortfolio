import useWindowStore from "#store/window";
import { X, Minus, Plus } from "lucide-react";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();
  return (
    <div id="window-controls" className="group/controls flex gap-2">
      <div 
        className="control-btn close bg-[#ff6157]" 
        onClick={() => closeWindow(target)}
      >
        <X size={8} strokeWidth={3} className="opacity-0 group-hover/controls:opacity-100 transition-opacity duration-200 text-black/60" />
      </div>
      <div 
        className="control-btn minimize bg-[#ffc030]" 
        onClick={(e) => {
            e.stopPropagation();
            minimizeWindow(target);
        }}
      >
        <Minus size={8} strokeWidth={3} className="opacity-0 group-hover/controls:opacity-100 transition-opacity duration-200 text-black/60" />
      </div>
      <div 
        className="control-btn maximize bg-[#2acb42]" 
        onClick={(e) => {
            e.stopPropagation();
            maximizeWindow(target);
        }}
      >
        <Plus size={8} strokeWidth={3} className="opacity-0 group-hover/controls:opacity-100 transition-opacity duration-200 text-black/60" />
      </div>
    </div>
  );
};

export default WindowControls;
