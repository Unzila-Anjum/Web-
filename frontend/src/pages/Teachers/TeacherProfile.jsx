// // TeacherProfileSection.js
// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import { ProfileContainer, SidebarContainer, Content, ProfileHeader, ProfileDetails, ProfileLabel, ProfileInfo, EditButton } 
// from '../../styles/TeacherProfileStyles'; 

// const TeacherProfileSection = () => {
//   const [teacherInfo, setTeacherInfo] = useState({
//     name: 'Wasif Ali',
//     email: 'wasifali@example.com',
//     phone: '0321-4567890',
//     address: '123 Main St, Islamabad, Pakistan',
//     qualification: 'Master of Education',
//   });

//   return (
//     <ProfileContainer>
//       <SidebarContainer>
//         <Sidebar />
//       </SidebarContainer>
//       <Content>
//         <ProfileHeader>Profile Details</ProfileHeader>
//         <ProfileDetails>
//           <ProfileLabel>Name:</ProfileLabel>
//           <ProfileInfo>{teacherInfo.name}</ProfileInfo>
//           <ProfileLabel>Email:</ProfileLabel>
//           <ProfileInfo>{teacherInfo.email}</ProfileInfo>
//           <ProfileLabel>Phone:</ProfileLabel>
//           <ProfileInfo>{teacherInfo.phone}</ProfileInfo>
//           <ProfileLabel>Address:</ProfileLabel>
//           <ProfileInfo>{teacherInfo.address}</ProfileInfo>
//           <ProfileLabel>Qualification:</ProfileLabel>
//           <ProfileInfo>{teacherInfo.qualification}</ProfileInfo>
//         </ProfileDetails>
//         <EditButton>Edit Profile</EditButton>
//       </Content>
//     </ProfileContainer>
//   );
// };

// export default TeacherProfileSection;


import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { 
  ProfileContainer, 
  SidebarContainer, 
  Content, 
  ProfileHeader, 
  ProfileDetails, 
  ProfileLabel, 
  ProfileInfo, 
  EditButton,
  EditInput
} from '../../styles/TeacherProfileStyles'; 

const TeacherProfileSection = () => {
  const [teacherInfo, setTeacherInfo] = useState({
    name: 'Wasif Ali',
    email: 'wasifali@example.com',
    phone: '0321-4567890',
    address: '123 Main St, Islamabad, Pakistan',
    qualification: 'Master of Education',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedInfo, setEditedInfo] = useState({ ...teacherInfo });

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      setTeacherInfo(editedInfo);
      setIsEditing(false);
    } else {
      // Enter edit mode
      setEditedInfo({ ...teacherInfo });
      setIsEditing(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <ProfileContainer>
      <SidebarContainer>
        <Sidebar />
      </SidebarContainer>
      <Content>
        <ProfileHeader>Profile Details</ProfileHeader>
        <ProfileDetails>
          {isEditing ? (
            <>
              <ProfileLabel>Name:</ProfileLabel>
              <EditInput 
                type="text"
                name="name"
                value={editedInfo.name}
                onChange={handleInputChange}
              />
              
              <ProfileLabel>Email:</ProfileLabel>
              <EditInput 
                type="email"
                name="email"
                value={editedInfo.email}
                onChange={handleInputChange}
              />
              
              <ProfileLabel>Phone:</ProfileLabel>
              <EditInput 
                type="tel"
                name="phone"
                value={editedInfo.phone}
                onChange={handleInputChange}
              />
              
              <ProfileLabel>Address:</ProfileLabel>
              <EditInput 
                type="text"
                name="address"
                value={editedInfo.address}
                onChange={handleInputChange}
              />
              
              <ProfileLabel>Qualification:</ProfileLabel>
              <EditInput 
                type="text"
                name="qualification"
                value={editedInfo.qualification}
                onChange={handleInputChange}
              />
            </>
          ) : (
            <>
              <ProfileLabel>Name:</ProfileLabel>
              <ProfileInfo>{teacherInfo.name}</ProfileInfo>
              
              <ProfileLabel>Email:</ProfileLabel>
              <ProfileInfo>{teacherInfo.email}</ProfileInfo>
              
              <ProfileLabel>Phone:</ProfileLabel>
              <ProfileInfo>{teacherInfo.phone}</ProfileInfo>
              
              <ProfileLabel>Address:</ProfileLabel>
              <ProfileInfo>{teacherInfo.address}</ProfileInfo>
              
              <ProfileLabel>Qualification:</ProfileLabel>
              <ProfileInfo>{teacherInfo.qualification}</ProfileInfo>
            </>
          )}
        </ProfileDetails>
        
        <EditButton onClick={handleEditToggle}>
          {isEditing ? 'Save Profile' : 'Edit Profile'}
        </EditButton>
      </Content>
    </ProfileContainer>
  );
};

export default TeacherProfileSection;