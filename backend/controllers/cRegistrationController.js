import Course from "../models/courseSchema2.js";
import CourseRegistration from "../models/courseRegistrationSchema.js";

// Fetch all courses
export const fetchCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate("prerequisites", "code name");
    res.status(200).json({ courses });
  } catch (error) {
    console.error("Error fetching courses:", error.message);
    res.status(500).json({ message: "Error fetching courses" });
  }
};

// Register courses for a student
export const registerCourses = async (req, res) => {
  const { studentId, selectedCourses } = req.body;

  try {
    // Validate prerequisites
    const failedPrereqs = [];
    for (const course of selectedCourses) {
      const courseDetails = await Course.findById(course.courseId).populate("prerequisites");

      for (const prereq of courseDetails.prerequisites) {
        const isPrereqFailed = false; // Replace with actual logic
        if (isPrereqFailed) {
          failedPrereqs.push(courseDetails.code);
        }
      }
    }

    if (failedPrereqs.length > 0) {
      return res.status(400).json({
        message: `Failed prerequisites: ${failedPrereqs.join(", ")}`,
      });
    }

    // Prevent duplicate registration
    const existingRegistration = await CourseRegistration.findOne({ studentId });
    if (existingRegistration) {
      const existingCourses = existingRegistration.courses.map((c) => c.courseId.toString());
      const duplicateCourses = selectedCourses.filter((c) =>
        existingCourses.includes(c.courseId)
      );
      if (duplicateCourses.length > 0) {
        return res.status(400).json({
          message: `Duplicate registration: ${duplicateCourses.map((d) => d.courseId).join(", ")}`,
        });
      }
      // Append new courses
      existingRegistration.courses.push(...selectedCourses);
      await existingRegistration.save();
      return res.status(201).json({ message: "Courses registered successfully", existingRegistration });
    }

    // Save new registration
    const registration = new CourseRegistration({
      studentId,
      courses: selectedCourses,
    });

    await registration.save();
    res.status(201).json({ message: "Courses registered successfully", registration });
  } catch (error) {
    console.error("Error registering courses:", error.message);
    res.status(500).json({ message: "Error registering courses" });
  }
};

// Fetch registered courses
export const getCourseRegistration = async (req, res) => {
  const { studentId } = req.params;

  try {
    const registration = await CourseRegistration.findOne({ studentId }).populate("courses.courseId", "code name");

    if (!registration) {
      return res.status(404).json({ message: "No registered courses found" });
    }

    const registeredCourses = registration.courses.map((course) => ({
      courseId: course.courseId._id,
      courseCode: course.courseId.code,
      courseName: course.courseId.name,
      section: course.section,
    }));

    res.status(200).json({ registeredCourses });
  } catch (error) {
    console.error("Error fetching registration:", error.message);
    res.status(500).json({ message: "Error fetching registration" });
  }
};


export const deleteRegistration = async (req, res) => {
  const { studentId } = req.params;

  try {
    const deleted = await CourseRegistration.deleteOne({ studentId });
    if (deleted.deletedCount === 0) {
      return res.status(404).json({ message: "No registration found to delete" });
    }
    res.status(200).json({ message: "Registration deleted successfully" });
  } catch (error) {
    console.error("Error deleting registration:", error.message);
    res.status(500).json({ message: "Error deleting registration", error: error.message });
  }
};


export const updateRegistration = async (req, res) => {
  const { studentId, selectedCourses } = req.body;

  try {
    const existingRegistration = await CourseRegistration.findOne({ studentId });
    if (!existingRegistration) {
      return res.status(404).json({ message: "Registration not found" });
    }

    existingRegistration.courses = selectedCourses;
    await existingRegistration.save();

    res.status(200).json({ message: "Registration updated successfully", updatedRegistration: existingRegistration });
  } catch (error) {
    console.error("Error updating registration:", error.message);
    res.status(500).json({ message: "Error updating registration", error: error.message });
  }
};
