import api from "./axiosInstance";

const stockApi = {
  //sample: 종목 리스트 조회
  getStockList: (sortedBy, sector, searchParam = "") =>
    api.get(`stocks`, {
      sortedBy,
      sector,
      searchParam,
    }),

  //주가 차트 데이터 조회
  getStockChart: (ticker, from, to) =>
    api.get(`stocks/${ticker}/chart`, {
      from,
      to,
    }),

  //종목의 지표별 민감도 조회
  getStockSensitivity: (ticker) => api.get(`sensitivities/${ticker}`),
};

export { stockApi };
