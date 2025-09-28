import React, { useEffect, useState } from "react";

export default function Journey() {
  const [courses, setCourses] = useState([]);
  const [expanded, setExpanded] = useState(null);
  const [quizOpen, setQuizOpen] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  useEffect(() => {
    // Keep API as /api/courses since backend uses it
    fetch("http://localhost:4000/api/courses")
      .then((r) => r.json())
      .then(setCourses)
      .catch(console.error);
  }, []);

  const toggleLesson = (id) => {
    setExpanded(expanded === id ? null : id);
    setQuizOpen(null);
    setScore(null);
    setAnswers({});
  };

  const handleSelect = (qIdx, opt) => {
    setAnswers({ ...answers, [qIdx]: opt });
  };

  const handleSubmitQuiz = (course) => {
    let s = 0;
    course.quiz.forEach((q, i) => {
      if (answers[i] === q.answer) s += 10; // 10 points per correct answer
    });
    setScore(s);
  };

  return (
    <div>
      <div className="card">
        <h2>Journey</h2>
        <p className="small">Courses → Quiz → Act flow</p>
      </div>

      {courses.map((c) => (
        <div className="card" key={c._id} style={{ marginBottom: "20px" }}>
          <h3>{c.title}</h3>
          <p className="small">
            Resources: {c.youtube_links.length + 1} (videos + article)
          </p>
          <button className="btn" onClick={() => toggleLesson(c._id)}>
            {expanded === c._id ? "Hide Lesson" : "Start Lesson"}
          </button>

          {expanded === c._id && (
            <div style={{ marginTop: "10px" }}>
              <h4>Videos:</h4>
              {c.youtube_links.map((link, idx) => (
                <iframe
                  key={idx}
                  width="300"
                  height="170"
                  src={link.replace("watch?v=", "embed/")}
                  title={`Video ${idx + 1}`}
                  frameBorder="0"
                  allowFullScreen
                  style={{ marginBottom: "10px" }}
                ></iframe>
              ))}

              <h4>Article:</h4>
              <a href={c.article_link} target="_blank" rel="noopener noreferrer">
                {c.article_link}
              </a>

              {!quizOpen && (
                <button
                  className="btn"
                  style={{ marginTop: "15px" }}
                  onClick={() => setQuizOpen(true)}
                >
                  Start Quiz
                </button>
              )}

              {quizOpen && (
                <div style={{ marginTop: "15px" }}>
                  {c.quiz.map((q, idx) => (
                    <div key={idx} style={{ marginBottom: "10px" }}>
                      <p>
                        {idx + 1}. {q.question}
                      </p>
                      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                        {q.options.map((opt, i) => (
                          <li key={i}>
                            <label>
                              <input
                                type="radio"
                                name={`q${idx}`}
                                value={opt}
                                checked={answers[idx] === opt}
                                onChange={() => handleSelect(idx, opt)}
                              />{" "}
                              {opt}
                            </label>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  <button className="btn" onClick={() => handleSubmitQuiz(c)}>
                    Submit Quiz
                  </button>

                  {score !== null && (
                    <p style={{ marginTop: "10px", fontWeight: "bold" }}>
                      Your Score: {score} / {c.quiz.length * 10} points
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
