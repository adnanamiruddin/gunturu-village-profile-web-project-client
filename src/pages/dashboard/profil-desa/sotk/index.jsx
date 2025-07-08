import AddDataButton from "@/components/layouts/functions/AddDataButton";
import DeleteButton from "@/components/layouts/functions/DeleteButton";
import EditButton from "@/components/layouts/functions/EditButton";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import NotFound from "@/components/layouts/globals/NotFound";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Loading from "@/components/layouts/globals/Loading";
import { toast } from "react-toastify";
import sotksApi from "@/api/modules/sotks.api";
import DeleteSotkModal from "@/components/layouts/modals/DeleteSotkModal";

export default function DashboardSotkPage() {
  const router = useRouter();

  const [sotks, setSotks] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [errorDataLoaded, setErrorDataLoaded] = useState(false);
  //
  const [selectedSotkIdToDelete, setSelectedSotkIdToDelete] = useState(null);

  const fetchSotksData = async () => {
    const { response, error } = await sotksApi.getAllSotks();
    if (response) {
      setSotks(response);
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
    fetchSotksData();
  }, []);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>SOTK</DashboardHeader>

      {errorDataLoaded ? (
        <NotFound />
      ) : isDataLoaded ? (
        <div className="px-10 pb-16 h-full">
          <div className="pt-4 flex justify-between items-center">
            <h2 className="font-bold text-2xl">
              Struktur Organisasi dan Tata Kerja
            </h2>
            {/*  */}
            <AddDataButton
              onClick={() => router.push("/dashboard/profil-desa/sotk/tambah")}
            >
              Buat
            </AddDataButton>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="w-full text-black flex items-center gap-2 py-3 px-1 border-b-2 border-gray-300 text-lg">
                  <th className="w-[5%] text-start">No</th>
                  <th className="w-[50%] text-start">Nama</th>
                  <th className="w-[25%] text-start">Jabatan</th>
                  <th className="w-[20%] text-start">Aksi</th>
                </tr>
              </thead>
              {sotks?.length > 0 ? (
                <tbody>
                  {sotks.map((sotk, i) => (
                    <tr
                      key={i}
                      className="text-black flex items-center gap-2 py-5 px-1 border-b-2 border-gray-300"
                    >
                      <td className="w-[5%] text-start ps-2">{i + 1}</td>
                      <td className="w-[50%] text-start break-words">
                        {sotk.name}
                      </td>
                      <td className="w-[25%] text-start">{sotk.position}</td>
                      <td className="w-[20%] text-start flex items-center gap-2">
                        <EditButton
                          onClick={() =>
                            router.push(
                              `/dashboard/profil-desa/sotk/tambah?editSotkId=${sotk.id}`
                            )
                          }
                        >
                          Edit
                        </EditButton>
                        {/*  */}
                        <DeleteButton
                          onClick={() => {
                            setSelectedSotkIdToDelete(sotk.id);
                            document
                              .getElementById("DeleteSotkModal")
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
                <NotFound message="Tidak ada data SOTK" />
              )}
            </table>
          </div>
        </div>
      ) : (
        <Loading />
      )}

      <DeleteSotkModal
        sotkId={selectedSotkIdToDelete}
        setSotkId={setSelectedSotkIdToDelete}
        fetchSotksData={fetchSotksData}
      />
    </div>
  );
}
