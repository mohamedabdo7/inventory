const images_base = import.meta.env.VITE_IMAGES_URL;

const imageHandler = (image?: string | null) => {
  if (image) {
    return `${images_base}${image}`;
  }
  return "";
};

export default imageHandler;
