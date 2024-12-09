import { Student } from "../models/studentSchema.js"; // Adjust path as necessary
import jwt from "jsonwebtoken";

// Hardcoded password (this should ideally be stored in the DB and hashed)
//const HARD_CODED_PASSWORD = "securePassword123";

export const studentLogin = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      // Check if both fields are provided
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: "Please provide both email and password.",
        });
      }
  
      // Find student by email
      const student = await Student.findOne({ email });
      if (!student) {
        return res.status(404).json({
          success: false,
          message: "Student not found.",
        });
      }
  
      // Hardcoded password comparison
      const HARD_CODED_PASSWORD = "securePassword123";
      if (password !== HARD_CODED_PASSWORD) {
        return res.status(401).json({
          success: false,
          message: "Invalid password.",
        });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { id: student._id, email: student.email },
        process.env.JWT_SECRET,
        { expiresIn: "3d" }
      );
  
      res.status(200).json({
        success: true,
        message: "Student logged in successfully.",
        token,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Something went wrong.",
        error: error.message,
      });
    }
  };
  