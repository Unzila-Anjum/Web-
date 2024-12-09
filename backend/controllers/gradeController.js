import { Grade } from '../models/Grade.js';
import { Student } from '../models/studentSchema.js';

// Save or update grades
export const saveGrades = async (req, res) => {
  try {
    const { grades, totalMarks } = req.body;

    if (!Array.isArray(grades) || grades.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Grades payload is missing or invalid",
      });
    }

    const updatedGrades = [];
    for (const grade of grades) {
      const { studentId, assignments, quizzes, exams } = grade;

      // Validate required fields
      if (!studentId || !assignments || !quizzes || !exams) {
        return res.status(400).json({
          success: false,
          message: "Incomplete grade data",
        });
      }

      // Upsert (Update if exists, else create)
      const updatedGrade = await Grade.findOneAndUpdate(
        { studentId },
        { 
          studentId, 
          assignments, 
          quizzes, 
          exams,
          totalMarks: totalMarks || {} 
        },
        { new: true, upsert: true }
      );

      updatedGrades.push(updatedGrade);
    }

    res.status(200).json({
      success: true,
      message: "Grades saved successfully",
      grades: updatedGrades,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save grades",
      error: error.message,
    });
  }
};

// Fetch all grades with populated student details
export const getGrades = async (req, res) => {
  try {
    const grades = await Grade.find()
      .populate('studentId', 'name registrationNumber')
      .exec();

    if (!grades || grades.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No grades found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Grades fetched successfully",
      grades,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch grades",
      error: error.message,
    });
  }
};
export const getGradesS = async (req, res) => {
  try {
    // Fetch all grades with associated student details
    const grades = await Grade.find()
      .populate('studentId', 'name registrationNumber')
      .exec();

    if (!grades || grades.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No grades found",
      });
    }

    // Save all grades for potential future use (e.g., in memory or a cache)
    const allGrades = grades; // You could also store this elsewhere as needed

    // Hardcoded student registration numbers for filtering
    const hardcodedRegistrationNumbers = ["22I2402"];

    // Filter grades to display only hardcoded students' grades
    const filteredGrades = grades.filter(grade =>
      hardcodedRegistrationNumbers.includes(grade.studentId.registrationNumber)
    );

    res.status(200).json({
      success: true,
      message: "Filtered grades fetched successfully",
      grades: filteredGrades, // Only display filtered grades
      allGrades, // Optionally include all grades if needed for debugging or logs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch grades",
      error: error.message,
    });
  }
};