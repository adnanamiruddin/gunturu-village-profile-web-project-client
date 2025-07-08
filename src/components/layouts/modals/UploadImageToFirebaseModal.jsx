import Image from "next/image";
import ModalCancelButton from "../functions/ModalCancelButton";
import ModalSubmitButton from "../functions/ModalSubmitButton";
import UploadFileField from "../functions/UploadFileField";
import { useState } from "react";
import { uploadImageToFirebaseStorage } from "@/helpers/firebaseStorageHelper";
import { toast } from "react-toastify";

export default function UploadImageToFirebaseModal({ setContent }) {
  const [loadingSave, setLoadingSave] = useState(false);
  //
  const [imageUpload, setImageUpload] = useState(null);

  const handleSaveButtonClicked = async () => {
    if (loadingSave) return;
    if (!imageUpload) {
      document.getElementById("UploadImageToFirebaseModal").close();
      toast.warning("Silahkan pilih gambar terlebih dahulu");
      return;
    }

    setLoadingSave(true);
    let imageUrl = "";
    if (imageUpload) {
      try {
        const imageUploadUrl = await uploadImageToFirebaseStorage({
          storageFolderName: "blog_images/content",
          image: imageUpload,
        });
        imageUrl = imageUploadUrl;
      } catch (error) {
        toast.error(
          "Terjadi kesalahan saat mengupload gambar. Silahkan coba lagi"
        );
        setLoadingSave(false);
        return;
      }
    }

    setContent(
      (prevContent) =>
        `${prevContent}<br><p>&lt;img src="${imageUrl}" alt="image" width="50%" /&gt;</p>`
    );
    setImageUpload("");

    toast.success("Gambar berhasil ditambahkan");
    setLoadingSave(false);
    document.getElementById("UploadImageToFirebaseModal").close();
  };

  return (
    <dialog id="UploadImageToFirebaseModal" className="modal">
      <div className="modal-box bg-white w-11/12 max-w-3xl rounded-lg">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-lg">
            ✕
          </button>
        </form>
        <h1 className="font-bold text-xl border-b border-gray-400 pb-4 -mt-2 -mx-6 px-6">
          Tambah Gambar
        </h1>

        <UploadFileField
          name="imageUpload"
          label="Upload Gambar"
          onChange={(e) => {
            setImageUpload(e.target.files[0]);
          }}
        />

        <div className="mt-6 overflow-x-auto">
          <h3 className="mb-3 font-semibold text-lg">Preview</h3>
          <Image
            priority
            src={imageUpload ? URL.createObjectURL(imageUpload) : ""}
            alt="Gambar"
            width={500}
            height={500}
            className="w-full max-h-[75vh] object-contain"
          />
        </div>

        <div className="mt-6 flex justify-end items-center gap-3">
          <ModalCancelButton
            loading={loadingSave}
            onClick={() =>
              document.getElementById("UploadImageToFirebaseModal").close()
            }
          >
            Batal
          </ModalCancelButton>
          {/*  */}
          <ModalSubmitButton
            loading={loadingSave}
            onClick={handleSaveButtonClicked}
          >
            Simpan
          </ModalSubmitButton>
        </div>
      </div>
    </dialog>
  );
}
