const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');
const pool = require('../config/database');

// Define the login route
router.post('/login', auth.login);

// Define the registration route
router.post('/register', auth.register);

// Define the email verification route
router.get('/verify', auth.verify);

router.get('/userdata', verifyToken, async (req, res) => {
  try {
    // Fetch user data from your database using req.user.userId
    const userData = await pool.query('SELECT name, user_email, is_verified FROM cosmos.users WHERE user_id = $1', [req.user.userId]);

    if (userData.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract user's name, email, and verification status from the database query result
    const { name, user_email, is_verified } = userData.rows[0];

    res.status(200).json({ user: { name, email: user_email, is_verified } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
