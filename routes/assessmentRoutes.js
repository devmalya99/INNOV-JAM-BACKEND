const express = require("express");
const router = express.Router();
const Assessment = require("../Model/assessment_model"); // Import the Assessment model
const assessmentController = require("../controllers/assessmentController");
const { updateFinalEvaluatedData } = require('../controllers/assessmentController');


// Route to fetch all assessments
router.get("/", async (req, res) => {
  try {
    const assessments = await Assessment.find(); // Fetch all assessments
    res.status(200).json(assessments);
  } catch (error) {
    console.error("Error fetching assessments:", error.message);
    res
      .status(500)
      .json({ message: "Error fetching assessments", error: error.message });
  }
});

// Route to fetch a specific assessment by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const assessment = await Assessment.findById(id); // Fetch assessment by ID

    if (!assessment) {
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.status(200).json(assessment);
  } catch (error) {
    console.error(`Error fetching assessment with ID ${id}:`, error.message);
    res
      .status(500)
      .json({ message: "Error fetching assessment", error: error.message });
  }
});

// Route to save student's answer for a specific question
router.put(
  "/:assessmentId/questions/:questionId",
  assessmentController.updateStudentAnswer
);


//define the route to update assessment data
router.put('/update-assessment', updateFinalEvaluatedData);

module.exports = router;
