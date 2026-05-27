require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const machineRoutes = require("./routes/machines");

// Connect to MongoDB
connectDB();

// Create the Express app
const app = express();

// Middleware
app.use(cors());            // allow the frontend to call this server
app.use(express.json());    // let the server read JSON request bodies

// Routes
app.use("/api/machines", machineRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("ACE backend is running 🚀");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});