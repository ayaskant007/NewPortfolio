import useWindowStore from "#store/window";
import { X, Minus, Maximize2 } from "lucide-react";
import { useState } from "react";

const WindowControls = ({ target }) => {
  const { closeWindow, minimizeWindow, maximizeWindow } = useWindowStore();
  const [hovered, setHovered] = useState(false);

  return (
    <div
      id="window-controls"
      className="flex gap-2 items-center"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        className="close size-3.5 rounded-full bg-[#ff6157] flex items-center justify-center cursor-pointer transition-all hover:brightness-90"
        onClick={() => closeWindow(target)}
        aria-label="Close"
      >
        {hovered && <X size={9} strokeWidth={2.5} className="text-[#4a0002]" />}
      </button>
      <button
        className="minimize size-3.5 rounded-full bg-[#ffc030] flex items-center justify-center cursor-pointer transition-all hover:brightness-90"
        onClick={() => minimizeWindow(target)}
        aria-label="Minimize"
      >
        {hovered && (
          <Minus size={9} strokeWidth={2.5} className="text-[#985600]" />
        )}
      </button>
      <button
        className="maximize size-3.5 rounded-full bg-[#2acb42] flex items-center justify-center cursor-pointer transition-all hover:brightness-90"
        onClick={() => maximizeWindow(target)}
        aria-label="Maximize"
      >
        {hovered && (
          <Maximize2 size={8} strokeWidth={2.5} className="text-[#006500]" />
        )}
      </button>
    </div>
  );
};

export default WindowControls;
