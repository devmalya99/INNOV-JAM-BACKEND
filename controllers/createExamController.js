const axios = require("axios");
const FormData = require("form-data");
const File = require("../Model/file");
const Assessment = require("../Model/assessment_model");

const uploadToAiApi = async (content) => {
  try {
    console.log("Sending data to AI...");
    const formData = new FormData();
    formData.append("content", content);

    const response = await axios.post(
      "http://192.168.1.24:8000/extract/",
      formData
    );
    console.log("Response from AI API received:", response.data);
    return response.data; // Directly return parsed data
  } catch (error) {
    console.error("Error sending file to AI API:", error);
    throw new Error("AI processing failed.");
  }
};

exports.createExam = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Invalid or missing file ID",
    });
  }

  try {
    const file = await File.findById(id);
    if (!file) {
      return res.status(404).json({ error: "File not found" });
    }

    // Process file with AI and save results
    const aiResponse = await uploadToAiApi(file.content);
    console.log("AI response:", aiResponse);
    
    const {
      assessment_type,
      case_study_context ,
      questions_and_answers
    } = aiResponse;

    const enrichedQuestions = questions_and_answers?.map((question) => ({
      ...question,
      student_answer: "",
      sbert_score: null,
      roberta_score: null,
      distilroberta_score: null,
      t5_score: null,
      use_score: null,
      gpt_score: null,
      minilm_score: null,
      labse_score: null,
      gemini_score: null,
      longformer_score: null,
      feedback: "",
      human_assess_remarks: null,

    }));

    const newAssessment = new Assessment({
      assessment_type,
      case_study_context,
      data: enrichedQuestions,
    });

    console.log("New assessment created:", newAssessment);

    await newAssessment.save();

    return res.status(200).json({
      success: true,
      message: "Exam created successfully",
      assessment: newAssessment,
    });
  } catch (error) {
    console.error("Error during exam creation:", error);
  }
};
