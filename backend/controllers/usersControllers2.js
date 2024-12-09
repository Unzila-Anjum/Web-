import { handleValidationError } from "../middlewares/errorHandler.js";
import { Student } from "../models/usersSchema.js";
//import { adminRegisterSchema } from "../models/usersSchema.js";
import { Teacher } from "../models/teacherSchema2.js";

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import adminRegisterSchema from '../models/adminRegisterSchema.js'; // Ensure you're importing the correct schema

export const adminSignIn = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    // Check if the admin exists
    const existingAdmin = await adminRegisterSchema.findOne({ email });

    if (!existingAdmin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, existingAdmin.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: existingAdmin._id, email: existingAdmin.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Return success response with the token
    res.status(200).json({
      success: true,
      message: "Admin signed in successfully",
      token,
    });
  } catch (err) {
    next(err);
  }
};


export const studentSignIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      handleValidationError("Please provide email and password", 400);
    }
    // Your sign-in logic for student goes here
    res.status(200).json({
      success: true,
      message: "Student signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};

export const teacherSignIn = async (req, res, next) => { 
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      handleValidationError("Please provide email and password", 400);
    }
    // Your sign-in logic for teacher goes here
    res.status(200).json({
      success: true,
      message: "Teacher signed in successfully",
    });
  } catch (err) {
    next(err);
  }
};
