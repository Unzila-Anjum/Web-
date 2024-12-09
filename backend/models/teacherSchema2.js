import mongoose from "mongoose";
import bcrypt from "bcrypt";

const teacherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  department: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["Visiting", "Permanent"],
    required: true,
  },
  designation: {
    type: String,
    enum: ["Lab Instructor", "Professor", "Associate Professor", "Lecturer"],
    required: function () {
      return this.type === "Permanent";
    },
  },
  qualifications: {
    type: String,
    required: true,
  },
  subjects: [
    {
      type: String,
      required: true,
    },
  ],
  joinDate: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  passwordResetToken: {
    type: String,
  },
  passwordResetExpires: {
    type: Date,
  },
});

// Pre-save middleware for password hashing
teacherSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash the password
    next();
  } catch (error) {
    next(error);
  }
});

// Instance method to compare passwords
teacherSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const Teacher = mongoose.model("Teacher", teacherSchema);
