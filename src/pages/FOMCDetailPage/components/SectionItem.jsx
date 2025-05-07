export default function SectionItem({ title, data }) {
  return (
    <div className="flex flex-col mb-3">
      <div className="flex flex-row gap-4  items-center">
        <div className="text-gray-md">{title}</div>
        {(title === "찬성" || title === "반대") && (
          <div className="border border-gray-light rounded-xl px-3 text-sm">
            {data.length}명
          </div>
        )}
      </div>
      {typeof data === "string" ? (
        <div>{data}</div>
      ) : (
        <ul className="list-disc pl-4">
          {data.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
