import mongoose from 'mongoose';  // Use ES6 import

// Define the course schema
const courseSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    prerequisites: [
      { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
    ],
    department: {
      type: String,
      required: true,
      enum: ['Software Engineering', 'Computer Science', 'Electrical Engineering', 'Cyber Security', 'Data Science', 'Artificial Intelligence', 'BBA', 'BS Ba', 'Accounting and Finance'],
    },
    semester: {
      type: String,
      required: true,
      enum: ['Fall', 'Spring', 'Summer'],
    },
   
    //isAvailable: { type: Boolean, default: true },
    lectureCreditHours: {
      type: Number,
      required: true,
      min: 1,
      max: 3,
    },
    labCreditHours: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

courseSchema.pre('save', async function(next) {
  if (this.isModified('prerequisites') && this.prerequisites.some(prereq => typeof prereq === 'string')) {
    const prereqs = await mongoose.model('Course').find({
      code: { $in: this.prerequisites }
    }).select('_id');
    this.prerequisites = prereqs.map(prereq => prereq._id);
  }
  next();
});


// Use export default to export the model
export default mongoose.model('Course', courseSchema);
