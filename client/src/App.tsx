import { useState } from "react";
import {
  analyzePerformance,
  type PerformanceData,
} from "./services/api";
import UrlAnalyzer from "./components/UrlAnalyzer";
import PerformanceScore from "./components/PerformanceScore";
import MetricsGrid from "./components/MetricsGrid";
import Recommendations from "./components/Recommendations";
import PerformanceChart from "./components/PerformanceChart";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<PerformanceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    setError("");
    setData(null);

    if (!url.trim()) {
      setError("Please enter a website URL");
      return;
    }

    try {
      setLoading(true);

      const result = await analyzePerformance(url.trim());

      setData(result);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="app">
      <div className="container">
        <header className="header">
          <p className="eyebrow">WEB PERFORMANCE</p>
          <h1>Frontend Performance Analyzer</h1>
          <p className="subtitle">
            Analyze website performance metrics and identify optimization
            opportunities.
          </p>
        </header>

        <section className="analyzer-card">
          <UrlAnalyzer
            url={url}
            loading={loading}
            onUrlChange={setUrl}
            onAnalyze={handleAnalyze}
          />
        </section>

        {error && <p className="error-message">{error}</p>}

        {data && (
          <section className="dashboard">
            <PerformanceScore score={data.score} />

            <MetricsGrid metrics={data.metrics} />
            
            <PerformanceChart metrics={data.metrics} />

            <Recommendations recommendations={data.recommendations} />
          </section>
        )}
      </div>
    </main>
  );
}

export default App;