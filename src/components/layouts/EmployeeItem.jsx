import Image from "next/image";

export default function EmployeeItem({ name, position, photo }) {
  return (
    <div className="border border-gray-200 rounded-md flex-shrink-0 md:flex-grow">
      <Image
        src={photo}
        alt={name}
        width={500}
        height={500}
        className="w-40 h-40 object-cover md:w-full md:h-80"
      />
      <div className="bg-gradient-to-br from-sky-800 to-sky-400 text-white p-4 rounded-b-md">
        <h4 className="text-center font-semibold text-lg md:text-2xl">
          {name}
        </h4>
        <p className="mt-1 text-center md:text-lg">{position}</p>
      </div>
    </div>
  );
}
