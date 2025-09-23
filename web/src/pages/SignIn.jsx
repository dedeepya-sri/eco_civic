import React, { useState } from 'react';

export default function SignIn({ onBack, onSignedIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('Signing in...');
    const res = await fetch('http://localhost:4000/api/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include',
    });
    const data = await res.json();
    if (data.success) {
      setStatus('Sign in successful!');
      onSignedIn && onSignedIn(data.user);
    } else {
      setStatus(data.error || 'Sign in failed');
    }
  }

  function handleGoogle() {
    window.location.href = 'http://localhost:4000/auth/google';
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button className="btn" type="submit" style={{ width: '100%', marginTop: 12 }}>Sign In</button>
      </form>
      <button className="btn" onClick={handleGoogle} style={{ width: '100%', marginTop: 12, background: '#4285F4' }}>
        Sign in with Google
      </button>
      <button className="btn" onClick={onBack} style={{ width: '100%', marginTop: 12 }}>Back</button>
      <div className="small">{status}</div>
    </div>
  );
}