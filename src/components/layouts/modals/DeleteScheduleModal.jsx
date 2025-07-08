import { useState } from "react";
import { toast } from "react-toastify";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";
import schedulesApi from "@/api/modules/schedules.api";

export default function DeleteScheduleModal({
  scheduleId,
  setScheduleId,
  fetchSchedulesData,
}) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { response, error } = await schedulesApi.deleteSchedule({
      scheduleId,
    });
    if (response) {
      document.getElementById("DeleteScheduleModal").close();
      document.getElementById("ConfirmDeleteItemModal").close();
      toast.success("Data acara berhasil dihapus");
      //
      setLoading(false);
      setScheduleId(null);
      fetchSchedulesData();
    }
    if (error) {
      document.getElementById("DeleteScheduleModal").close();
      document.getElementById("ConfirmDeleteItemModal").close();
      toast.error(
        "Gagal menghapus data acara. Silakan coba lagi atau hubungi administrator"
      );
      //
      setLoading(false);
      setScheduleId(null);
    }
  };

  return (
    <dialog id="DeleteScheduleModal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Hapus Data Acara
        </h1>

        <div className="mt-4">
          <p className="text-lg">
            Apakah Anda yakin ingin menghapus data acara ini?
          </p>

          <div className="mt-6 flex justify-end items-center gap-3">
            <ModalCancelButton
              onClick={() =>
                document.getElementById("DeleteScheduleModal").close()
              }
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
          content="Acara"
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </dialog>
  );
}
