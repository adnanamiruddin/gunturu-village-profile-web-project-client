import blogsApi from "@/api/modules/blogs.api";
import SaveButton from "@/components/layouts/functions/SaveButton";
import UploadFileField from "@/components/layouts/functions/UploadFileField";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import PreviewImage from "@/components/layouts/PreviewImage";
import TextEditor from "@/components/layouts/TextEditor";
import { uploadImageToFirebaseStorage } from "@/helpers/firebaseStorageHelper";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DashboardHistoryPage() {
  const [blogId, setBlogId] = useState("");
  const [imageUpload, setImageUpload] = useState("");
  const [textEditorContent, setTextEditorContent] = useState("");
  //
  const [loadingSave, setLoadingSave] = useState(false);

  const fetchData = async () => {
    const { response, error } = await blogsApi.getBlogBySlug({
      slug: "sejarah",
    });
    if (response) {
      setBlogId(response.id);
      setImageUpload(response.coverImageURL);
      setTextEditorContent(response.content);
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
    let imageUrl = imageUpload;
    if (imageUpload && imageUpload instanceof File) {
      try {
        const imageUploadUrl = await uploadImageToFirebaseStorage({
          storageFolderName: "blog_images/cover",
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

    const { response, error } = await blogsApi.editBlog({
      blogId,
      coverImageURL: imageUrl,
      content: textEditorContent,
    });
    if (response) {
      toast.success("Berhasil menyimpan data");
    }
    if (error) {
      toast.error(error.message);
    }
    setLoadingSave(false);
  };

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>SEJARAH</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Konten Sejarah</h2>
          {/*  */}
          <SaveButton
            name="saveButton"
            onClick={handleSaveButtonClicked}
            disabled={loadingSave}
          >
            Simpan
          </SaveButton>
        </div>

        <div className="w-full">
          <UploadFileField
            label="Sampul"
            onChange={(e) => {
              setImageUpload(e.target.files[0]);
            }}
          />
          {/*  */}
          <PreviewImage
            image={
              imageUpload && imageUpload instanceof File
                ? URL.createObjectURL(imageUpload)
                : imageUpload
            }
            alt="Sampul"
            fullWidth
          />
        </div>

        <div className="mt-6 overflow-x-auto flex gap-5">
          <TextEditor
            label="Isi Konten"
            content={textEditorContent}
            setContent={setTextEditorContent}
            uploadImage
            showPreview
          />
        </div>
      </div>
    </div>
  );
}
