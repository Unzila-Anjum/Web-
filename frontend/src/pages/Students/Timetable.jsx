import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import {
  TimetableContainer,
  SidebarContainer,
  Content,
  TimetableContent,
  TimetableHeader,
  SearchInput,
  Table,
  TableHeader,
  TableRow,
  TableData,
  DayCell,
  DeleteButton,
  TimeSlotCell,
  FormWrapper,
  FormGroup,
  Label,
  Select,
  Button,
  LoadingMessage,
  ErrorMessage
} from '../../styles/TimetableStylesS';

const TimetablePage = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    course: "",
    department: "",
    day: "",
    startTime: "",
    endTime: "",
    id: "",
  });
  const [timetable, setTimetable] = useState([
    { day: "Monday", times: Array(9).fill(null) },
    { day: "Tuesday", times: Array(9).fill(null) },
    { day: "Wednesday", times: Array(9).fill(null) },
    { day: "Thursday", times: Array(9).fill(null) },
    { day: "Friday", times: Array(9).fill(null) },
  ]);
  
  const [searchFilter, setSearchFilter] = useState({
    course: "",
    department: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/timetable/courses");
      setCourses(response.data.courses || []);
      setLoading(false);
    } catch (error) {
      setError("Error fetching courses: " + error.message);
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.course || !formData.department || !formData.day || !formData.startTime || !formData.endTime) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const selectedCourse = courses.find((course) => course._id === formData.course);
      const courseName = selectedCourse ? selectedCourse.name : "";
      const timetableData = { ...formData, courseName };

      if (formData.id) {
        await axios.put(`http://localhost:4000/api/v1/timetable/${formData.id}`, timetableData);
      } else {
        await axios.post("http://localhost:4000/api/v1/timetable/", timetableData);
      }

      setTimetable((prevTimetable) => {
        const updatedTimetable = [...prevTimetable];
        const dayIndex = updatedTimetable.findIndex((item) => item.day === formData.day);
        if (dayIndex !== -1) {
          const timeIndex = convertTimeToSlot(formData.startTime);
          updatedTimetable[dayIndex].times[timeIndex] = {
            course: courseName,
            department: formData.department,
            startTime: formData.startTime,
            endTime: formData.endTime,
          };
        }
        return updatedTimetable;
      });

      setFormData({
        course: "",
        department: "",
        day: "",
        startTime: "",
        endTime: "",
        id: "",
      });
    } catch (error) {
      setError("Error adding/updating timetable: " + error.message);
    }
  };

  const convertTimeToSlot = (time) => {
    const times = [
      "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
      "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];
    return times.indexOf(time);
  };

  const handleDoubleClick = async (day, slotIndex) => {
    const currentSlot = timetable.find((item) => item.day === day)?.times[slotIndex];
    
    if (currentSlot) {
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/timetable/${currentSlot.id}`);
        setFormData({
          ...response.data,
          day: day,
          id: response.data._id,
        });
      } catch (error) {
        setError("Error fetching slot data: " + error.message);
      }
    } else {
      setFormData({
        course: "",
        department: "",
        day,
        startTime: "",
        endTime: "",
        id: "",
      });
    }
  };

  const handleDelete = async (day, slotIndex) => {
    const selectedSlot = timetable.find((item) => item.day === day)?.times[slotIndex];
    
    if (selectedSlot?.id) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/timetables/${selectedSlot.id}`);
        setTimetable((prevTimetable) => {
          const updatedTimetable = [...prevTimetable];
          updatedTimetable.find((item) => item.day === day).times[slotIndex] = null;
          return updatedTimetable;
        });
      } catch (error) {
        setError("Error deleting timetable: " + error.message);
      }
    }
  };

  
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  const timeSlots = [
    "8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM",
    "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM",
    "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"
  ];

  return (
    <TimetableContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <TimetableContent>
          <TimetableHeader>Class Timetable</TimetableHeader>
          
          <FormWrapper onSubmit={handleSubmit}>
            <FormGroup>
              <Label>Search Course:</Label>
              <SearchInput
                type="text"
                value={searchFilter.course}
                onChange={(e) => setSearchFilter({ ...searchFilter, course: e.target.value })}
                placeholder="Search by course name"
              />
            </FormGroup>
            <FormGroup>
              <Label>Search Department:</Label>
              <SearchInput
                type="text"
                value={searchFilter.department}
                onChange={(e) => setSearchFilter({ ...searchFilter, department: e.target.value })}
                placeholder="Search by department"
              />
            </FormGroup>
          </FormWrapper>

          <Table>
            <thead>
              <TableRow>
                <TableHeader>Day / Time</TableHeader>
                {timeSlots.map((time) => (
                  <TableHeader key={time}>{time}</TableHeader>
                ))}
              </TableRow>
            </thead>
            <tbody>
              {timetable.map((day) => (
                <TableRow key={day.day}>
                  <DayCell>{day.day}</DayCell>
                  {day.times.map((slot, index) => (
                    <TimeSlotCell
                      key={index}
                      onDoubleClick={() => handleDoubleClick(day.day, index)}
                      hasContent={!!slot}
                    >
                      {slot && (
                        <>
                          <div>{`${slot.course} (${slot.department})`}</div>
                          <DeleteButton onClick={() => handleDelete(day.day, index)}>
                            Delete
                          </DeleteButton>
                        </>
                      )}
                    </TimeSlotCell>
                  ))}
                </TableRow>
              ))}
            </tbody>
          </Table>
        </TimetableContent>
      </Content>
    </TimetableContainer>
  );
};

export default TimetablePage;