import { useMemo } from "react";
import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";
import useLocationStore from "#store/location";
import { photosLinks, gallery } from "#constants";

const Photos = () => {
  const { openWindow } = useWindowStore();
  const { photosCategory, setPhotosCategory } = useLocationStore();
  const selectedCategory = photosCategory;

  const galleryItems = useMemo(
    () =>
      gallery.map((item, index) => ({
        ...item,
        id: item.id,
        src: item.img,
        name: `Gallery Image ${item.id}`,
        category: photosLinks[index % photosLinks.length]?.title ?? "Library",
      })),
    [],
  );

  const openImage = (image) => {
    openWindow("imgfile", {
      name: image.name,
      imageUrl: image.src,
    });
  };

  const filteredImages = galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <>
      <div id="window-header">
        <WindowControls target="photos" />
        <p>Photos</p>
      </div>

      <div className="flex h-full">
        <div className="sidebar">
          <h2>Photos</h2>
          <ul>
            {photosLinks.map(({ id, title, icon }) => (
              <li
                key={id}
                className={title === selectedCategory ? "active" : ""}
                onClick={() => setPhotosCategory(title)}
              >
                <img src={icon} className="w-4 h-4" alt={`${title} icon`} />
                <p>{title}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="gallery">
          <ul>
            {filteredImages.length ? (
              filteredImages.map((image) => (
                <li key={image.id} onClick={() => openImage(image)}>
                  <img src={image.src} alt={image.name} />
                </li>
              ))
            ) : (
              <li className="col-span-full text-center text-gray-500">No photos in this category yet.</li>
            )}
          </ul>
        </div>
      </div>
    </>
  );
};

const PhotosWindow = WindowWrapper(Photos, "photos");

export default PhotosWindow;