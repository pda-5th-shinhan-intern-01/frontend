import IndicatorChartCard from "./IndicatorChartCard";
import { economicEventChartData } from "../dummies/economicEventChartData";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";
import { SlArrowDown } from "react-icons/sl";

export default function IndicatorDetailTable({
  weeklyData,
  openIndicators,
  toggleIndicator,
}) {
  return (
    <div className="flex flex-col gap-6">
      {weeklyData.map((day) => (
        <div key={day.date}>
          <div className="font-semibold text-sm text-[color:var(--color-black)] mb-2">
            {day.date} {day.day}요일
          </div>
          {day.events.length === 0 ? (
            <div className="text-xs text-[color:var(--color-gray-md)]">
              예정된 이벤트 없음
            </div>
          ) : (
            <table className="w-full text-xs table-fixed">
              <thead className="text-left text-[color:var(--color-black)] bg-[color:var(--color-gray-light)]">
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
                  const key = `${day.date}-${event.indicator}`;
                  const isOpen = openIndicators.includes(key);
                  return (
                    <>
                      <tr
                        key={`row-${key}`}
                        className={`${
                          isOpen
                            ? "bg-[color:var(--color-blue-md)]/10"
                            : "hover:bg-[color:var(--color-gray-light)]"
                        } transition`}
                      >
                        <td className="p-2">{event.time}</td>
                        <td className="p-2">{event.country}</td>
                        <td
                          className="p-2 cursor-pointer flex justify-between items-center"
                          onClick={() => toggleIndicator(key)}
                        >
                          <span>
                            {economicIndicatorMap[event.indicator]?.name ||
                              event.indicator}
                          </span>
                          <SlArrowDown
                            className={`transition-transform duration-300 ml-2 ${
                              isOpen ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </td>
                        <td className="p-2">{event.expected}</td>
                        <td className="p-2">{event.actual}</td>
                        <td className="p-2">{event.previous}</td>
                      </tr>
                      {isOpen && (
                        <tr key={`card-${key}`}>
                          <td colSpan={6} className="p-4">
                            {economicEventChartData[event.indicator] && (
                              <IndicatorChartCard
                                indicator={event.indicator}
                                data={economicEventChartData[event.indicator]}
                              />
                            )}
                          </td>
                        </tr>
                      )}
                    </>
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
