import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import {
  GradingPageContainer,
  SidebarContainer,
  MainContent,
  GradingTable,
  TableHead,
  TableRow,
  TableCell,
  Input,
  Button,
  ErrorText,
  AddRemoveButtonContainer,
  AddRemoveButton,
} from '../../styles/GradingStyles';

const Grading = () => {
  const [students, setStudents] = useState([]);
  const [grades, setGrades] = useState([]);
  const [error, setError] = useState(null);
  const [totalMarks, setTotalMarks] = useState({
    assignments: {},
    quizzes: {},
    exams: {},
    total: 0,
  });

  // Fetch student data and existing grades
  useEffect(() => {
    const fetchStudentsAndGrades = async () => {
      try {
        // Fetch students
        const studentsResponse = await axios.get('http://localhost:4000/api/v1/admin/students/students');
        console.log("Students Response:", studentsResponse);  // Log the students response

        if (studentsResponse.data && studentsResponse.data.students && Array.isArray(studentsResponse.data.students)) {
          setStudents(studentsResponse.data.students);
          
          // Fetch existing grades
          const gradesResponse = await axios.get("http://localhost:4000/api/v1/grade");
          console.log("Grades Response:", gradesResponse);  // Log the grades response

          // Ensure grades data is in expected format
          if (gradesResponse.data && gradesResponse.data.grades && Array.isArray(gradesResponse.data.grades)) {
            // Create a map of existing grades by student ID
            const existingGradesMap = gradesResponse.data.grades.reduce((acc, grade) => {
              acc[grade.studentId._id] = grade;
              return acc;
            }, {});

            // Initialize grades state with student names, registration numbers, and existing or empty marks
            const initialGrades = studentsResponse.data.students.map(student => {
              const existingStudentGrade = existingGradesMap[student._id] || {};
              
              return {
                studentId: student._id,
                name: student.name,
                registrationNumber: student.registrationNumber,
                marks: {
                  assignments: existingStudentGrade.assignments?.length > 0 
                    ? existingStudentGrade.assignments 
                    : [0],  // Set marks to 0 if no grades are found
                  quizzes: existingStudentGrade.quizzes?.length > 0 
                    ? existingStudentGrade.quizzes 
                    : [0],  // Set marks to 0 if no grades are found
                  exams: existingStudentGrade.exams?.length > 0 
                    ? existingStudentGrade.exams 
                    : [0],  // Set marks to 0 if no grades are found
                },
              };
            });

            setGrades(initialGrades);
            
            // Initialize total marks
            const initialTotalMarks = {
              assignments: {},
              quizzes: {},
              exams: {},
              total: 0,
            };

            // Populate total marks from existing grades or set defaults
            initialGrades.forEach(grade => {
              Object.keys(grade.marks).forEach(field => {
                grade.marks[field].forEach((_, index) => {
                  if (existingGradesMap[grade.studentId]?.totalMarks?.[field]?.[index]) {
                    initialTotalMarks[field][index] = existingGradesMap[grade.studentId].totalMarks[field][index];
                  } else {
                    initialTotalMarks[field][index] = 0;
                  }
                });
              });
            });

            setTotalMarks(initialTotalMarks);
          } else {
            console.error("Grades data not in expected format", gradesResponse.data);
            setError('Failed to fetch grades or grades data is malformed');
          }
        } else {
          console.error("Students data not in expected format", studentsResponse.data);
          setError('Failed to fetch students or students data is malformed');
        }
      } catch (error) {
        console.error("Error fetching students or grades:", error); // Log the error
        setError('Failed to fetch students or grades');
      }
    };

    fetchStudentsAndGrades();
  }, []);

  // Handle change in marks (assignments, quizzes, exams)
  const handleMarksChange = (studentId, field, index, value) => {
    const numericValue = Math.max(0, Number(value));
    
    setGrades(prevGrades => prevGrades.map(grade =>
      grade.studentId === studentId ? {
        ...grade,
        marks: {
          ...grade.marks,
          [field]: grade.marks[field].map((mark, i) =>
            i === index ? numericValue : mark
          )
        }
      } : grade
    ));
  };

  // Add a new field (assignment, quiz, or exam) for all students
  const addField = (field) => {
    const newIndex = grades[0].marks[field].length;
    
    setGrades(prevGrades => prevGrades.map(grade => ({
      ...grade,
      marks: {
        ...grade.marks,
        [field]: [...grade.marks[field], 0]
      }
    })));

    // Initialize total marks for the new field
    setTotalMarks(prevTotalMarks => ({
      ...prevTotalMarks,
      [field]: {
        ...prevTotalMarks[field],
        [newIndex]: 0
      }
    }));
  };

  // Remove a field (assignment, quiz, or exam) for all students
  const removeField = (field, index) => {
    setGrades(prevGrades => prevGrades.map(grade => ({
      ...grade,
      marks: {
        ...grade.marks,
        [field]: grade.marks[field].filter((_, i) => i !== index)
      }
    })));

    // Remove the total marks for this specific field
    setTotalMarks(prevTotalMarks => {
      const newTotalMarks = { ...prevTotalMarks };
      delete newTotalMarks[field][index];
      return newTotalMarks;
    });
  };

  // Handle total marks change for each specific field
  const handleTotalMarksChange = (field, index, value) => {
    const numericValue = Math.max(0, Number(value));
    
    setTotalMarks(prevMarks => {
      const updatedMarks = {
        ...prevMarks,
        [field]: {
          ...prevMarks[field],
          [index]: numericValue,
        }
      };

      // Calculate the new total of all fields
      const totalOfFields = 
        Object.values(updatedMarks.assignments).reduce((a, b) => a + b, 0) +
        Object.values(updatedMarks.quizzes).reduce((a, b) => a + b, 0) +
        Object.values(updatedMarks.exams).reduce((a, b) => a + b, 0);

      updatedMarks.total = totalOfFields;

      return updatedMarks;
    });
  };

  // Calculate total marks for a specific student
  const calculateStudentTotal = (grade) => {
    const assignmentTotal = grade.marks.assignments.reduce((a, b) => a + b, 0);
    const quizTotal = grade.marks.quizzes.reduce((a, b) => a + b, 0);
    const examTotal = grade.marks.exams.reduce((a, b) => a + b, 0);
    return assignmentTotal + quizTotal + examTotal;
  };

  // Save grades to the server
  const saveMarks = async () => {
    setError(null);

    // Check for negative marks
    const hasNegativeMarks = grades.some(grade => 
      [...grade.marks.assignments, ...grade.marks.quizzes, ...grade.marks.exams].some(mark => mark < 0)
    );

    // Check if total marks are correctly set
    const hasMissingTotalMarks = 
      Object.values(totalMarks.assignments).some(val => val === 0) ||
      Object.values(totalMarks.quizzes).some(val => val === 0) ||
      Object.values(totalMarks.exams).some(val => val === 0);

    // Validate marks against total marks
    const hasExceedingMarks = grades.some(grade => {
      const assignmentExceeded = grade.marks.assignments.some((mark, index) => 
        mark > parseInt(totalMarks.assignments[index] || 0)
      );
      const quizExceeded = grade.marks.quizzes.some((mark, index) => 
        mark > parseInt(totalMarks.quizzes[index] || 0)
      );
      const examExceeded = grade.marks.exams.some((mark, index) => 
        mark > parseInt(totalMarks.exams[index] || 0)
      );
      return assignmentExceeded || quizExceeded || examExceeded;
    });

    // Prevent saving if there are negative marks or other validation issues
    if (hasNegativeMarks) {
      setError('Error: Negative marks are not allowed.');
      return;
    }

    if (hasMissingTotalMarks) {
      setError('Error: Please set total marks for all categories.');
      return;
    }

    if (hasExceedingMarks) {
      setError('Error: Marks cannot exceed total marks for each category.');
      return;
    }

    try {
      const payload = grades.map(({ studentId, marks }) => ({
        studentId,
        assignments: marks.assignments,
        quizzes: marks.quizzes,
        exams: marks.exams,
      }));

      await axios.post('http://localhost:4000/api/v1/grade/grades', { 
        grades: payload,
        totalMarks: totalMarks 
      });
      alert('Marks saved successfully!');
    } catch (error) {
      console.error('Error saving marks:', error);
      setError('Failed to save marks');
    }
  };

  return (
    <GradingPageContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <MainContent>
        <h1>Grading System</h1>
        {error && <ErrorText style={{ color: 'red', marginBottom: '10px' }}>{error}</ErrorText>}

        {/* Buttons for Adding Assignments, Quizzes, and Exams */}
        <AddRemoveButtonContainer>
          <AddRemoveButton onClick={() => addField('assignments')}>Add Assignment</AddRemoveButton>
          <AddRemoveButton onClick={() => addField('quizzes')}>Add Quiz</AddRemoveButton>
          <AddRemoveButton onClick={() => addField('exams')}>Add Exam</AddRemoveButton>
        </AddRemoveButtonContainer>

        <GradingTable>
          <thead>
            {/* Header Row */}
            <TableRow>
              <TableHead>Registration Number</TableHead>
              <TableHead>Student Name</TableHead>
              {grades[0]?.marks?.assignments?.map((_, index) => (
                <TableHead key={index}>
                  Assignment {index + 1}
                  <span
                    style={{ fontSize: '12px', color: 'black', cursor: 'pointer', marginLeft: '5px' }}
                    onClick={() => removeField('assignments', index)}
                  >
                    Remove
                  </span>
                </TableHead>
              ))}
              {grades[0]?.marks?.quizzes?.map((_, index) => (
                <TableHead key={index}>
                  Quiz {index + 1}
                  <span
                    style={{ fontSize: '12px', color: 'black', cursor: 'pointer', marginLeft: '5px' }}
                    onClick={() => removeField('quizzes', index)}
                  >
                    Remove
                  </span>
                </TableHead>
              ))}
              {grades[0]?.marks?.exams?.map((_, index) => (
                <TableHead key={index}>
                  Exam {index + 1}
                  <span
                    style={{ fontSize: '12px', color: 'black', cursor: 'pointer', marginLeft: '5px' }}
                    onClick={() => removeField('exams', index)}
                  >
                    Remove
                  </span>
                </TableHead>
              ))}
              <TableHead>Total</TableHead>
            </TableRow>

            {/* Total Marks Row */}
            <TableRow>
              <TableCell></TableCell> {/* Empty cell for spacing */}
              <TableCell>Total Marks</TableCell>
              {grades[0]?.marks?.assignments?.map((_, index) => (
                <TableCell key={`total-assignment-${index}`}>
                  <Input
                    type="number"
                    value={totalMarks.assignments[index] || ''}
                    onChange={(e) => handleTotalMarksChange('assignments', index, e.target.value)}
                    placeholder="Total"
                  />
                </TableCell>
              ))}
              {grades[0]?.marks?.quizzes?.map((_, index) => (
                <TableCell key={`total-quiz-${index}`}>
                  <Input
                    type="number"
                    value={totalMarks.quizzes[index] || ''}
                    onChange={(e) => handleTotalMarksChange('quizzes', index, e.target.value)}
                    placeholder="Total"
                  />
                </TableCell>
              ))}
              {grades[0]?.marks?.exams?.map((_, index) => (
                <TableCell key={`total-exam-${index}`}>
                  <Input
                    type="number"
                    value={totalMarks.exams[index] || ''}
                    onChange={(e) => handleTotalMarksChange('exams', index, e.target.value)}
                    placeholder="Total"
                  />
                </TableCell>
              ))}
              <TableCell>{totalMarks.total}</TableCell>
            </TableRow>
          </thead>
          <tbody>
            {grades.map((grade) => (
              <TableRow key={grade.studentId}>
                <TableCell>{grade.registrationNumber}</TableCell>
                <TableCell>{grade.name}</TableCell>
                {grade.marks.assignments.map((mark, index) => (
                  <TableCell key={`assignment-${index}`}>
                    <Input
                      type="number"
                      value={mark}
                      onChange={(e) => handleMarksChange(grade.studentId, 'assignments', index, e.target.value)}
                    />
                  </TableCell>
                ))}
                {grade.marks.quizzes.map((mark, index) => (
                  <TableCell key={`quiz-${index}`}>
                    <Input
                      type="number"
                      value={mark}
                      onChange={(e) => handleMarksChange(grade.studentId, 'quizzes', index, e.target.value)}
                    />
                  </TableCell>
                ))}
                {grade.marks.exams.map((mark, index) => (
                  <TableCell key={`exam-${index}`}>
                    <Input
                      type="number"
                      value={mark}
                      onChange={(e) => handleMarksChange(grade.studentId, 'exams', index, e.target.value)}
                    />
                  </TableCell>
                ))}
                <TableCell>{calculateStudentTotal(grade)}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </GradingTable>

        <Button onClick={saveMarks}>Save Marks</Button>
      </MainContent>
    </GradingPageContainer>
  );
};

export default Grading;
