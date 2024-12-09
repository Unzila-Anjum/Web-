// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Sidebar from "./Sidebar";
// import { 
//   Container, 
//   Heading, 
//   FormWrapper, 
//   FormItem, 
//   Label, 
//   Input, 
//   Button, 
//   Select 
// } from "../../styles/TimetableStyles";

// const TimetablePage = () => {
//   const [courses, setCourses] = useState([]);
//   const [formData, setFormData] = useState({
//     course: "",
//     department: "",
//     day: "",
//     startTime: "",
//     endTime: "",
//     id: "",
//   });
//   const [timetable, setTimetable] = useState([
//     { day: "Monday", times: Array(9).fill(null) },
//     { day: "Tuesday", times: Array(9).fill(null) },
//     { day: "Wednesday", times: Array(9).fill(null) },
//     { day: "Thursday", times: Array(9).fill(null) },
//     { day: "Friday", times: Array(9).fill(null) },
//   ]);
  
//   const [searchFilter, setSearchFilter] = useState({
//     course: "",
//     department: "",
//   });

//   // Fetch courses from the backend API
//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/v1/courses/courses");
//         setCourses(response.data.courses || []);
//       } catch (error) {
//         console.error("Error fetching courses:", error);
//       }
//     };
//     fetchCourses();
//   }, []);

//   // Handle form submit to add or update a timetable entry
//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Validate form data before submitting
//     if (!formData.course || !formData.department || !formData.day || !formData.startTime || !formData.endTime) {
//       alert("Please fill in all fields.");
//       return;
//     }
  
//     // Find the selected course from the list to get its name
//     const selectedCourse = courses.find((course) => course._id === formData.course);
//     const courseName = selectedCourse ? selectedCourse.name : "";
  
//     const timetableData = {
//       ...formData,
//       courseName: courseName,
//     };
  
//     try {
//       if (formData.id) {
//         // If there's an ID, update the existing timetable slot
//         await axios.put(`http://localhost:5000/api/v1/timetables/${formData.id}`, timetableData);
//         alert("Class updated successfully!");
//       } else {
//         // Otherwise, create a new timetable entry
//         await axios.post("http://localhost:5000/api/v1/timetables/", timetableData); 
//         alert("Class added successfully!");
//       }
  
//       // Update timetable state with course name instead of ID
//       setTimetable((prevTimetable) => {
//         const updatedTimetable = [...prevTimetable];
//         const dayIndex = updatedTimetable.findIndex((item) => item.day === formData.day);
//         if (dayIndex !== -1) {
//           const timeIndex = convertTimeToSlot(formData.startTime);
//           updatedTimetable[dayIndex].times[timeIndex] = {
//             course: courseName,
//             department: formData.department,
//             startTime: formData.startTime,
//             endTime: formData.endTime,
//           };
//         }
//         return updatedTimetable;
//       });
  
//       // Reset form after success
//       setFormData({
//         course: "",
//         department: "",
//         day: "",
//         startTime: "",
//         endTime: "",
//         id: "",
//       });
//     } catch (error) {
//       alert("Error adding/updating timetable.");
//       console.error(error);
//     }
//   };
  
//   const convertTimeToSlot = (time) => {
//     const times = [
//       "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
//     ];
//     return times.indexOf(time);
//   };

//   // Handle double-click event for editing the timetable
//   const handleDoubleClick = async (day, slotIndex) => {
//     const currentSlot = timetable.find((item) => item.day === day)?.times[slotIndex];
  
//     if (currentSlot) {
//       // Fetch the full timetable data from the backend using the slot ID
//       try {
//         const response = await axios.get(`http://localhost:5000/api/v1/timetables/${currentSlot.id}`);
//         const slotData = response.data;
  
//         // Set form data to the values fetched from the backend
//         setFormData({
//           course: slotData.course,
//           department: slotData.department,
//           startTime: slotData.startTime,
//           endTime: slotData.endTime,
//           day: day,
//           id: slotData._id,
//         });
//       } catch (error) {
//         console.error("Error fetching slot data:", error);
//         alert("Error fetching timetable data for editing.");
//       }
//     } else {
//       // If no slot is selected, reset form data
//       setFormData({
//         course: "",
//         department: "",
//         day,
//         startTime: "",
//         endTime: "",
//         id: "",
//       });
//     }
//   };

//   // Handle delete event for a slot
//   const handleDelete = (day, slotIndex) => {
//     setTimetable((prevTimetable) => {
//       const updatedTimetable = [...prevTimetable];
//       updatedTimetable.find((item) => item.day === day).times[slotIndex] = null;
//       return updatedTimetable;
//     });
  
//     // Send delete request to backend
//     const selectedSlot = timetable.find((item) => item.day === day)?.times[slotIndex];
//     if (selectedSlot && selectedSlot.id) {
//       axios.delete(`http://localhost:5000/api/v1/timetables/${selectedSlot.id}`)
//         .then(() => {
//           alert("Class deleted successfully!");
//         })
//         .catch((error) => {
//           alert("Error deleting timetable.");
//           console.error(error);
//         });
//     }
//   };

//   // Filter timetable based on course and department
//   const filteredTimetable = timetable.filter((day) => {
//     return (
//       (searchFilter.course ? day.times.some((slot) => slot && slot.course.includes(searchFilter.course)) : true) &&
//       (searchFilter.department ? day.times.some((slot) => slot && slot.department.includes(searchFilter.department)) : true)
//     );
//   });
//     return (
//         <>
//           <Sidebar />
//           <Container>
//             <Heading>Manage Timetable</Heading>
    
//             {/* Search Filter */}
//             <FormWrapper>
//               <FormItem>
//                 <Label>Course</Label>
//                 <Input
//                   type="text"
//                   value={searchFilter.course}
//                   onChange={(e) => setSearchFilter({ ...searchFilter, course: e.target.value })}
//                   placeholder="Search by course"
//                 />
//               </FormItem>
    
//               <FormItem>
//                 <Label>Department</Label>
//                 <Input
//                   type="text"
//                   value={searchFilter.department}
//                   onChange={(e) => setSearchFilter({ ...searchFilter, department: e.target.value })}
//                   placeholder="Search by department"
//                 />
//               </FormItem>
//             </FormWrapper>
    
//             {/* Form to Add/Update Timetable */}
//             <FormWrapper onSubmit={handleSubmit}>
//               <FormItem>
//                 <Label htmlFor="course">Course</Label>
//                 <Select
//                   id="course"
//                   value={formData.course}
//                   onChange={(e) => setFormData({ ...formData, course: e.target.value })}
//                 >
//                   <option value="">Select Course</option>
//                   {courses.map((course) => (
//                     <option key={course._id} value={course._id}>
//                       {course.name}
//                     </option>
//                   ))}
//                 </Select>
//               </FormItem>
    
//               <FormItem>
//                 <Label htmlFor="department">Department</Label>
//                 <Input
//                   id="department"
//                   value={formData.department}
//                   onChange={(e) => setFormData({ ...formData, department: e.target.value })}
//                 />
//               </FormItem>
    
//               <FormItem>
//                 <Label htmlFor="day">Day</Label>
//                 <Select
//                   id="day"
//                   value={formData.day}
//                   onChange={(e) => setFormData({ ...formData, day: e.target.value })}
//                 >
//                   <option value="">Select Day</option>
//                   {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
//                     <option key={day} value={day}>
//                       {day}
//                     </option>
//                   ))}
//                 </Select>
//               </FormItem>
    
//               <FormItem>
//                 <Label htmlFor="startTime">Start Time</Label>
//                 <Select
//                   id="startTime"
//                   value={formData.startTime}
//                   onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
//                 >
//                   <option value="">Select Start Time</option>
//                   {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((time) => (
//                     <option key={time} value={time}>
//                       {time}
//                     </option>
//                   ))}
//                 </Select>
//               </FormItem>
    
//               <FormItem>
//                 <Label htmlFor="endTime">End Time</Label>
//                 <Select
//                   id="endTime"
//                   value={formData.endTime}
//                   onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
//                 >
//                   <option value="">Select End Time</option>
//                   {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((time) => (
//                     <option key={time} value={time}>
//                       {time}
//                     </option>
//                   ))}
//                 </Select>
//               </FormItem>
    
//               <Button type="submit">{formData.id ? "Update" : "Add"} Timetable</Button>
//             </FormWrapper>
    
//             {/* Timetable Table */}
//             <table style={{ marginTop: "30px", width: "100%", borderCollapse: "collapse" }}>
//               <thead>
//                 <tr>
//                   <th style={{ padding: "10px", border: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Day / Time</th>
//                   {["8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"].map((time) => (
//                     <th key={time} style={{ padding: "10px", border: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>{time}</th>
//                   ))}
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredTimetable.map((day) => (
//                   <tr key={day.day}>
//                     <td style={{ padding: "10px", border: "1px solid #ddd", backgroundColor: "#f9f9f9", fontWeight: "bold" }}>
//                       {day.day}
//                     </td>
//                     {day.times.map((slot, index) => (
//                       <td
//                         key={index}
//                         onDoubleClick={() => handleDoubleClick(day.day, index)}
//                         style={{
//                           padding: "10px",
//                           border: "1px solid #ddd",
//                           cursor: "pointer",
//                           backgroundColor: slot ? "#e0f7fa" : "#f9f9f9",
//                         }}
//                       >
//                         {slot ? `${slot.course} (${slot.department})` : ""}
//                         {slot && (
//                           <div>
//                             <Button
//                               onClick={() => handleDelete(day.day, index)}
//                               style={{ backgroundColor: "red", color: "white", marginTop: "5px" }}
//                             >
//                               Delete
//                             </Button>
//                           </div>
//                         )}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </Container>
//         </>
//       );
// };

// export default TimetablePage;


import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { 
  Container, 
  Heading, 
  FormWrapper, 
  FormItem, 
  Label, 
  Input, 
  Button, 
  Select 
} from "../../styles/AdminTimetableStyles";

// New Styled Components for Layout
const PageLayout = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

const SidebarWrapper = styled.div`
  width: 250px;
  background-color: #f4f6f9;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0,0,0,0.1);
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-color: #ffffff;
`;

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

  // Fetch courses from the backend API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/courses/courses");
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Handle form submit to add or update a timetable entry
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data before submitting
    if (!formData.course || !formData.department || !formData.day || !formData.startTime || !formData.endTime) {
      alert("Please fill in all fields.");
      return;
    }
  
    // Find the selected course from the list to get its name
    const selectedCourse = courses.find((course) => course._id === formData.course);
    const courseName = selectedCourse ? selectedCourse.name : "";
  
    const timetableData = {
      ...formData,
      courseName: courseName,
    };
  
    try {
      if (formData.id) {
        // If there's an ID, update the existing timetable slot
        await axios.put(`http://localhost:4000/api/v1/timetables/${formData.id}`, timetableData);
        alert("Class updated successfully!");
      } else {
        // Otherwise, create a new timetable entry
        await axios.post("http://localhost:4000/api/v1/timetables/", timetableData); 
        alert("Class added successfully!");
      }
  
      // Update timetable state with course name instead of ID
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
  
      // Reset form after success
      setFormData({
        course: "",
        department: "",
        day: "",
        startTime: "",
        endTime: "",
        id: "",
      });
    } catch (error) {
      alert("Error adding/updating timetable.");
      console.error(error);
    }
  };
  
  const convertTimeToSlot = (time) => {
    const times = [
      "8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
    ];
    return times.indexOf(time);
  };

  // Handle double-click event for editing the timetable
  const handleDoubleClick = async (day, slotIndex) => {
    const currentSlot = timetable.find((item) => item.day === day)?.times[slotIndex];
  
    if (currentSlot) {
      // Fetch the full timetable data from the backend using the slot ID
      try {
        const response = await axios.get(`http://localhost:4000/api/v1/timetables/${currentSlot.id}`);
        const slotData = response.data;
  
        // Set form data to the values fetched from the backend
        setFormData({
          course: slotData.course,
          department: slotData.department,
          startTime: slotData.startTime,
          endTime: slotData.endTime,
          day: day,
          id: slotData._id,
        });
      } catch (error) {
        console.error("Error fetching slot data:", error);
        alert("Error fetching timetable data for editing.");
      }
    } else {
      // If no slot is selected, reset form data
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

  // Handle delete event for a slot
  const handleDelete = (day, slotIndex) => {
    setTimetable((prevTimetable) => {
      const updatedTimetable = [...prevTimetable];
      updatedTimetable.find((item) => item.day === day).times[slotIndex] = null;
      return updatedTimetable;
    });
  
    // Send delete request to backend
    const selectedSlot = timetable.find((item) => item.day === day)?.times[slotIndex];
    if (selectedSlot && selectedSlot.id) {
      axios.delete(`http://localhost:4000/api/v1/timetables/${selectedSlot.id}`)
        .then(() => {
          alert("Class deleted successfully!");
        })
        .catch((error) => {
          alert("Error deleting timetable.");
          console.error(error);
        });
    }
  };

  // Filter timetable based on course and department
  const filteredTimetable = timetable.filter((day) => {
    return (
      (searchFilter.course ? day.times.some((slot) => slot && slot.course.includes(searchFilter.course)) : true) &&
      (searchFilter.department ? day.times.some((slot) => slot && slot.department.includes(searchFilter.department)) : true)
    );
  });

  return (
    <PageLayout>
      <SidebarWrapper>
        <Sidebar />
      </SidebarWrapper>
      
      <ContentWrapper>
        <Container>
          <Heading>Manage Timetable</Heading>
  
          {/* Search Filter */}
          <FormWrapper>
            <FormItem>
              <Label>Course</Label>
              <Input
                type="text"
                value={searchFilter.course}
                onChange={(e) => setSearchFilter({ ...searchFilter, course: e.target.value })}
                placeholder="Search by course"
              />
            </FormItem>
  
            <FormItem>
              <Label>Department</Label>
              <Input
                type="text"
                value={searchFilter.department}
                onChange={(e) => setSearchFilter({ ...searchFilter, department: e.target.value })}
                placeholder="Search by department"
              />
            </FormItem>
          </FormWrapper>
  
          {/* Form to Add/Update Timetable */}
          <FormWrapper onSubmit={handleSubmit}>
            <FormItem>
              <Label htmlFor="course">Course</Label>
              <Select
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.name}
                  </option>
                ))}
              </Select>
            </FormItem>
  
            <FormItem>
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              />
            </FormItem>
  
            <FormItem>
              <Label htmlFor="day">Day</Label>
              <Select
                id="day"
                value={formData.day}
                onChange={(e) => setFormData({ ...formData, day: e.target.value })}
              >
                <option value="">Select Day</option>
                {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </Select>
            </FormItem>
  
            <FormItem>
              <Label htmlFor="startTime">Start Time</Label>
              <Select
                id="startTime"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              >
                <option value="">Select Start Time</option>
                {["8:00 AM", "9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
            </FormItem>
  
            <FormItem>
              <Label htmlFor="endTime">End Time</Label>
              <Select
                id="endTime"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              >
                <option value="">Select End Time</option>
                {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map((time) => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </Select>
            </FormItem>
  
            <Button type="submit">{formData.id ? "Update" : "Add"} Timetable</Button>
          </FormWrapper>
  
          {/* Timetable Table */}
          <table style={{ marginTop: "30px", width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ padding: "10px", border: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>Day / Time</th>
                {["8:00 AM - 9:00 AM", "9:00 AM - 10:00 AM", "10:00 AM - 11:00 AM", "11:00 AM - 12:00 PM", "12:00 PM - 1:00 PM", "1:00 PM - 2:00 PM", "2:00 PM - 3:00 PM", "3:00 PM - 4:00 PM", "4:00 PM - 5:00 PM"].map((time) => (
                  <th key={time} style={{ padding: "10px", border: "1px solid #ddd", backgroundColor: "#f2f2f2" }}>{time}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTimetable.map((day) => (
                <tr key={day.day}>
                  <td style={{ padding: "10px", border: "1px solid #ddd", backgroundColor: "#f9f9f9", fontWeight: "bold" }}>
                    {day.day}
                  </td>
                  {day.times.map((slot, index) => (
                    <td
                      key={index}
                      onDoubleClick={() => handleDoubleClick(day.day, index)}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        cursor: "pointer",
                        backgroundColor: slot ? "#e0f7fa" : "#f9f9f9",
                      }}
                    >
                      {slot ? `${slot.course} (${slot.department})` : ""}
                      {slot && (
                        <div>
                          <Button
                            onClick={() => handleDelete(day.day, index)}
                            style={{ backgroundColor: "red", color: "white", marginTop: "5px" }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </Container>
      </ContentWrapper>
    </PageLayout>
  );
};

export default TimetablePage;