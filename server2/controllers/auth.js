// controllers/authController.js // Import your User model
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/database')
const dotenv = require('dotenv');
const cookie = require('cookie');


dotenv.config();



//random generation verification
const generateVerificationToken = () => {
  // Generate a random token here (you can use a library like `crypto` for this)
  const verificationToken = crypto.randomBytes(32).toString('hex');
  return verificationToken;
};



// Login controller
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database
    const userQueryResult = await pool.query('SELECT * FROM cosmos.users WHERE user_email = $1', [email]);

    // console.log('User query result:', userQueryResult.rows);

    if (userQueryResult.rows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    const user = userQueryResult.rows[0];

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    // Generate and send a JSON web token (JWT) for authentication
    const token = jwt.sign({ userId: user.user_id }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Adjust the expiration time as needed
    });

    console.log('Generated Token:', token);


       // Set the token in a cookie
       res.setHeader(
        'Set-Cookie',
        cookie.serialize('token', token, {
          httpOnly: true,
          maxAge: 3600, // Token expiration time in seconds (1 hour in this example)
          sameSite: 'none', // Adjust this based on your security requirements
          secure: false, // Set secure to true in production
          path: '/', // Specify the path where the cookie is accessible
        })
      );
      

      res.status(200).json({ message: 'Login successful', token});

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.register = async (req, res) => {
  const { name, user_email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await pool.query('SELECT * FROM cosmos.users WHERE user_email = $1', [user_email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate a verification token for the user
    const verificationToken = generateVerificationToken();

    // Insert the new user into the database along with the verification token
    await pool.query(
      'INSERT INTO cosmos.users (name, user_email, password, verification_token) VALUES ($1, $2, $3, $4)',
      [name, user_email, hashedPassword, verificationToken]
    );

    // Send the verification email (implement this function)
    sendVerificationEmail(user_email, verificationToken);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.verify = async (req, res) => {
    const { token } = req.query;
  
    try {
      // Find the user with the matching token in the database
      const user = await pool.query('SELECT * FROM cosmos.users WHERE verification_token = $1', [token]);
  
      if (user.rows.length === 0) {
        return res.status(404).json({ message: 'Invalid or expired token' });
      }
  
      // Mark the user's account as verified
      await pool.query('UPDATE cosmos.users SET is_verified = true WHERE id = $1', [user.rows[0].id]);
  
      res.status(200).json({ message: 'Account verified successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };


