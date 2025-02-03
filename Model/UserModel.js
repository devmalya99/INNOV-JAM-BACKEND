// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: {
    type: String,
    required: true,
  },
  password_org: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['super_admin','admin', 'learner', 'assessor','trainer'], // Different user roles
  },
  organisation: {
    type: String,
    ref: "Organisations", // If you have organisations, you can reference them
  },
  assignedCourses: [
    {
      type: String,
      ref: "Courses", // Add Course schema if needed
    },
  ],
  assignedAssessments: [
    {
      type: String,
      ref: "Assessments", // Add Assessment schema if needed
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }},
  { timestamps: true }
);



// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
