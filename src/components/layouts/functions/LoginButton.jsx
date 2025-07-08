export default function LoginButton({ name, loading }) {
  return (
    <button
      name={name}
      type="submit"
      className={`mt-3 bg-sky-600 w-full border-0 text-white text-xl py-3 rounded-lg shadow-lg hover:bg-sky-500 focus:bg-sky-800 ${
        loading ? "brightness-75" : ""
      }`}
    >
      {loading ? (
        <span className="loading loading-bars loading-sm"></span>
      ) : (
        "Masuk"
      )}
    </button>
  );
}
