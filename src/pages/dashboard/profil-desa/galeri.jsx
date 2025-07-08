import galleryApi from "@/api/modules/gallery.api";
import Input from "@/components/layouts/functions/Input";
import SaveButton from "@/components/layouts/functions/SaveButton";
import TextArea from "@/components/layouts/functions/TextArea";
import UploadFileField from "@/components/layouts/functions/UploadFileField";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import PreviewImage from "@/components/layouts/PreviewImage";
import { uploadImageToFirebaseStorage } from "@/helpers/firebaseStorageHelper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DashboardGalleryPage() {
  const [images, setImages] = useState(
    Array.from({ length: 9 }, () => ({
      title: "",
      description: "",
      url: "/image-home-hero.jpg",
      file: null,
    }))
  );
  //
  const [loadingSave, setLoadingSave] = useState(false);

  const fetchData = async () => {
    const { response, error } = await galleryApi.getGallery();
    if (response) {
      const formattedImages = Array.from({ length: 9 }, (_, i) => ({
        title: response[`image${i + 1}Title`] || "",
        description: response[`image${i + 1}Description`] || "",
        url: response[`image${i + 1}URL`] || "/image-home-hero.jpg",
        file: null,
      }));
      setImages(formattedImages);
    }
    if (error) {
      toast.error(error.message);
    }
  };
  //
  useEffect(() => {
    fetchData();
  }, []);

  const handleSaveButtonClicked = async () => {
    if (loadingSave) return;

    setLoadingSave(true);
    try {
      const uploadedImages = await Promise.all(
        images.map(async (image) => {
          if (image.file) {
            const imageUploadUrl = await uploadImageToFirebaseStorage({
              storageFolderName: "gallery",
              image: image.file,
            });
            return { ...image, url: imageUploadUrl, file: null };
          }
          return image;
        })
      );

      const { response, error } = await galleryApi.saveGallery(uploadedImages);
      if (response) {
        toast.success("Berhasil menyimpan data");
      } else if (error) {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(
        "Terjadi kesalahan saat mengupload gambar. Silahkan coba lagi"
      );
    }
    setLoadingSave(false);
  };

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>GALERI</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Sembilan Foto Ditampilkan</h2>
          {/*  */}
          <SaveButton
            name="saveButton"
            onClick={handleSaveButtonClicked}
            disabled={loadingSave}
          >
            Simpan
          </SaveButton>
        </div>

        <div className="flex flex-col gap-3">
          {images.map((image, i) => (
            <div key={i} className="flex gap-5">
              <div className="w-1/2">
                <UploadFileField
                  label={`Foto ${i + 1}`}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    const newImages = [...images];
                    newImages[i] = {
                      ...newImages[i],
                      file,
                      url: URL.createObjectURL(file),
                    };
                    setImages(newImages);
                  }}
                />
                <PreviewImage image={image.url || "/image-home-hero.jpg"} />
              </div>

              <div className="w-1/2">
                <Input
                  label="Judul"
                  placeholder="Masukkan judul foto..."
                  value={image.title}
                  onChange={(e) => {
                    const newImages = [...images];
                    newImages[i].title = e.target.value;
                    setImages(newImages);
                  }}
                />
                <TextArea
                  rows={5}
                  label="Deskripsi"
                  placeholder="Masukkan deskripsi foto..."
                  value={image.description}
                  onChange={(e) => {
                    const newImages = [...images];
                    newImages[i].description = e.target.value;
                    setImages(newImages);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
