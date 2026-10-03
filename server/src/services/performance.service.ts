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

export const analyzePerformance = async (
  url: string
): Promise<PerformanceData> => {
  const { default: lighthouse } = await import("lighthouse");
  const { launch } = await import("chrome-launcher");

  const chrome = await launch({
    chromeFlags: [
      "--headless=new",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
      "--no-sandbox",
      "--disable-dev-shm-usage",
    ],
  });

  try {
    const result = await lighthouse(url, {
      port: chrome.port,
      onlyCategories: ["performance"],
      output: "json",
      logLevel: "error",
    });

    if (!result?.lhr) {
      throw new Error("Lighthouse analysis failed");
    }

    const { lhr } = result;

    /*
     * Lighthouse can return an LHR object even when
     * the requested website could not be loaded.
     *
     * Check the navigation-error audit before processing
     * performance metrics.
     */
    const navigationError = lhr.audits["navigation-error"];

    if (
      navigationError &&
      navigationError.score === 0
    ) {
      throw new Error(
        navigationError.displayValue ||
          "Unable to load the website for Lighthouse analysis"
      );
    }

    /*
     * Additional Lighthouse runtime error check.
     */
    if (lhr.runtimeError) {
      throw new Error(
        `Lighthouse could not analyze this website: ${lhr.runtimeError.message}`
      );
    }

    const performanceScore =
      lhr.categories.performance?.score;

    if (performanceScore === null || performanceScore === undefined) {
      throw new Error(
        "Lighthouse did not return a valid performance score"
      );
    }

    const score = Math.round(performanceScore * 100);

    const lcpAudit =
      lhr.audits["largest-contentful-paint"];

    const clsAudit =
      lhr.audits["cumulative-layout-shift"];

    const fcpAudit =
      lhr.audits["first-contentful-paint"];

    const lcp =
      typeof lcpAudit?.numericValue === "number"
        ? lcpAudit.numericValue / 1000
        : null;

    const cls =
      typeof clsAudit?.numericValue === "number"
        ? clsAudit.numericValue
        : null;

    const fcp =
      typeof fcpAudit?.numericValue === "number"
        ? fcpAudit.numericValue / 1000
        : null;

    /*
     * A valid Lighthouse performance result should
     * contain the core metrics we display.
     */
    if (lcp === null || cls === null || fcp === null) {
      throw new Error(
        "Lighthouse returned incomplete performance metrics"
      );
    }

    const auditRecommendations: Record<string, string> = {
      "render-blocking-resources":
        "Eliminate render-blocking resources",

      "unused-javascript":
        "Reduce unused JavaScript",

      "unused-css-rules":
        "Remove unused CSS",

      "offscreen-images":
        "Defer offscreen images",

      "uses-optimized-images":
        "Optimize image delivery",

      "uses-responsive-images":
        "Use properly sized responsive images",

      "uses-text-compression":
        "Enable text compression",

      "uses-long-cache-ttl":
        "Use longer cache lifetimes",

      "efficient-animated-content":
        "Optimize animated content",

      "dom-size":
        "Reduce excessive DOM size",

      "critical-request-chains":
        "Reduce critical request chains",
    };

    const recommendations: Recommendation[] = [];

    Object.entries(auditRecommendations).forEach(
      ([auditId, fallbackTitle]) => {
        const audit = lhr.audits[auditId];

        if (
          audit &&
          audit.score !== null &&
          audit.score < 1
        ) {
          recommendations.push({
            title: audit.title || fallbackTitle,
            description:
              audit.description || fallbackTitle,
          });
        }
      }
    );

    /*
     * Add metric-specific recommendations.
     */
    if (lcp > 2.5) {
      recommendations.push({
        title: "Improve Largest Contentful Paint",
        description:
          "Reduce the time required to render the largest visible content element.",
      });
    }

    if (cls > 0.1) {
      recommendations.push({
        title: "Reduce layout shifts",
        description:
          "Reserve space for images and dynamically injected content to reduce unexpected layout movement.",
      });
    }

    if (fcp > 1.8) {
      recommendations.push({
        title: "Optimize First Contentful Paint",
        description:
          "Improve critical rendering resources to display the first visible content sooner.",
      });
    }

    /*
     * Remove duplicate recommendations.
     */
    const uniqueRecommendations =
      recommendations.filter(
        (recommendation, index, array) =>
          index ===
          array.findIndex(
            (item) =>
              item.title === recommendation.title
          )
      );

    return {
      url,
      score,

      metrics: {
        lcp,
        inp: null,
        cls,
        fcp,
      },

      recommendations: uniqueRecommendations,
    };
  } finally {
    /*
     * Always close Chrome, even when Lighthouse fails.
     */
    await chrome.kill();
  }
};