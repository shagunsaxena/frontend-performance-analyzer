import "./Recommendations.css";

interface RecommendationsProps {
  recommendations: string[];
}

function Recommendations({
  recommendations,
}: RecommendationsProps) {
  return (
    <section className="recommendations-section">
      <div className="section-heading">
        <h2>Recommendations</h2>
        <p>Suggested improvements based on the analysis</p>
      </div>

      {recommendations.length === 0 ? (
        <div className="recommendations-empty">
          <p>No recommendations available.</p>
        </div>
      ) : (
        <div className="recommendations-list">
          {recommendations.map((recommendation, index) => (
            <article
              className="recommendation-card"
              key={recommendation}
            >
              <div className="recommendation-icon">
                {index + 1}
              </div>

              <div>
                <p className="recommendation-title">
                  {recommendation}
                </p>

                <p className="recommendation-description">
                  Consider this optimization to improve website
                  performance.
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