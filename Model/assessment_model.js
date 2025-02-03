const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question_number: { type: String, required: true },
  question: { type: String, required: true },
  question_instruction: { type: String },
  suggested_answer: { type: Array, default: [] },
  student_answer: { type: String, default: '' },
  sbert_score: { type: Number, default: null },
  roberta_score: { type: Number, default: null },
  distilroberta_score: { type: Number, default: null },
  t5_score: { type: Number, default: null },
  use_score: { type: Number, default: null },
  gpt_score: { type: Number, default: null },
  minilm_score: { type: Number, default: null },
  electra_score: { type: Number, default: null },
  labse_score: { type: Number, default: null },
  gemini_score: { type: Number, default: null },
  feedback: { type: String, default: '' },
  human_assess_remarks: { type: String, default: null },
  isCompetent: { type: Boolean, default: false }, // Mark if competent or not
});

const assessmentSchema = new mongoose.Schema({
  assessment_name: { type: String, required: true }, // Added assessment name
  assessment_type: { type: String, required: true },
  case_study_context: { type: String },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'courses', required: true }, // Reference to Course
  assessment_file_id: { type: mongoose.Schema.Types.ObjectId, ref: 'files' }, // Reference to Uploaded File
  course_name: { type: String }, // Course Name (if needed for quick lookup)

  data: [questionSchema],
});

module.exports = mongoose.model('Assessment', assessmentSchema);
