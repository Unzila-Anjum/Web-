import Timetable from "../models/AdminTimetableSchema.js"; // Path to the Timetable model

// Fetch all timetable entries
export const getTimetable = async (req, res, next) => {
    try {
      const timetable = await Timetable.find().populate('course'); // Populate course details
      res.status(200).json({
        success: true,
        timetable,
      });
    } catch (err) {
      next(err);
    }
  };
  
