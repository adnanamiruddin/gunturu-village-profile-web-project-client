import Head from "next/head";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
// import usersApi from "@/api/modules/users.api";
import { setUser } from "@/redux/features/userSlice";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/layouts/globals/Navbar";
import Footer from "@/components/layouts/globals/Footer";
import HomeHero from "./layouts/HomeHero";
import ProtectedPage from "./utils/ProtectedPage";
import ModalSubmitButton from "./layouts/functions/ModalSubmitButton";

import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./layouts/globals/dashboard-nav/Sidebar";
import Cookies from "js-cookie";

export default function MainLayout({ children }) {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isCarouselPassed, setIsCarouselPassed] = useState(false);

  useEffect(() => {
    const authUser = async () => {
      const userOnCookie = Cookies.get("lggnnusr");
      if (userOnCookie) {
        const user = JSON.parse(userOnCookie);
        dispatch(setUser(user));
        return;
      }
      dispatch(setUser(null));
    };
    authUser();
  }, [dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= window.innerHeight) {
        setIsCarouselPassed(true);
      } else {
        setIsCarouselPassed(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Desa Gunturu</title>
      </Head>

      {/* Config React Toastify START */}
      <ToastContainer
        position="bottom-left"
        autoClose={4000}
        z-index="9999"
        theme="light"
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover
        limit={1}
      />
      {/* Config React Toastify END */}

      <div
        className={`${
          router.asPath.includes("dashboard") || router.asPath.includes("login")
            ? "hidden"
            : ""
        }`}
      >
        <Navbar isCarouselPassed={isCarouselPassed} />
      </div>

      {router.asPath === "/login" ? (
        <div className="bg-gray-100 text-black min-h-screen">
          <div className="hidden md:inline">{children}</div>

          <div className="md:hidden bg-gradient-to-br from-sky-200 to-white min-h-screen flex justify-center items-center flex-col gap-8">
            <h1 className="font-semibold text-3xl text-center">
              Silahkan akses menggunakan laptop!
            </h1>
            <ModalSubmitButton onClick={() => router.push("/")}>
              Kembali
            </ModalSubmitButton>
          </div>
        </div>
      ) : router.asPath.includes("dashboard") ? (
        <div className="bg-gray-100 text-black min-h-screen">
          <ProtectedPage>
            <div className="hidden md:flex">
              <Sidebar />

              <div className="w-full bg-white pt-16 md:w-4/5 md:pt-0 font-sans">
                {children}
              </div>
            </div>

            <div className="md:hidden bg-gradient-to-br from-sky-200 to-white min-h-screen flex justify-center items-center flex-col gap-8">
              <h1 className="font-semibold text-3xl text-center">
                Silahkan akses menggunakan laptop!
              </h1>
              <ModalSubmitButton onClick={() => router.push("/")}>
                Kembali
              </ModalSubmitButton>
            </div>
          </ProtectedPage>
        </div>
      ) : router.asPath === "/" ? (
        <>
          <HomeHero />

          <div className="bg-gray-50 text-black p-4 min-h-screen">
            {children}
          </div>
        </>
      ) : (
        <div className="bg-gray-50 text-black p-4 pt-24 min-h-screen">
          {children}
        </div>
      )}

      <div className={`${router.asPath.includes("dashboard") ? "hidden" : ""}`}>
        <Footer />
      </div>
    </>
  );
}
