import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationDot, FaPeopleRoof } from "react-icons/fa6";

export default function ScheduleItem({ title, date, location, fullWidth }) {
  return (
    <div
      className={`bg-gray-50 ${
        fullWidth ? "w-full" : "w-72"
      } px-6 py-4 flex-shrink-0 shadow-xl border-2 border-gray-200 rounded-md hover:shadow-2xl transition duration-300 md:flex-grow`}
    >
      <FaPeopleRoof className="text-4xl" />
      <h4 className="mt-2 text-xl font-semibold">{title}</h4>
      <div className="mt-3.5">
        <div className="flex items-center gap-1.5">
          <FaCalendarAlt />
          <p className="text-sm">{date}</p>
        </div>
        <div className="mt-2 flex items-center gap-1.5">
          <FaLocationDot />
          <p className="text-sm">{location}</p>
        </div>
      </div>
    </div>
  );
}
