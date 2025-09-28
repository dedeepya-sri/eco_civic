import React, { useState } from 'react';

export default function SignIn({ onBack, onSignIn }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [status, setStatus] = useState('');

  function handleGoogleSignIn() {
    window.location.href = 'http://localhost:4000/auth/google';
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleManualSignIn(e) {
    e.preventDefault();
    setStatus('Signing in...');

    // ✅ Hardcoded teacher login first
    if (form.email === "xxx@gmail.com" && form.password === "123456") {
      setStatus("Welcome, Teacher!");
      if (onSignIn) onSignIn(form.email, form.password); 
      return;
    }

    // ✅ Otherwise fallback to backend API
    try {
      const res = await fetch('http://localhost:4000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) {
        setStatus(`Welcome, ${data.user.name || data.user.username}!`);
        if (onSignIn) onSignIn(form.email, form.password);
      } else {
        setStatus(data.message || 'Sign in failed');
      }
    } catch (err) {
      console.error(err);
      setStatus('Error during sign in');
    }
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>Sign In</h2>

      <button
        className="btn"
        onClick={handleGoogleSignIn}
        style={{ width: '100%', marginBottom: 16 }}
      >
        Sign in with Google
      </button>

      <form
        onSubmit={handleManualSignIn}
        style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button className="btn" type="submit" style={{ width: '100%', marginTop: 8 }}>
          Sign In
        </button>
      </form>

      {status && <p className="small" style={{ marginTop: 8 }}>{status}</p>}

      <button className="btn" onClick={onBack} style={{ width: '100%', marginTop: 16 }}>
        Back
      </button>
    </div>
  );
}
