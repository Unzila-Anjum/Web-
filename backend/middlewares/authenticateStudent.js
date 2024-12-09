import jwt from "jsonwebtoken";
import { Student } from "../models/studentSchema.js";

export const authenticateStudent = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const student = await Student.findOne({ email: decoded.email }); // Fetch student data
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }
    req.student = student; // Attach student data to request
    next();
  } catch (error) {
    console.error("Token verification error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
