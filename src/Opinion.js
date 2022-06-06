import { useState } from "react";
import { getOpinion } from "./openAI";
import { isValidUrl } from "./utils";

function Opinion({ identity, setContent, loading, setLoading }) {
  const [url, setUrl] = useState("");
  const [validUrl, setValidUrl] = useState(false);

  const fetchOpinion = (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    getOpinion(identity, url).then((opinion) => {
      setContent((content) => {
        return {
          ...content,
          opinion,
        };
      });
      setLoading(false);
    });
  };

  return (
    <div className="opinion">
      <form onSubmit={fetchOpinion}>
        <label>
          Enter the URL of something you need to know your opinion of{" "}
          <i>(articles, social media posts, YouTube videos, etc)</i>:
        </label>
        <div className="opinion-input-wrapper">
          <input
            className="opinion-input"
            type="text"
            placeholder="Enter a URL..."
            onChange={(event) => {
              setUrl(event.target.value);
              setValidUrl(isValidUrl(event.target.value));
            }}
          />
          <input
            type="submit"
            value="What do I think about this?"
            disabled={loading || url.trim().length <= 0 || !validUrl}
          />
        </div>
      </form>
    </div>
  );
}

export default Opinion;
