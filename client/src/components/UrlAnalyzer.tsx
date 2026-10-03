import { type FormEvent } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import "./UrlAnalyzer.css";

interface UrlAnalyzerProps {
  url: string;
  loading: boolean;
  onUrlChange: (url: string) => void;
  onAnalyze: () => void;
}

function UrlAnalyzer({
  url,
  loading,
  onUrlChange,
  onAnalyze,
}: UrlAnalyzerProps) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onAnalyze();
  };

  return (
    <form className="url-analyzer" onSubmit={handleSubmit}>
      <label htmlFor="website-url">Website URL</label>

      <div className="url-input-group">
        <input
          id="website-url"
          type="url"
          value={url}
          onChange={(event) => onUrlChange(event.target.value)}
          placeholder="https://example.com"
          required
          disabled={loading}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>

      {loading && (
        <div className="analysis-loader">
          <DotLottieReact
            src="https://lottie.host/6aacf53b-bef9-4402-ab82-3fb2898c6c38/FavXNUCmyj.lottie"
            loop
            autoplay
            style={{
              width: "300px",
              height: "220px",
            }}
          />

          <div className="analysis-loader-content">
            <p className="analysis-loader-title">
              Analyzing website...
            </p>

            <p className="analysis-loader-description">
              Running Lighthouse performance audit. This may take a few
              seconds.
            </p>
          </div>
        </div>
      )}
    </form>
  );
}

export default UrlAnalyzer;