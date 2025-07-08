import publicClient from "../clients/public.client";
import privateClient from "../clients/private.client";

const vissionAndMissionsEndpoint = {
  vissionAndMissions: "/vissionAndMissions",
};

const vissionAndMissionsApi = {
  getVissionAndMission: async () => {
    try {
      const response = await publicClient.get(
        vissionAndMissionsEndpoint.vissionAndMissions
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  saveVissionAndMission: async ({ vission, mission }) => {
    try {
      const response = await privateClient.post(
        vissionAndMissionsEndpoint.vissionAndMissions,
        {
          vission,
          mission,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default vissionAndMissionsApi;
