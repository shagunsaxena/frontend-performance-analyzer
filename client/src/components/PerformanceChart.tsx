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
  thresholds,
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
  inp: number | null;
  cls: number;
  fcp: number;
}

interface PerformanceChartProps {
  metrics: Metrics;
}

function PerformanceChart({ metrics }: PerformanceChartProps) {
  const metricValues: Record<MetricName, number | null> = {
    lcp: metrics.lcp,
    inp: metrics.inp,
    cls: metrics.cls,
    fcp: metrics.fcp,
  };

  const availableMetrics = (
    Object.keys(metricValues) as MetricName[]
  ).filter((metric) => metricValues[metric] !== null);

  const labels = availableMetrics.map((metric) =>
    metric.toUpperCase()
  );

  const thresholdUsage = availableMetrics.map((metric) => {
    const value = metricValues[metric] as number;
    const poorThreshold = thresholds[metric].poor;

    return Math.min(
      Math.round((value / poorThreshold) * 100),
      100
    );
  });

  const data = {
    labels,
    datasets: [
      {
        label: "Threshold Usage",
        data: thresholdUsage,
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
        title: {
          display: true,
          text: "Poor Threshold Usage",
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
            `Threshold usage: ${context.raw}%`,
        },
      },
    },
  };

  return (
    <section className="performance-chart">
      <div className="section-heading">
        <h2>Performance Overview</h2>
        <p>
          Metric values relative to their poor-performance thresholds
        </p>
      </div>

      <div className="chart-container">
        {availableMetrics.length > 0 ? (
          <Bar data={data} options={options} />
        ) : (
          <p>No performance metrics available.</p>
        )}
      </div>
    </section>
  );
}

export default PerformanceChart;