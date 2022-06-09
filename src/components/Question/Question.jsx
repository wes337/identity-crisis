import { useState } from "react";
import styled from "styled-components";
import useLoading from "../../hooks/useLoading";
import useIdentity from "../../hooks/useIdentity";
import useContent from "../../hooks/useContent";
import { answerQuestion } from "../../api";
import styles from "../../constants/styles";

function Question() {
  const { loading, setLoading } = useLoading();
  const { identity } = useIdentity();
  const { setContent } = useContent();
  const [question, setQuestion] = useState("");

  const askQuestion = (event) => {
    event.preventDefault();

    if (loading) {
      return;
    }

    setLoading(true);

    answerQuestion(identity, question).then((answer) => {
      setContent("question", answer);
      setLoading(false);
    });
  };

  return (
    <QuestionWrapper>
      <form onSubmit={askQuestion}>
        <label>What would you like to ask?</label>
        <QuestionInput>
          <textarea
            className="question-input"
            rows="5"
            cols="50"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
          />
          <input
            type="submit"
            value="Ask"
            disabled={loading || question.trim().length <= 0}
          />
        </QuestionInput>
      </form>
    </QuestionWrapper>
  );
}

const QuestionWrapper = styled.div`
  text-align: center;
  margin: ${styles.margin.md};

  label {
    font-size: ${styles.fontSize.sm};
    color: purple;
  }
`;

const QuestionInput = styled.div`
  display: flex;
  flex-direction: column;

  textarea {
    resize: none;
    font-size: ${styles.fontSize.md};
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
    text-align: center;
    -webkit-box-shadow: 10px 10px 0 ${styles.colors.black};
    -moz-box-shadow: 10px 10px 0 ${styles.colors.black};
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
      -webkit-box-shadow: none;
      -moz-box-shadow: none;
      box-shadow: none;
      transform: translate(4px, 4px);
    }
  }
`;

export default Question;
