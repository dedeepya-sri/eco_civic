import React from 'react'
export default function Leaderboard(){
  const sample = [ {name:'Asha', points:420, streak:7}, {name:'Ravi', points:360, streak:4}, {name:'Meera', points:300, streak:2}]
  return (
    <div>
      <div className="card"><h2>Leaderboard</h2></div>
      {sample.map((s,i)=> (
        <div className="card" key={i}><strong>{i+1}. {s.name}</strong><p className="small">Points: {s.points} — Streak: {s.streak} days</p></div>
      ))}
    </div>
  )
}