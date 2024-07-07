import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import path from 'path';

dotenv.config(); // Load environment variables

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files

// Serve the homepage
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/templates/index.html'));
});

// Configure session middleware
app.use(session({
    secret: process.env.SESSION_SECRET || 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));

app.use(passport.initialize());
app.use(passport.session());

// Configure Passport with Google OAuth strategy
passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.NODE_ENV === 'production'
            ? 'https://nature-for-future-production.up.railway.app/auth/google/callback'
            : 'http://localhost:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
    }
));

// Serialize and deserialize user
passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Route to start Google authentication
app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Route to handle Google callback
app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        res.redirect('/profile');
    }
);

// Route to serve profile page
app.get('/profile', (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public/templates/add.html'));
});

// Route to handle logout
app.get('/logout', (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect('/');
    });
});

// Route to serve join page
app.get('/templates/join.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/templates/join.html'));
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
