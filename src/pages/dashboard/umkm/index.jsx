import AddDataButton from "@/components/layouts/functions/AddDataButton";
import DeleteButton from "@/components/layouts/functions/DeleteButton";
import EditButton from "@/components/layouts/functions/EditButton";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import NotFound from "@/components/layouts/globals/NotFound";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/layouts/globals/Loading";
import { toast } from "react-toastify";
import umkmsApi from "@/api/modules/umkm.api";
import DeleteUmkmModal from "@/components/layouts/modals/DeleteUmkmModal";

export default function DashboardUmkmPage() {
  const router = useRouter();

  const [umkms, setUmkms] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);
  //
  const [selectedUmkmIdToDelete, setSelectedUmkmIdToDelete] = useState(null);

  const fetchUmkmsData = async () => {
    const { response, error } = await umkmsApi.getAllUmkms();
    if (response) {
      setUmkms(response);
      setTimeout(() => {
        setIsDataLoaded(true);
      }, 1000);
    }
    if (error) {
      setErrorDataLoaded(true);
      toast.error(error.message);
    }
  };
  //
  useEffect(() => {
    fetchUmkmsData();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>UMKM</DashboardHeader>

      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="px-10 pb-16 h-full">
          <div className="pt-4 flex justify-between items-center">
            <h2 className="font-bold text-2xl">
              Daftar Usaha Mikro Kecil Menangah (UMKM)
            </h2>
            {/*  */}
            <AddDataButton
              onClick={() => router.push("/dashboard/umkm/tambah")}
            >
              Buat
            </AddDataButton>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="w-full text-black flex items-center gap-2 py-3 px-1 border-b-2 border-gray-300 text-lg">
                  <th className="w-[5%] text-start">No</th>
                  <th className="w-[45%] text-start">Nama Usaha</th>
                  <th className="w-[30%] text-start">Kisaran Harga</th>
                  <th className="w-[20%] text-start">Aksi</th>
                </tr>
              </thead>
              {umkms?.length > 0 ? (
                <tbody>
                  {umkms.map((umkm, i) => (
                    <tr
                      key={i}
                      className="text-black flex items-center gap-2 py-5 px-1 border-b-2 border-gray-300"
                    >
                      <td className="w-[5%] text-start ps-2">{i + 1}</td>
                      <td className="w-[45%] text-start break-words">
                        {umkm.name}
                      </td>
                      <td className="w-[30%] text-start">{umkm.priceRange}</td>
                      <td className="w-[20%] text-start flex items-center gap-2">
                        <EditButton
                          onClick={() =>
                            router.push(
                              `/dashboard/umkm/tambah?editUmkmId=${umkm.id}&editUmkmSlug=${umkm.slug}`
                            )
                          }
                        >
                          Edit
                        </EditButton>
                        {/*  */}
                        <DeleteButton
                          onClick={() => {
                            setSelectedUmkmIdToDelete(umkm.id);
                            document
                              .getElementById("DeleteUmkmModal")
                              .showModal();
                          }}
                        >
                          Hapus
                        </DeleteButton>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ) : (
                <NotFound message="Tidak ada data UMKM" />
              )}
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <DeleteUmkmModal
        umkmId={selectedUmkmIdToDelete}
        setUmkmId={setSelectedUmkmIdToDelete}
        fetchUmkmsData={fetchUmkmsData}
      />
    </div>
  );
}
