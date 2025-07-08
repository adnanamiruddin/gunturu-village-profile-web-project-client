import { useState } from "react";
import { toast } from "react-toastify";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import ConfirmDeleteItemModal from "./ConfirmDeleteItemModal";
import blogsApi from "@/api/modules/blogs.api";

export default function DeleteNewsModal({ newsId, setNewsId, fetchNewsData }) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    const { response, error } = await blogsApi.deleteBlog({
      blogId: newsId,
    });
    if (response) {
      document.getElementById("DeleteNewsModal").close();
      document.getElementById("ConfirmDeleteItemModal").close();
      toast.success("Berita berhasil dihapus");
      //
      setLoading(false);
      setNewsId(null);
      fetchNewsData();
    }
    if (error) {
      document.getElementById("DeleteNewsModal").close();
      document.getElementById("ConfirmDeleteItemModal").close();
      toast.error(
        "Gagal menghapus berita. Silakan coba lagi atau hubungi administrator"
      );
      //
      setLoading(false);
      setNewsId(null);
    }
  };

  return (
    <dialog id="DeleteNewsModal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Hapus Berita
        </h1>

        <div className="mt-4">
          <p className="text-lg">
            Apakah Anda yakin ingin menghapus berita ini?
          </p>

          <div className="mt-6 flex justify-end items-center gap-3">
            <ModalCancelButton
              onClick={() => document.getElementById("DeleteNewsModal").close()}
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
          content="berita"
          handleDelete={handleDelete}
          loading={loading}
        />
      </div>
    </dialog>
  );
}
