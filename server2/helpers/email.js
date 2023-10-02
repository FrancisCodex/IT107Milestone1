const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

// Create a nodemailer transporter with your email service provider's SMTP settings
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Use your email service provider here
  auth: {
    user: process.env.AUTH_EMAIL, // ge create nako ni para lang ani
    pass: process.env.AUTH_PASS, // Your email password
  },
});

// Function to send a verification email
const sendVerificationEmail = (user_email, verificationToken) => {
  // Email content
  const mailOptions = {
    from: process.env.AUTH_EMAIL, // Your email address
    to: user_email, // Recipient's email address
    subject: 'Verify Your Email', // Email subject
    text: `Click the following link to verify your email: http://example.com/verify?token=${verificationToken}`,
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email sending error:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

module.exports = sendVerificationEmail;
