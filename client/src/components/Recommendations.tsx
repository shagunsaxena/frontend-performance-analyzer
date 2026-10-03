import type { Recommendation } from "../services/api";
import "./Recommendations.css";

interface RecommendationsProps {
  recommendations: Recommendation[];
}

function renderDescription(description: string) {
  const parts = description.split(/(\[[^\]]+\]\([^)]+\))/g);

  return parts.map((part, index) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

    if (!match) {
      return <span key={index}>{part}</span>;
    }

    const [, label, url] = match;

    return (
      <a
        key={index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  });
}

function Recommendations({
  recommendations,
}: RecommendationsProps) {
  return (
    <section className="recommendations-section">
      <div className="section-heading">
        <h2>Recommendations</h2>
        <p>Suggested improvements based on the Lighthouse analysis</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="recommendations-empty">
          <p>No performance issues identified.</p>
        </div>
      ) : (
        <div className="recommendations-list">
          {recommendations.map((recommendation, index) => (
            <article
              className="recommendation-card"
              key={`${recommendation.title}-${index}`}
            >
              <div className="recommendation-icon">
                {index + 1}
              </div>

              <div className="recommendation-content">
                <p className="recommendation-title">
                  {recommendation.title}
                </p>

                <p className="recommendation-description">
                  {renderDescription(recommendation.description)}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Recommendations;