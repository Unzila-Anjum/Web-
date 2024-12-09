import { Teacher } from "../models/teacherSchema.js";

// Create a new teacher profile
export const createTeacherProfile = async (req, res) => {
  try {
    const { name, email, phone, address, qualification } = req.body;

    // Check if a teacher with this email already exists
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher) {
      return res.status(400).json({ message: 'Teacher profile already exists' });
    }

    // Create new teacher profile
    const newTeacher = new Teacher({
      name,
      email,
      phone,
      address,
      qualification
    });

    await newTeacher.save();

    res.status(201).json({
      message: 'Teacher profile created successfully',
      teacher: {
        id: newTeacher._id,
        name: newTeacher.name,
        email: newTeacher.email
      }
    });
  } catch (error) {
    console.error('Error creating teacher profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get teacher profile
export const getTeacherProfile = async (req, res) => {
  try {
    // For simplicity, we'll fetch the first teacher. 
    // In a real app, you'd use authentication to get the specific teacher
    const teacher = await Teacher.findOne().select('-__v');

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher profile not found' });
    }

    res.status(200).json(teacher);
  } catch (error) {
    console.error('Error fetching teacher profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update teacher profile
export const updateTeacherProfile = async (req, res) => {
  try {
    // For simplicity, we'll update the first teacher. 
    // In a real app, you'd use authentication to update the specific teacher
    const { name, email, phone, address, qualification } = req.body;

    const teacher = await Teacher.findOne();

    if (!teacher) {
      return res.status(404).json({ message: 'Teacher profile not found' });
    }

    // Update fields
    teacher.name = name || teacher.name;
    teacher.email = email || teacher.email;
    teacher.phone = phone || teacher.phone;
    teacher.address = address || teacher.address;
    teacher.qualification = qualification || teacher.qualification;

    await teacher.save();

    res.status(200).json({
      message: 'Teacher profile updated successfully',
      teacher: {
        id: teacher._id,
        name: teacher.name,
        email: teacher.email
      }
    });
  } catch (error) {
    console.error('Error updating teacher profile:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};