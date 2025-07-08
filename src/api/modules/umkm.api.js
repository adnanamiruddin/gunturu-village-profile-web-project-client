import privateClient from "../clients/private.client";
import publicClient from "../clients/public.client";

const umkmsEndpoint = {
  umkms: "/umkms",
  umkmBySlug: ({ slug }) => `/umkms/${slug}`,
  umkmById: ({ umkmId }) => `/umkms/${umkmId}`,
};

const umkmsApi = {
  createUmkm: async ({
    name,
    slug,
    priceRange,
    description,
    whatsappNumber,
    imageURL,
  }) => {
    try {
      const response = await privateClient.post(umkmsEndpoint.umkms, {
        name,
        slug,
        priceRange,
        description,
        whatsappNumber,
        imageURL,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAllUmkms: async () => {
    try {
      const response = await publicClient.get(umkmsEndpoint.umkms);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getUmkmBySlug: async ({ slug }) => {
    try {
      const response = await publicClient.get(
        umkmsEndpoint.umkmBySlug({ slug })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  editUmkm: async ({
    umkmId,
    name,
    slug,
    priceRange,
    description,
    whatsappNumber,
    imageURL,
  }) => {
    try {
      const response = await privateClient.put(
        umkmsEndpoint.umkmById({ umkmId }),
        {
          name,
          slug,
          priceRange,
          description,
          whatsappNumber,
          imageURL,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteUmkm: async ({ umkmId }) => {
    try {
      const response = await privateClient.delete(
        umkmsEndpoint.umkmById({ umkmId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default umkmsApi;
