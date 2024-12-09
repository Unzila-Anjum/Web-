import { Student } from "../models/studentSchema.js";

// Create a new student
export const createStudent = async (req, res, next) => {
  const { name, registrationNumber, department, email, dateOfBirth, gender, address, semester } = req.body;

  try {
    // Validate required fields
    if (!name || !registrationNumber  || !department || !email || !dateOfBirth || !gender || !address || semester === undefined) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    // Validate semester range
    if (semester < 1 || semester > 8) {
      return res.status(400).json({ message: "Semester must be between 1 and 8" });
    }

    // Create and save the student
    const student = await Student.create({
      name,
      registrationNumber,
      department,
      email,
      dateOfBirth,
      gender,
      address,
      semester,
    });

    res.status(201).json({
      success: true,
      message: "Student created successfully!",
      student,
    });
  } catch (err) {
    next(err);
  }
};

// Get all students
export const getAllStudents = async (req, res, next) => {
  try {
    const students = await Student.find();
    res.status(200).json({
      success: true,
      students,
    });
  } catch (err) {
    next(err);
  }
};

// Update an existing student
export const updateStudent = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Validate semester if provided
    if (updates.semester && (updates.semester < 1 || updates.semester > 8)) {
      return res.status(400).json({ message: "Semester must be between 1 and 8" });
    }

    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student updated successfully!",
      student: updatedStudent,
    });
  } catch (err) {
    next(err);
  }
};

// Delete a student
export const deleteStudent = async (req, res, next) => {
  const { id } = req.params;

  try {
    const deletedStudent = await Student.findByIdAndDelete(id);

    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      success: true,
      message: "Student deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

// Search for students
export const searchStudents = async (req, res, next) => {
  const { query } = req.query;

  try {
    const students = await Student.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { registrationNumber: { $regex: query, $options: "i" } },
        { department: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json({
      success: true,
      students,
    });
  } catch (err) {
    next(err);
  }
};
 