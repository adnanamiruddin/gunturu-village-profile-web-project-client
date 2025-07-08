export default function ModalSubmitButton({
  loading,
  onClick,
  fullWidth,
  children,
}) {
  return (
    <button
      type="button"
      onClick={loading ? null : onClick}
      className={`py-1.5 border border-sky-700 bg-gradient-to-br from-sky-800 to-sky-400 rounded text-white hover:brightness-110 focus:brightness-75 ${
        loading ? "cursor-not-allowed" : "cursor-pointer"
      } ${fullWidth ? "w-full" : "w-36"}`}
    >
      {loading ? (
        <span className="loading loading-bars loading-sm -mb-0.5"></span>
      ) : (
        children
      )}
    </button>
  );
}
