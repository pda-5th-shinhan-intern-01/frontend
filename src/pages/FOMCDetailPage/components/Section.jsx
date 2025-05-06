export default function Section({ title, children }) {
  return (
    <section className="mb-5 flex flex-col">
      <h2 className="font-semibold mb-3 text-gray-800">{title}</h2>
      <div className="p-4 rounded-lg bg-white border border-gray-light flex flex-col">
        {children}
      </div>
    </section>
  );
}
