import React, { useState, useEffect } from "react";
import axios from "axios";

const CourseManagement = () => {
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    prerequisites: "",
    department: "",
    semester: "",
    lectureCreditHours: "",
    labCreditHours: "",
  });
  const [searchQuery, setSearchQuery] = useState({});
  const [editingCourse, setEditingCourse] = useState(null);
  const [message, setMessage] = useState("");

  // Fetch all courses on component load
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/course/course");
      setCourses(response.data.courses);
    } catch (error) {
      console.error("Error fetching courses:", error.message);
      setMessage("Failed to fetch courses.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSearchChange = (e) => {
    setSearchQuery({ ...searchQuery, [e.target.name]: e.target.value });
  };

  
  const handleAddOrUpdate = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        lectureCreditHours: Number(formData.lectureCreditHours),
        labCreditHours: Number(formData.labCreditHours),
      };
      console.log("Payload being sent:", payload);
  
      if (editingCourse) {
        const response = await axios.put(`http://localhost:4000/api/v1/course/course/${editingCourse._id}`, payload);
        setMessage(response.data.message);
      } else {
        const response = await axios.post("http://localhost:4000/api/v1/course/course", payload);
        setMessage(response.data.message);
      }
      setFormData({
        code: "",
        name: "",
        prerequisites: "",
        department: "",
        semester: "",
        lectureCreditHours: "",
        labCreditHours: "",
      });
      setEditingCourse(null);
      fetchCourses();
    } catch (error) {
      console.error("Error saving course:", error.response.data.message || error.message);
      setMessage("Error saving course.");
    }
  };
  

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      code: course.code,
      name: course.name,
      prerequisites: course.prerequisites.map((p) => p.code).join(", "),
      department: course.department,
      semester: course.semester,
      lectureCreditHours: course.lectureCreditHours,
      labCreditHours: course.labCreditHours,
    });
  };

  const handleDelete = async (courseId) => {
    try {
      const response = await axios.delete(`http://localhost:4000/api/v1/course/course/${courseId}`);
      setMessage(response.data.message);
      fetchCourses();
    } catch (error) {
      console.error("Error deleting course:", error.message);
      setMessage("Error deleting course.");
    }
  };

  const handleSearch = async () => {
    try {
      const queryString = new URLSearchParams(searchQuery).toString();
      const response = await axios.get(`http://localhost:4000/api/v1/course/course?${queryString}`);
      setCourses(response.data.courses);
      setMessage("Courses matching your search criteria fetched.");
    } catch (error) {
      console.error("Error searching courses:", error.message);
      setMessage("No courses found.");
    }
  };

  return (
    <div>
      <h2>Course Management</h2>
      <p>{message}</p>

      {/* Add/Update Course Form */}
      <form onSubmit={handleAddOrUpdate}>
        <input type="text" name="code" placeholder="Course Code" value={formData.code} onChange={handleInputChange} required />
        <input type="text" name="name" placeholder="Course Name" value={formData.name} onChange={handleInputChange} required />
        <input type="text" name="prerequisites" placeholder="Prerequisites (comma-separated)" value={formData.prerequisites} onChange={handleInputChange} />
        <input type="text" name="department" placeholder="Department" value={formData.department} onChange={handleInputChange} required />
        <input type="number" name="semester" placeholder="Semester" value={formData.semester} onChange={handleInputChange} required />
        <input type="number" name="lectureCreditHours" placeholder="Lecture Credit Hours" value={formData.lectureCreditHours} onChange={handleInputChange} required />
        <input type="number" name="labCreditHours" placeholder="Lab Credit Hours" value={formData.labCreditHours} onChange={handleInputChange} />
        <button type="submit">{editingCourse ? "Update Course" : "Add Course"}</button>
      </form>

      {/* Search Form */}
      <div>
        <h3>Search Courses</h3>
        <input type="text" name="code" placeholder="Code" onChange={handleSearchChange} />
        <input type="text" name="name" placeholder="Name" onChange={handleSearchChange} />
        <input type="text" name="department" placeholder="Department" onChange={handleSearchChange} />
        <input type="number" name="semester" placeholder="Semester" onChange={handleSearchChange} />
        <input type="number" name="minLectureHours" placeholder="Min Lecture Hours" onChange={handleSearchChange} />
        <input type="number" name="maxLectureHours" placeholder="Max Lecture Hours" onChange={handleSearchChange} />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Courses Table */}
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Name</th>
            <th>Department</th>
            <th>Semester</th>
            <th>Lecture Hours</th>
            <th>Lab Hours</th>
            <th>Prerequisites</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course._id}>
              <td>{course.code}</td>
              <td>{course.name}</td>
              <td>{course.department}</td>
              <td>{course.semester}</td>
              <td>{course.lectureCreditHours}</td>
              <td>{course.labCreditHours}</td>
              <td>{course.prerequisites.map((p) => p.name).join(", ") || "None"}</td>
              <td>
                <button onClick={() => handleEdit(course)}>Edit</button>
                <button onClick={() => handleDelete(course._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CourseManagement;
