
const express = require("express");
const Workout = require("../models/Workout");
const Nutrition = require("../models/Nutrition");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET: Dashboard Statistics
router.get("/stats", authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;

    const [workouts, nutrition] = await Promise.all([
      Workout.find({ user: userId }),
      Nutrition.find({ user: userId })
    ]);

    const totalWorkouts = workouts.length;

    const totalCaloriesBurned = workouts.reduce(
      (total, item) => total + (item.calories || 0),
      0
    );

    const totalDuration = workouts.reduce(
      (total, item) => total + (item.duration || 0),
      0
    );

    const totalFoodCalories = nutrition.reduce(
      (total, item) => total + (item.calories || 0),
      0
    );

    const totalProtein = nutrition.reduce(
      (total, item) => total + (item.protein || 0),
      0
    );

    const totalCarbs = nutrition.reduce(
      (total, item) => total + (item.carbs || 0),
      0
    );

    const totalFats = nutrition.reduce(
      (total, item) => total + (item.fats || 0),
      0
    );

    res.json({
      message: "Dashboard statistics fetched successfully",
      statistics: {
        totalWorkouts,
        totalCaloriesBurned,
        totalDuration,
        totalFoodCalories,
        totalProtein,
        totalCarbs,
        totalFats
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;
