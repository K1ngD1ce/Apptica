import { useSelector, useDispatch } from "react-redux";
import cls from "./Chart.module.scss";
import { useEffect, useState, useRef } from "react";
import { fetchCategories } from "../../../shared/lib/fetch/fetchCategories";
import { fetchChartData } from "../../../shared/lib/fetch/fetchChartData";
import Skeleton from "@mui/joy/Skeleton";
import {
  transformChartData,
  categoryIdDecoding,
} from "../model/transformChartData";
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
import CustomLegend from "../../../features/customLegend/ui/CustomLegend";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function Chart() {
  const dispatch = useDispatch();
  const [chartData, setChartData] = useState(null);
  const [fontSize, setFontSize] = useState(getResponsiveFontSize())
  const selectedCountry = useSelector((state) => state.country.selectedCountry);
  const categoryGroups = useSelector(
    (state) => state.categories.categoryGroups
  );
  const chartRef = useRef();
  const [hidden, setHidden] = useState({});

  const toggleDatasetVisibility = (label) => {
    setHidden((prev) => ({
      ...prev,
      [label]: !prev[label],
    }));
  };

  function getResponsiveFontSize() {
    const width = window.innerWidth;
    if (width < 480) return 18;
    if (width < 768) return 24;
    if (width < 1024) return 32;
    return 48;
  }

   useEffect(() => {
    const handleResize = () => {
      setFontSize(getResponsiveFontSize());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (!selectedCountry) return;

    async function load() {
      const data = await fetchChartData(
        selectedCountry.id,
        "2025-05-01",
        "2025-05-15"
      );
      const { categoryMap, subCategoryMap } =
        categoryIdDecoding(categoryGroups);
      const { labels, datasets } = transformChartData(
        data.data,
        categoryMap,
        subCategoryMap
      );

      setChartData({ labels, datasets });
    }

    load();
  }, [selectedCountry, categoryGroups]);

  if (!chartData)
    return (
      <div className="loadContainer">
        <Skeleton
          variant="rectangular"
          height={900}
          animation="wave"
          sx={{ borderRadius: 8 }}
        />
      </div>
    );

  const filteredDatasets = chartData.datasets.map((ds) => ({
    ...ds,
    hidden: hidden[ds.label],
  }));

  const options = {
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Top History",
        font: {
          size: fontSize,
        },
        align: "start",
      },
      legend: {
        display: false,
      },
    },
  };

  return (
    <section className={cls.Chart__section}>
      <div className="container">
        <div className={cls.ChartCanvas}>
          <Line
            ref={chartRef}
            data={{ ...chartData, datasets: filteredDatasets }}
            options={options}
          />
          <CustomLegend
            datasets={chartData.datasets}
            toggle={toggleDatasetVisibility}
            hidden={hidden}
          />
        </div>
      </div>
    </section>
  );
}
