const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Create user
router.post('/create', async (req, res) => {
  try {
    const { name, email, password, role, superAdminId } = req.body;
    const user = new User({ name, email, password, role, superAdminId });
    await user.save();
    res.status(201).json({ message: 'User created', user });
  } catch (err) {
    console.error('User creation failed:', err);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all roles (needed for dropdown)
const Role = require('../models/Role');
router.get('/roles/:superAdminId', async (req, res) => {
  try {
    const roles = await Role.find({ superAdminId: req.params.superAdminId });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

// Get all users by superAdminId
router.get('/all/:superAdminId', async (req, res) => {
  try {
    const users = await User.find({ superAdminId: req.params.superAdminId }).populate('role');
    res.json(users);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Optional: delete user
router.delete('/delete/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// PUT /api/users/update/:id
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Update failed' });
  }
});

module.exports = router;
