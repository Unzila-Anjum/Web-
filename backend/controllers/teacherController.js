import { Teacher } from "../models/teacherSchema2.js";
import { handleValidationError } from "../middlewares/errorHandler.js";


export const createTeacher = async (req, res, next) => {
  const {
    name,
    registrationNumber,
    email,
    phone,
    department,
    type,
    designation,
    qualifications,
    subjects,
    password,
  } = req.body;

  try {
    // Validate required fields based on schema
    if (
      !name ||
      !registrationNumber ||
      !email ||
      !phone ||
      !department ||
      !type ||
      !qualifications ||
      !subjects ||
      !password
    ) {
      return handleValidationError("Please fill in all required fields.", 400);
    }

    // Additional validation for designation based on type
    if (type === "Permanent" && !designation) {
      return handleValidationError(
        "Designation is required for permanent teachers.",
        400
      );
    }

    // Create teacher
    const newTeacher = new Teacher({
      name,
      registrationNumber,
      email,
      phone,
      department,
      type,
      designation,
      qualifications,
      subjects,
      password,
    });

    // Save teacher to the database
    await newTeacher.save();

    res.status(201).json({
      success: true,
      message: "Teacher created successfully!",
      teacher: newTeacher,
    });
  } catch (err) {
    next(err);
  }
};


export const getAllTeachers = async (req, res, next) => {
  try {
    // Fetch all teachers from the database
    const teachers = await Teacher.find().select("-password"); // Exclude passwords for security

    res.status(200).json({
      success: true,
      teachers,
    });
  } catch (err) {
    next(err);
  }
};

 
