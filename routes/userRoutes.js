const express = require("express");
const router = express.Router();
const { createUsers, getUsersByRole } = require("../controllers/userController");

// Create a new user (trainer or assessor)
router.post("/create", createUsers);

// Get all users by role (trainer/assessor)
router.get("/:role", getUsersByRole);

module.exports = router;
