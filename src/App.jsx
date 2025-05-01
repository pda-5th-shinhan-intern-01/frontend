import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router";
import ApexCharts from "apexcharts";
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
