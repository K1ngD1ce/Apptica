import CategoryList from "../../category/ui/CategoryList";
import cls from "./Graph.module.scss";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Graph() {
  const options = {
    maintainAspectRatio: false,

    plugins: {
      title: {
        display: true,
        text: 'Top History',
        font: {
          size: 48,
          weight: 'bold',
          family: 'Montserrat',
        },
        color: '#333',
        padding: {
          top: 10,
          bottom: 30,
        },
        align: 'start', // start | center | end
      },
    },
  };

  const data = {
    labels: ['A', 'B', 'C'],
    datasets: [
      {
        label: 'Доход',
        data: [100, 200, 300],
        borderColor: 'blue',
      },
      {
        label: 'Доход',
        data: [10, 250, 300],
        borderColor: 'red',
      },
    ],
  };
  return (
    <section className={cls.graph__section}>
      <div className="container">
        <div className={cls.graphCanvas}>
          <Line  data={data} options={options} />
        </div>
        <CategoryList />
      </div>
    </section>
  );
}
