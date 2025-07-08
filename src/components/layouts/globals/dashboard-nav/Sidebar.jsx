import Link from "next/link";
import { useRouter } from "next/router";
import { AdminNav } from "./AdminNav";
import SidebarProfile from "./SidebarProfile";

export default function Sidebar() {
  const router = useRouter();

  return (
    <div className="hidden md:inline relative w-1/5 bg-gray-50 min-h-screen border-r-2 border-gray-300 pb-20">
      <div className="p-6 pb-2">
        <SidebarProfile />
      </div>

      {AdminNav.map((nav, i) => (
        <div
          key={i}
          className={`font-sans pb-2 ${
            i === AdminNav.length - 1 ? "" : "border-b-2"
          } border-gray-300`}
        >
          <h1 className="font-bold text-lg p-6 pt-4 pb-2">{nav.title}</h1>
          {nav.items.map((item, j) => (
            <Link
              key={j}
              id={item.label}
              href={item.href}
              className={`flex items-center gap-4 py-2.5 px-8 font-semibold hover:bg-sky-100 hover:text-sky-600 transition-all duration-300 ease-in-out focus:outline-none focus:text-sky-600 focus:bg-sky-200 ${
                router.pathname === item.href
                  ? "bg-sky-100 text-sky-600"
                  : "text-gray-600"
              }`}
            >
              {item.icon}
              <h6>{item.label}</h6>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
