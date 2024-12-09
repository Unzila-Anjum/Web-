import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "./Sidebar"; // Import Sidebar
import {
  TeacherContainer,
  Header,
  AddButton,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Select,
  Table,
  TableHeader,
  TableRow,
  TableData,
  Button,
  SearchInput
} from "../../styles/AdminTeachersStyles2";

const TeacherManagement = () => {
  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    registrationNumber: "",
    email: "",
    phone: "",
    department: "",
    type: "Visiting",
    designation: "", // Initialize with an empty string
    qualifications: "",
    subjects: "",
  });
  const [searchQuery, setSearchQuery] = useState(""); // New state for search query
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to handle sidebar toggle

  // Define possible designations for permanent teachers
  const designations = [
    "Professor",
    "Associate Professor",
    "Assistant Professor",
    "Lecturer",
    "Senior Lecturer",
  ];

  useEffect(() => {
    fetchTeachers();
  }, []);

  useEffect(() => {
    // Filter teachers whenever the search query changes
    setFilteredTeachers(
      teachers.filter((teacher) =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.registrationNumber.includes(searchQuery)
      )
    );
  }, [searchQuery, teachers]);

  // Fetch teachers from the backend
  const fetchTeachers = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/v1/admin/teachers/");
      setTeachers(response.data.teachers);
      setFilteredTeachers(response.data.teachers); // Set initial filtered list to all teachers
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  };

  // Handle input validation
  const validateInputs = () => {
    const { name, email, department, type, qualifications, designation } = newTeacher;
    if (!name || !email || !department || !type || !qualifications) {
      alert("Please fill in all required fields.");
      return false;
    }
    if (type === "Permanent" && !designation) {
      alert("Please select a designation for permanent teachers.");
      return false;
    }
    return true;
  };
  const handleSaveTeacher = async () => {
    if (!validateInputs()) return;
  
    // Log the newTeacher data before sending the request
    console.log("Saving teacher:", newTeacher);
  
    try {
      // If it's an edit mode, update the teacher
      if (isEditMode) {
        const response = await axios.put(
          `http://localhost:4000/api/v1/admin/teachers/${newTeacher._id}`,
          {
            ...newTeacher,
            subjects: newTeacher.subjects.split(",").map((subject) => subject.trim()), // Ensure subjects are in array format
            ...(newTeacher.type === "Visiting" ? { designation: undefined } : {}),
          }
        );
  
        setTeachers((prevTeachers) =>
          prevTeachers.map((teacher) =>
            teacher._id === newTeacher._id ? response.data.teacher : teacher
          )
        );
      } else {
        // Add new teacher
        const response = await axios.post("http://localhost:4000/api/v1/admin/teachers/", {
          ...newTeacher,
          subjects: newTeacher.subjects.split(",").map((subject) => subject.trim()), // Ensure subjects are in array format
          ...(newTeacher.type === "Visiting" ? { designation: undefined } : {}),
        });
  
        // Log the response for debugging
        console.log("Teacher added:", response.data.teacher);
  
        // Add the new teacher to the list
        setTeachers((prevTeachers) => [...prevTeachers, response.data.teacher]);
        setFilteredTeachers((prevFilteredTeachers) => [
          ...prevFilteredTeachers,
          response.data.teacher,
        ]);
      }
  
      setIsModalOpen(false); // Close the modal after saving
      resetTeacherForm(); // Reset the form fields
    } catch (error) {
      console.error("Error saving teacher:", error);
      alert("Failed to save teacher. Please check the console for more details.");
    }
  };
    

  // Reset the newTeacher form
  const resetTeacherForm = () => {
    setNewTeacher({
      name: "",
      registrationNumber: "",
      email: "",
      phone: "",
      department: "",
      type: "Visiting",
      designation: "",
      qualifications: "",
      subjects: "",
    });
    setIsEditMode(false); // Reset edit mode to false
  };

  // Edit teacher
  const handleEdit = (teacher) => {
    setIsEditMode(true);
    setNewTeacher({
      _id: teacher._id,
      name: teacher.name,
      registrationNumber: teacher.registrationNumber,
      email: teacher.email,
      phone: teacher.phone,
      department: teacher.department,
      type: teacher.type,
      designation: teacher.designation || "",
      qualifications: teacher.qualifications,
      subjects: teacher.subjects.join(", "),
    });
    setIsModalOpen(true);
  };

  // Delete teacher with confirmation
  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this teacher?");
    if (confirmed) {
      try {
        await axios.delete(`http://localhost:4000/api/v1/admin/teachers/${id}`);
        setTeachers(teachers.filter((teacher) => teacher._id !== id));
      } catch (error) {
        console.error("Error deleting teacher:", error);
      }
    }
  };

  // Toggle Sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar Section */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content Section */}
      <div style={{ marginLeft: isSidebarOpen ? '250px' : '80px', transition: 'margin-left 0.3s ease', width: '100%' }}>
        <TeacherContainer>
          <Header>
            <h1>                            Teacher Management</h1>
            <AddButton onClick={() => setIsModalOpen(true)}>Add Teacher</AddButton>
          </Header>

          {/* Search Bar */}
          <SearchInput
            type="text"
            placeholder="Search by name or registration number"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query
          />

          {/* Teacher List Table */}
          <Table>
            <TableHeader>
              <tr>
                <th>Name</th>
                <th>Registration Number</th> {/* Added Registration Number column */}
                <th>Email</th>
                <th>Department</th>
                <th>Type</th>
                <th>Actions</th>
              </tr>
            </TableHeader>
            <tbody>
              {filteredTeachers.map((teacher) => (
                <TableRow key={teacher._id}>
                  <TableData>{teacher.name}</TableData>
                  <TableData>{teacher.registrationNumber}</TableData> {/* Display Registration Number */}
                  <TableData>{teacher.email}</TableData>
                  <TableData>{teacher.department}</TableData>
                  <TableData>{teacher.type}</TableData>
                  <TableData>
                    <Button onClick={() => handleEdit(teacher)}>Edit</Button>
                    <Button onClick={() => handleDelete(teacher._id)}>Delete</Button>
                  </TableData>
                </TableRow>
              ))}
            </tbody>
          </Table>

          {/* Teacher Add/Edit Modal */}
          {isModalOpen && (
            <Modal>
              <ModalHeader>
                {isEditMode ? "Edit Teacher" : "Add Teacher"}
              </ModalHeader>
              <ModalBody>
                <Input
                  type="text"
                  placeholder="Name"
                  value={newTeacher.name}
                  onChange={(e) => setNewTeacher({ ...newTeacher, name: e.target.value })}
                />
                <Input
                  type="text"
                  placeholder="Registration Number"
                  value={newTeacher.registrationNumber}
                  onChange={(e) => setNewTeacher({ ...newTeacher, registrationNumber: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Email"
                  value={newTeacher.email}
                  onChange={(e) => setNewTeacher({ ...newTeacher, email: e.target.value })}
                />
                <Input
                  type="text"
                  placeholder="Phone"
                  value={newTeacher.phone}
                  onChange={(e) => setNewTeacher({ ...newTeacher, phone: e.target.value })}
                />
                <Input
                  type="text"
                  placeholder="Department"
                  value={newTeacher.department}
                  onChange={(e) => setNewTeacher({ ...newTeacher, department: e.target.value })}
                />
                <Select
                  value={newTeacher.type}
                  onChange={(e) => setNewTeacher({ ...newTeacher, type: e.target.value })}
                >
                  <option value="Visiting">Visiting</option>
                  <option value="Permanent">Permanent</option>
                </Select>

                {newTeacher.type === "Permanent" && (
                  <Select
                    value={newTeacher.designation}
                    onChange={(e) => setNewTeacher({ ...newTeacher, designation: e.target.value })}
                  >
                    <option value="">Select Designation</option>
                    {designations.map((designation) => (
                      <option key={designation} value={designation}>
                        {designation}
                      </option>
                    ))}
                  </Select>
                )}

                <Input
                  type="text"
                  placeholder="Qualifications"
                  value={newTeacher.qualifications}
                  onChange={(e) => setNewTeacher({ ...newTeacher, qualifications: e.target.value })}
                />
                <Input
                  type="text"
                  placeholder="Subjects"
                  value={newTeacher.subjects}
                  onChange={(e) => setNewTeacher({ ...newTeacher, subjects: e.target.value })}
                />
              </ModalBody>
              <ModalFooter>
                <Button onClick={handleSaveTeacher}>Save</Button>
                <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
              </ModalFooter>
            </Modal>
          )}
        </TeacherContainer>
      </div>
    </div>
  );
};

export default TeacherManagement;