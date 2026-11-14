
const express = require("express");
const Nutrition = require("../models/Nutrition");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// GET: Logged-in user ki food history
router.get("/", authMiddleware, async (req, res) => {
  try {
    const foods = await Nutrition.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// POST: Food add karna
router.post("/", authMiddleware, async (req, res) => {
  try {
    const {
      foodName,
      category,
      calories,
      protein,
      carbs,
      fats,
    } = req.body;

    const food = await Nutrition.create({
      user: req.user.id,
      foodName,
      category,
      calories,
      protein,
      carbs,
      fats,
    });

    res.status(201).json({
      message: "Food added successfully",
      food,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

// DELETE: Apna food record delete karna
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const food = await Nutrition.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!food) {
      return res.status(404).json({
        message: "Food not found",
      });
    }

    res.json({
      message: "Food deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

module.exports = router;
