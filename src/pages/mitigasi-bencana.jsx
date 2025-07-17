import Image from "next/image";
import PageHeaderTitle from "@/components/layouts/globals/PageHeaderTitle";
import { useEffect, useState } from "react";
import blogsApi from "@/api/modules/blogs.api";
import { toast } from "react-toastify";
import NotFound from "@/components/layouts/globals/NotFound";
import Loading from "@/components/layouts/globals/Loading";
import he from "he";

export default function DisasterMitigationPage() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const [disasterMitigationData, setDisasterMitigationData] = useState(null);

  const fetchDisasterMitigationData = async () => {
    const { response, error } = await blogsApi.getBlogBySlug({
      slug: "mitigasi-bencana",
    });
    if (response) {
      setDisasterMitigationData(response);
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
    fetchDisasterMitigationData();
  }, []);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="pb-4 md:px-24 md:mt-4 md:pb-10">
          <PageHeaderTitle
            title="MITIGASI BENCANA"
            description="Informasi seputar mitigasi bencana di Desa Gunturu"
          />

          <div className="md:-mt-3 md:py-2 md:border-4 md:border-white md:bg-white md:rounded-lg">
            <Image
              src={
                disasterMitigationData.coverImageURL || "/image-home-hero.jpg"
              }
              alt="Peta Mitigasi Bencana Desa Gunturu"
              width={500}
              height={500}
              className="w-full h-full object-contain rounded md:w-[70%] md:h-[32rem] md:mx-auto"
            />
          </div>

          <p className="mt-1 bg-white rounded p-4 md:mt-3 md:px-40">
            <div
              className="sanitized-content"
              dangerouslySetInnerHTML={{
                __html: he.decode(disasterMitigationData.content),
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
