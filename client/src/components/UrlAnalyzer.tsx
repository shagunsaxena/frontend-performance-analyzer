import type { FormEvent } from "react";
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
      <div className="url-input-group">
        <label htmlFor="website-url">Website URL</label>

        <div className="url-input-row">
          <input
            id="website-url"
            type="url"
            value={url}
            onChange={(event) => onUrlChange(event.target.value)}
            placeholder="https://example.com"
            autoComplete="url"
          />

          <button type="submit" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
          </button>
        </div>
      </div>
    </form>
  );
}

export default UrlAnalyzer;