import Feedback from '../models/Feedback.js';

export const createFeedback = async (req, res) => {
    console.log('Received feedback submission request');
    try {
      console.log('Request body:', req.body);  // Log the request body
  
      const feedback = new Feedback(req.body);
      await feedback.save();
      res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error('Error creating feedback:', error.message);
      res.status(400).json({ error: error.message });
    }
  };
  
  
  

// Get all feedback
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update feedback
export const updateFeedback = async (req, res) => {
  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedFeedback);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete feedback
export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
