import React from 'react'

export default function Home() {
  return (
    <div className="home-page">
      {/* Welcome Card */}
      <div className="card welcome-card">
        <h2>Welcome, Eco-Citizen! 🌱</h2>
        <p className="small">
          Today you have <strong>120</strong> points. Keep the streak!
        </p>
      </div>

      {/* Daily Challenge Card */}
      <div className="card challenge-card">
        <h3>🌿 Daily Challenge</h3>
        <p className="small">
          Plant a sapling near your school and submit a photo.
        </p>
        <button className="eco-btn">Start Today&apos;s Task</button>
      </div>
    </div>
  )
}
