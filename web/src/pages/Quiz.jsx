import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaCheck, FaTimes } from "react-icons/fa";

export default function Quiz() {
  const { id } = useParams();
  const [topic, setTopic] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:4000/api/courses/${id}`)
      .then((r) => r.json())
      .then(setTopic)
      .catch(console.error);
  }, [id]);

  if (!topic) return <p>Loading...</p>;

  const handleSelect = (qIndex, option) => {
    if (submitted) return;
    setAnswers({ ...answers, [qIndex]: option });
  };

  const handleSubmit = () => setSubmitted(true);

  const getScore = () => {
    let score = 0;
    topic.quiz.forEach((q, idx) => {
      if (answers[idx] === q.answer) score += 10;
    });
    return score;
  };

  return (
    <div className="quiz-container">
      <h2>{topic.title} Quiz</h2>
      {topic.quiz.map((q, idx) => (
        <div className="quiz-card" key={idx}>
          <p className="question">{q.question}</p>
          <div className="options">
            {q.options.map((opt, i) => {
              const isSelected = answers[idx] === opt;
              const isCorrect = submitted && opt === q.answer;
              const isWrong = submitted && isSelected && opt !== q.answer;

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(idx, opt)}
                  className={`option-btn ${isSelected ? "selected" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`}
                >
                  {opt} {isCorrect && <FaCheck />} {isWrong && <FaTimes />}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted && (
        <button className="btn submit-btn" onClick={handleSubmit}>
          Submit Answers
        </button>
      )}

      {submitted && (
        <div className="score">
          <h3>Total Score: {getScore()} / {topic.quiz.length * 10}</h3>
        </div>
      )}
    </div>
  );
}
