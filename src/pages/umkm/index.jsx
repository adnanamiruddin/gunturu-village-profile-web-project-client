import umkmsApi from "@/api/modules/umkm.api";
import Loading from "@/components/layouts/globals/Loading";
import NotFound from "@/components/layouts/globals/NotFound";
import PageHeaderTitle from "@/components/layouts/globals/PageHeaderTitle";
import PreviewDocument from "@/components/layouts/PreviewDocument";
import UmkmItem from "@/components/layouts/UmkmItem";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function UmkmPage() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);

  const [umkmsData, setUmkmsData] = useState([]);

  const fetchUmkmsData = async () => {
    const { response, error } = await umkmsApi.getAllUmkms();
    if (response) {
      setUmkmsData(response);
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
    fetchUmkmsData();
  }, []);

  return (
    <>
      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="pb-4 md:px-24 md:mt-4 md:pb-10">
          <PageHeaderTitle
            title="UMKM"
            description="Informasi seputar UMKM di Desa Gunturu"
          />

          <div className="grid grid-cols-1 gap-5 overflow-auto md:grid-cols-3 md:gap-4">
            {umkmsData.map((umkm, i) => (
              <UmkmItem
                key={i}
                image={
                  umkm.imageURL !== "" ? umkm.imageURL : "/image-home-hero.jpg"
                }
                name={umkm.name}
                slug={umkm.slug}
                price={umkm.priceRange}
                fullWidth
              />
            ))}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
}
