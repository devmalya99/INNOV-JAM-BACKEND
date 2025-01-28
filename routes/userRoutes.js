const express = require("express");
const router = express.Router();
const { createUser, getUsersByRole } = require("../controllers/userController");

// Create a new user (trainer or assessor)
router.post("/create", createUser);

// Get all users by role (trainer/assessor)
router.get("/:role", getUsersByRole);

module.exports = router;
