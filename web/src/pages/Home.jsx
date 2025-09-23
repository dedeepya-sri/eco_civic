import React from 'react'
export default function Home(){
return (
<div>
<div className="card">
<h2>Welcome, Eco-Citizen!</h2>
<p className="small">Today you have <strong>120</strong> points. Keep the streak!</p>
</div>


<div className="card">
<h3>Daily Challenge</h3>
<p className="small">Plant a sapling near your school and submit a photo.</p>
<button className="btn">Start Today&apos;s Task</button>
</div>
</div>
)
}