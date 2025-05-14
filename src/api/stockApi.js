import api from "./axiosInstance";

const stockApi = {
  //sample: 종목 리스트 조회
  getStockList: (sortedBy, sector, searchParam = "") =>
    api.get(`stocks`, {
      sortedBy,
      sector,
      searchParam,
    }),
  // 종목 관련 api는 아래에 추가
};

export { stockApi };
