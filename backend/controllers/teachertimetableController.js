import Course from '../models/courseSchema.js'; // Assuming this is the path to the Course model
import Timetable from '../models/teacherTimetableSchema.js'; // Path to the Timetable model

// Fetch all available courses
export const getAllCourses = async (req, res, next) => {
  try {
    const courses = await Course.find(); // Fetch all courses
    res.status(200).json({
      success: true,
      courses,
    });
  } catch (err) {
    next(err);
  }
};

// Create a new timetable
export const createTimetable = async (req, res, next) => {
  const { course, department, day, startTime, endTime, professor } = req.body;

  try {
    if (!course || !department || !day || !startTime || !endTime || !professor) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const newTimetable = await Timetable.create({
      course,
      department,
      day,
      startTime,
      endTime,
      professor,
    });

    res.status(201).json({
      success: true,
      message: "Timetable created successfully!",
      timetable: newTimetable,
    });
  } catch (err) {
    next(err);
  }
};
export const addTimetable = async (req, res) => {
  try {
    const newTimetable = new Timetable(req.body);
    await newTimetable.save();
    res.status(201).json({ message: 'Timetable added successfully!', data: newTimetable });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding timetable', error: error.message });
  }
};
// Edit an existing timetable by ID
export const editTimetable = async (req, res, next) => {
  const { id } = req.params; // Get timetable ID from URL parameter
  const { course, department, day, startTime, endTime, professor } = req.body; // Get updated timetable data from the request body

  try {
    // Find timetable by ID and check if it exists
    const timetable = await Timetable.findById(id);
    
    if (!timetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    // Update timetable fields
    timetable.course = course || timetable.course;
    timetable.department = department || timetable.department;
    timetable.day = day || timetable.day;
    timetable.startTime = startTime || timetable.startTime;
    timetable.endTime = endTime || timetable.endTime;
    timetable.professor = professor || timetable.professor;

    // Save updated timetable to the database
    await timetable.save();

    res.status(200).json({
      success: true,
      message: 'Timetable updated successfully!',
      timetable,
    });
  } catch (err) {
    next(err);
  }
};

// Update timetable by ID (alternative approach using Mongoose's findByIdAndUpdate)
export const updateTimetable = async (req, res, next) => {
  const { id } = req.params; // Get timetable ID from URL parameter
  const { course, department, day, startTime, endTime, professor } = req.body; // Get updated timetable data from the request body

  try {
    // Find timetable by ID and update it directly in one operation
    const updatedTimetable = await Timetable.findByIdAndUpdate(
      id,
      { course, department, day, startTime, endTime, professor },
      { new: true } // Return the updated document after the update
    );

    if (!updatedTimetable) {
      return res.status(404).json({ message: 'Timetable not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Timetable updated successfully!',
      timetable: updatedTimetable,
    });
  } catch (err) {
    next(err);
  }
};
