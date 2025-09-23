const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const bcrypt = require('bcryptjs');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 4000;
const submissionsFile = path.join(__dirname, 'submissions.json');
const upload = multer({ dest: path.join(__dirname, 'uploads') });
const usersFile = path.join(__dirname, 'users.json');
function getUsers() {
  if (!fs.existsSync(usersFile)) return [];
  return JSON.parse(fs.readFileSync(usersFile));
}
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}
// ...user storage helpers here...

passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return done(null, false, { message: 'Incorrect email.' });
  if (!bcrypt.compareSync(password, user.password)) return done(null, false, { message: 'Incorrect password.' });
  return done(null, user);
}));

passport.use(new GoogleStrategy({
  clientID: 'YOUR_GOOGLE_CLIENT_ID',
  clientSecret: 'YOUR_GOOGLE_CLIENT_SECRET',
  callbackURL: 'http://localhost:4000/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
  let users = getUsers();
  let user = users.find(u => u.googleId === profile.id);
  if (!user) {
    user = {
      id: 'u_' + Date.now(),
      googleId: profile.id,
      email: profile.emails[0].value,
      name: profile.displayName,
      photoUrl: profile.photos[0]?.value || null
    };
    users.push(user);
    saveUsers(users);
  }
  return done(null, user);
}));

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const users = getUsers();
  const user = users.find(u => u.id === id);
  done(null, user || false);
});

app.use(cors());
app.use(session({ secret: 'eco-civic-secret', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'uploads')));
app.get('/api/challenges', (req, res) => {
const challenges = [
{ id: 'act1', title: 'Plant a Sapling', points: 50, rules: 'Plant a sapling and submit a photo with geotag', geoRadius: 5000 },
{ id: 'act2', title: 'Segregate Household Waste', points: 40, rules: 'Show segregated bins at home', geoRadius: 5000 }
];
res.json(challenges);
});


// Accept challenge submission (multipart: photo + metadata)
app.post('/api/challenge/submit', upload.single('photo'), (req, res) => {
try {
const { userId, challengeId, lat, lng, timestamp, notes } = req.body;
const photo = req.file;
if (!photo) return res.status(400).json({ error: 'Photo required' });


// Basic server-side checks (timestamp & geo can be refined)
const serverTime = new Date();
const clientTime = timestamp ? new Date(timestamp) : null;


// Simulated AI evaluation (replace with real ML call)
// Heuristic: if file size > 2000 bytes and timestamp is same day -> approve
const fileSize = photo.size;
let ai_confidence = Math.min(0.95, 0.5 + Math.random() * 0.5); // simulate
let result = 'pending';


let sameDay = true;
if (clientTime) {
sameDay = (clientTime.toDateString() === serverTime.toDateString());
}


if (fileSize > 2000 && sameDay && ai_confidence > 0.6) {
result = 'approved';
} 
else 
    {
result = 'needs_review';
}


const submission = {
id: 's_' + Date.now(),
userId: userId || 'anonymous',
challengeId,
photoUrl: `/uploads/${photo.filename}`,
lat: parseFloat(lat) || null,
lng: parseFloat(lng) || null,
timestamp: clientTime ? clientTime.toISOString() : new Date().toISOString(),
ai: { confidence: ai_confidence, result },
notes: notes || ''
};


// Append to submissions.json
const data = JSON.parse(fs.readFileSync(submissionsFile));
data.push(submission);
fs.writeFileSync(submissionsFile, JSON.stringify(data, null, 2));


res.json({ success: true, submission });
} catch (err) {
console.error(err);
res.status(500).json({ error: 'Server error' });
}
});


// Get submissions (admin review)
app.get('/api/submissions', (req, res) => {
const data = JSON.parse(fs.readFileSync(submissionsFile));
res.json(data.reverse());
});

// Get submissions (admin review)
app.get('/api/submissions', (req, res) => {
  const data = JSON.parse(fs.readFileSync(submissionsFile));
  res.json(data.reverse());
});
// Manual sign up
app.post('/api/signup', (req, res) => {
  const { email, password, username, name, mobile, school } = req.body;
  let users = getUsers();
  if (users.find(u => u.email === email)) return res.json({ success: false, error: 'Email exists' });
  const hash = bcrypt.hashSync(password, 10);
  const user = { id: 'u_' + Date.now(), email, password: hash, username, name, mobile, school, photoUrl: null };
  users.push(user);
  saveUsers(users);
  req.login(user, err => {
    if (err) return res.json({ success: false, error: 'Login failed' });
    res.json({ success: true, user });
  });
});

// Manual sign in
app.post('/api/signin', passport.authenticate('local'), (req, res) => {
  res.json({ success: true, user: req.user });
});

// Google OAuth
app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('http://localhost:5173'); // or your frontend URL
});

// Get current user
app.get('/api/me', (req, res) => {
  if (!req.user) return res.json({ user: null });
  res.json({ user: req.user });
});

// Profile picture upload (associate with logged-in user)
app.post('/api/profile/upload', upload.single('photo'), (req, res) => {
  if (!req.user) return res.status(401).json({ error: 'Not logged in' });
  let users = getUsers();
  let user = users.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ error: 'User not found' });
  user.photoUrl = `/uploads/${req.file.filename}`;
  saveUsers(users);
  res.json({ success: true, url: user.photoUrl });
});
app.listen(PORT, () => console.log(`Eco-backend running on http://localhost:${PORT}`));
