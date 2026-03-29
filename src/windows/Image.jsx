import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <p>{data.name}</p>
      </div>

      <div className="preview">
        {data.imageUrl && (
          <img src={data.imageUrl} alt={data.name} />
        )}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, "imgfile");

export default ImageWindow;
