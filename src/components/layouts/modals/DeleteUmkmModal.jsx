import { useState } from "react";
import { toast } from "react-toastify";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";
import umkmsApi from "@/api/modules/umkm.api";

export default function DeleteUmkmModal({ umkmId, setUmkmId, fetchUmkmsData }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { response, error } = await umkmsApi.deleteUmkm({
      umkmId,
    });
    if (response) {
      document.getElementById("DeleteUmkmModal").close();
      document.getElementById("ConfirmDeleteItemModal").close();
      toast.success("Data UMKM berhasil dihapus");
      //
      setLoading(false);
      setUmkmId(null);
      fetchUmkmsData();
    }
    if (error) {
      document.getElementById("DeleteUmkmModal").close();
      document.getElementById("ConfirmDeleteItemModal").close();
      toast.error(
        "Gagal menghapus data UMKM. Silakan coba lagi atau hubungi administrator"
      );
      //
      setLoading(false);
      setUmkmId(null);
    }
  };

  return (
    <dialog id="DeleteUmkmModal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Hapus Data UMKM
        </h1>

        <div className="mt-4">
          <p className="text-lg">
            Apakah Anda yakin ingin menghapus data UMKM ini?
          </p>

          <div className="mt-6 flex justify-end items-center gap-3">
            <ModalCancelButton
              onClick={() => document.getElementById("DeleteUmkmModal").close()}
            >
              Batal
            </ModalCancelButton>
            {/*  */}
            <ModalSubmitButton
              onClick={() =>
                document.getElementById("ConfirmDeleteItemModal").showModal()
              }
            >
              Hapus
            </ModalSubmitButton>
          </div>
        </div>

        <ConfirmDeleteItemModal
          content="UMKM"
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </dialog>
  );
}
