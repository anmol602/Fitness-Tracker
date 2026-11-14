const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    category: {
      type: String,
      default: "feedback"
    },
    subject: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    email: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "Open"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Feedback", feedbackSchema);
