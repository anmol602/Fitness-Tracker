
const express = require("express");
const Workout = require("../models/Workout");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET: Logged-in user ke workouts
router.get("/", authMiddleware, async (req, res) => {
  try {
    const workouts = await Workout.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Add workout
router.post("/", authMiddleware, async (req, res) => {
  try {
    const workout = await Workout.create({
      user: req.user.id,
      title: req.body.title,
      category: req.body.category,
      duration: req.body.duration,
      calories: req.body.calories,
      date: req.body.date,
    });

    res.status(201).json({
      message: "Workout added successfully",
      workout,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT: Update workout
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const workout = await Workout.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user.id,
      },
      {
        title: req.body.title,
        category: req.body.category,
        duration: req.body.duration,
        calories: req.body.calories,
        date: req.body.date,
      },
      { new: true, runValidators: true }
    );

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.json({
      message: "Workout updated successfully",
      workout,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE: Delete workout
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const workout = await Workout.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!workout) {
      return res.status(404).json({
        message: "Workout not found",
      });
    }

    res.json({
      message: "Workout deleted successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
