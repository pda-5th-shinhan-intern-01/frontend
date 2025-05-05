import { newsListData } from "../dummies/newsListData";

export default function NewsList() {
  return (
    <div className="flex flex-col gap-2 p-4 w-full text-sm">
      <div className="flex justify-between items-center mb-2">
        <h2 className="font-semibold text-lg text-[color:var(--color-black)]">
          News
        </h2>
        <button className="text-[color:var(--color-gray-md)] hover:cursor-pointer text-xs">
          더보기 &gt;
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {newsListData.map((news, idx) => (
          <a
            key={idx}
            href={news.link}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-2 items-start rounded text-[color:var(--color-black)] transition"
          >
            <div className="w-12 h-12 bg-[color:var(--color-gray-light)] rounded-md flex-shrink-0" />

            <div className="flex flex-col">
              <h3 className="font-semibold leading-tight text-[color:var(--color-black)] hover:underline">
                {news.title}
              </h3>
              <p className="text-[color:var(--color-gray-md)] text-xs">
                {news.press} • {news.timeAgo}
              </p>
              <div className="flex gap-1 mt-1 flex-wrap">
                {news.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-[color:var(--color-gray-md)] text-[11px]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
