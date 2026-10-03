import {
  getMetricStatus,
  getMetricStatusLabel,
  type MetricName,
} from "../utils/performance";
import "./MetricsGrid.css";

interface Metrics {
  lcp: number;
  inp: number | null;
  cls: number;
  fcp: number;
}

interface MetricsGridProps {
  metrics: Metrics;
}

function MetricsGrid({ metrics }: MetricsGridProps) {
  const metricItems: {
    name: MetricName;
    label: string;
    value: string;
    rawValue: number | null;
  }[] = [
    {
      name: "lcp",
      label: "Largest Contentful Paint",
      value: `${metrics.lcp.toFixed(2)}s`,
      rawValue: metrics.lcp,
    },
    {
      name: "inp",
      label: "Interaction to Next Paint",
      value: metrics.inp === null ? "Not available" : `${metrics.inp}ms`,
      rawValue: metrics.inp,
    },
    {
      name: "cls",
      label: "Cumulative Layout Shift",
      value: metrics.cls.toFixed(3),
      rawValue: metrics.cls,
    },
    {
      name: "fcp",
      label: "First Contentful Paint",
      value: `${metrics.fcp.toFixed(2)}s`,
      rawValue: metrics.fcp,
    },
  ];

  return (
    <section className="metrics-section">
      <div className="section-heading">
        <h2>Core Web Vitals & Performance Metrics</h2>
        <p>Key metrics from the latest analysis</p>
      </div>

      <div className="metrics-grid">
        {metricItems.map((metric) => {
          const status =
            metric.rawValue === null
              ? null
              : getMetricStatus(metric.name, metric.rawValue);

          return (
            <article className="metric-card" key={metric.name}>
              <div className="metric-card-header">
                <span className="metric-name">
                  {metric.name.toUpperCase()}
                </span>

                {status && (
                  <span className={`metric-status ${status}`}>
                    {getMetricStatusLabel(status)}
                  </span>
                )}

                {!status && (
                  <span className="metric-status unavailable">
                    Unavailable
                  </span>
                )}
              </div>

              <strong className="metric-value">{metric.value}</strong>

              <p className="metric-label">{metric.label}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default MetricsGrid;