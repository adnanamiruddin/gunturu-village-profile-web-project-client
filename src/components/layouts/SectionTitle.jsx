export default function SectionTitle({ id, title }) {
  return (
    <div id={id} className="mt-6 bg-white rounded py-2 px-3 md:py-3 md:px-4">
      <h3 className="text-sm font-semibold flex items-center gap-2 md:text-lg">
        <span className="bg-sky-600 p-1.5 rounded-full"></span> {title}
      </h3>
    </div>
  );
}
