const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const workoutRoutes = require("./routes/workoutRoutes");
const authRoutes = require("./routes/authRoutes");
const nutritionRoutes = require("./routes/nutritionRoutes");
const progressRoutes = require("./routes/progressRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");

const app = express();
exports.app = app;

// CLIENT_ORIGIN set ho to sirf wahi origins allow honge, warna sab allowed.
const allowedOrigins = (process.env.CLIENT_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : true,
  })
);
app.use(express.json());
app.use("/api/workouts", workoutRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/nutrition", nutritionRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/feedback", feedbackRoutes);


// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
  })
  .catch((error) => {
    console.log("MongoDB Error:", error.message);
  });

// Test route
app.get("/", (req, res) => {
  res.send("Fitness Tracker Backend is Running!");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Fitness Tracker server running on port ${PORT}`);
});
