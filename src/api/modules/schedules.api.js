import privateClient from "../clients/private.client";
import publicClient from "../clients/public.client";

const schedulesEndpoint = {
  schedules: "/schedules",
  scheduleById: ({ scheduleId }) => `/schedules/${scheduleId}`,
};

const schedulesApi = {
  createSchedule: async ({ name, date, location }) => {
    try {
      const response = await privateClient.post(schedulesEndpoint.schedules, {
        name,
        date,
        location,
      });
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getAllSchedules: async () => {
    try {
      const response = await publicClient.get(schedulesEndpoint.schedules);
      return { response };
    } catch (error) {
      return { error };
    }
  },

  getScheduleById: async ({ scheduleId }) => {
    try {
      const response = await publicClient.get(
        schedulesEndpoint.scheduleById({ scheduleId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  editSchedule: async ({ scheduleId, name, date, location }) => {
    try {
      const response = await privateClient.put(
        schedulesEndpoint.scheduleById({ scheduleId }),
        {
          name,
          date,
          location,
        }
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },

  deleteSchedule: async ({ scheduleId }) => {
    try {
      const response = await privateClient.delete(
        schedulesEndpoint.scheduleById({ scheduleId })
      );
      return { response };
    } catch (error) {
      return { error };
    }
  },
};

export default schedulesApi;
