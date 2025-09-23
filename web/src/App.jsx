import React, { useState } from 'react'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Challenges from './pages/Challenges'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const TABS = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'profile', label: 'Profile' }
]

export default function App() {
  const [tab, setTab] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)

  function handleShowSignIn() {
    setShowSignIn(true)
    setShowSignUp(false)
    setMenuOpen(false)
  }
  function handleShowSignUp() {
    setShowSignUp(true)
    setShowSignIn(false)
    setMenuOpen(false)
  }
  function handleBack() {
    setShowSignIn(false)
    setShowSignUp(false)
  }

  return (
    <div className="app">
      {/* Hamburger menu */}
      <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        <span />
        <span />
        <span />
      </div>
      {menuOpen && (
        <div className="menu-dropdown">
          <button className="menu-item" onClick={handleShowSignUp}>Sign Up</button>
          <button className="menu-item" onClick={handleShowSignIn}>Sign In</button>
        </div>
      )}
      <nav className="app-sidebar">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`nav-btn-vertical ${tab === t.id ? 'active' : ''}`}
            onClick={() => { setTab(t.id); setShowSignIn(false); setShowSignUp(false); }}
          >
            {t.label}
          </button>
        ))}
      </nav>
      <main className="app-main">
          <div className="eco-title">
            <span role="img" aria-label="tree" className="eco-tree">🌳</span>
            ECOCIVIC
            <span role="img" aria-label="tree" className="eco-tree">🌳</span>
          </div>
        {showSignIn ? (
          <SignIn onBack={handleBack} />
        ) : showSignUp ? (
          <SignUp onBack={handleBack} />
        ) : (
          <>
            {tab === 'home' && <Home />}
            {tab === 'journey' && <Journey />}
            {tab === 'challenges' && <Challenges />}
            {tab === 'leaderboard' && <Leaderboard />}
            {tab === 'profile' && <Profile />}
          </>
        )}
      </main>
    </div>
  )
}