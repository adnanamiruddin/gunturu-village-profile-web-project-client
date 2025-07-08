import publicClient from "../clients/public.client";
import privateClient from "../clients/private.client";

const galleryEndpoint = {
  gallery: "/gallery",
};

const galleryApi = {
  getGallery: async () => {
    try {
      const response = await publicClient.get(galleryEndpoint.gallery);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  saveGallery: async (images) => {
    try {
      const formattedImages = images.reduce((acc, image, index) => {
        acc[`image${index + 1}Title`] = image.title;
        acc[`image${index + 1}Description`] = image.description || "";
        acc[`image${index + 1}URL`] = image.url;
        return acc;
      }, {});

      const response = await privateClient.post(
        galleryEndpoint.gallery,
        formattedImages
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default galleryApi;
