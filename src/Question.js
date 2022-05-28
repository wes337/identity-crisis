import { useState } from "react";
import { answerQuestion } from "./openAI";

function Question({ identity, setContent, loading, setLoading }) {
  const [question, setQuestion] = useState("");

  const askQuestion = (event) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    answerQuestion(identity, question).then((answer) => {
      setContent((content) => {
        return {
          ...content,
          question: answer,
        };
      });
      setLoading(false);
    });
  };

  return (
    <div className="question">
      <form onSubmit={askQuestion}>
        <label>What would you like to ask?</label>
        <div className="question-input-wrapper">
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
        </div>
      </form>
    </div>
  );
}

export default Question;
