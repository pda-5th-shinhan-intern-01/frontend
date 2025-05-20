import { useIndicator } from "../../../context/IndicatorContext";
import { economicIndicatorMap } from "../../../data/IntroduceOfIndicators";

const mappableIndicators = [
  "CORE_CPI",
  "CORE_PPI",
  "CORE_PCE",
  "NFP",
  "UNEMPLOYMENT",
  "RETAIL_SALES",
  "GDP",
  "INDUSTRIAL_PRODUCTION",
];

export default function IndicatorDetailTable({ weeklyData }) {
  const { focusedIndicator, setFocusedIndicator, setLastClickedY } =
    useIndicator();

  return (
    <div className="flex flex-col gap-12 mt-8">
      {weeklyData.map((day) => (
        <div key={day.date}>
          <div className="font-semibold text-lg text-black mb-3">
            {day.date} {day.day}요일
          </div>

          {day.events.length === 0 ? (
            <div className="text-md text-gray-md">예정된 이벤트 없음</div>
          ) : (
            <table className="w-full text-md table-fixed">
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
                {day.events.map((event, idx) => {
                  const code = event.indicator?.code;
                  const isMappable = mappableIndicators.includes(code);
                  const indicatorName =
                    economicIndicatorMap[code]?.name || event.name;
                  console.log(event);

                  return (
                    <tr
                      key={`${day.date}-${code}-${idx}`}
                      className={`transition ${
                        isMappable ? "hover:bg-orange/10" : ""
                      }`}
                    >
                      <td className="p-2">{event.time}</td>
                      <td className="p-2">{event.country}</td>
                      <td
                        className={`p-2 flex justify-between items-center ${
                          isMappable ? "cursor-pointer" : "cursor-default"
                        }`}
                        onClick={
                          isMappable
                            ? () => {
                                const currentY = window.scrollY;

                                if (focusedIndicator === code) {
                                  setFocusedIndicator(null);
                                  setTimeout(() => {
                                    setLastClickedY(currentY);
                                    setFocusedIndicator(code);
                                  }, 0);
                                } else {
                                  setLastClickedY(currentY);
                                  setFocusedIndicator(code);
                                }
                              }
                            : undefined
                        }
                      >
                        <span>{indicatorName}</span>
                      </td>
                      <td className="p-2">
                        {event.expectedValue}

                        {event.expectedValue
                          ? event.name == "비농업부문 신규 고용자수"
                            ? "K"
                            : event.unit != ""
                            ? event.unit
                            : "%"
                          : ""}
                      </td>
                      <td className="p-2">
                        {event.actualValue}
                        {event.actualValue
                          ? event.name == "비농업부문 신규 고용자수"
                            ? "K"
                            : event.unit != ""
                            ? event.unit
                            : "%"
                          : ""}
                      </td>
                      <td className="p-2">
                        {event.prevValue}
                        {event.prevValue
                          ? event.name == "비농업부문 신규 고용자수"
                            ? "K"
                            : event.unit != ""
                            ? event.unit
                            : "%"
                          : ""}
                      </td>
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
