import schedulesApi from "@/api/modules/schedules.api";
import Loading from "@/components/layouts/globals/Loading";
import NotFound from "@/components/layouts/globals/NotFound";
import PageHeaderTitle from "@/components/layouts/globals/PageHeaderTitle";
import ScheduleItem from "@/components/layouts/ScheduleItem";
import { formatDateToIndo } from "@/helpers/dateHelper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function SchedulesPage() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const [schedulesData, setSchedulesData] = useState([]);

  const fetchSchedulesData = async () => {
    const { response, error } = await schedulesApi.getAllSchedules();
    if (response) {
      setSchedulesData(response);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 500);
    }
    if (error) {
      toast.error(error.message);
      setErrorDataLoaded(true);
    }
  };
  //
  useEffect(() => {
    fetchSchedulesData();
  }, []);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="pb-4 md:px-24 md:mt-4 md:pb-10">
          <PageHeaderTitle
            title="ACARA GUNTURU"
            description="Acara terbaru seputar Desa Gunturu"
          />

          <div className="grid grid-cols-1 gap-5 overflow-auto md:grid-cols-3 md:gap-4">
            {schedulesData.slice(0, 4).map((schedule, i) => (
              <ScheduleItem
                key={i}
                fullWidth
                title={schedule.name}
                date={formatDateToIndo(schedule.date)}
                location={schedule.location}
              />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
