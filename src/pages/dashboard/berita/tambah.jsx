import Input from "@/components/layouts/functions/Input";
import SaveButton from "@/components/layouts/functions/SaveButton";
import TextArea from "@/components/layouts/functions/TextArea";
import DashboardHeader from "@/components/layouts/globals/dashboard-nav/DashboardHeader";
import HeaderDetailPage from "@/components/layouts/globals/HeaderDetailPage";
import TextEditor from "@/components/layouts/TextEditor";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadFileField from "@/components/layouts/functions/UploadFileField";
import { useRouter } from "next/router";
import InputWithSelect from "@/components/layouts/functions/InputWithSelect";
import blogsApi from "@/api/modules/blogs.api";
import { toast } from "react-toastify";
import { formatDateToIndo } from "@/helpers/dateHelper";
import { motion } from "framer-motion";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { uploadImageToFirebaseStorage } from "@/helpers/firebaseStorageHelper";
import he from "he";

export default function DashboardAddNewsPage() {
  const router = useRouter();
  const { editBlogId, editBlogSlug } = router.query;

  const [imageUpload, setImageUpload] = useState("");
  const [textEditorContent, setTextEditorContent] = useState("");
  //
  const [loadingSave, setLoadingSave] = useState(false);

  const todayOnFormat = formatDateToIndo(new Date());

  const handleCreateBlog = async ({ values }) => {
    const { response, error } = await blogsApi.createBlog({
      type: "blog",
      title: values.title,
      slug: values.slug,
      status: values.status,
      author: values.author,
      coverImageURL: values.coverImageURL,
      coverDescription: values.coverDescription,
      content: textEditorContent,
    });
    if (response) {
      toast.success("Berita berhasil dibuat");
      router.push("/dashboard/berita");
    }
    if (error) {
      toast.error(error.message || "Gagal membuat berita");
    }
  };
  //
  const handleUpdateBlog = async ({ values }) => {
    const { response, error } = await blogsApi.editBlog({
      blogId: editBlogId,
      type: "blog",
      title: values.title,
      slug: values.slug,
      status: values.status,
      author: values.author,
      coverImageURL: values.coverImageURL,
      coverDescription: values.coverDescription,
      content: textEditorContent,
    });
    if (response) {
      toast.success("Berita berhasil diperbarui");
      router.push("/dashboard/berita");
    }
    if (error) {
      toast.error(error.message || "Gagal memperbarui berita");
    }
  };

  const dataForm = useFormik({
    initialValues: {
      title: "",
      slug: "",
      status: "draft",
      author: "",
      coverImageURL: "/image-home-hero.jpg",
      coverDescription: "",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required("Judul harus diisi")
        .min(2, "Judul minimal 2 karakter")
        .max(255, "Judul maksimal 255 karakter")
        .matches(/^(?!\s*$).+/, "Judul tidak boleh hanya berisi spasi")
        .matches(/^(?!\d+$).+/, "Judul tidak boleh hanya angka")
        .matches(/^(?!\W+$).+/, "Judul tidak boleh hanya karakter spesial")
        // Judul tidak boleh ada "&" karena akan merusak URL
        .test(
          "no-ampersand",
          "Judul tidak boleh mengandung karakter '&'",
          (value) => {
            return !value || !value.includes("&");
          }
        ),
      slug: Yup.string().required("Slug harus diisi"),
      status: Yup.string().required("Status harus diisi"),
      author: Yup.string().required("Penulis harus diisi"),
      coverDescription: Yup.string().required("Deskripsi harus diisi"),
    }),
    onSubmit: async (values) => {
      if (loadingSave) return;
      if (textEditorContent === "") {
        toast.error("Konten berita tidak boleh kosong");
        return;
      }

      setLoadingSave(true);
      if (imageUpload && imageUpload instanceof File) {
        try {
          const imageUploadUrl = await uploadImageToFirebaseStorage({
            storageFolderName: "blog_images/cover",
            image: imageUpload,
          });
          values.coverImageURL = imageUploadUrl;
        } catch (error) {
          toast.error(
            "Terjadi kesalahan saat mengupload gambar. Silahkan coba lagi"
          );
          setLoadingSave(false);
          return;
        }
      }

      try {
        if (!editBlogId && !editBlogSlug) {
          // CREATE MODE
          await handleCreateBlog({ values });
        } else {
          // EDIT MODE
          await handleUpdateBlog({ values });
        }
      } finally {
        setLoadingSave(false);
      }
    },
  });

  // SLUG GENERATOR
  useEffect(() => {
    const title = dataForm.values.title;
    const titleToSlug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    dataForm.setFieldValue("slug", titleToSlug);
  }, [dataForm.values.title]);

  // EDIT MODE
  const fetchExistingData = async () => {
    const { response, error } = await blogsApi.getBlogBySlug({
      slug: editBlogSlug,
    });
    if (response) {
      dataForm.setValues({
        title: response.title,
        slug: response.slug,
        status: response.status,
        author: response.author,
        coverImageURL: response.coverImageURL,
        coverDescription: response.coverDescription,
      });
      setTextEditorContent(response.content);
      setImageUpload(response.coverImageURL);
    }
    if (error) {
      toast.error(error.message);
    }
  };
  //
  useEffect(() => {
    if (editBlogId && editBlogSlug) fetchExistingData();
  }, [editBlogId, editBlogSlug]);

  const [previewVisible, setPreviewVisible] = useState(true);
  //
  const togglePreview = () => {
    setPreviewVisible((prev) => !prev);
  };

  return (
    <div className="h-full overflow-hidden">
      <DashboardHeader>BERITA</DashboardHeader>

      <div className="px-10 pb-16 h-full">
        <div className="pt-4 flex justify-between items-center border-b border-gray-400 pb-4">
          <h2 className="font-bold text-2xl">Form Berita</h2>
          {/*  */}
          <SaveButton
            name="saveBlogButton"
            onClick={() => {
              dataForm.handleSubmit();
            }}
            disabled={loadingSave}
          >
            Simpan
          </SaveButton>
        </div>

        <div className="mt-6 overflow-x-auto">
          <div className="grid grid-cols-2 gap-4">
            <div
              className={`flex flex-col gap-6 ${
                !previewVisible ? "col-span-2" : ""
              }`}
            >
              <Input
                clearAutoMargin
                label="Judul"
                placeholder="Masukkan judul berita..."
                name="title"
                value={dataForm.values.title}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.title && dataForm.errors.title !== undefined
                }
                helperText={dataForm.touched.title && dataForm.errors.title}
              />

              <Input
                clearAutoMargin
                disabled
                label="Slug (URL Berita)"
                placeholder="Masukkan judul berita di atas..."
                name="slug"
                value={dataForm.values.slug}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.slug && dataForm.errors.slug !== undefined
                }
                helperText={dataForm.touched.slug && dataForm.errors.slug}
              />

              <InputWithSelect
                label="Status"
                placeholder="Pilih status berita"
                options={[
                  { name: "Publish", value: "published" },
                  { name: "Draft", value: "draft" },
                  // { name: "Archive", value: 2 },
                ]}
                name="status"
                value={dataForm.values.status}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.status &&
                  dataForm.errors.status !== undefined
                }
                helperText={dataForm.touched.status && dataForm.errors.status}
              />

              <Input
                clearAutoMargin
                label="Penulis"
                placeholder="Masukkan penulis..."
                name="author"
                value={dataForm.values.author}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.author &&
                  dataForm.errors.author !== undefined
                }
                helperText={dataForm.touched.author && dataForm.errors.author}
              />

              <UploadFileField
                name="imageUpload"
                clearAutoMargin
                label="Sampul Berita"
                onChange={(e) => {
                  setImageUpload(e.target.files[0]);
                }}
              />

              <TextArea
                clearAutoMargin
                rows={3}
                label="Deskripsi Sampul"
                placeholder="Masukkan deskripsi sampul..."
                name="coverDescription"
                value={dataForm.values.coverDescription}
                onChange={dataForm.handleChange}
                error={
                  dataForm.touched.coverDescription &&
                  dataForm.errors.coverDescription !== undefined
                }
                helperText={
                  dataForm.touched.coverDescription &&
                  dataForm.errors.coverDescription
                }
              />

              <TextEditor
                id="blogTextEditor"
                label="Konten"
                content={textEditorContent}
                setContent={setTextEditorContent}
                uploadImage
              />
            </div>

            <div>
              <div
                className={`flex items-center gap-2
                ${previewVisible ? "" : "mt-4 pt-4 border-t-2 border-gray-400"}
                `}
              >
                <h3 className="mb-3 font-semibold text-lg">Preview</h3>
                {previewVisible ? (
                  <IoIosArrowDown
                    className="mb-2 cursor-pointer"
                    onClick={togglePreview}
                  />
                ) : (
                  <IoIosArrowUp
                    className="mb-2 cursor-pointer"
                    onClick={togglePreview}
                  />
                )}
              </div>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={
                  previewVisible
                    ? { opacity: 1, height: "auto" }
                    : { opacity: 0, height: 0 }
                }
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="border-t border-l border-gray-400 bg-gray-100 p-2 pt-1">
                  <HeaderDetailPage
                    title={dataForm.values.title || "Judul Berita"}
                    description={`${todayOnFormat}. Ditulis oleh ${
                      dataForm.values.author || "Penulis"
                    }`}
                  />

                  <div className="mt-2 bg-white py-2 px-3">
                    <Image
                      src={
                        imageUpload && imageUpload instanceof File
                          ? URL.createObjectURL(imageUpload)
                          : dataForm.values.coverImageURL
                      }
                      alt="Sampul"
                      width={500}
                      height={500}
                      className="w-full object-cover"
                    />
                  </div>

                  <div className="mt-2 bg-white rounded py-2 px-3">
                    <p className="text-[#A0A0A0] text-sm">
                      {dataForm.values.coverDescription || "Deskripsi Sampul"}
                    </p>
                  </div>

                  <div className="text-sm text-justify break-words whitespace-normal">
                    <div className="mt-2 bg-white rounded py-2 px-3">
                      {textEditorContent !== "" ? (
                        <div
                          className="sanitized-content"
                          dangerouslySetInnerHTML={{
                            __html: he.decode(textEditorContent),
                          }}
                        ></div>
                      ) : (
                        "Konten berita..."
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
