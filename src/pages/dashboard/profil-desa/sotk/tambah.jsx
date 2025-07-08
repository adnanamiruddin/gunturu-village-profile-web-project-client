import sotksApi from "@/api/modules/sotks.api";
import Input from "@/components/layouts/functions/Input";
import SaveButton from "@/components/layouts/functions/SaveButton";
import UploadFileField from "@/components/layouts/functions/UploadFileField";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import PreviewImage from "@/components/layouts/PreviewImage";
import { uploadImageToFirebaseStorage } from "@/helpers/firebaseStorageHelper";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

export default function DashboardAddSotkPage() {
  const router = useRouter();
  const { editSotkId } = router.query;

  const [imageUpload, setImageUpload] = useState("/image-home-hero.jpg");
  //
  const [loadingSave, setLoadingSave] = useState(false);

  const handleCreateSotk = async ({ values }) => {
    const { response, error } = await sotksApi.createSotk({
      name: values.name,
      position: values.position,
      photoURL: values.photoURL,
    });
    if (response) {
      toast.success("Data pegawai berhasil dibuat");
      router.push("/dashboard/profil-desa/sotk");
    }
    if (error) {
      toast.error(error.message || "Gagal membuat data pegawai");
    }
  };
  //
  const handleUpdateSotk = async ({ values }) => {
    const { response, error } = await sotksApi.editSotk({
      sotkId: editSotkId,
      name: values.name,
      position: values.position,
      photoURL: values.photoURL,
    });
    if (response) {
      toast.success("Data pegawai berhasil diperbarui");
      router.push("/dashboard/profil-desa/sotk");
    }
    if (error) {
      toast.error(error.message || "Gagal memperbarui data pegawai");
    }
  };

  const dataForm = useFormik({
    initialValues: {
      name: "",
      position: "",
      photoURL: "/image-home-hero.jpg",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Nama pegawai wajib diisi"),
      position: Yup.string().required("Jabatan pegawai wajib diisi"),
    }),
    onSubmit: async (values) => {
      if (loadingSave) return;

      setLoadingSave(true);
      if (imageUpload && imageUpload instanceof File) {
        try {
          const imageUploadUrl = await uploadImageToFirebaseStorage({
            storageFolderName: "sotk_images/cover",
            image: imageUpload,
          });
          values.photoURL = imageUploadUrl;
        } catch (error) {
          toast.error(
            "Terjadi kesalahan saat mengupload gambar. Silahkan coba lagi"
          );
          setLoadingSave(false);
          return;
        }
      }

      try {
        if (!editSotkId) {
          // CREATE MODE
          await handleCreateSotk({
            values,
          });
        } else {
          // EDIT MODE
          await handleUpdateSotk({
            values,
          });
        }
      } finally {
        setLoadingSave(false);
      }
    },
  });

  // EDIT MODE
  const fetchExistingData = async () => {
    const { response, error } = await sotksApi.getSotkById({
      sotkId: editSotkId,
    });
    if (response) {
      dataForm.setValues({
        name: response.name,
        position: response.position,
        photoURL: response.photoURL,
      });
      setImageUpload(response.photoURL);
    }
    if (error) {
      toast.error(error.message);
    }
  };
  //
  useEffect(() => {
    if (editSotkId) fetchExistingData();
  }, [editSotkId]);

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>SOTK</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">
            Form Struktur Organisasi dan Tata Kerja
          </h2>
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

        <div className="flex gap-5">
          <div className="w-1/2">
            <Input
              label="Nama Pegawai"
              placeholder="Masukkan nama pegawai..."
              name="name"
              value={dataForm.values.name}
              onChange={dataForm.handleChange}
              error={
                dataForm.touched.name && dataForm.errors.name !== undefined
              }
              helperText={dataForm.touched.name && dataForm.errors.name}
            />
          </div>
          {/*  */}
          <div className="w-1/2">
            <Input
              label="Jabatan"
              placeholder="Masukkan jabatan..."
              name="position"
              value={dataForm.values.position}
              onChange={dataForm.handleChange}
              error={
                dataForm.touched.position &&
                dataForm.errors.position !== undefined
              }
              helperText={dataForm.touched.position && dataForm.errors.position}
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="w-1/2">
            <UploadFileField
              name="villageHeadPhoto"
              label="Foto Pegawai"
              onChange={(e) => {
                setImageUpload(e.target.files[0]);
              }}
            />
          </div>
          <div className="w-1/2">
            <PreviewImage
              image={
                imageUpload && imageUpload instanceof File
                  ? URL.createObjectURL(imageUpload)
                  : imageUpload
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
