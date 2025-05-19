import HeaderPanel from "../../../features/header/ui/HeaderPanel";
import Graph from "../../../entities/graph/ui/Graph";
export default function MainPage() {
  return (
    <div className="widgetContainer">
      <HeaderPanel />
      <Graph />
    </div>
  );
}
