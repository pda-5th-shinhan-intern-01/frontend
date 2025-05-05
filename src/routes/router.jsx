import { createBrowserRouter } from "react-router-dom";

import Layout from "../components/layout/Layout";
import LandingPage from "../pages/LandingPage";
import FOMCListPage from "../pages/FOMCListPage";
import FOMCDetailPage from "../pages/FOMCDetailPage";
import HeatmapPage from "../pages/HeatmapPage";
import IntroductionIndicatorPage from "../pages/IntroduceIndicatorPage";
import MainPage from "../pages/MainPage";
import SectorListPage from "../pages/SectorListPage";
import IntroPage from "../pages/IntroPage";

const router = createBrowserRouter([
  { path: "/", element: <IntroPage /> },
  {
    path: "/main",
    element: <Layout />,
    children: [
      { path: "", element: <LandingPage /> },
      { path: "fomcs", element: <FOMCListPage /> },
      { path: "fomcs/:id", element: <FOMCDetailPage /> },
      { path: "heatmap", element: <HeatmapPage /> },
      { path: "sectors", element: <SectorListPage /> },
      { path: "sectors/:id", element: <MainPage /> },
      { path: "introduce-indicators", element: <IntroductionIndicatorPage /> },
    ],
  },
]);
export default router;