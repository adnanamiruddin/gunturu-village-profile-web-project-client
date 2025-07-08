export default function ModalCancelButton({ loading, onClick, children }) {
  return (
    <button
      onClick={loading ? null : onClick}
      className={`py-1.5 w-36 border border-sky-700 rounded font-medium hover:brightness-125 focus:brightness-75 ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {loading ? (
        <span className="loading loading-bars loading-sm -mb-0.5"></span>
      ) : (
        children
      )}
    </button>
  );
}
