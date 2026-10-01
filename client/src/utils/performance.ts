export type MetricName = "lcp" | "inp" | "cls" | "fcp";

export type MetricStatus =
  | "good"
  | "needs-improvement"
  | "poor";

interface MetricThreshold {
  good: number;
  poor: number;
}

export const thresholds: Record<
  MetricName,
  MetricThreshold
> = {
  lcp: {
    good: 2.5,
    poor: 4,
  },
  inp: {
    good: 200,
    poor: 500,
  },
  cls: {
    good: 0.1,
    poor: 0.25,
  },
  fcp: {
    good: 1.8,
    poor: 3,
  },
};

export function getMetricStatus(
  metric: MetricName,
  value: number
): MetricStatus {
  const threshold = thresholds[metric];

  if (value <= threshold.good) {
    return "good";
  }

  if (value >= threshold.poor) {
    return "poor";
  }

  return "needs-improvement";
}

export function getMetricStatusLabel(
  status: MetricStatus
): string {
  switch (status) {
    case "good":
      return "Good";

    case "needs-improvement":
      return "Needs Improvement";

    case "poor":
      return "Poor";
  }
}

export function getPerformanceIndex(
  metric: MetricName,
  value: number
): number {
  const threshold = thresholds[metric];

  if (value <= threshold.good) {
    return 100;
  }

  if (value >= threshold.poor) {
    return 0;
  }

  return Math.round(
    ((threshold.poor - value) /
      (threshold.poor - threshold.good)) *
      100
  );
}