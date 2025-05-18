export function transformStockData(rawData) {
  if (!rawData || rawData.length === 0)
    return {
      seriesData: [],
      seriesDataWithColor: [],
      seriesDataLinear: [],
    };

  const seriesData = rawData.map((item) => ({
    x: new Date(item.date).getTime(),
    y: [item.open, item.high, item.low, item.close],
  }));

  const seriesDataWithColor = rawData.map((item) => ({
    x: new Date(item.date).getTime(),
    y: item.volume,
    fillColor: item.close >= item.open ? "#fe4700" : "#00aaf0",
  }));

  const seriesDataLinear = rawData.map((item) => ({
    x: new Date(item.date).getTime(),
    y: item.close,
  }));

  return {
    seriesData,
    seriesDataWithColor,
    seriesDataLinear,
  };
}
