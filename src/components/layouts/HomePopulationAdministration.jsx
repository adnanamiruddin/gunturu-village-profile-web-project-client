export default function HomePopulationAdministration({
  children,
  amount,
  type,
}) {
  return (
    <div className="flex flex-col items-center">
      {children}
      <p className="text-xl font-bold text-center md:text-3xl">{amount}</p>
      <p className="text-sm font-semibold text-center md:text-lg">{type}</p>
    </div>
  );
}
