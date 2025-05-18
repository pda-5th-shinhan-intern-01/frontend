import api from "./axiosInstance";

const fomcApi = {
  getFomcList: (ids = []) =>
    api.get("fomc", {
      params: ids.length > 0 ? { id: ids } : {},
    }),
};

export { fomcApi };
