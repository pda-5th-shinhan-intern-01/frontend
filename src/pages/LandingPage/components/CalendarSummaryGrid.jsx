import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";

export default function CalendarSummaryGrid({ weeklyData }) {
  return (
    <div className="grid grid-cols-5 gap-2 mb-4">
      {weeklyData.map((day, idx) => {
        const indicatorCount = day.events.reduce((acc, cur) => {
          acc[cur.indicator] = (acc[cur.indicator] || 0) + 1;
          return acc;
        }, {});

        const entries = Object.entries(indicatorCount).slice(0, 3);

        return (
          <div
            key={idx}
            className="mt-6 shadow rounded-lg px-4 py-4 flex flex-col gap-2"
          >
            <div className="text-lg font-semibold text-black">
              {day.day} {new Date(day.date).getDate()}일
            </div>
            <div className="mt-2 flex flex-col gap-2 text-gray-md truncate">
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
