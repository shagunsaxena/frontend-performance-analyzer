import express from "express";
import cors from "cors";
import performanceRoutes from "./routes/performance.routes.js";

console.log("1. server.ts started");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

console.log("2. Express app created");

app.get("/", (_req, res) => {
  res.json({
    message: "Frontend Performance Analyzer API",
  });
});

console.log("3. Basic routes configured");

app.use("/api/performance", performanceRoutes);

console.log("4. Performance route loaded");

app.listen(PORT, () => {
  console.log(`5. Server is running on port ${PORT}`);
});