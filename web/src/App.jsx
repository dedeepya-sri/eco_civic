import React, { useState } from 'react'
import Home from './pages/Home'
import Journey from './pages/Journey'
import Challenges from './pages/Challenges'
import Leaderboard from './pages/Leaderboard'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'

const STUDENT_TABS = [
  { id: 'home', label: 'Home' },
  { id: 'journey', label: 'Journey' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'profile', label: 'Profile' }
]
const TEACHER_TABS = [
  { id: 'journey', label: 'Journey' },
  { id: 'challenges', label: 'Challenges' },
  { id: 'profile', label: 'Profile' }
]

export default function App() {
  const [tab, setTab] = useState(null) // no tab by default
  const [menuOpen, setMenuOpen] = useState(false)
  const [showSignIn, setShowSignIn] = useState(false)
  const [showSignUp, setShowSignUp] = useState(false)
  const [userType, setUserType] = useState(null) // null | 'student' | 'teacher'

  // For teacher "Add Concept"
  const [showAddConcept, setShowAddConcept] = useState(false)
  const [conceptName, setConceptName] = useState('')
  const [youtubeLinks, setYoutubeLinks] = useState('')
  const [articleLinks, setArticleLinks] = useState('')

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

  function handleStudent() {
    setUserType('student')
    setTab('home')
    setShowSignIn(false)
    setShowSignUp(false)
  }
  function handleTeacher() {
    setUserType('teacher')
    setTab('journey')
    setShowSignIn(false)
    setShowSignUp(false)
  }

  function handleAddConceptSubmit(e) {
    e.preventDefault()
    // Simulate updating seed.js (in real app, send to backend)
    console.log('Add Concept:', {
      conceptName,
      youtubeLinks: youtubeLinks.split(',').map(s => s.trim()).filter(Boolean),
      articleLinks: articleLinks.split(',').map(s => s.trim()).filter(Boolean)
    })
    setShowAddConcept(false)
    setConceptName('')
    setYoutubeLinks('')
    setArticleLinks('')
    alert('Concept added (simulated, update seed.js manually).')
  }

  // Determine which tabs to show
  let tabsToShow = []
  if (userType === 'student') tabsToShow = STUDENT_TABS
  if (userType === 'teacher') tabsToShow = TEACHER_TABS

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

      {/* Sidebar Navigation */}
      {userType && (
        <nav className="app-sidebar">
          {tabsToShow.map(t => (
            <button
              key={t.id}
              className={`nav-btn-vertical ${tab === t.id ? 'active' : ''}`}
              onClick={() => { setTab(t.id); setShowSignIn(false); setShowSignUp(false); }}
            >
              {t.label}
            </button>
          ))}
        </nav>
      )}

      {/* Main Content */}
      <main className="app-main">
        {/* EcoCivic Title Section */}
        <div className="eco-title">
          <span className="eco-text">Eco</span>
          <span className="civic-text">Civic</span>
        </div>
        <p className="eco-tagline">Learn. Act. Sustain.</p>

        {/* Student & Teacher Buttons */}
        {!userType && (
          <div className="eco-buttons">
            <button className="eco-btn" onClick={handleStudent}>Student</button>
            <button className="eco-btn" onClick={handleTeacher}>Teacher</button>
          </div>
        )}

        {/* Conditional Pages */}
        {showSignIn ? (
          <SignIn onBack={handleBack} />
        ) : showSignUp ? (
          <SignUp onBack={handleBack} />
        ) : (
          <>
            {/* Student view: all tabs as before */}
            {userType === 'student' && (
              <>
                {tab === 'home' && <Home />}
                {tab === 'journey' && <Journey />}
                {tab === 'challenges' && <Challenges />}
                {tab === 'leaderboard' && <Leaderboard />}
                {tab === 'profile' && <Profile />}
              </>
            )}
            {/* Teacher view: only 3 tabs */}
            {userType === 'teacher' && (
              <>
                {tab === 'journey' && (
                  <div>
                    <Journey />
                    <div style={{ marginTop: 24 }}>
                      {!showAddConcept ? (
                        <button onClick={() => setShowAddConcept(true)}>
                          Add Concept
                        </button>
                      ) : (
                        <form onSubmit={handleAddConceptSubmit} style={{ marginTop: 16 }}>
                          <div>
                            <label>
                              Concept Name:
                              <input
                                type="text"
                                value={conceptName}
                                onChange={e => setConceptName(e.target.value)}
                                required
                              />
                            </label>
                          </div>
                          <div>
                            <label>
                              YouTube Links (comma separated):
                              <input
                                type="text"
                                value={youtubeLinks}
                                onChange={e => setYoutubeLinks(e.target.value)}
                              />
                            </label>
                          </div>
                          <div>
                            <label>
                              Article Links (comma separated):
                              <input
                                type="text"
                                value={articleLinks}
                                onChange={e => setArticleLinks(e.target.value)}
                              />
                            </label>
                          </div>
                          <button type="submit">Submit</button>
                          <button type="button" onClick={() => setShowAddConcept(false)} style={{ marginLeft: 8 }}>
                            Cancel
                          </button>
                        </form>
                      )}
                    </div>
                  </div>
                )}
                {tab === 'challenges' && <Challenges />}
                {tab === 'profile' && <Profile />}
              </>
            )}
          </>
        )}
      </main>
    </div>
  )
}
