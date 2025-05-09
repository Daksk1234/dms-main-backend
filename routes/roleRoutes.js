const express = require('express');
const router = express.Router();
const Role = require('../models/Role');

// Create role
router.post('/create', async (req, res) => {
  try {
    const role = new Role(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create role', details: err.message });
  }
});

// Get all roles for a super admin
router.get('/get-all/:superAdminId', async (req, res) => {
  try {
    const roles = await Role.find({ superAdminId: req.params.superAdminId });
    res.json(roles);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch roles' });
  }
});

// Update role
router.put('/update/:id', async (req, res) => {
  try {
    const updated = await Role.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update role' });
  }
});

// Delete role
router.delete('/delete/:id', async (req, res) => {
  try {
    await Role.findByIdAndDelete(req.params.id);
    res.json({ message: 'Role deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete role' });
  }
});

module.exports = router;
