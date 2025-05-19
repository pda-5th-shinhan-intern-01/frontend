import api from "./axiosInstance";

const sectorApi = {
  getSectorList: () => api.get("sectors"),

  getStocksBySector: (sectorName) => api.get(`sectors/${sectorName}/stocks`),

  getHeatmapData: (window) =>
    api.get("/correlation/heatMap", {
      params: { window: window },
    }),
};

export { sectorApi };
