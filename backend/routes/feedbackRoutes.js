const express = require("express");
const Feedback = require("../models/Feedback");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// POST: Send feedback / report an issue
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { category, subject, message, email } = req.body;

    if (!subject || !subject.trim() || !message || !message.trim()) {
      return res.status(400).json({
        message: "Subject and message are required"
      });
    }

    const feedback = await Feedback.create({
      user: req.user.id,
      category: category || "feedback",
      subject: subject.trim(),
      message: message.trim(),
      email: email || ""
    });

    res.status(201).json({
      message: "Support request submitted successfully",
      ticket: {
        id: feedback._id,
        category: feedback.category,
        subject: feedback.subject,
        status: feedback.status,
        createdAt: feedback.createdAt
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET: Logged-in user ke support tickets
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tickets = await Feedback.find({
      user: req.user.id
    }).sort({ createdAt: -1 });

    res.json(tickets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
