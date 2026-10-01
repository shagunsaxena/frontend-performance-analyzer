import "./PerformanceScore.css";

interface PerformanceScoreProps {
  score: number;
}

function PerformanceScore({ score }: PerformanceScoreProps) {
  const scoreClass =
    score >= 90
      ? "excellent"
      : score >= 50
        ? "needs-improvement"
        : "poor";

  const status =
    score >= 90
      ? "Excellent"
      : score >= 50
        ? "Needs Improvement"
        : "Poor";

  return (
    <section className="score-card">
      <div className="score-header">
        <div>
          <p className="score-label">Performance Score</p>
          <p className="score-description">
            Overall website performance
          </p>
        </div>

        <span className={`score-status ${scoreClass}`}>
          {status}
        </span>
      </div>

      <div className={`score-value ${scoreClass}`}>
        <strong>{score}</strong>
        <span>/100</span>
      </div>

      <div className="score-bar">
        <div
          className={`score-progress ${scoreClass}`}
          style={{
            width: `${Math.min(Math.max(score, 0), 100)}%`,
          }}
        />
      </div>
    </section>
  );
}

export default PerformanceScore;