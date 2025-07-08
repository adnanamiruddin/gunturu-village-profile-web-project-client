import publicClient from "../clients/public.client";
import privateClient from "../clients/private.client";

const infographicsEndpoint = {
  infographics: "/infographics",
};

const infographicsApi = {
  getInfographic: async () => {
    try {
      const response = await publicClient.get(
        infographicsEndpoint.infographics
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  saveInfographic: async ({
    totalPopulation,
    totalFamily,
    totalMale,
    totalFemale,
    totalEnvironment,
    dalobaMale,
    dalobaFemale,
    kassiMale,
    kassiFemale,
    jalayaMale,
    jalayaFemale,
    barangMale,
    barangFemale,
    nanasayaMale,
    nanasayaFemale,
    totalPlayground,
    totalElementarySchool,
    totalJuniorHighSchool,
    totalSeniorHighSchool,
    totalMosque,
    totalHealthCenter,
    totalPosyandu,
  }) => {
    try {
      const response = await privateClient.post(
        infographicsEndpoint.infographics,
        {
          totalPopulation,
          totalFamily,
          totalMale,
          totalFemale,
          totalEnvironment,
          dalobaMale,
          dalobaFemale,
          kassiMale,
          kassiFemale,
          jalayaMale,
          jalayaFemale,
          barangMale,
          barangFemale,
          nanasayaMale,
          nanasayaFemale,
          totalPlayground,
          totalElementarySchool,
          totalJuniorHighSchool,
          totalSeniorHighSchool,
          totalMosque,
          totalHealthCenter,
          totalPosyandu,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default infographicsApi;
