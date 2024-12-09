// // import express from 'express';

// // export const teacherSignIn = async (req, res) => {
// //   try {
// //     const { email, password } = req.body;

// //     // Hardcoded password for teacher sign-in
// //     const HARDCODED_PASSWORD = 'TeacherSecure2024!';

// //     // Basic validation
// //     if (!email) {
// //       return res.status(400).json({
// //         success: false,
// //         message: 'Email is required'
// //       });
// //     }

// //     // Check for hardcoded password
// //     if (password !== HARDCODED_PASSWORD) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Invalid credentials'
// //       });
// //     }

// //     // If credentials are correct, send success response
// //     res.status(200).json({
// //       success: true,
// //       message: 'Teacher signed in successfully',
// //       data: {
// //         email: email
// //       }
// //     });

// //   } catch (error) {
// //     res.status(500).json({
// //       success: false,
// //       message: 'Server error during sign-in',
// //       error: error.message
// //     });
// //   }
// // };

// // const teacherSignInRouter = express.Router();
// // teacherSignInRouter.post('/', teacherSignIn);

// // export default teacherSignInRouter;

// // import { Teacher } from '../models/teacherSchema.js';
// // import jwt from 'jsonwebtoken';

// // export const teacherSignIn = async (req, res) => {
// //   try {
// //     const { registrationNumber, email, password } = req.body;

// //     // Find the teacher by registration number and email
// //     const teacher = await Teacher.findOne({ 
// //       registrationNumber, 
// //       email 
// //     });

// //     // Check if teacher exists
// //     if (!teacher) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Invalid registration number or email'
// //       });
// //     }

// //     // Compare passwords
// //     const isPasswordMatch = await teacher.comparePassword(password);
// //     if (!isPasswordMatch) {
// //       return res.status(401).json({
// //         success: false,
// //         message: 'Invalid password'
// //       });
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign(
// //       { 
// //         id: teacher._id, 
// //         registrationNumber: teacher.registrationNumber 
// //       }, 
// //       process.env.JWT_SECRET, 
// //       { 
// //         expiresIn: process.env.JWT_EXPIRES 
// //       }
// //     );

// //     // Remove sensitive information before sending response
// //     const teacherResponse = { ...teacher.toObject() };
// //     delete teacherResponse.password;

// //     res.status(200).json({
// //       success: true,
// //       message: 'Sign in successful',
// //       token,
// //       teacher: teacherResponse
// //     });
// //   } catch (error) {
// //     console.error('Teacher Sign In Error:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // // Fetch all teachers
// // export const getAllTeachers = async (req, res) => {
// //   try {
// //     const teachers = await Teacher.find().select('-password');
    
// //     res.status(200).json({
// //       success: true,
// //       teachers
// //     });
// //   } catch (error) {
// //     console.error('Fetch Teachers Error:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // import { Teacher } from '../models/teacherSignInModel.js';
// // import jwt from 'jsonwebtoken';

// // export const teacherSignIn = async (req, res) => {
// //   try {
// //     const { registrationNumber, email } = req.body;

// //     // Find the teacher by registration number and email
// //     const teacher = await Teacher.findOne({ 
// //       registrationNumber, 
// //       email 
// //     });

// //     // Check if teacher exists
// //     if (!teacher) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Teacher not found. Please check your registration number and email.'
// //       });
// //     }

// //     // Generate a temporary password if not signed up
// //     if (!teacher.isSignedUp) {
// //       // Generate a random temporary password
// //       const temporaryPassword = Math.random().toString(36).slice(-8);
      
// //       // Save the temporary password
// //       teacher.temporaryPassword = temporaryPassword;
// //       teacher.isSignedUp = true;
// //       await teacher.save();

// //       return res.status(200).json({
// //         success: true,
// //         message: 'First-time sign-in. Please use the temporary password.',
// //         temporaryPassword: temporaryPassword,
// //         teacherId: teacher._id
// //       });
// //     }

// //     // If already signed up, prompt for further action
// //     return res.status(200).json({
// //       success: true,
// //       message: 'Teacher found. Proceed to next step.',
// //       teacherId: teacher._id
// //     });

// //   } catch (error) {
// //     console.error('Teacher Sign In Error:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// // // Controller to complete sign-up or sign-in
// // export const completeTeacherSignIn = async (req, res) => {
// //   try {
// //     const { teacherId, password } = req.body;

// //     // Find the teacher
// //     const teacher = await Teacher.findById(teacherId);

// //     if (!teacher) {
// //       return res.status(404).json({
// //         success: false,
// //         message: 'Teacher not found'
// //       });
// //     }

// //     // If it's first-time sign-up, verify temporary password
// //     if (teacher.isSignedUp && teacher.temporaryPassword) {
// //       if (password !== teacher.temporaryPassword) {
// //         return res.status(401).json({
// //           success: false,
// //           message: 'Invalid temporary password'
// //         });
// //       }

// //       // Set the permanent password
// //       teacher.password = password;
// //       teacher.temporaryPassword = undefined;
// //       await teacher.save();
// //     }

// //     // Generate JWT token
// //     const token = jwt.sign(
// //       { 
// //         id: teacher._id, 
// //         registrationNumber: teacher.registrationNumber 
// //       }, 
// //       process.env.JWT_SECRET, 
// //       { 
// //         expiresIn: process.env.JWT_EXPIRES 
// //       }
// //     );

// //     // Remove sensitive information before sending response
// //     const teacherResponse = { ...teacher.toObject() };
// //     delete teacherResponse.password;
// //     delete teacherResponse.temporaryPassword;

// //     res.status(200).json({
// //       success: true,
// //       message: 'Sign in successful',
// //       token,
// //       teacher: teacherResponse
// //     });

// //   } catch (error) {
// //     console.error('Teacher Sign In Completion Error:', error);
// //     res.status(500).json({
// //       success: false,
// //       message: 'Internal server error',
// //       error: error.message
// //     });
// //   }
// // };

// import { Teacher } from '../models/teacherSignInModel.js';
// import jwt from 'jsonwebtoken';

// export const teacherSignIn = async (req, res) => {
//   try {
//     const { registrationNumber, email } = req.body;

//     // Validate input
//     if (!registrationNumber || !email) {
//       return res.status(400).json({
//         success: false,
//         message: 'Registration number and email are required'
//       });
//     }

//     // Find the teacher by registration number and email
//     const teacher = await Teacher.findOne({ 
//       registrationNumber, 
//       email 
//     });

//     // Check if teacher exists
//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: 'Teacher not found. Please check your registration number and email.'
//       });
//     }

//     // Generate a temporary password if not signed up
//     if (!teacher.isSignedUp) {
//       // Generate a random temporary password
//       const temporaryPassword = Math.random().toString(36).slice(-8);
      
//       // Save the temporary password
//       teacher.temporaryPassword = temporaryPassword;
//       teacher.isSignedUp = true;
//       await teacher.save();

//       return res.status(200).json({
//         success: true,
//         message: 'First-time sign-in. Please use the temporary password.',
//         temporaryPassword: temporaryPassword,
//         teacherId: teacher._id
//       });
//     }

//     // If already signed up, prompt for password
//     return res.status(200).json({
//       success: true,
//       message: 'Teacher found. Proceed to password entry.',
//       teacherId: teacher._id
//     });

//   } catch (error) {
//     console.error('Teacher Sign In Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// export const completeTeacherSignIn = async (req, res) => {
//   try {
//     const { teacherId, password } = req.body;

//     // Validate input
//     if (!teacherId || !password) {
//       return res.status(400).json({
//         success: false,
//         message: 'Teacher ID and password are required'
//       });
//     }

//     // Find the teacher
//     const teacher = await Teacher.findById(teacherId);

//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: 'Teacher not found'
//       });
//     }

//     // Verify password
//     let isPasswordValid = false;
//     try {
//       isPasswordValid = await teacher.comparePassword(password);
//     } catch (comparisonError) {
//       console.error('Password comparison error:', comparisonError);
//       return res.status(500).json({
//         success: false,
//         message: 'Password verification failed',
//         error: comparisonError.message
//       });
//     }
    
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: 'Invalid password'
//       });
//     }
    
//     // Generate JWT token with error handling
//     let token;
//     try {
//       token = jwt.sign(
//         { 
//           id: teacher._id, 
//           registrationNumber: teacher.registrationNumber 
//         }, 
//         process.env.JWT_SECRET,  // Ensure this is set
//         { 
//           expiresIn: process.env.JWT_EXPIRES || '1d'  // Fallback to 1 day if not set
//         }
//       );
//     } catch (jwtError) {
//       console.error('JWT Token Generation Error:', jwtError);
//       return res.status(500).json({
//         success: false,
//         message: 'Failed to generate authentication token',
//         error: jwtError.message
//       });
//     }

//     // Remove sensitive information before sending response
//     const teacherResponse = { ...teacher.toObject() };
//     delete teacherResponse.password;
//     delete teacherResponse.temporaryPassword;

//     res.status(200).json({
//       success: true,
//       message: 'Sign in successful',
//       token,
//       teacher: teacherResponse
//     });

//   } catch (error) {
//     console.error('Comprehensive Teacher Sign In Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// // Optional: Add a method to set permanent password
// export const setPermamentPassword = async (req, res) => {
//   try {
//     const { teacherId, newPassword } = req.body;

//     const teacher = await Teacher.findById(teacherId);

//     if (!teacher) {
//       return res.status(404).json({
//         success: false,
//         message: 'Teacher not found'
//       });
//     }

//     // Set new password
//     teacher.password = newPassword;
//     teacher.temporaryPassword = undefined;
//     await teacher.save();

//     // Generate new token
//     const token = jwt.sign(
//       { 
//         id: teacher._id, 
//         registrationNumber: teacher.registrationNumber 
//       }, 
//       process.env.JWT_SECRET, 
//       { 
//         expiresIn: process.env.JWT_EXPIRES 
//       }
//     );

//     res.status(200).json({
//       success: true,
//       message: 'Password set successfully',
//       token
//     });

//   } catch (error) {
//     console.error('Set Permanent Password Error:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Internal server error',
//       error: error.message
//     });
//   }
// };

// file: /backend/controllers/teacherController.js
//const Teacher = require('../models/teacherModel');
import express from 'express';
import { Teacher } from "../models/teacherSchema.js";
// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const { registrationNumber, email, name, department } = req.body;

    // Check if teacher already exists
    const existingTeacher = await Teacher.findOne({ 
      $or: [
        { registrationNumber }, 
        { email }
      ] 
    });

    if (existingTeacher) {
      return res.status(400).json({
        success: false,
        message: 'Teacher already exists with this registration number or email'
      });
    }

    // Create new teacher
    const teacher = await Teacher.create({
      registrationNumber,
      email,
      name,
      department
    });

    res.status(201).json({
      success: true,
      teacher
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating teacher',
      error: error.message
    });
  }
};

// Get all teachers
export  const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({
      success: true,
      teachers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching teachers',
      error: error.message
    });
  }
};

// Verify teacher login
export const verifyTeacherLogin = async (req, res) => {
  try {
    const { registrationNumber, email } = req.body;

    const teacher = await Teacher.findOne({ 
      registrationNumber, 
      email 
    });

    if (!teacher) {
      return res.status(401).json({
        success: false,
        message: 'Invalid registration number or email'
      });
    }

    // Store the teacher's name and registration number
    res.status(200).json({
      success: true,
      teacher: {
        name: teacher.name,
        registrationNumber: teacher.registrationNumber
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Login verification error',
      error: error.message
    });
  }
};