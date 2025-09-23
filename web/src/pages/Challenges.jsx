import React, {useEffect, useState, useRef} from 'react'
 export default function Challenges(){
 const [challenges, setChallenges] = useState([])
 const [status, setStatus] = useState('')
 const fileRef = useRef(null)
 const [currentGeo, setCurrentGeo] = useState(null)
 useEffect(()=>{
 fetch('http://localhost:4000/api/ challenges').then(r=>r.json()).then(setChallenges).catch(console.error)
 },[])
 function getGeo(){
 if(!navigator.geolocation) return alert('Geolocation not supported')
 navigator.geolocation.getCurrentPosition(pos=>{
 setCurrentGeo({lat: pos.coords.latitude, lng: pos.coords.longitude})
 }, err=> { console.error(err); alert('Allow location for geotagging') })
 }
 async function submit(challengeId){
 if(!fileRef.current || !fileRef.current.files[0]) return alert('Choose a photo')
 if(!currentGeo) return alert('Please allow geolocation')
 const form = new FormData()
 form.append('photo', fileRef.current.files[0])
 form.append('userId', 'u_demo')
 form.append('challengeId', challengeId)
 form.append('lat', currentGeo.lat)
 form.append('lng', currentGeo.lng)
 form.append('timestamp', new Date().toISOString())
 form.append('notes', 'Submitted from web MVP')
 setStatus('Uploading...')
 const res = await fetch('http://localhost:4000/api/challenge/submit', {
 method: 'POST', body: form })
 const data = await res.json()
 if(data.success) setStatus('Submitted — ' + data.submission.ai.result)
 else setStatus('Error')
 }
 return (
 <div>
 <div className="card"><h2>Challenges</h2><p className="small">Daily tasks
 — upload photo + geotag</p></div>
 <div className="card">
 <p className="small">Current Geo: {currentGeo? `$
 {currentGeo.lat.toFixed(3)}, ${currentGeo.lng.toFixed(3)}` : 'Not set'}</p>
 <button className="btn" onClick={getGeo}>Allow Geolocation</button>
 </div>
 <div className="card">
 <input ref={fileRef} type="file" accept="image/*" />
 </div>
 {challenges.map(ch=> (
 <div className="card" key={ch.id}>
 <h3>{ch.title}</h3>
 <p className="small">{ch.rules} — Points: {ch.points}</p>
 <button className="btn" onClick={() => submit(ch.id)}>Submit for
 {ch.points} pts</button>
 </div>
 ))}
 <div className="card"><p className="small">{status}</p></div>
 </div>
 )
 }