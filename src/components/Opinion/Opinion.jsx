import { useState } from "react";
import styled from "styled-components";
import useLoading from "../../hooks/useLoading";
import useIdentity from "../../hooks/useIdentity";
import useContent from "../../hooks/useContent";
import { getOpinion } from "../../api";
import { isValidUrl } from "../../utils";
import styles from "../../constants/styles";

function Opinion() {
  const { loading, setLoading } = useLoading();
  const { identity } = useIdentity();
  const { setContent } = useContent();
  const [url, setUrl] = useState("");
  const [validUrl, setValidUrl] = useState(false);

  const fetchOpinion = (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    getOpinion(identity, url).then((opinion) => {
      setContent("opinion", opinion);
      setLoading(false);
    });
  };

  return (
    <OpinionWrapper>
      <form onSubmit={fetchOpinion}>
        <label>
          Enter the URL of something you need to know your opinion of{" "}
          <i>(articles, social media posts, YouTube videos, etc)</i>:
        </label>
        <OpinionInput>
          <input
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
        </OpinionInput>
      </form>
    </OpinionWrapper>
  );
}

const OpinionWrapper = styled.div`
  text-align: center;
  margin: ${styles.margin.md};

  label {
    font-size: ${styles.fontSize.sm};
    color: ${styles.colors.purple};
  }
`;

const OpinionInput = styled.div`
  display: flex;
  flex-direction: column;

  input[type="text"] {
    font-size: ${styles.fontSize.md};
    background-color: ${styles.colors.gray};
    border: 2px solid ${styles.colors.black};
    margin-bottom: ${styles.margin.md};
  }

  input[type="submit"] {
    cursor: pointer;
    color: ${styles.colors.yellow};
    background-color: ${styles.colors.darkYellow};
    border: none;
    padding: ${styles.padding.md} ${styles.padding.lg};
    font-size: ${styles.fontSize.md};
    line-height: ${styles.fontSize.md};
    text-align: center;
    box-shadow: 10px 10px 0 ${styles.colors.black};
    white-space: normal;

    &:before {
      content: "< ";
    }

    &:after {
      content: " >";
    }

    &:disabled {
      color: ${styles.colors.black};
      text-decoration: none;
      background-color: ${styles.colors.darkGray};
    }

    &:active {
      box-shadow: none;
      transform: translate(4px, 4px);
    }
  }
`;

export default Opinion;
