import publicClient from "../clients/public.client";
import privateClient from "../clients/private.client";

const greetingsEndpoint = {
  greetings: "/greetings",
};

const greetingsApi = {
  getGreeting: async () => {
    try {
      const response = await publicClient.get(greetingsEndpoint.greetings);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  saveGreeting: async ({
    villageHeadName,
    villageHeadPhotoURL,
    greetingContent,
  }) => {
    try {
      const response = await privateClient.post(greetingsEndpoint.greetings, {
        villageHeadName,
        villageHeadPhotoURL,
        greetingContent,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default greetingsApi;
