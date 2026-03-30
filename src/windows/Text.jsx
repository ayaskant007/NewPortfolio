import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile?.data;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{data.name}</h2>
      </div>

      <div className="p-6 flex flex-col gap-4 overflow-y-auto w-full h-full pb-10 text-gray-800 dark:text-gray-200 transition-colors">
        {data.image && (
          <img
            src={data.image}
            alt={data.name}
            className="w-full object-cover rounded-md mb-2"
          />
        )}
        
        {data.subtitle && (
          <h3 className="text-lg font-bold">{data.subtitle}</h3>
        )}

        <div className="flex flex-col gap-3 text-sm leading-relaxed">
          {data.description?.map((p, index) => (
            <p key={index}>{p}</p>
          ))}
        </div>
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, "txtfile");

export default TextWindow;
