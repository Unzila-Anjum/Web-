import express from "express";
import {
  addCourse,
  updateCourse,
  deleteCourse,
  searchCourse,
  getAllCourses,

} from "../controllers/courseController2.js";

const router = express.Router();

// Route to add a new course
router.post('/add', async (req, res) => {
  const {
    code,
    name,
    prerequisites,
    department,
    semester,
    lectureCreditHours,
    labCreditHours,
  } = req.body;

  try {
    // Create and save the new course with prerequisites
    const newCourse = new Course({
      code,
      name,
      prerequisites,  // Save prerequisites as entered (no validation)
      department,
      semester,
      lectureCreditHours,
      labCreditHours,
    });

    await newCourse.save();
    res.status(200).json({ message: 'Course added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error adding course' });
  }
});

// Route to update an existing course
router.put('/update/:id', async (req, res) => {
  const courseId = req.params.id;
  const {
    code,
    name,
    prerequisites,
    department,
    semester,
    lectureCreditHours,
    labCreditHours,
  } = req.body;

  try {
    // Update the course with new data
    const updatedCourse = await Course.findByIdAndUpdate(courseId, {
      code,
      name,
      prerequisites,  // Save prerequisites as entered
      department,
      semester,
      lectureCreditHours,
      labCreditHours,
    }, { new: true });

    res.status(200).json({ message: 'Course updated successfully', course: updatedCourse });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating course' });
  }
});
router.delete("/delete/:courseId", deleteCourse); // Delete a course by ID
router.get("/search", searchCourse); // Search courses with filters
router.get("/courses", getAllCourses); // Fetch all courses
// In your courses route handler
router.get('/semesters', (req, res) => {
  const semesters = ["Fall", "Spring", "Summer"]; // Use your actual enum values here
  res.json({ semesters });
});
router.get('/departments', (req, res) => {
  const departments = [
    'Software Engineering',
    'Computer Science',
    'Cyber Security',
    'Data Science',
    'Artificial Intelligence',
    'BBA',
    'BS Ba',
    'Accounting and Finance',
    'Electrical Engineering',
  ];
  res.json({ departments });
});
export default router;
