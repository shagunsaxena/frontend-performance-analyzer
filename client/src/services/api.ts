export interface PerformanceData {
  url: string;
  score: number;
  metrics: {
    lcp: number;
    inp: number;
    cls: number;
    fcp: number;
  };
  recommendations: string[];
}

interface PerformanceResponse {
  success: boolean;
  data: PerformanceData;
}

export const analyzePerformance = async (
  url: string
): Promise<PerformanceData> => {
  const response = await fetch(
    `http://localhost:5000/api/performance?url=${encodeURIComponent(url)}`
  );

  if (!response.ok) {
    throw new Error("Unable to analyze website performance");
  }

  const result: PerformanceResponse = await response.json();

  return result.data;
};