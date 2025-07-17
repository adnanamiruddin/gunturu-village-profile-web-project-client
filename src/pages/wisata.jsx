import Image from "next/image";
import PageHeaderTitle from "@/components/layouts/globals/PageHeaderTitle";
import { useEffect, useState } from "react";
import blogsApi from "@/api/modules/blogs.api";
import { toast } from "react-toastify";
import he from "he";
import NotFound from "@/components/layouts/globals/NotFound";
import Loading from "@/components/layouts/globals/Loading";

export default function TouristSpotPage() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const [touristSpotData, setTouristSpotData] = useState(null);

  const fetchTouristSpotData = async () => {
    const { response, error } = await blogsApi.getBlogBySlug({
      slug: "spot-wisata",
    });
    if (response) {
      setTouristSpotData(response);
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
    fetchTouristSpotData();
  }, []);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="pb-4 md:px-24 md:mt-4 md:pb-10">
          <PageHeaderTitle
            title="SPOT WISATA"
            description="Spot wisata di Desa Gunturu"
          />

          <div className="md:-mt-3 md:py-2 md:border-4 md:border-white md:bg-white md:rounded-lg">
            <Image
              src={touristSpotData.coverImageURL || "/image-home-hero.jpg"}
              alt="Peta Spot Wisata Desa Gunturu"
              width={500}
              height={500}
              className="w-full h-full object-contain rounded md:w-[70%] md:h-[32rem] md:mx-auto"
            />
          </div>

          <p className="mt-1 bg-white rounded p-4 md:mt-3 md:px-40">
            <div
              className="sanitized-content"
              dangerouslySetInnerHTML={{
                __html: he.decode(touristSpotData.content),
              }}
            ></div>
          </p>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
