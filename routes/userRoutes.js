const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// 1️⃣ Signup - Add New User
router.post('/signup', async (req, res) => {
  try {
    const { email, name, password, goals, mainGoal, commitments } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      email,
      name,
      password: hashedPassword,
      goals: goals || [],
      mainGoal: mainGoal || "",
      commitments: commitments || { whyNeverQuit: "", sacrificeLevel: "", extraDetails: "" },
      isVerified: true,
      currentPlan: {},
      progressHistory: []
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error in signup', error: err.message });
  }
});

// 2️⃣ Update User - Pura Data Update Karo
router.put('/update/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updateData = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ 
      message: 'User updated successfully', 
      user: updatedUser 
    });
  } catch (err) {
    res.status(500).json({ message: 'Error updating user', error: err.message });
  }
});

// 3️⃣ Login - Fetch user by email & password
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    res.status(200).json({ message: 'Login successful', user });
  } catch (err) {
    res.status(500).json({ message: 'Error in login', error: err.message });
  }
});

// 4️⃣ Check Email Exists
router.post('/check-email', async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await User.exists({ email });
    res.status(200).json({ exists: !!exists });
  } catch (err) {
    res.status(500).json({ message: 'Error checking email', error: err.message });
  }
});

module.exports = router;
