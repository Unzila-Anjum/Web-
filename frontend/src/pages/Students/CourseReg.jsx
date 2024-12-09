import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  CourseContainer,
  SidebarContainer,
  Content,
  CourseContent,
  CourseHeader,
  SearchInput,
  Table,
  TableHeader,
  TableRow,
  TableData,
  ButtonGroup,
  ActionButton,
  DeleteButton,
  CheckboxInput,
  LoadingMessage,
  ErrorMessage,
  NoDataMessage
} from '../../styles/courseRegStyles';

const CourseRegistration = ({ studentId = "22I2402" }) => {
  const [courses, setCourses] = useState([]);
  const [registeredCourses, setRegisteredCourses] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState({});
  const [section, setSection] = useState("A");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/courses/courses");
      setCourses(response.data.courses);
      setLoading(false);
    } catch (error) {
      setError("Error fetching courses: " + error.message);
      setLoading(false);
    }
  };

  const fetchRegisteredCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/courses/registration/${studentId}`);
      setRegisteredCourses(response.data.registeredCourses || []);
    } catch (error) {
      setError("Error fetching registered courses: " + error.message);
      setRegisteredCourses([]);
    }
  };

  const handleRegister = async () => {
    const selectedCourseIds = Object.keys(selectedCourses).filter((id) => selectedCourses[id]);

    if (selectedCourseIds.length === 0) {
      setError("Please select at least one course to register.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/v1/courses/register", {
        studentId,
        selectedCourses: selectedCourseIds.map((courseId) => ({
          courseId,
          section,
        })),
      });
      
      setSelectedCourses({});
      fetchRegisteredCourses();
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error registering courses");
    }
  };

  const handleDeleteRegistration = async () => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/courses/registration/${studentId}`);
      setRegisteredCourses([]);
      setError(null);
    } catch (error) {
      setError(error.response?.data?.message || "Error deleting registration");
    }
  };

  const handleUpdateRegistration = async () => {
    try {
      const [availableCourses, registeredCoursesResponse] = await Promise.all([
        axios.get("http://localhost:4000/api/v1/courses/courses"),
        axios.get(`http://localhost:4000/api/v1/courses/registration/${studentId}`)
      ]);

      setCourses(availableCourses.data.courses);
      setSelectedCourses(
        registeredCoursesResponse.data.registeredCourses.reduce((acc, course) => {
          acc[course.courseId] = true;
          return acc;
        }, {})
      );
      setError(null);
    } catch (error) {
      setError("Error fetching courses or registration data");
    }
  };

  
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <CourseContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <CourseContent>
          <CourseHeader>Course Registration</CourseHeader>
          
          <ButtonGroup>
            <ActionButton onClick={fetchRegisteredCourses}>
              Show Registered Courses
            </ActionButton>
            <ActionButton onClick={handleUpdateRegistration}>
              Update Registration
            </ActionButton>
            <DeleteButton onClick={handleDeleteRegistration}>
              Delete Registration
            </DeleteButton>
          </ButtonGroup>

          {courses.length > 0 && (
            <>
              <h3>Available Courses</h3>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Select</TableHeader>
                    <TableHeader>Course Code</TableHeader>
                    <TableHeader>Course Name</TableHeader>
                    <TableHeader>Prerequisites</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {courses.map((course) => (
                    <TableRow key={course._id}>
                      <TableData>
                        <CheckboxInput
                          type="checkbox"
                          checked={!!selectedCourses[course._id]}
                          onChange={() => setSelectedCourses(prev => ({
                            ...prev,
                            [course._id]: !prev[course._id]
                          }))}
                        />
                      </TableData>
                      <TableData>{course.code}</TableData>
                      <TableData>{course.name}</TableData>
                      <TableData>
                        {course.prerequisites
                          .map((prerequisite) => prerequisite.name)
                          .join(", ") || "None"}
                      </TableData>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
              <ActionButton onClick={handleRegister}>
                Save Registration
              </ActionButton>
            </>
          )}

          {registeredCourses.length > 0 && (
            <>
              <h3>Registered Courses</h3>
              <Table>
                <thead>
                  <TableRow>
                    <TableHeader>Course Code</TableHeader>
                    <TableHeader>Course Name</TableHeader>
                    <TableHeader>Section</TableHeader>
                  </TableRow>
                </thead>
                <tbody>
                  {registeredCourses.map((registered) => (
                    <TableRow key={registered.courseId}>
                      <TableData>{registered.courseCode}</TableData>
                      <TableData>{registered.courseName}</TableData>
                      <TableData>{registered.section}</TableData>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </>
          )}

          {registeredCourses.length === 0 && courses.length === 0 && (
            <NoDataMessage>No courses registered or available for selection.</NoDataMessage>
          )}
        </CourseContent>
      </Content>
    </CourseContainer>
  );
};

export default CourseRegistration;