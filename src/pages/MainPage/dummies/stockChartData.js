// 20일치 더미 캔들차트 데이터 (시가, 고가, 저가, 종가)
const seriesData = [];

const startDate = new Date("2023-01-01");

for (let i = 0; i < 20; i++) {
  const base = 200 + i * 2; // 기준 시가
  const open = base + Math.floor(Math.random() * 5);
  const close = base + Math.floor(Math.random() * 5);
  const high = Math.max(open, close) + Math.floor(Math.random() * 3);
  const low = Math.min(open, close) - Math.floor(Math.random() * 3);

  seriesData.push({
    x: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).getTime(),
    y: [open, high, low, close],
  });
}

const seriesDataLinear = [];

for (let i = 0; i < 20; i++) {
  const volume = Math.floor(Math.random() * 20000) + 5000; // 5,000 ~ 25,000
  seriesDataLinear.push({
    x: new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000).getTime(),
    y: volume,
  });
}

export { seriesData, seriesDataLinear };
