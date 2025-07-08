import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { FaRegMoneyBill1 } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import { useEffect, useState } from "react";
import umkmsApi from "@/api/modules/umkm.api";
import NotFound from "@/components/layouts/globals/NotFound";
import Loading from "@/components/layouts/globals/Loading";
import he from "he";
import { toast } from "react-toastify";

export default function UmkmDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const [umkmData, setUmkmData] = useState({});

  const fetchUmkmData = async () => {
    const { response, error } = await umkmsApi.getUmkmBySlug({
      slug,
    });
    if (response) {
      setUmkmData(response);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 500);
    }
    if (error) {
      toast.error(error.message);
      setErrorDataLoaded(true);
    }
  };
  //
  useEffect(() => {
    if (slug) fetchUmkmData();
  }, [slug]);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="pb-4 md:px-24 md:mt-4 md:pb-10">
          <div className="text-center pt-1">
            <h1 className="text-3xl font-bold text-sky-800 mb-4 md:mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-teal-500">
                Detail UMKM
              </span>
            </h1>
          </div>

          <div className="bg-white p-3 border border-gray-300 rounded-lg md:flex md:gap-6">
            <Image
              priority
              src={umkmData.imageURL}
              alt={umkmData.name}
              width={500}
              height={500}
              className="w-full object-cover rounded-md md:w-1/2"
            />

            <div className="py-4 px-1 md:py-1">
              <h4 className="text-3xl font-bold md:text-4xl">
                {umkmData.name}
              </h4>

              <p className="mt-3 font-semibold text-xl text-gray-500 flex items-center gap-2">
                <FaRegMoneyBill1 className="text-2xl mt-0.5" />
                <span className="text-black">{umkmData.priceRange}</span>
              </p>
              <p className="italic text-sm text-gray-500">*Kisaran harga</p>

              <p className="mt-3 text-justify">
                <div className="flex items-center gap-2">
                  <GrNotes className="text-2xl mt-0.5" />{" "}
                  <p className="font-semibold text-xl">Seputar UMKM :</p>
                </div>
                <div
                  className="sanitized-content mt-2 rounded"
                  dangerouslySetInnerHTML={{
                    __html: he.decode(umkmData.description),
                  }}
                ></div>
              </p>

              <Link
                href={`https://wa.me/${umkmData.whatsappNumber}`}
                target="_blank"
              >
                <p className="mt-5 text-white font-semibold bg-sky-500 py-2 px-5 rounded hover:bg-sky-400 transition duration-300 w-max flex justify-center items-center gap-2.5 md:px-8">
                  Hubungi Penjual <FaWhatsapp className="text-xl" />
                </p>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
