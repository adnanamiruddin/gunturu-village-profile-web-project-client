import Image from "next/image";
import Link from "next/link";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegMoneyBill1 } from "react-icons/fa6";

export default function UmkmItem({ image, name, slug, price, fullWidth }) {
  return (
    <div
      className={`bg-white ${
        fullWidth ? "w-full" : "w-[19rem]"
      } flex-shrink-0 border border-gray-200 shadow-lg rounded-lg hover:shadow-2xl transition duration-300 md:flex-grow`}
    >
      <Image
        priority
        src={image}
        alt={name}
        width={500}
        height={500}
        className="w-96 h-56 object-cover rounded-t md:w-full md:h-72"
      />

      <div className="p-4">
        <h4 className="font-semibold break-words text-xl">{name}</h4>
        <p className="mt-1 font-semibold text-gray-500 flex items-center gap-1.5">
          <FaRegMoneyBill1 className="text-lg mt-0.5" />
          {price}
        </p>
        <Link href={`/umkm/${slug}`}>
          <p className="mt-3 text-white text-sm bg-sky-500 py-2 px-4 rounded hover:bg-sky-400 transition duration-300 w-max ms-auto flex justify-center items-center gap-1.5">
            Lihat Selengkapnya <IoEyeOutline className="text-lg mt-0.5" />
          </p>
        </Link>
      </div>
    </div>
  );
}
