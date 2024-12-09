import mongoose from "mongoose";
import validator from "validator";

const teacherLogin = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  

  department: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Invalid email format",
    },
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    min: 1,
    max: 8, // Assuming an 8-semester program
  },
}, { timestamps: true });

export const Student = mongoose.model("Teacher", teacherLogin);