const express = require("express");
const router = express.Router();
const Machine = require("../models/machine");

// GET /api/machines  →  fetch all machines (newest first)
router.get("/", async (req, res) => {
  try {
    const machines = await Machine.find().sort({ createdAt: -1 });
    res.json(machines);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch machines", error: error.message });
  }
});

// POST /api/machines  →  create a new machine listing
router.post("/", async (req, res) => {
  try {
    const {
      category,
      company,
      model,
      image,
      location,
      pricePerDay,
      modelYear,
      hoursUsed,
      availability,
      availableFrom,   // date string from frontend, e.g. "2026-06-15"
      ownerName,
      ownerContact,
      description,
    } = req.body;

    const machineData = {
      category,
      company,
      model,
      image,
      location,
      pricePerDay: Number(pricePerDay),
      modelYear: modelYear ? Number(modelYear) : undefined,
      hoursUsed: hoursUsed ? Number(hoursUsed) : undefined,
      availability: availability === "no" ? "no" : "yes",
      // Only store availableFrom when machine is NOT currently available
      availableFrom: availability === "no" && availableFrom ? new Date(availableFrom) : null,
      ownerName,
      ownerContact,
      description,
    };

    const newMachine = new Machine(machineData);
    const saved = await newMachine.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: "Failed to create machine", error: error.message });
  }
});

module.exports = router;