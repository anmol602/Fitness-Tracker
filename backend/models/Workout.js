
const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
  {
    user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
  }, 
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      default: "General",
    },
    duration: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workout", workoutSchema);
