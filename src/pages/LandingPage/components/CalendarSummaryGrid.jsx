import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";

export default function CalendarSummaryGrid({ weeklyData }) {
  return (
    <div className="grid grid-cols-7 gap-2 mb-4">
      {weeklyData.map((day, idx) => {
        const indicatorCount = day.events.reduce((acc, cur) => {
          acc[cur.indicator] = (acc[cur.indicator] || 0) + 1;
          return acc;
        }, {});

        const entries = Object.entries(indicatorCount).slice(0, 3);

        return (
          <div
            key={idx}
            className="border border-[color:var(--color-gray-light)] rounded-lg px-2 py-2 text-sm flex flex-col gap-2"
          >
            <div className="font-semibold text-black">
              {day.day} {new Date(day.date).getDate()}일
            </div>
            <div className="flex flex-col gap-[1px] text-gray-md truncate">
              {entries.map(([indicator, count], i) => (
                <div key={i} className="flex justify-between w-full">
                  <span className="truncate">
                    {economicIndicatorMap[indicator]?.name || indicator}
                  </span>
                  <span className="font-semibold text-black">{count}</span>
                </div>
              ))}
              {entries.length === 0 && (
                <span className="text-gray-md">예정 없음</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
