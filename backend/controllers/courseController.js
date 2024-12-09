import Course from "../models/courseSchema.js";

// Add a new course
export const addCourse = async (req, res) => {
    const { code, name, prerequisites, department, semester, lectureCreditHours, labCreditHours } = req.body;

    try {
        // Parse credit hours
        const lectureCreditHoursNum = parseFloat(lectureCreditHours);
        const labCreditHoursNum = parseFloat(labCreditHours);

        if (isNaN(lectureCreditHoursNum) || isNaN(labCreditHoursNum)) {
            return res.status(400).json({ message: "Invalid credit hours, must be a number" });
        }

        if (lectureCreditHoursNum < 1 || lectureCreditHoursNum > 3 || labCreditHoursNum < 0 || labCreditHoursNum > 1) {
            return res.status(400).json({ message: "Invalid credit hours range" });
        }

        // Handle prerequisites
        let prerequisiteCourses = [];
        if (prerequisites) {
            const prerequisiteCodes = prerequisites.split(",").map(prereq => prereq.trim());

            // Check if all prerequisite courses exist in the database
            prerequisiteCourses = await Course.find({ code: { $in: prerequisiteCodes } }).select("_id code");

            // Find missing prerequisite courses
            const missingCodes = prerequisiteCodes.filter(
                code => !prerequisiteCourses.some(course => course.code === code)
            );

            if (missingCodes.length > 0) {
                return res.status(404).json({ message: `Prerequisite courses not found: ${missingCodes.join(", ")}` });
            }
        }

        // Create the new course
        const newCourse = new Course({
            code,
            name,
            prerequisites: prerequisiteCourses.map(course => course._id),
            department,
            semester,
            lectureCreditHours: lectureCreditHoursNum,
            labCreditHours: labCreditHoursNum,
        });

        await newCourse.save();
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        console.error("Error adding course:", error.message);
        res.status(500).json({ message: "Error adding course" });
    }
};

// Update a course
export const updateCourse = async (req, res) => {
    const { courseId } = req.params;
    const { code, name, prerequisites, department, semester, lectureCreditHours, labCreditHours } = req.body;

    try {
        // Validate credit hours
        if (lectureCreditHours < 1 || lectureCreditHours > 3 || labCreditHours < 0 || labCreditHours > 1) {
            return res.status(400).json({ message: "Invalid credit hours" });
        }

        // Handle prerequisites as an array
        let prerequisiteCourses = [];
        if (prerequisites) {
            const prerequisiteCodes = prerequisites.split(",");
            prerequisiteCourses = await Course.find({ code: { $in: prerequisiteCodes } }).select("_id code");

            // Find missing prerequisite courses
            const missingCodes = prerequisiteCodes.filter(
                code => !prerequisiteCourses.some(course => course.code === code)
            );

            if (missingCodes.length > 0) {
                return res.status(404).json({ message: `Prerequisite courses not found: ${missingCodes.join(", ")}` });
            }
        }

        // Update the course in the database
        const updatedCourse = await Course.findByIdAndUpdate(
            courseId,
            {
                code,
                name,
                prerequisites: prerequisiteCourses.map((course) => course._id),
                department,
                semester,
                lectureCreditHours,
                labCreditHours,
            },
            { new: true }
        );

        // If course not found
        if (!updatedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        // Respond with updated course
        res.status(200).json({ message: "Course updated successfully", course: updatedCourse });
    } catch (error) {
        console.error("Error updating course:", error.message);
        res.status(500).json({ message: "Error updating course" });
    }
};

// Delete a course
export const deleteCourse = async (req, res) => {
    const { courseId } = req.params;

    try {
        const deletedCourse = await Course.findByIdAndDelete(courseId);

        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        console.error("Error deleting course:", error.message);
        res.status(500).json({ message: "Error deleting course" });
    }
};

// Get all courses
export const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate("prerequisites", "code name");

        res.status(200).json({ courses });
    } catch (error) {
        console.error("Error fetching courses:", error.message);
        res.status(500).json({ message: "Error fetching courses" });
    }
};

// Search courses
export const searchCourse = async (req, res) => {
    try {
        const { code, name, department, semester, minLectureHours, maxLectureHours, minLabHours, maxLabHours } = req.query;

        // Build a dynamic query object
        const query = {};

        if (code) {
            query.code = { $regex: code, $options: "i" }; // Case-insensitive search
        }

        if (name) {
            query.name = { $regex: name, $options: "i" }; // Case-insensitive search
        }

        if (department) {
            query.department = { $regex: department, $options: "i" }; // Case-insensitive search
        }

        if (semester) {
            query.semester = semester;
        }

        if (minLectureHours || maxLectureHours) {
            query.lectureCreditHours = {};
            if (minLectureHours) query.lectureCreditHours.$gte = parseInt(minLectureHours);
            if (maxLectureHours) query.lectureCreditHours.$lte = parseInt(maxLectureHours);
        }

        if (minLabHours || maxLabHours) {
            query.labCreditHours = {};
            if (minLabHours) query.labCreditHours.$gte = parseInt(minLabHours);
            if (maxLabHours) query.labCreditHours.$lte = parseInt(maxLabHours);
        }

        // Execute the query
        const courses = await Course.find(query).populate("prerequisites", "code name");

        if (courses.length === 0) {
            return res.status(404).json({ message: "No courses found matching the criteria" });
        }

        res.status(200).json({ courses });
    } catch (error) {
        console.error("Error searching for courses:", error.message);
        res.status(500).json({ message: "Error searching for courses" });
    }
};
