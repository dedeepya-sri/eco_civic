import React, { useState } from 'react';

export default function SignUp({ onBack, onSignedUp }) {
  const [form, setForm] = useState({
    email: '', password: '', username: '', name: '', mobile: '', school: ''
  });
  const [status, setStatus] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Signing up...');
    const res = await fetch('http://localhost:4000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    if (data.success) {
      setStatus('Sign up successful!');
      onSignedUp && onSignedUp(data.user);
    } else {
      setStatus(data.error || 'Sign up failed');
    }
  }

  function handleGoogle() {
    window.location.href = 'http://localhost:4000/auth/google';
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <input name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
        <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
        <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required />
        <input name="school" placeholder="School Name" value={form.school} onChange={handleChange} required />
        <button className="btn" type="submit" style={{ width: '100%', marginTop: 12 }}>Sign Up</button>
      </form>
      <button className="btn" onClick={handleGoogle} style={{ width: '100%', marginTop: 12, background: '#4285F4' }}>
        Sign up with Google
      </button>
      <button className="btn" onClick={onBack} style={{ width: '100%', marginTop: 12 }}>Back</button>
      <div className="small">{status}</div>
    </div>
  );
}