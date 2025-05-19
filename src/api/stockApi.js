import api from "./axiosInstance";

const stockApi = {
  //sample: 종목 리스트 조회
  getStockList: (sortedBy, sector, searchParam = "") =>
    api.get(`stocks`, {
      params: { sortedBy, sector, searchParam },
    }),

  //주가 차트 데이터 조회
  getStockChart: (ticker, from, to) =>
    api.get(`stocks/${ticker}/chart`, {
      params: { from, to },
    }),

  //종목의 지표별 민감도 조회
  getStockSensitivity: (ticker) => api.get(`sensitivities/${ticker}`),

  //종목의 지표별 주가 변화 조회
  getStockChangeWithSesitivity: (ticker) =>
    api.get(`sensitivities/rate/${ticker}`),

  //종목 기본 정보 조회
  getStockInfo: (ticker, name, sortedBy, sectorName) =>
    api.get(`stocks`, { params: { ticker, name, sortedBy, sectorName } }),
  getStockWithNxtEvents: (ticker, sortedBy) =>
    api.get(`sensitivities/performance/${ticker}`, { params: { sortedBy } }),
};

export { stockApi };
