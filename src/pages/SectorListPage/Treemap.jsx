import React from "react";
import { Treemap, ResponsiveContainer } from "recharts";


const dummyData = {
    date: "2025.05.20",
    stocks: [
        { name: "마이크로소프트 (MSFT)", change: 3.57, marketCap: 280 },
        { name: "애플 (AAPL)", change: 1.54, marketCap: 270 },
        { name: "엔비디아 (NVDA)", change: 6.74, marketCap: 160 },
        { name: "브로드컴 (AVGO)", change: -1.27, marketCap: 50 },
        { name: "오라클 (ORCL)", change: 5.21, marketCap: 38 },
        { name: "IBM (IBM)", change: 1.55, marketCap: 12 },
        { name: "액센츄어 A (ACN)", change: -2.12, marketCap: 22 },
        { name: "시스코 (CSCO)", change: 4.48, marketCap: 21 },
        { name: "어도비 (ADBE)", change: 2.19, marketCap: 27 },
        { name: "AMD (AMD)", change: -3.21, marketCap: 19 }
    ]
};

const getColor = (change) => {
    if (change >= 10) return "#ef4444";
    if (change >= 5) return "#f87171";
    if (change >= 3) return "#ffc0cd";
    if (change >= 1) return "#fca5a5";
    if (change >= 0.5) return "#fee2e2";
    if (change === 0) return "#f3f4f6";
    if (change > -0.5) return "#dbeafe";
    if (change > -1) return "#bfdbfe";
    if (change > -3) return "#93c5fd";
    if (change > -5) return "#60a5fa";
    return "#3b82f6";
};

function CustomContent(props) {
    return (
        <g>
            {props?.root?.children?.map((node, i) => {
                const { x, y, width, height, name, change } = node;
                const fillColor = getColor(change);
                const formattedChange = change?.toFixed(2);

                return (
                    <g key={`cell-${i}`}>
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
                                    style={{ fontSize: "0.95rem", fontWeight: "bold", lineHeight: "1.3" }}
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

export default function TechTreemap() {
    const { date, stocks } = dummyData;

    const legendColors = [
        { label: "-10%", color: "#3b82f6" },
        { label: "-5%", color: "#60a5fa" },
        { label: "-3%", color: "#93c5fd" },
        { label: "-1%", color: "#bfdbfe" },
        { label: "-0.5%", color: "#dbeafe" },
        { label: "0%", color: "#f3f4f6" },
        { label: "0.5%", color: "#fee2e2" },
        { label: "1%", color: "#fca5a5" },
        { label: "3%", color: "#ffc0cd" },
        { label: "5%", color: "#f87171" },
        { label: "10%", color: "#ef4444" }
    ];

    return (
        <div className="p-6 bg-white rounded-2xl shadow-md">




            <div className="w-full h-[600px] rounded-xl overflow-hidden">
                <ResponsiveContainer width="100%" height="100%">
                    <Treemap
                        data={stocks}
                        dataKey="marketCap"
                        stroke="#fff"
                        animationDuration={0}
                        content={<CustomContent />}
                    />
                </ResponsiveContainer>
            </div>


            <div className="flex justify-end mt-6 gap-4 items-center">
                <p className="text-xs text-gray-500 whitespace-nowrap">구성종목 수익률 기준</p>
                <div className="flex flex-wrap gap-1 text-xs font-medium">
                    {legendColors.map((item, idx) => (
                        <div
                            key={idx}
                            className="px-2 py-1 rounded"
                            style={{
                                backgroundColor: item.color,
                                color: item.label === "0%" ? "#000" : "#fff"
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
