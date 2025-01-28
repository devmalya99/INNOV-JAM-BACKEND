const { default: mongoose } = require("mongoose");
const User = require("../Model/UserModel");
const crypto = require("crypto");

// Create new user (trainer or assessor)
exports.createUser = async (req, res) => {
  try {
    const { email, role, organisation, assignedCourses, assignedAssessments } = req.body;
   // Validate ObjectId fields
   

    // Generate a random password
    const randomPassword = crypto.randomBytes(8).toString("hex");

    const newUser = new User({
      email,
      password: randomPassword, // Will be hashed automatically
      password_org: randomPassword,
      role,
      organisation,
      assignedCourses,
      assignedAssessments,
    });

    await newUser.save();

    res.status(201).json({
      message: `${role} created successfully`,
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
        password_org: newUser.password_org,
        assignedCourses: newUser.assignedCourses,
        assignedAssessments: newUser.assignedAssessments,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error: error.message });
  }
};

// Get all users by role
exports.getUsersByRole = async (req, res) => {
  try {
    const { role } = req.params;
    const users = await User.find({ role });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};
