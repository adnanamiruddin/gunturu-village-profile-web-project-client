import Image from "next/image";
import Link from "next/link";

export default function DashboardLogo() {
  return (
    <Link href="/">
      <div className="flex">
        <Image
          src="/logo-regency.png"
          alt="Kabupaten Bulukumba"
          width={500}
          height={500}
          className="w-14 h-14 object-contain"
        />
        <div className="ms-2 -mt-1">
          <p className="text-2xl font-serif font-bold">Gunturu</p>
          <p className="mt-1 font-sans font-semibold uppercase">
            Kab. Bulukumba
          </p>
        </div>
      </div>
    </Link>
  );
}
