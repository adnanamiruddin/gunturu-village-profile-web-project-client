import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function PreviewDocument({ document, title }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <>
      {document ? (
        <div className="collapse w-full bg-gray-200">
          <input
            type="checkbox"
            onChange={() => setIsDropdownOpen(!isDropdownOpen)}
          />
          <div className="collapse-title text-xl font-medium">
            <div className="flex items-center gap-2">
              <p>{title ? title : "Preview"}</p>
              {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
            </div>
          </div>
          <div className="collapse-content">
            <div>
              <embed
                className="w-full h-[80vh] border-none mt-2"
                src={document}
                type="application/pdf"
              />
              {/*  */}
              <p className="text-center p-4">
                Jika PDF tidak muncul,{" "}
                <a download href={document} className="text-blue-500 underline">
                  klik di sini untuk mengunduh PDF
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
