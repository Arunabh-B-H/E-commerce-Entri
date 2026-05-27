const { OAuth2Client } = require('google-auth-library');
const User = require('../models/user');
const generateToken = require('../utils/generateToken');

// Mock client ID if none provided in env for assignment purposes
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'dummy-client-id';
const client = new OAuth2Client(CLIENT_ID);

// @desc    Auth user with Google
// @route   POST /api/auth/google
// @access  Public
const googleAuth = async (req, res) => {
  const { credential } = req.body;

  try {
    let payload;
    
    if (CLIENT_ID === 'dummy-client-id') {
      // Mock verification for local development/assignment if no true client id
      // The frontend will send a mock payload or standard JWT string
      // We will blindly parse it to get user info if we are in mock mode
      const base64Url = credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      payload = JSON.parse(jsonPayload);
    } else {
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: CLIENT_ID,
      });
      payload = ticket.getPayload();
    }

    const { email, name, picture } = payload;

    // Find if user exists
    let user = await User.findOne({ email });

    if (!user) {
      // Create a new user (generating a random password since they use Google)
      user = await User.create({
        name,
        email,
        password: Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8),
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: picture,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error('Google Auth Error:', error);
    res.status(401).json({ message: 'Google Authentication failed' });
  }
};

module.exports = { googleAuth };
