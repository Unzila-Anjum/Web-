import mongoose from "mongoose";

const studentModel = new mongoose.Schema({
  name: { type: String, required: true },
  registrationNumber: { type: String, required: true, unique: true },
  registeredCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Registered courses
  passedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }], // Courses student passed
});

export default mongoose.model("Student1", studentModel);
