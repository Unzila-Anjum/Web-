import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../pages/Teachers/Sidebar.jsx';
import {
    FeedbackContainer,
    Content,
    FeedbackHeader,
    FeedbackCard,
    FeedbackCardTitle,
    FeedbackCardContent,
    
  } from '../styles/teacherFeedbackStyles.js'; // Import styled components
const TeacherPanel = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const questions = [
    'The instructor explained complex topics clearly and effectively.',
    'The instructor was approachable and available for questions or support outside of class.',
    'The instructor encouraged student participation and discussions during class.',
    'The instructor effectively used technology and online platforms to enhance learning.',
    'The instructor clearly communicated expectations for assignments and exams.',
    'The instructor provided timely and constructive feedback on assignments and exams.',
  ];

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const { data } = await axios.get('http://localhost:4000/api/feedbacks');
        console.log('Fetched Feedbacks:', data); // Debugging log
        setFeedbacks(data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error.response?.data?.error || error.message);
        alert('Error fetching feedbacks');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <FeedbackContainer>
       <Sidebar />
      <Content>
        <FeedbackHeader>Teacher Feedback Review</FeedbackHeader>
        {feedbacks.length === 0 ? (
          <p>No feedback available</p>
        ) : (
          feedbacks.map((feedback) => (
            <FeedbackCard key={feedback._id}>
              <FeedbackCardTitle>Feedback</FeedbackCardTitle>
              <FeedbackCardContent>
                <ul>
                  {questions.map((question, i) => (
                    <li key={i}>
                      <strong>{question}</strong>
                      <br />
                      <strong>Answer:</strong> {feedback.questions?.[i] || 'No response provided'}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Additional Comments:</strong>{' '}
                  {feedback.additionalFeedback || 'No additional comments provided'}
                </p>
              </FeedbackCardContent>
            </FeedbackCard>
          ))
        )}
      </Content>
    </FeedbackContainer>
  );
};


export default TeacherPanel;
