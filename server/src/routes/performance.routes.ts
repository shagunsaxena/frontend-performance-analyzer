import express = require("express");
import { analyzePerformance } from "../services/performance.service";

const router = express.Router();

router.get('/api/performance', async (req, res) => {
    const url = req.query.url;

    if (typeof url !== 'string') {
        return res
        .status(400)
        .json({ success: false, error: 'Missing url query parameter' });
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
    res.json({ 
        success: true, 
        data: performanceData });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        error: 'Unable to analyze website performance' });
  }

});

export = router;
