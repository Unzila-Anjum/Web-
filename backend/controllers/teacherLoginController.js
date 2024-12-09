import { Teacher } from "../models/teacherSchema2.js"; // Adjust path as necessary
import jwt from "jsonwebtoken";

export const teacherLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password.",
      });
    }

    // Find teacher by email
    const teacher = await Teacher.findOne({ email });
    if (!teacher) {
      return res.status(404).json({
        success: false,
        message: "Teacher not found.",
      });
    }

    // Compare passwords
    const isMatch = await teacher.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: teacher._id, email: teacher.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      success: true,
      message: "Teacher logged in successfully.",
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
