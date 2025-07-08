import Image from "next/image";

export default function ImageHoverEffect({ src, title, description }) {
  return (
    <div className="relative overflow-hidden group">
      {/* Gambar */}
      <div className="transition-transform duration-500 ease-in-out transform group-hover:scale-110">
        <Image
          width={500}
          height={500}
          className="rounded-lg md:object-cover md:h-[300px]"
          src={src}
          alt={title}
        />
      </div>

      {/* Overlay Gelap */}
      <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity duration-500 ease-in-out group-hover:bg-opacity-50 rounded-lg"></div>

      {/* Teks (Judul dan Deskripsi) */}
      <div className="absolute bottom-0 left-0 p-4 text-white opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
        <h4 className="font-bold">{title}</h4>
        {description ? <p className="text-sm">{description}</p> : null}
      </div>
    </div>
  );
}
