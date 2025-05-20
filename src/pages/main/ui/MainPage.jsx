import HeaderPanel from "../../../features/headerPanel/ui/HeaderPanel";
import Chart from "../../../entities/chart/ui/Chart";
import { useState} from "react";
export default function MainPage() {
  const [chartRef, setChartRef] = useState(null);
  const [chartData, setChartData] = useState(null);

  const handleChartReady = ({ chartRef, chartData }) => {
    setChartRef(chartRef);
    setChartData(chartData);
  };

  return (
    <div className="widgetContainer">
      <HeaderPanel chartRef={chartRef} chartData={chartData} />
      <Chart onReady={handleChartReady} />
    </div>
  );
}
