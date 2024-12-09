import React, { useState, useEffect } from 'react';
import Sidebar from '../pages/Students/Sidebar';
import axios from 'axios';
import {
  FeedbackContainer,
  SidebarContainer,
  Content,
  FeedbackContent,
  FeedbackHeader,
  FormGroup,
  Label,
  RatingGroup,
  RatingOption,
  TextArea,
  ActionButton,
  FeedbackCard,
  CardHeader,
  CardContent,
  ButtonGroup,
  EditButton,
  DeleteButton,
  LoadingMessage,
  ErrorMessage
} from '../styles/studentFeedbackStyles';

const StudentPanel = () => {
  const [responses, setResponses] = useState(['', '', '', '', '', '']);
  const [additionalFeedback, setAdditionalFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [editing, setEditing] = useState(null);
  const [updatedResponses, setUpdatedResponses] = useState([]);
  const [updatedComments, setUpdatedComments] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const questions = [
    'The instructor explained complex topics clearly and effectively.',
    'The instructor was approachable and available for questions or support outside of class.',
    'The instructor encouraged student participation and discussions during class.',
    'The instructor effectively used technology and online platforms to enhance learning.',
    'The instructor clearly communicated expectations for assignments and exams.',
    'The instructor provided timely and constructive feedback on assignments and exams.',
  ];

  const options = ['Strongly Agree', 'Agree', 'Neutral', 'Disagree', 'Strongly Disagree'];

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/feedbacks');
      setFeedbacks(data);
      setLoading(false);
    } catch (error) {
      setError(error.response?.data?.error || error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (responses.some(response => response === '')) {
      setError('Please answer all questions before submitting.');
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:4000/api/feedbacks', {
        questions: responses,
        additionalFeedback,
      });
      setFeedbacks([...feedbacks, data]);
      setResponses(['', '', '', '', '', '']);
      setAdditionalFeedback('');
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to submit feedback');
    }
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`http://localhost:4000/api/feedbacks/${id}`, {
        questions: updatedResponses,
        additionalFeedback: updatedComments,
      });
      
      const updatedFeedbacks = feedbacks.map((feedback) =>
        feedback._id === id
          ? { ...feedback, questions: updatedResponses, additionalFeedback: updatedComments }
          : feedback
      );
      
      setFeedbacks(updatedFeedbacks);
      setEditing(null);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to update feedback');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/feedbacks/${id}`);
      setFeedbacks(feedbacks.filter((feedback) => feedback._id !== id));
      setError(null);
    } catch (error) {
      setError(error.response?.data?.error || 'Failed to delete feedback');
    }
  };

  
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <FeedbackContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <FeedbackContent>
          <FeedbackHeader>Course Feedback</FeedbackHeader>

          <form onSubmit={handleSubmit}>
            {questions.map((question, index) => (
              <FormGroup key={index}>
                <Label>{question}</Label>
                <RatingGroup>
                  {options.map((option, i) => (
                    <RatingOption key={i}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        checked={responses[index] === option}
                        onChange={(e) => {
                          const newResponses = [...responses];
                          newResponses[index] = e.target.value;
                          setResponses(newResponses);
                        }}
                      />
                      <span>{option}</span>
                    </RatingOption>
                  ))}
                </RatingGroup>
              </FormGroup>
            ))}

            <FormGroup>
              <Label>Additional Comments:</Label>
              <TextArea
                value={additionalFeedback}
                onChange={(e) => setAdditionalFeedback(e.target.value)}
                placeholder="Enter your additional feedback here..."
              />
            </FormGroup>

            <ActionButton type="submit">Submit Feedback</ActionButton>
          </form>

          {feedbacks.map((feedback) => (
            <FeedbackCard key={feedback._id}>
              {editing === feedback._id ? (
                <>
                  {questions.map((question, index) => (
                    <FormGroup key={index}>
                      <Label>{question}</Label>
                      <RatingGroup>
                        {options.map((option, i) => (
                          <RatingOption key={i}>
                            <input
                              type="radio"
                              name={`edit-question-${index}`}
                              value={option}
                              checked={updatedResponses[index] === option}
                              onChange={(e) => {
                                const newResponses = [...updatedResponses];
                                newResponses[index] = e.target.value;
                                setUpdatedResponses(newResponses);
                              }}
                            />
                            <span>{option}</span>
                          </RatingOption>
                        ))}
                      </RatingGroup>
                    </FormGroup>
                  ))}

                  <FormGroup>
                    <Label>Additional Comments:</Label>
                    <TextArea
                      value={updatedComments}
                      onChange={(e) => setUpdatedComments(e.target.value)}
                    />
                  </FormGroup>

                  <ButtonGroup>
                    <ActionButton onClick={() => handleUpdate(feedback._id)}>
                      Save Changes
                    </ActionButton>
                    <ActionButton onClick={() => setEditing(null)}>
                      Cancel
                    </ActionButton>
                  </ButtonGroup>
                </>
              ) : (
                <>
                  <CardHeader>Feedback Summary</CardHeader>
                  <CardContent>
                    {questions.map((question, i) => (
                      <div key={i}>
                        <strong>Question {i + 1}:</strong> {feedback.questions[i]}
                      </div>
                    ))}
                    <div>
                      <strong>Additional Comments:</strong> {feedback.additionalFeedback}
                    </div>
                  </CardContent>
                  <ButtonGroup>
                    <EditButton
                      onClick={() => {
                        setEditing(feedback._id);
                        setUpdatedResponses([...feedback.questions]);
                        setUpdatedComments(feedback.additionalFeedback);
                      }}
                    >
                      Edit
                    </EditButton>
                    <DeleteButton onClick={() => handleDelete(feedback._id)}>
                      Delete
                    </DeleteButton>
                  </ButtonGroup>
                </>
              )}
            </FeedbackCard>
          ))}
        </FeedbackContent>
      </Content>
    </FeedbackContainer>
  );
};

export default StudentPanel;