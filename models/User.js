const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  superAdminId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'SuperAdmin',
  },
});

module.exports = mongoose.model('User', userSchema);
