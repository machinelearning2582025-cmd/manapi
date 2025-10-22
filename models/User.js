const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: String,
  password: String,
  goals: [String],
  mainGoal: String,
  commitments: {
    whyNeverQuit: String,
    sacrificeLevel: String,
    extraDetails: String
  },
  currentPlan: {
    manifestation: {
      morning: String,
      night: String
    },
    brainprogram: {
      morning: String,
      night: String
    },
    affirmation: [String],
    priorityTasks: [String],
    burningDesires: [String],
    expiryDate: Date,
    createdAt: Date
  },
  isVerified: Boolean,
  progressHistory: Array,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
