import dynamic from "next/dynamic";
import AddDataButton from "./functions/AddDataButton";
import UploadImageToFirebaseModal from "./modals/UploadImageToFirebaseModal";
import he from "he";

import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function TextEditor({
  id,
  label,
  content,
  setContent,
  uploadImage,
  showPreview,
}) {
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link"],
      [{ align: [] }],
      ["clean"],
    ],
    clipboard: {
      matchVisual: true,
    },
  };

  return (
    <div className={`w-full ${showPreview ? "flex gap-5" : "inline"}`}>
      <div className={`${showPreview ? "w-1/2" : "w-full"}`}>
        <div className="mb-3 flex justify-between items-center">
          <h3 className="font-semibold text-lg">{label}</h3>

          {uploadImage ? (
            <AddDataButton
              onClick={() => {
                document
                  .getElementById("UploadImageToFirebaseModal")
                  .showModal();
              }}
            >
              Tambah Gambar
            </AddDataButton>
          ) : null}
        </div>

        <ReactQuill
          id={id}
          theme="snow"
          formats={[
            "header",
            "font",
            "size",
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "align",
            "list",
            "bullet",
            "indent",
            "link",
          ]}
          placeholder="Ketik di sini..."
          modules={modules}
          onChange={setContent}
          value={content}
        />

        {uploadImage ? (
          <UploadImageToFirebaseModal setContent={setContent} />
        ) : null}
      </div>

      {showPreview ? (
        <div className="w-1/2 bg-gray-50 rounded-md border border-gray-300 shadow-xl py-4 p-8">
          <h2 className="text-xl font-bold flex justify-center border-b-2 border-gray-300 pb-4">
            Preview
          </h2>
          <div
            className="sanitized-content"
            dangerouslySetInnerHTML={{ __html: he.decode(content) }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
