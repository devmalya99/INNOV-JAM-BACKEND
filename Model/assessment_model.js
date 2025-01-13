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
});

const assessmentSchema = new mongoose.Schema({
  assessment_type: { type: String, required: true },
  case_study_context: { type: String },
  data: [questionSchema],
});

module.exports = mongoose.model('Assessment', assessmentSchema);
