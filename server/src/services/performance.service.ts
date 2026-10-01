export interface PerformanceData{
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

export const analyzePerformance = async (
    url: string
): Promise<PerformanceData> => {
    //mockdata


return{
    url, score: 87,
    metrics: {
        lcp: 1.8,
        inp: 120,
        cls: 0.04,
        fcp: 1.2,
    },
    recommendations: [
        "Optimize image",
        "Reduce unused JavaScript",
        "Enable compression",
    ],
};
};