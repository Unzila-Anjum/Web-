import { Teacher } from "../models/teacherSchema.js";
import crypto from "crypto";
import bcrypt from "bcrypt";
//import nodemailer from "nodemailer";

import { send } from "process";

// Get all teachers
export const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teachers", error });
  }
};

// Search teachers by query (name, email, or department)
export const searchTeachers = async (req, res) => {
  try {
    const { query } = req.query;
    const teachers = await Teacher.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { email: { $regex: query, $options: "i" } },
        { department: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ teachers });
  } catch (error) {
    res.status(500).json({ message: "Error searching teachers", error });
  }
};

// Get a single teacher by ID
export const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ teacher });
  } catch (error) {
    res.status(500).json({ message: "Error fetching teacher", error });
  }
};

// Create a new teacher
export const createTeacher = async (req, res) => {
  try {
    const { type, designation } = req.body;

    // Ensure designation is only provided for permanent teachers
    if (type === "Visiting" && designation) {
      return res
        .status(400)
        .json({ message: "Visiting teachers cannot have a designation." });
    }

    const teacher = new Teacher(req.body);
    await teacher.save();
    res.status(201).json({ teacher });
  } catch (error) {
    console.error("Error creating teacher:", error); // Log error for debugging
    res.status(400).json({
      message: "Error creating teacher",
      error: error.message || error,
    });
  }
};


// Update teacher details
export const updateTeacher = async (req, res) => {
  try {
    const { type, designation } = req.body;

    // Ensure designation is only provided for permanent teachers
    if (type === "Visiting" && designation) {
      return res
        .status(400)
        .json({ message: "Visiting teachers cannot have a designation." });
    }

    const teacher = await Teacher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.status(200).json({ teacher });
  } catch (error) {
    res.status(400).json({ message: "Error updating teacher", error });
  }
};

// Delete a teacher
export const deleteTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndDelete(req.params.id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }
    res.status(200).json({ message: "Teacher deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting teacher", error });
  }
};

// Request password reset
// export const requestPasswordReset = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const teacher = await Teacher.findOne({ email });
//     if (!teacher) {
//       return res.status(404).json({ message: "Teacher not found" });
//     }

//     // Generate a reset token and set expiration
//     const resetToken = crypto.randomBytes(32).toString("hex");
//     teacher.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     teacher.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token valid for 10 minutes
//     await teacher.save();

//     // Send the reset token via email
//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     const resetUrl = $`{req.protocol}://${req.get("host")}/reset-password/${resetToken}`;
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: teacher.email,
//       subject: "Password Reset Request",
//       text: "You requested a password reset. Click here to reset your password:", ${resetUrl},
//     });

//     res.status(200).json({ message: "Password reset link sent to email" });
//   } catch (error) {
//     res.status(500).json({ message: "Error requesting password reset", error });
//   }
// };

// Reset password
// export const resetPassword = async (req, res) => {
//   try {
//     const { resetToken } = req.params;
//     const { newPassword } = req.body;

//     // Hash the reset token and find the teacher
//     const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
//     const teacher = await Teacher.findOne({
//       passwordResetToken: hashedToken,
//       passwordResetExpires: { $gt: Date.now() },
//     });

//     if (!teacher) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     // Update the password
//     teacher.password = await bcrypt.hash(newPassword, 12);
//     teacher.passwordResetToken = undefined;
//     teacher.passwordResetExpires = undefined;
//     await teacher.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error resetting password", error });
//   }
// };

const sendMail =async (req,res) => {
  let testAccount = await nodemailer.createTestAccount();
  let transport = await nodemailer.createTransport({
    host:"smtp.ethereal.email",
    port: 587,
    secure:false,
    auth:{
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  let info = await transporter.sendMail({
    from: '"Unzila Anjum" <unzilaas9@gmail.com>',
    to: "i222550@nu.edu.pk",
    subject:"testing",
    text: "i am unzila ",
    html : "<b> me unzila hoon</b>"
  });
  console.log("msg sent: %s", info.messageId);
  res.json(info);
};
//module.exports= sendMail;