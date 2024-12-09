// assignmentController.js

import { Assignment } from "../models/assignmentSchema3.js";
import { handleValidationError } from "../middlewares/errorHandler.js";

export const deleteAssignment = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deletedAssignment = await Assignment.findByIdAndDelete(id);
    if (!deletedAssignment) {
      return res.status(404).json({ success: false, message: "Assignment not found!" });
    }
    res.status(200).json({
      success: true,
      message: "Assignment deleted successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const createAssignment = async (req, res, next) => {
  const { title, description, grade, deadline } = req.body;
  try {
    if (!title || !description || !grade || !deadline) {
      return res.status(400).json({ success: false, message: "Please fill in all fields!" });
    }

    const deadlineDate = new Date(deadline);
    if (deadlineDate <= new Date()) {
      return res.status(400).json({ success: false, message: "Deadline must be a future date!" });
    }

    const assignment = await Assignment.create({ title, description, grade, deadline });
    res.status(201).json({
      success: true,
      assignment,
      message: "Assignment created successfully!",
    });
  } catch (err) {
    next(err);
  }
};

export const updateAssignment = async (req, res, next) => {
  const { id } = req.params;
  const updates = req.body;

  try {
    // Validate all required fields before updating
    if (!updates.title || !updates.description || !updates.grade) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, description, grade) are required.",
      });
    }

    // Validate deadline
    if (updates.deadline) {
      const deadlineDate = new Date(updates.deadline);
      if (deadlineDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: "Deadline must be a future date!",
        });
      }
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedAssignment) {
      return res.status(404).json({
        success: false,
        message: "Assignment not found!",
      });
    }

    res.status(200).json({
      success: true,
      assignment: {
        ...updatedAssignment._doc,
        deadline: updatedAssignment.deadline.toISOString().split("T")[0],
      },
    });
  } catch (err) {
    next(err);
  }
};

export const getAllAssignments = async (req, res, next) => {
  try {
    const assignments = await Assignment.find();
    const formattedAssignments = assignments.map((assignment) => ({
      ...assignment._doc,
      deadline: assignment.deadline.toISOString().split('T')[0], // Only the date part
    }));
    res.status(200).json({
      success: true,
      assignments: formattedAssignments,
    });
  } catch (err) {
    next(err);
  }
};
