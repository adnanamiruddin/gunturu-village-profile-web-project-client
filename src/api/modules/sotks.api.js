import privateClient from "../clients/private.client";
import publicClient from "../clients/public.client";

const sotksEndpoint = {
  sotks: "/sotks",
  sotkById: ({ sotkId }) => `/sotks/${sotkId}`,
};

const sotksApi = {
  createSotk: async ({ name, position, photoURL }) => {
    try {
      const response = await privateClient.post(sotksEndpoint.sotks, {
        name,
        position,
        photoURL,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAllSotks: async () => {
    try {
      const response = await publicClient.get(sotksEndpoint.sotks);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getSotkById: async ({ sotkId }) => {
    try {
      const response = await publicClient.get(
        sotksEndpoint.sotkById({ sotkId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  editSotk: async ({ sotkId, name, position, photoURL }) => {
    try {
      const response = await privateClient.put(
        sotksEndpoint.sotkById({ sotkId }),
        {
          name,
          position,
          photoURL,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteSotk: async ({ sotkId }) => {
    try {
      const response = await privateClient.delete(
        sotksEndpoint.sotkById({ sotkId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default sotksApi;
