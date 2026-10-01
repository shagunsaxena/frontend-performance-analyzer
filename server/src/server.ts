import express from "express";
import cors from "cors";
import performanceRouter = require("./routes/performance.routes");
const app = express();

const PORT = 5000;
app.use(cors());

app.get('/api/health', (req, res) =>{
    res.json({
        success: true,
        message: "Performance Analyzer API is running",
    });
});

app.use( performanceRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});