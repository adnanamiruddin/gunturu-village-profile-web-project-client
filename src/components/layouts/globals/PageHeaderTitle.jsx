export default function PageHeaderTitle({ title, description, bgSkyOnly }) {
  return (
    <div
      className={`-m-4 -mb-0 py-8 text-center ${
        bgSkyOnly ? "bg-sky-50" : "bg-gradient-to-b from-sky-50 to-gray-50"
      }`}
    >
      <h1 className="text-3xl font-bold text-sky-800 mb-4 relative inline-block md:text-4xl">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-teal-500">
          {title}
        </span>
        <div className="absolute -bottom-0.5 left-0 w-full h-1 bg-gradient-to-r from-sky-400 to-teal-300 rounded-full"></div>
      </h1>

      <p className="text-lg text-gray-600 mt-2 px-6">{description}</p>
    </div>
  );
}
