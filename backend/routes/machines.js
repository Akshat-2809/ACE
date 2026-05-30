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
      pricePerMonth,
      modelYear,
      hoursUsed,
      availability,
      availableFrom,
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
      pricePerMonth: Number(pricePerMonth),
      modelYear: modelYear ? Number(modelYear) : undefined,
      hoursUsed: hoursUsed ? Number(hoursUsed) : undefined,
      availability: availability === "no" ? "no" : "yes",
      availableFrom:
        availability === "no" && availableFrom
          ? new Date(availableFrom)
          : null,
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