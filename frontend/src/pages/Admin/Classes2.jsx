import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../../styles/AdminClassesStyles"; // Import the styles
import Sidebar from "./Sidebar"; // Import Sidebar

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
  const [searchQuery, setSearchQuery] = useState(""); // Search query state
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [departments, setDepartments] = useState([]); // New state for departments
  const [semesters, setSemesters] = useState([]); // New state for semesters

  // Fetch available departments from the backend
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/cours/departments");
      setDepartments(response.data.departments); // Assuming departments come as an array
    } catch (error) {
      console.error("Error fetching departments:", error);
      setErrorMessage("Error fetching departments. Please try again.");
    }
  };

  // Fetch available semesters from the backend
  const fetchSemesters = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/cours/semesters");
      setSemesters(response.data.semesters); // Assuming semesters come as an array
    } catch (error) {
      console.error("Error fetching semesters:", error);
      setErrorMessage("Error fetching semesters. Please try again.");
    }
  };

  const fetchCourses = async (searchQuery = "") => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/cours/search", {
        params: { searchQuery: searchQuery },  // Updated key to searchQuery
      });
      setCourses(response.data.courses);
    } catch (error) {
      setErrorMessage("Error fetching courses. Please try again.");
      console.error("Error fetching courses:", error.message);
    }
  };
  

  // Handle input changes for course data
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value); // Update the search query state
    fetchCourses(value); // Fetch courses based on updated search query
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const courseData = {
      code: formData.code,
      name: formData.name,
      prerequisites: formData.prerequisites,  // Just send the prerequisites as they are entered
      department: formData.department,
      semester: formData.semester,
      lectureCreditHours: formData.lectureCreditHours,
      labCreditHours: formData.labCreditHours,
    };
  
    try {
      let response;
      if (editingCourseId) {
        // Update course with the prerequisites
        response = await axios.put(`http://localhost:4000/api/v1/cours/update/${editingCourseId}`, courseData);
      } else {
        // Add a new course with the prerequisites
        response = await axios.post("http://localhost:4000/api/v1/cours/add", courseData);
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
      setEditingCourseId(null);
      setShowModal(false);
      fetchCourses(searchQuery);  // Refresh the courses list
    } catch (error) {
      console.error("Error adding or updating course:", error);
      setErrorMessage(error.response?.data?.message || "There was an issue adding or updating the course.");
    }
  };
  
  // Delete a course
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/v1/cours/delete/${id}`);
      fetchCourses(searchQuery);  // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting course:", error.message);
      setErrorMessage("Error deleting course. Please try again.");
    }
  };

  // Set course for editing
  const handleEdit = (course) => {
    setEditingCourseId(course._id);
    setFormData({
      code: course.code,
      name: course.name,
      prerequisites: course.prerequisites.join(", "), // Join prerequisites as a comma-separated string
      department: course.department,
      semester: course.semester,
      lectureCreditHours: course.lectureCreditHours,
      labCreditHours: course.labCreditHours,
    });
    setShowModal(true);
  };

  // Toggle modal visibility for adding a new course
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // Fetch courses on search query change
  useEffect(() => {
    fetchCourses(searchQuery); // Fetch courses based on search query
  }, [searchQuery]);

  // Initial fetch when component mounts
  useEffect(() => {
    fetchCourses(); 
    fetchDepartments(); 
    fetchSemesters(); 
  }, []);

  return (
    <div style={styles.courseManagement}>
      <div style={styles.container}>
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div style={styles.mainContent}>
          <h1 style={styles.title}>Course Management</h1>

          {/* Error Message */}
          {errorMessage && <p style={styles.errorMessage}>{errorMessage}</p>}

          {/* Search Field and Add Course Button */}
          <div style={styles.searchAndButton}>
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}  // Update the search query as user types
              placeholder="Search by Course Code or Name"
              style={styles.searchInput}
            />
            <button onClick={toggleModal} style={styles.addCourseButton}>Add New Course</button>
          </div>

          {/* Course List Table */}
          <h2 style={styles.formHeading}>Course List</h2>
          <table style={styles.table}>
            <thead>
              <tr>
                <th>Course Code</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Semester</th>
                <th>Lecture Credit Hours</th>
                <th>Lab Credit Hours</th>
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
                  <td>
                    <button onClick={() => handleEdit(course)} style={styles.editButton}>Edit</button>
                    <button onClick={() => handleDelete(course._id)} style={styles.deleteButton}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Add Course Modal */}
          {showModal && (
            <div style={styles.modal}>
              <div style={styles.modalContent}>
                <h2 style={styles.formHeading}>{editingCourseId ? "Edit Course" : "Add Course"}</h2>
                <form onSubmit={handleSubmit}>
                  <label>Course Code:</label>
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                  <label>Course Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                  <label>Prerequisites (Comma Separated):</label>
                  <input
                    type="text"
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleInputChange}
                    style={styles.input}
                  />
                  <label>Department:</label>
                  <select
                    name="department"
                    value={formData.department}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  >
                    <option value="">Select Department</option>
                    {departments.map((department) => (
                      <option key={department} value={department}>{department}</option>
                    ))}
                  </select>
                  <label>Semester:</label>
                  <select
                    name="semester"
                    value={formData.semester}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  >
                    <option value="">Select Semester</option>
                    {semesters.map((semester) => (
                      <option key={semester} value={semester}>{semester}</option>
                    ))}
                  </select>
                  <label>Lecture Credit Hours:</label>
                  <input
                    type="number"
                    name="lectureCreditHours"
                    value={formData.lectureCreditHours}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                  <label>Lab Credit Hours:</label>
                  <input
                    type="number"
                    name="labCreditHours"
                    value={formData.labCreditHours}
                    onChange={handleInputChange}
                    style={styles.input}
                    required
                  />
                  <div style={styles.modalButtons}>
                    <button type="submit" style={styles.saveButton}>Save</button>
                    <button type="button" onClick={toggleModal} style={styles.cancelButton}>Cancel</button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseManagement;
