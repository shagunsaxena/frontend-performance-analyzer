import { Router, type Request, type Response } from "express";
import { analyzePerformance } from "../services/performance.service.js";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  const url = req.query.url;

  if (typeof url !== "string") {
    return res.status(400).json({
      success: false,
      error: "Missing url query parameter",
    });
  }

  try {
    new URL(url);
  } catch {
    return res.status(400).json({
      success: false,
      error: "Invalid URL",
    });
  }

  try {
    const performanceData = await analyzePerformance(url);

    return res.json({
      success: true,
      data: performanceData,
    });
  } catch (error) {
    console.error("PERFORMANCE ANALYSIS ERROR:", error);

    return res.status(500).json({
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Unable to analyze website performance",
    });
  }
});

export default router;