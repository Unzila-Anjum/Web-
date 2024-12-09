import mongoose from "mongoose";

const courseRegistrationSchema = new mongoose.Schema({
  studentId: {
    type: String,
  },
  courses: [
    {
      courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
      },
      section: {
        type: String,
        enum: ["A", "B", "C"], // Hardcoded sections
        required: true,
      },
    },
  ],
});

const CourseRegistration = mongoose.model("CourseRegistration", courseRegistrationSchema);
export default CourseRegistration;
