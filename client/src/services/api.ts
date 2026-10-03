export interface Recommendation {
  title: string;
  description: string;
}

export interface PerformanceData {
  url: string;
  score: number;
  metrics: {
    lcp: number;
    inp: number | null;
    cls: number;
    fcp: number;
  };
  recommendations: Recommendation[];
}

interface PerformanceResponse {
  success: boolean;
  data?: PerformanceData;
  error?: string;
}

export const analyzePerformance = async (
  url: string
): Promise<PerformanceData> => {
  const response = await fetch(
    `http://localhost:5000/api/performance?url=${encodeURIComponent(url)}`
  );

  const result: PerformanceResponse = await response.json();

  if (!response.ok || !result.success || !result.data) {
    throw new Error(
      result.error || "Unable to analyze website performance"
    );
  }

  return result.data;
};