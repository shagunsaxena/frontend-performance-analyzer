import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  getPerformanceIndex,
  type MetricName,
} from "../utils/performance";
import "./PerformanceChart.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface Metrics {
  lcp: number;
  inp: number;
  cls: number;
  fcp: number;
}

interface PerformanceChartProps {
  metrics: Metrics;
}

function PerformanceChart({
  metrics,
}: PerformanceChartProps) {
  const metricNames: MetricName[] = [
    "lcp",
    "inp",
    "cls",
    "fcp",
  ];

  const values = [
    metrics.lcp,
    metrics.inp,
    metrics.cls,
    metrics.fcp,
  ];

  const performanceIndexes = metricNames.map(
    (metric, index) =>
      getPerformanceIndex(metric, values[index])
  );

  const data = {
    labels: ["LCP", "INP", "CLS", "FCP"],
    datasets: [
      {
        label: "Performance Index",
        data: performanceIndexes,
        borderWidth: 0,
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value: string | number) => `${value}%`,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: { raw: unknown }) =>
            `Performance Index: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <section className="performance-chart">
      <div className="section-heading">
        <h2>Performance Overview</h2>
        <p>
          Normalized performance index across key metrics
        </p>
      </div>

      <div className="chart-container">
        <Bar data={data} options={options} />
      </div>
    </section>
  );
}

export default PerformanceChart;