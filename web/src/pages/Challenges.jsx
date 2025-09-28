import React, { useEffect, useState } from 'react';

export default function Challenges() {
  const [challenges, setChallenges] = useState([]);
  const [status, setStatus] = useState('');
  const [currentGeo, setCurrentGeo] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState({}); // store files per challenge

  // Fetch challenges from backend
  useEffect(() => {
    fetch('http://localhost:4000/api/challenges')
      .then(r => r.json())
      .then(setChallenges)
      .catch(err => console.error(err));
  }, []);

  // Get user geolocation (permission prompt happens here)
  function getGeo() {
    if (!navigator.geolocation) return alert('Geolocation not supported on this device');
    navigator.geolocation.getCurrentPosition(
      pos => {
        setCurrentGeo({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus('Geolocation set!');
      },
      err => {
        console.error(err);
        alert('Allow location for geotagging');
      }
    );
  }

  // Handle file selection for each challenge
  const handleFileChange = (e, challengeId) => {
    const file = e.target.files[0];
    setSelectedFiles(prev => ({ ...prev, [challengeId]: file }));
  };

  // Submit challenge
  async function submit(challengeId) {
    const file = selectedFiles[challengeId];
    if (!file) return alert('Choose a photo');
    if (!currentGeo) return alert('Please allow geolocation first');

    const form = new FormData();
    form.append('photo', file);
    form.append('userId', 'u_demo'); // replace with actual user ID later
    form.append('challengeId', challengeId);
    form.append('lat', currentGeo.lat);
    form.append('lng', currentGeo.lng);
    form.append('timestamp', new Date().toISOString());
    form.append('notes', 'Submitted from web MVP');

    try {
      setStatus('Uploading...');
      const res = await fetch('http://localhost:4000/api/challenge/submit', {
        method: 'POST',
        body: form,
      });
      const data = await res.json();
      if (data.success) {
        setStatus(`Submitted — AI Result: ${data.submission.ai.result}`);
      } else {
        setStatus('Submission failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error submitting challenge');
    }
  }

  return (
    <div>
      <div className="card">
        <h2>Challenges</h2>
        <p className="small">Daily tasks — upload photo + geotag</p>
      </div>

      <div className="card">
        <p className="small">
          Current Geo:{' '}
          {currentGeo
            ? `${currentGeo.lat.toFixed(3)}, ${currentGeo.lng.toFixed(3)}`
            : 'Not set'}
        </p>
        <button className="btn" onClick={getGeo}>
          Allow Geolocation
        </button>
      </div>

      {challenges.map(ch => (
        <div className="card" key={ch.id}>
          <h3>{ch.title}</h3>
          <p className="small">
            {ch.rules} — Points: {ch.points}
          </p>

          <input
            type="file"
            accept="image/*"
            onChange={e => handleFileChange(e, ch.id)}
          />

          {/* Show submit button only if a file is selected */}
          {selectedFiles[ch.id] && (
            <button className="btn" onClick={() => submit(ch.id)}>
              Submit for {ch.points} pts
            </button>
          )}
        </div>
      ))}

      {status && (
        <div className="card">
          <p className="small">{status}</p>
        </div>
      )}
    </div>
  );
}
