import Image from "next/image";

export default function PreviewImage({ image, alt, fullWidth }) {
  return (
    <div className="w-full h-full mt-3">
      <Image
        width={500}
        height={500}
        src={image}
        alt={alt ? alt : "Preview Image"}
        className={`object-contain border-4 border-gray-100 rounded-lg ${
          fullWidth
            ? `w-max h-[32rem] ${!image ? "border" : "border-none"}`
            : "w-max h-64"
        }`}
      />
    </div>
  );
}
