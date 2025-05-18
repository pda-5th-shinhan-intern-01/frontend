export function transformStockData(initData) {
  const seriesData = initData.map((d) => ({
    x: new Date(d.date).getTime(),
    y: [d.open, d.high, d.low, d.close],
  }));

  const seriesDataLinear = initData.map((d) => ({
    x: new Date(d.date).getTime(),
    y: d.volume,
  }));

  const seriesDataWithColor = seriesDataLinear.map((volumeData) => {
    const priceData = seriesData.find((d) => d.x === volumeData.x);
    if (!priceData) return volumeData;

    const [open, , , close] = priceData.y;
    const color =
      close > open
        ? "#fe4700" // 상승
        : close < open
        ? "#00aaf0" // 하락
        : "#999999"; // 보합

    return { ...volumeData, color };
  });

  return { seriesData, seriesDataLinear, seriesDataWithColor };
}
