import HeaderPanel from "../../../features/headerPanel/ui/HeaderPanel";
import Chart from "../../../entities/chart/ui/Chart";
export default function MainPage() {
  return (
    <div className="widgetContainer">
      <HeaderPanel />
      <Chart />
    </div>
  );
}
