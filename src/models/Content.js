const mongoose = require("mongoose");

const contentSchema = new mongoose.Schema(
  {
    title: {
      type:      String,
      required:  [true, "Title is required"],
      trim:      true,
      maxlength: [100, "Title must be under 100 characters"],
    },
    subject: {
      type:     String,
      required: [true, "Subject is required"],
      trim:     true,
    },
    description: {
      type:      String,
      trim:      true,
      maxlength: [500, "Description must be under 500 characters"],
      default:   "",
    },
    
    fileUrl: {
      type:     String,
      required: [true, "File is required"],
    },
    fileType: {
      type:    String,
      default: "image/jpeg",
    },
    fileName: {
      type: String,
    },
    status: {
      type:    String,
      enum:    ["pending", "approved", "rejected"],
      default: "pending",
    },
    rejectionReason: {
      type:    String,
      default: null,
    },
    startTime: {
      type:     Date,
      required: [true, "Start time is required"],
    },
    endTime: {
      type:     Date,
      required: [true, "End time is required"],
    },
    rotationDuration: {
      type:    Number,
      default: 30,
      min:     [5, "Minimum rotation is 5 seconds"],
      max:     [300, "Maximum rotation is 300 seconds"],
    },
    
    teacher: {
      type:     mongoose.Schema.Types.ObjectId,
      ref:      "User",
      required: true,
    },
    
    teacherName: {
      type: String,
    },
    
    reviewedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref:  "User",
      default: null,
    },
    reviewedAt: {
      type:    Date,
      default: null,
    },
  },
  { timestamps: true }
);


contentSchema.pre("save", function (next) {
  if (this.endTime <= this.startTime) {
    return next(new Error("End time must be after start time"));
  }
  next();
});


contentSchema.index({ teacher: 1, status: 1, startTime: 1, endTime: 1 });
contentSchema.index({ status: 1 });

module.exports = mongoose.model("Content", contentSchema);
