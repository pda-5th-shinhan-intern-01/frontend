import api from "./axiosInstance";

//sample: 종목 리스트 조회
const getStockList = (sortedBy, sector, searchParam = "") =>
  api.get(`stocks`, {
    sortedBy,
    sector,
    searchParam,
  });

export { getStockList };
