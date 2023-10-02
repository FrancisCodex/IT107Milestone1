// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth');
const verifyToken = require('../middleware/verifyToken');
const pool = require('../config/database');
const verifyUser = require('../middleware/verifyUser');



// Define the login route
router.post('/login', auth.login);

router.post('/register', auth.register);

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
  
  
  router.get('/verify', async (req, res) => {
    const { token } = req.query;
  
    try {
      // Find the user with the matching token in the database
      const user = await pool.query('SELECT * FROM users WHERE verification_token = $1', [token]);
  
      if (user.rows.length === 0) {
        return res.status(404).json({ message: 'Invalid or expired token' });
      }
  
      // Mark the user's account as verified
      await pool.query('UPDATE users SET is_verified = true WHERE user_id = $1', [user.rows[0].user_id]);
  
      res.status(200).json({ message: 'Account verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


module.exports = router;