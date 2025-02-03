const mongoose = require("mongoose");
const { nanoid } = require("nanoid"); // For generating unique slugs

const CourseSchema = new mongoose.Schema(
  {
    courseName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      default: () => nanoid(10), // Automatically generates a unique slug
    },
    description: {
      type: String,
      trim: true,
      default: "No description provided.",
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    
    assessments: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
          default: "",
        },
        weightage: {
          type: Number,
          default: 0, // Helps in grading systems
        },
      },
    ],

    gradingSystem: {
      type: [
        {
          grade: { type: String }, // e.g., "A", "B", "C"
          minPercentage: { type: Number }, // Minimum percentage for the grade
          maxPercentage: { type: Number }, // Maximum percentage for the grade
        },
      ],
      default: [],
    },

    assigned_trainers: {
      type: [String], // Array of strings
      default: []
    },
    assigned_learners: {
      type: [String], // Array of strings
      default: []
    },
    assigned_evaluators: {
      type: [String], // Array of strings
      default: []
    },

    uploaded_courseware: [
      {
        documentId: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
        filename: { type: String },
        url: { type: String, trim: true }, // File download or preview link
      },
    ],
    resources: [
      {
        title: { type: String, trim: true },
        url: { type: String, trim: true },
      },
    ],

    organisationName: {
      type: String,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Tracks the creator of the course
    },

    status: {
      type: String,
      enum: [
        "In Creation",
        "Ongoing",
        "Review Pending",
        "Completed",
        "Results Out",
      ],
      default: "In Creation",
    },
    visibility: {
      type: String,
      enum: ["Private", "Public"],
      default: "Private", // Determines if others can see the course
    },
    tags: {
      type: [String],
      default: [], // Useful for categorizing and searching courses
    },

    startDate: {
      type: Date,
      default: null, // For scheduling
    },
    endDate: {
      type: Date,
      default: null,
    },

    competent_learners: {
      type: [String], // Array of learner emails marked as competent
      default: []
    },
    total_enrollment_count: {
      type: Number, // Total number of enrolled learners
      default: 0
    },
    submission_completed: {
      type: [String], // Array of learner emails who completed submissions
      default: []
    },
    examScheduleDate: {
      type: Date, // Date for scheduling exams
      default: null
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Pre-save middleware to update the slug if the course name changes
CourseSchema.pre("save", function (next) {
  if (this.isModified("courseName")) {
    this.slug = `${this.courseName.toLowerCase().replace(/[\s]+/g, "-")}-${nanoid(5)}`;
  }
  next();
});

module.exports = mongoose.model("Course", CourseSchema);
