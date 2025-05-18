import React from "react";
import { useNavigate } from "react-router-dom";
import { Treemap, ResponsiveContainer } from "recharts";

const getColor = (change) => {
  if (change >= 10) return "var(--color-red-md)";
  if (change >= 5) return "var(--color-orange)";
  if (change >= 3) return "#ffad87";
  if (change >= 1) return "#ffc8b4";
  if (change >= 0.5) return "#ffe0da";
  if (change === 0) return "#f3f4f6";
  if (change > -0.5) return "#e5f7ff";
  if (change > -1) return "#cdeffc";
  if (change > -3) return "#aee0fb";
  if (change > -5) return "var(--color-blue-light)";
  return "var(--color-blue-md)";
};

const toTreemapData = (stocks, sector) => [
  {
    name: sector,
    children: stocks.map((stock) => ({
      name: stock.name,
      ticker: stock.ticker,
      change: stock.changeRate,
      marketCap: stock.marketCap,
      children: [],
    })),
  },
];


function CustomContent({ root, navigate }) {
  const [hoveredIndex, setHoveredIndex] = React.useState(null);

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
            onClick={() => navigate(`./${ticker}`)}
            style={{
              cursor: "pointer",
              transition: "transform 0.3s ease-in-out",
              transform: isHovered ? "scale(1.3)" : "scale(1)",
              transformBox: "fill-box",
              transformOrigin: "center center",
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
                    fontSize: "1.3rem",
                    fontWeight: "bold",
                    lineHeight: "1.3",
                    color:"#000"
                  }}
                >
                  <div>{name}</div>
                  <div style={{ color: change > 0 ? '#fe4700' : change < 0 ? '#00aaf0' : '#000' }}>
  {formattedChange}%
</div>

                </div>
              </foreignObject>
            )}
          </g>
        );
      })}
    </g>
  );
}

export default function SectorTreemap({ sectorData }) {
  const { sectorName, stocks } = sectorData;
  const treemapData = toTreemapData(stocks, sectorName);
  const navigate = useNavigate();

  const legendColors = [
    { label: "-10%", color: "var(--color-blue-md)" },
    { label: "-5%", color: "var(--color-blue-light)" },
    { label: "-3%", color: "#b3dcfa" },
    { label: "-1%", color: "#d6edfb" },
    { label: "-0.5%", color: "#eaf6fc" },
    { label: "0%", color: "#f3f4f6" },
    { label: "0.5%", color: "#ffe0da" },
    { label: "1%", color: "#ffc8b4" },
    { label: "3%", color: "var(--color-orange)" },
    { label: "5%", color: "var(--color-red-md)" },
    { label: "10%", color: "#cc3300" },
  ];

  return (
    <div>
      <div className="w-full h-[600px] rounded-3xl overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treemapData}
            dataKey="marketCap"
            animationDuration={0}
            content={(props) => (
              <CustomContent {...props} navigate={navigate} />
            )}
          />
        </ResponsiveContainer>
      </div>

      <div className="flex justify-end mt-6 gap-4 items-center">
        <p className="text-xs whitespace-nowrap">구성종목 수익률 기준</p>
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
