const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  module: String, // e.g. "Customer"
  create: Boolean,
  read: Boolean,
  update: Boolean,
  delete: Boolean,
});

const roleSchema = new mongoose.Schema({
  roleName: { type: String, required: true },
  roleDesc: String,
  permissions: [permissionSchema],
  superAdminId: { type: mongoose.Schema.Types.ObjectId, ref: 'SuperAdmin' },
});

module.exports = mongoose.model('Role', roleSchema);
