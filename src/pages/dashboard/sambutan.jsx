import greetingsApi from "@/api/modules/greetings.api";
import Input from "@/components/layouts/functions/Input";
import SaveButton from "@/components/layouts/functions/SaveButton";
import UploadFileField from "@/components/layouts/functions/UploadFileField";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import PreviewImage from "@/components/layouts/PreviewImage";
import TextEditor from "@/components/layouts/TextEditor";
import { uploadImageToFirebaseStorage } from "@/helpers/firebaseStorageHelper";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function DashboardGreetingPage() {
  const [imageUpload, setImageUpload] = useState("");
  const [textEditorContent, setTextEditorContent] = useState("");
  //
  const [loadingSave, setLoadingSave] = useState(false);

  const fetchData = async () => {
    const { response, error } = await greetingsApi.getGreeting();
    if (response) {
      dataForm.setValues({
        villageHeadName: response.villageHeadName,
        villageHeadPhotoURL: response.villageHeadPhotoURL,
      });
      setTextEditorContent(response.greetingContent);
    }
    if (error) {
      toast.error(error.message);
    }
  };
  //
  useEffect(() => {
    fetchData();
  }, []);

  const dataForm = useFormik({
    initialValues: {
      villageHeadName: "",
      villageHeadPhotoURL: "",
    },
    validationSchema: Yup.object({
      villageHeadName: Yup.string().required(
        "Nama kepala desa tidak boleh kosong"
      ),
    }),
    onSubmit: async (values) => {
      if (loadingSave) return;

      setLoadingSave(true);
      if (imageUpload) {
        try {
          const imageUploadUrl = await uploadImageToFirebaseStorage({
            storageFolderName: "village_head_photo",
            image: imageUpload,
          });
          values.villageHeadPhotoURL = imageUploadUrl;
        } catch (error) {
          toast.error(
            "Terjadi kesalahan saat mengupload gambar. Silahkan coba lagi"
          );
          setLoadingSave(false);
          return;
        }
      }

      const { response, error } = await greetingsApi.saveGreeting({
        villageHeadName: values.villageHeadName,
        villageHeadPhotoURL: values.villageHeadPhotoURL,
        greetingContent: textEditorContent,
      });
      if (response) {
        toast.success("Berhasil menyimpan data");
      }
      if (error) {
        toast.error(error.message);
      }
      setLoadingSave(false);
    },
  });

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>SAMBUTAN</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Konten Sambutan</h2>
          {/*  */}
          <SaveButton
            name="saveButton"
            onClick={() => {
              dataForm.handleSubmit();
            }}
            disabled={loadingSave}
          >
            Simpan
          </SaveButton>
        </div>

        <Input
          label="Nama Kepala Desa"
          placeholder="Masukkan nama kepala desa..."
          name="villageHeadName"
          value={dataForm.values.villageHeadName}
          onChange={dataForm.handleChange}
          error={
            dataForm.touched.villageHeadName &&
            dataForm.errors.villageHeadName !== undefined
          }
          helperText={
            dataForm.touched.villageHeadName && dataForm.errors.villageHeadName
          }
        />

        <div className="mt-4 overflow-x-auto">
          <TextEditor
            id="greetingTextEditor"
            label="Isi Sambutan"
            content={textEditorContent}
            setContent={setTextEditorContent}
            showPreview
          />
        </div>

        <div className="flex gap-5">
          <div className="w-1/2">
            <UploadFileField
              name="villageHeadPhoto"
              label="Foto Kepala Desa"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
          </div>
          <div className="w-1/2 mt-6">
            <PreviewImage
              image={
                imageUpload && imageUpload instanceof File
                  ? URL.createObjectURL(imageUpload)
                  : dataForm.values.villageHeadPhotoURL
              }
              alt={dataForm.values.villageHeadName}
              fullWidth
            />
          </div>
        </div>
      </div>
    </div>
  );
}
