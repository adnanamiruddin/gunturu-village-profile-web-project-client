import { useState } from "react";
import { toast } from "react-toastify";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";
import sotksApi from "@/api/modules/sotks.api";

export default function DeleteSotkModal({ sotkId, setSotkId, fetchSotksData }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { response, error } = await sotksApi.deleteSotk({
      sotkId,
    });
    if (response) {
      document.getElementById("DeleteSotkModal").close();
      document.getElementById("ConfirmDeleteItemModal").close();
      toast.success("Data pegawai berhasil dihapus");
      //
      setLoading(false);
      setSotkId(null);
      fetchSotksData();
    }
    if (error) {
      document.getElementById("DeleteSotkModal").close();
      document.getElementById("ConfirmDeleteItemModal").close();
      toast.error(
        "Gagal menghapus data pegawai. Silakan coba lagi atau hubungi administrator"
      );
      //
      setLoading(false);
      setSotkId(null);
    }
  };

  return (
    <dialog id="DeleteSotkModal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Hapus Data Pegawai
        </h1>

        <div className="mt-4">
          <p className="text-lg">
            Apakah Anda yakin ingin menghapus data pegawai ini?
          </p>

          <div className="mt-6 flex justify-end items-center gap-3">
            <ModalCancelButton
              onClick={() => document.getElementById("DeleteSotkModal").close()}
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
          content="Pegawai"
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </dialog>
  );
}
