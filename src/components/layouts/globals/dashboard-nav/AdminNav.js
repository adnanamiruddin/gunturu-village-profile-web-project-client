import { FaBullseye, FaRegNewspaper, FaHourglassHalf } from "react-icons/fa";
import { IoHomeOutline, IoWarningOutline } from "react-icons/io5";
import { MdOutlineWavingHand } from "react-icons/md";
import { VscTypeHierarchySub } from "react-icons/vsc";
import { GrGallery } from "react-icons/gr";
import { TbChartInfographic } from "react-icons/tb";
import { FaPeopleRoof } from "react-icons/fa6";
import { BiCamera } from "react-icons/bi";
import { AiOutlineShop } from "react-icons/ai";

const mainNavItems = [
  {
    href: "/dashboard",
    label: "Beranda",
    icon: <IoHomeOutline className="text-2xl" />,
  },
  {
    href: "/dashboard/sambutan",
    label: "Sambutan",
    icon: <MdOutlineWavingHand className="text-2xl" />,
  },
];

const villageProfileNavItems = [
  {
    href: "/dashboard/profil-desa/visi-dan-misi",
    label: "Visi dan Misi",
    icon: <FaBullseye className="text-2xl" />,
  },
  {
    href: "/dashboard/profil-desa/sotk",
    label: "SOTK",
    icon: <VscTypeHierarchySub className="text-2xl" />,
  },
  {
    href: "/dashboard/profil-desa/galeri",
    label: "Galeri",
    icon: <GrGallery className="text-2xl" />,
  },
];

const historyNavItems = [
  {
    href: "/dashboard/sejarah",
    label: "Sejarah",
    icon: <FaHourglassHalf className="text-2xl" />,
  },
];

const infographicsNavItems = [
  {
    href: "/dashboard/infografis",
    label: "Infografis",
    icon: <TbChartInfographic className="text-2xl" />,
  },
];

const newsNavItems = [
  {
    href: "/dashboard/berita",
    label: "Berita",
    icon: <FaRegNewspaper className="text-2xl" />,
  },
];

const schedulesNavItems = [
  {
    href: "/dashboard/acara",
    label: "Acara",
    icon: <FaPeopleRoof className="text-2xl" />,
  },
];

const touristSpotNavItems = [
  {
    href: "/dashboard/wisata",
    label: "Wisata",
    icon: <BiCamera className="text-2xl" />,
  },
];

const disasterMitigationNavItems = [
  {
    href: "/dashboard/mitigasi-bencana",
    label: "Mitigasi Bencana",
    icon: <IoWarningOutline className="text-2xl" />,
  },
];

const umkmNavItems = [
  {
    href: "/dashboard/umkm",
    label: "UMKM",
    icon: <AiOutlineShop className="text-2xl" />,
  },
];

export const AdminNav = [
  {
    title: "UTAMA",
    items: mainNavItems,
  },
  {
    title: "PROFIL KELURAHAN",
    items: villageProfileNavItems,
  },
  {
    title: "SEJARAH",
    items: historyNavItems,
  },
  {
    title: "INFOGRAFIS",
    items: infographicsNavItems,
  },
  {
    title: "BERITA",
    items: newsNavItems,
  },
  {
    title: "ACARA",
    items: schedulesNavItems,
  },
  {
    title: "WISATA",
    items: touristSpotNavItems,
  },
  {
    title: "MITIGASI BENCANA",
    items: disasterMitigationNavItems,
  },
  {
    title: "UMKM",
    items: umkmNavItems,
  },
];
