import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { IoMenu } from "react-icons/io5";

const navItems = [
  {
    href: "/",
    label: "Beranda",
  },
  {
    href: "/profil-desa",
    label: "Profil Desa",
  },
  {
    href: "/sejarah",
    label: "Sejarah",
  },
  {
    href: "/infografis",
    label: "Infografis",
  },
  {
    href: "/berita",
    label: "Berita",
  },
  {
    href: "/acara",
    label: "Acara",
  },
  {
    href: "/wisata",
    label: "Wisata",
  },
  {
    href: "/mitigasi-bencana",
    label: "Mitigasi Bencana",
  },
  {
    href: "/umkm",
    label: "UMKM",
  },
];

export default function Navbar({ isCarouselPassed }) {
  const router = useRouter();

  return (
    <div
      className={`text-white px-3.5 py-3 grid grid-cols-3 items-center fixed w-full shadow-lg z-[99999] md:px-6 md:py-2 ${
        isCarouselPassed || router.pathname !== "/"
          ? "bg-white"
          : "bg-transparent md:shadow-none"
      } transition-colors duration-500`}
    >
      <Link
        href="/"
        className="col-span-2 md:col-span-1 bg-transparent hover:shadow-slate-900 hover:backdrop-blur-sm hover:bg-transparent flex items-center gap-1.5 md:py-2"
      >
        <Image
          src="/logo-regency.png"
          alt="Logo Kabupaten Bulukumba"
          width={200}
          height={200}
          className="w-14 h-14 object-contain"
        />
        <div
          className={`${
            isCarouselPassed || router.pathname !== "/"
              ? "text-black"
              : "text-white"
          } transition-colors duration-500`}
        >
          <h1 className="-mt-1 text-2xl font-serif font-bold">Gunturu</h1>
          <p className="ms-0.5 mt-0.5 font-sans font-semibold uppercase">
            Kab. Bulukumba
          </p>
        </div>
      </Link>

      {/* Mobile View START */}
      <div className="col-span-1 ms-auto w-max drawer-end md:hidden">
        <input id="navbar_drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label
            htmlFor="navbar_drawer"
            className="px-1 py-0.5 flex justify-center items-center"
          >
            <IoMenu
              className={`text-4xl ${
                isCarouselPassed || router.pathname !== "/"
                  ? "text-black"
                  : "text-white"
              } transition-colors duration-500`}
            />
          </label>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="navbar_drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-white text-black gap-3">
            <div
              href="/"
              className="col-span-2 md:col-span-1 bg-transparent hover:shadow-slate-900 hover:backdrop-blur-sm hover:bg-transparent flex items-center gap-1.5 mb-2"
            >
              <Image
                src="/logo-regency.png"
                alt="Logo Kabupaten Bulukumba"
                width={200}
                height={200}
                className="w-14 h-14 object-contain"
              />
              <div>
                <h1 className="text-2xl font-serif font-bold">Desa Bunturu</h1>
                <p className="ms-0.5 font-sans font-semibold uppercase">
                  Kec. Herlang, Kab. Bulukumba
                </p>
              </div>
            </div>
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() =>
                    (document.getElementById("navbar_drawer").checked = false)
                  }
                  className={`text-lg font-semibold ${
                    router.pathname === link.href
                      ? "bg-gradient-to-br from-sky-800 to-sky-400 text-white"
                      : ""
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* Mobile View END */}

      {/* Desktop View START */}
      <div className="hidden col-span-2 md:inline md:ms-auto">
        <ul className="menu menu-horizontal">
          {navItems.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`flex justify-center text-lg font-semibold focus:backdrop-blur-sm focus:text-sky-700 hover:underline ${
                  router.pathname === link.href ? "underline" : ""
                } ${
                  isCarouselPassed || router.pathname !== "/"
                    ? "text-black"
                    : "text-white"
                } transition-colors duration-500`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      {/* Desktop View END */}
    </div>
  );
}
