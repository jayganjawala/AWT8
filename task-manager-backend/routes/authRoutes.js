// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Placeholder for user data
const users = [{ username: 'admin', password: 'password' }]; // Example user

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });
  
  bcrypt.compare(password, user.password, (err, result) => {
    if (!result) return res.status(400).json({ message: 'Invalid credentials' });
    
    const token = jwt.sign({ username: user.username }, 'secret_key', { expiresIn: '1h' });
    res.json({ token });
  });
});

module.exports = router;
