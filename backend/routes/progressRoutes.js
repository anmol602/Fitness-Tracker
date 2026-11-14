
const express = require("express");
const Progress = require("../models/Progress");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET: Logged-in user ki progress history
router.get("/", authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(progress);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST: New progress add karna
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      weight,
      height,
      goal,
      date,
    } = req.body;

    const progress = await Progress.create({
      user: req.user.id,
      weight,
      height,
      goal,
      date,
    });

    res.status(201).json({
      message: "Progress added successfully",
      progress,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE: Apni progress delete karna
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const progress = await Progress.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!progress) {
      return res.status(404).json({
        message: "Progress not found",
      });
    }

    res.json({
      message: "Progress deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
