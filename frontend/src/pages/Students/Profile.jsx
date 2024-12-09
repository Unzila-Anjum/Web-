import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";
import {
  ProfileContainer,
  SidebarContainer,
  Content,
  ProfileContent,
  ProfileHeader,
  Form,
  Field,
  Label,
  Input,
  Button,
  Message,
  LoadingMessage,
  ErrorMessage,
} from "../../styles/StudentProfileStyles";

const StudentProfile = () => {
  const [profile, setProfile] = useState(null);
  const [editableProfile, setEditableProfile] = useState({});
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/students/profile");
        const profileData = response.data.data || {};
        setProfile(profileData);
        setEditableProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        setIsError(true);
        setMessage("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setEditableProfile({
      ...editableProfile,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedData = {
        ...editableProfile,
        email: undefined,
        registrationNumber: undefined,
      };

      const response = await axios.put(
        "http://localhost:4000/api/v1/students/profile",
        updatedData
      );

      setMessage("Profile updated successfully.");
      setIsError(false);

      setProfile(response.data.data || editableProfile);
    } catch (error) {
      console.error("Error updating profile:", error);
      setIsError(true);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  
  if (!profile) return <ErrorMessage>Error: Unable to load profile.</ErrorMessage>;

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileContent>
          <ProfileHeader>Student Profile</ProfileHeader>
          {message && <Message isError={isError}>{message}</Message>}
          <Form>
            <Field>
              <Label>Email</Label>
              <Input type="email" value={profile.email} disabled />
            </Field>
            <Field>
              <Label>Registration Number</Label>
              <Input type="text" value={profile.registrationNumber} disabled />
            </Field>
            <Field>
              <Label>Name</Label>
              <Input
                type="text"
                name="name"
                value={editableProfile.name || ""}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <Label>Department</Label>
              <Input
                type="text"
                name="department"
                value={editableProfile.department || ""}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <Label>Address</Label>
              <Input
                type="text"
                name="address"
                value={editableProfile.address || ""}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <Label>Semester</Label>
              <Input
                type="number"
                name="semester"
                value={editableProfile.semester || ""}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <Label>Gender</Label>
              <Input
                type="text"
                name="gender"
                value={editableProfile.gender || ""}
                onChange={handleInputChange}
              />
            </Field>
            <Field>
              <Label>Date of Birth</Label>
              <Input
                type="date"
                name="dateOfBirth"
                value={editableProfile.dateOfBirth || ""}
                onChange={handleInputChange}
              />
            </Field>
            <Button onClick={handleUpdate}>Update Profile</Button>
          </Form>
        </ProfileContent>
      </Content>
    </ProfileContainer>
  );
};

export default StudentProfile;
