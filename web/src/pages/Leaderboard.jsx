import React from 'react';

export default function Leaderboard() {
  const sample = [
    { name: 'Asha', points: 420, streak: 7 },
    { name: 'Ravi', points: 360, streak: 4 },
    { name: 'Meera', points: 300, streak: 2 },
    { name: 'Sahil', points: 280, streak: 3 },
    { name: 'Nisha', points: 250, streak: 1 },
  ];

  // Color coding for top 3
  const getCardStyle = (index) => {
    switch (index) {
      case 0:
        return { background: '#FFD700', color: '#000' }; // Gold
      case 1:
        return { background: '#C0C0C0', color: '#000' }; // Silver
      case 2:
        return { background: '#CD7F32', color: '#fff' }; // Bronze
      default:
        return { background: '#f0f0f0', color: '#333' };
    }
  };

  const getStreakBadge = (streak) => {
    if (streak >= 7) return '🔥'; // Hot streak
    if (streak >= 4) return '⚡'; // Active streak
    return '🌱'; // Newbie
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <div style={{
        textAlign: 'center',
        marginBottom: '30px',
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#2e7d32',
      }}>
        🏆Leaderboard🏆 
      </div>

      {sample.map((s, i) => (
        <div
          key={i}
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px 20px',
            marginBottom: '15px',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            ...getCardStyle(i),
          }}
        >
          <div>
            <div style={{ fontSize: '1.2rem', fontWeight: '600' }}>
              {i + 1}. {s.name}
            </div>
            <div className="small">
              Points: {s.points} — Streak: {s.streak} days {getStreakBadge(s.streak)}
            </div>
          </div>
          <div style={{ fontSize: '1.5rem' }}>{getStreakBadge(s.streak)}</div>
        </div>
      ))}

      <div style={{ textAlign: 'center', marginTop: '20px', color: '#555' }}>
        Keep up the eco-goodness! 🌱
      </div>
    </div>
  );
}
