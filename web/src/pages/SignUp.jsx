import React, { useState } from 'react';

export default function SignUp({ onBack }) {
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    username: '',
    mobile: '',
    school: ''
  });
  const [status, setStatus] = useState('');

  function handleGoogleSignUp() {
    window.location.href = 'http://localhost:4000/auth/google';
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleManualSignUp(e) {
    e.preventDefault();
    setStatus('Signing up...');
    try {
      const res = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) setStatus('Signup successful!');
      else setStatus(data.error || 'Signup failed');
    } catch (err) {
      console.error(err);
      setStatus('Error during signup');
    }
  }

  return (
    <div className="card" style={{ maxWidth: 400, margin: '40px auto' }}>
      <h2>Sign Up</h2>

      <button
        className="btn"
        onClick={handleGoogleSignUp}
        style={{ width: '100%', marginBottom: 16 }}
      >
        Sign up with Google
      </button>

      <form onSubmit={handleManualSignUp} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
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
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
        />
        <input
          type="text"
          name="school"
          placeholder="School/Organization"
          value={form.school}
          onChange={handleChange}
        />
        <button className="btn" type="submit" style={{ width: '100%', marginTop: 8 }}>
          Sign Up
        </button>
      </form>

      {status && <p className="small" style={{ marginTop: 8 }}>{status}</p>}

      <button className="btn" onClick={onBack} style={{ width: '100%', marginTop: 16 }}>
        Back
      </button>
    </div>
  );
}
