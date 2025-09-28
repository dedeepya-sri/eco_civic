const express = require("express");
const router = express.Router();
const Topic = require("../models/Topic");

// GET all topics
router.get("/", async (req, res) => {
  try {
    const topics = await Topic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET topic by ID
router.get("/:id", async (req, res) => {
  try {
    const topic = await Topic.findById(req.params.id);
    res.json(topic);
  } catch (err) {
    res.status(404).json({ message: "Topic not found" });
  }
});

// POST a new topic
router.post("/", async (req, res) => {
  const topic = new Topic(req.body);
  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
