import React from "react";
import { useNavigate } from "react-router-dom";
import { Treemap, ResponsiveContainer } from "recharts";

const getColor = (change) => {
  if (change >= 10) return "var(--color-red-md)"; // #fe4700
  if (change >= 5) return "var(--color-orange)"; // #ff8341
  if (change >= 3) return "#ffad87";
  if (change >= 1) return "#ffc8b4";
  if (change >= 0.5) return "#ffe0da";
  if (change === 0) return "#f3f4f6"; // 중립 회색
  if (change > -0.5) return "#e5f7ff";
  if (change > -1) return "#cdeffc";
  if (change > -3) return "#aee0fb";
  if (change > -5) return "var(--color-blue-light)"; // #93c5fd
  return "var(--color-blue-md)"; // #00aaf0
};

const toTreemapData = (stocks, sector) => {
  return [
    {
      name: sector,
      children: stocks.map((stock) => ({
        ...stock,
        children: [],
      })),
    },
  ];
};

function CustomContent(props) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);
  const { root, navigate } = props;
  return (
    <g>
      {root?.children?.map((node, i) => {
        const { x, y, width, height, name, change, ticker } = node;
        const fillColor = getColor(change);
        const formattedChange = change?.toFixed(2);
        const isHovered = hoveredIndex === i;

        return (
          <g
            key={`cell-${i}`}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => {
              console.log("payload 확인:", ticker);
              navigate(`./${ticker}`);
            }}
            style={{
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
              transform: isHovered ? "scale(1.1)" : "scale(1)",
              transformBox: "fill-box", // 중심 기준으로 확대
              transformOrigin: "center center", // 중심 위치 기준
            }}
          >
            <rect
              x={x}
              y={y}
              width={width}
              height={height}
              style={{ fill: fillColor, stroke: "#fff" }}
            />
            {width > 50 && height > 30 && (
              <foreignObject x={x} y={y} width={width} height={height}>
                <div
                  className="flex flex-col justify-center items-center w-full h-full text-center px-1"
                  style={{
                    fontSize: "0.95rem",
                    fontWeight: "bold",
                    lineHeight: "1.3",
                  }}
                >
                  <div>{name}</div>
                  <div>{formattedChange}%</div>
                </div>
              </foreignObject>
            )}
          </g>
        );
      })}
    </g>
  );
}

export default function TechTreemap({ sector = "기술", stocks }) {
  const treemapData = toTreemapData(stocks, sector);

  const legendColors = [
    { label: "-10%", color: "var(--color-blue-md)" }, // #00aaf0
    { label: "-5%", color: "var(--color-blue-light)" }, // #93c5fd
    { label: "-3%", color: "#b3dcfa" }, // blue-light보다 연함
    { label: "-1%", color: "#d6edfb" }, // 아주 연한 하늘색
    { label: "-0.5%", color: "#eaf6fc" }, // 거의 흰색
    { label: "0%", color: "#f3f4f6" }, // 중립 회색
    { label: "0.5%", color: "#ffe0da" }, // 연한 살구
    { label: "1%", color: "#ffc8b4" },
    { label: "3%", color: "var(--color-orange)" }, // #ff8341
    { label: "5%", color: "var(--color-red-md)" }, // #fe4700
    { label: "10%", color: "#cc3300" }, // 진한 빨강
  ];

  const navigate = useNavigate();
  return (
    <div className="">
      <div className="w-full h-[600px] rounded-xl overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treemapData}
            dataKey="marketCap"
            stroke="#fff"
            animationDuration={0}
            content={(props) => (
              <CustomContent {...props} navigate={navigate} />
            )}
          />
        </ResponsiveContainer>
      </div>

      <div className="flex justify-end mt-6 gap-4 items-center">
        <p className="text-xs text-gray-500 whitespace-nowrap">
          구성종목 수익률 기준
        </p>
        <div className="flex flex-wrap gap-1 text-xs font-medium">
          {legendColors.map((item, idx) => (
            <div
              key={idx}
              className="px-2 py-1 rounded"
              style={{
                backgroundColor: item.color,
                color: item.label === "0%" ? "#000" : "#fff",
              }}
            >
              {item.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
