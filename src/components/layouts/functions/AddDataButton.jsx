import { IoMdAdd } from "react-icons/io";

export default function AddDataButton({ name, onClick, disabled, children }) {
  return (
    <button
      name={name}
      onClick={onClick}
      disabled={disabled}
      className="bg-white border-[1.5px] border-sky-700 py-2 px-3 text-sky-700 font-semibold rounded-md flex items-center hover:bg-sky-500 hover:border-sky-300 hover:text-white disabled:bg-gray-300 disabled:text-sky-500 disabled:border-sky-500 disabled:cursor-not-allowed"
    >
      <IoMdAdd className="text-2xl me-2" /> {children}
    </button>
  );
}
