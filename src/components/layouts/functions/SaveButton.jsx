import { FaRegSave } from "react-icons/fa";

export default function SaveButton({ name, onClick, disabled, children }) {
  return (
    <button
      name={name}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="bg-sky-600 border border-sky-600 text-white py-2 px-3 rounded-md flex items-center transition-all duration-300 hover:bg-sky-500 hover:border-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-50 focus:bg-sky-700 disabled:bg-sky-600 disabled:brightness-75 disabled:cursor-not-allowed disabled:text-gray-100"
    >
      <FaRegSave className="text-xl me-2" />
      {children || "Ubah"}
    </button>
  );
}
