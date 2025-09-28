import React, { useEffect, useState } from 'react';

export default function Course({ courseId, onBack }) {
  const [course, setCourse] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/courses/${courseId}`)
      .then(r => r.json())
      .then(setCourse)
      .catch(console.error);
  }, [courseId]);

  if (!course) return <p>Loading...</p>;

  return (
    <div>
      <button className="btn" onClick={onBack}>← Back to Journey</button>
      <h2>{course.title}</h2>

      <div className="resources">
        <h3>Resources:</h3>
        <ul>
          {course.resources.map((r, idx) => (
            <li key={idx}>
              <a href={r.link} target="_blank">{r.type}</a>
            </li>
          ))}
        </ul>
      </div>

      <div className="quiz">
        <h3>Quiz (Coming Soon)</h3>
        <p>You can add interactive quiz UI here.</p>
      </div>
    </div>
  );
}
