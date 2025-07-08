import Image from "next/image";
import Link from "next/link";
import { FaAnglesRight } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";

export default function BlogItem({ image, title, slug, date }) {
  return (
    <div className="relative pb-24 bg-white border-2 border-gray-200 shadow-lg rounded-lg hover:shadow-2xl transition duration-300">
      <Image
        priority
        src={image}
        alt={title}
        width={500}
        height={500}
        className="w-96 h-56 object-cover rounded-t-md md:w-full md:h-72"
      />

      <div className="absolute bottom-0 p-4 rounded-t-xl rounded-b-lg bg-white w-full">
        <h4 className="font-semibold break-words text-lg">{title}</h4>
        <p className="mt-1.5 text-gray-400 text-sm flex items-center gap-1">
          <FaRegCalendarAlt />
          {date}
        </p>
        <Link href={`/berita/${slug}`}>
          <p className="mt-3 text-white text-sm bg-sky-500 py-2 px-4 rounded hover:bg-sky-400 transition duration-300 w-max ms-auto flex justify-center items-center gap-1.5">
            Baca Selengkapnya <FaAnglesRight />
          </p>
        </Link>
      </div>
    </div>
  );
}
