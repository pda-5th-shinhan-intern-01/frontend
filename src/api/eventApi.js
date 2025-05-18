import api from "./axiosInstance";

const eventApi = {
  //지표 이벤트 목록 조회
  getEventList: (from, to, indicator_id) =>
    api.get(`indicators`, {
      from,
      to,
      indicator_id,
    }),
};

export { eventApi };
