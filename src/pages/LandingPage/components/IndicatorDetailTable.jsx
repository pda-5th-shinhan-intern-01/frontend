import { useIndicator } from "../../../context/IndicatorContext";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";

export default function IndicatorDetailTable({ weeklyData }) {
  const { focusedIndicator, setFocusedIndicator, setLastClickedY } =
    useIndicator();

  return (
    <div className="flex flex-col gap-6">
      {weeklyData.map((day) => (
        <div key={day.date}>
          <div className="font-semibold text-sm text-black mb-2">
            {day.date} {day.day}요일
          </div>

          {day.events.length === 0 ? (
            <div className="text-xs text-gray-md">예정된 이벤트 없음</div>
          ) : (
            <table className="w-full text-xs table-fixed">
              <thead className="text-left text-black bg-gray-light">
                <tr>
                  <th className="p-2 w-[10%]">시간</th>
                  <th className="p-2 w-[10%]">국가</th>
                  <th className="p-2 w-[40%]">지표</th>
                  <th className="p-2 w-[13%]">예상</th>
                  <th className="p-2 w-[13%]">실제</th>
                  <th className="p-2 w-[13%]">이전</th>
                </tr>
              </thead>
              <tbody>
                {day.events.map((event) => {
                  const indicatorName =
                    economicIndicatorMap[event.indicator]?.name ||
                    event.indicator;

                  return (
                    <tr
                      key={`${day.date}-${event.indicator}`}
                      className="hover:bg-blue-md/10 transition"
                    >
                      <td className="p-2">{event.time}</td>
                      <td className="p-2">{event.country}</td>
                      <td
                        className="p-2 cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          const currentY = window.scrollY;

                          if (focusedIndicator === event.indicator) {
                            setFocusedIndicator(null);
                            setTimeout(() => {
                              setLastClickedY(currentY);
                              setFocusedIndicator(event.indicator);
                            }, 0);
                          } else {
                            setLastClickedY(currentY);
                            setFocusedIndicator(event.indicator);
                          }
                        }}
                      >
                        <span>{indicatorName}</span>
                      </td>
                      <td className="p-2">{event.expected}</td>
                      <td className="p-2">{event.actual}</td>
                      <td className="p-2">{event.previous}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      ))}
    </div>
  );
}
