import { Student } from "../models/studentSchema.js";

export const getStudentProfile = async (req, res) => {
  try {
    // Hardcode student registration number
    const studentId = "22I2402"; // This is the hardcoded registration number

    // Fetch the student from the database using the hardcoded studentId
    const student = await Student.findOne({ registrationNumber: studentId });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    res.status(200).json({ success: true, data: student });
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};

export const updateStudentProfile = async (req, res) => {
  try {
    const { name, department, address, semester } = req.body; // Fields allowed to be updated
    // Hardcode student registration number
    const studentId = "22I2402"; // This is the hardcoded registration number

    // Find the student by the hardcoded studentId
    const student = await Student.findOne({ registrationNumber: studentId });

    if (!student) {
      return res.status(404).json({ success: false, message: "Student not found" });
    }

    // Update only allowed fields
    if (name) student.name = name;
    if (department) student.department = department;
    if (address) student.address = address;
    if (semester) student.semester = semester;

    await student.save(); // Save changes to the database

    res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: student,
    });
  } catch (error) {
    console.error("Error updating profile:", error.message);
    res.status(500).json({ success: false, message: "Server error." });
  }
};
