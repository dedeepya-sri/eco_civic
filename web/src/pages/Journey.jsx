import React, {useEffect, useState} from 'react'


export default function Journey(){
const [courses, setCourses] = useState([])
useEffect(()=>{
fetch('http://localhost:4000/api/courses').then(r=>r.json()).then(setCourses).catch(console.error)
},[])
return (
<div>
<div className="card"><h2>Journey</h2><p className="small">Courses → Quiz → Act flow</p></div>
{courses.map(c=> (
<div className="card" key={c.id}>
<h3>{c.title}</h3>
<p className="small">Resources: {c.resources.map(r=> r.type).join(', ')}</p>
<button className="btn">Start Lesson</button>
</div>
))}
</div>
)
}