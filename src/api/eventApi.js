import api from "./axiosInstance";

const eventApi = {
  //지표 이벤트 목록 조회
  getEventList: (from, to, indicator_id) =>
    api.get(`indicators`, {
      from,
      to,
      indicator_id,
    }),
  //지표 이벤트 차트 데이터 조회
  getEventChart: (indicator_code = "UNEMPLOYMENT") =>
    api.get(`indicators/${indicator_code}/chart`),
};

export { eventApi };
