// TeacherDashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import { TeacherDashboardContainer, Content, Section, SectionTitle, CardContainer, Card, CardTitle, CardContent } 
from '../../styles/DashboardStyles';

const TeacherDashboard = () => {
  return (
    <TeacherDashboardContainer>
      <Sidebar />
      <Content>
        <Section>
          <SectionTitle>Overview</SectionTitle>
          <CardContainer>
            <Card>
              <CardTitle>Name</CardTitle>
              <CardContent>Sir Wasif Ali</CardContent>
            </Card>
            <Card>
              <CardTitle>Department</CardTitle>
              <CardContent>Software Engineering</CardContent>
            </Card>
            <Card>
              <CardTitle>Subject</CardTitle>
              <CardContent>Web Engineering</CardContent>
            </Card>
          </CardContainer>
        </Section>

        <Section>
          <SectionTitle>Recent Activity</SectionTitle>
          {/* Add a list of recent activity items */}
        </Section>

        <Section>
          <SectionTitle>Upcoming Events</SectionTitle>
          {/* Add a calendar or list of upcoming events */}
        </Section>

        {/* Add more sections for other parts of the admin dashboard */}
      </Content>
    </TeacherDashboardContainer>
  );
};

export default TeacherDashboard;


// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import { 
//   TeacherDashboardContainer, 
//   Content, 
//   Section, 
//   SectionTitle, 
//   CardContainer, 
//   Card, 
//   CardTitle, 
//   CardContent 
// } from '../../styles/DashboardStyles.js';
// import { useAuth } from '../../context/AuthContext.jsx'; // Assuming you have an AuthContext
// import { fetchTeacherDetails } from '../../services/teacherService.jsx'; // Create this service

// const TeacherDashboard = () => {
//   const { user } = useAuth(); // Get the logged-in user from AuthContext
//   const [teacherDetails, setTeacherDetails] = useState({
//     name: '',
//     department: '',
//     subjects: [],
//     email: ''
//   });

//   useEffect(() => {
//     const loadTeacherDetails = async () => {
//       if (user && user.email) {
//         try {
//           // Fetch teacher details based on the logged-in user's email
//           const details = await fetchTeacherDetails(user.email);
//           setTeacherDetails(details);
//         } catch (error) {
//           console.error('Error fetching teacher details:', error);
//         }
//       }
//     };

//     loadTeacherDetails();
//   }, [user]);

//   return (
//     <TeacherDashboardContainer>
//       <Sidebar />
//       <Content>
//         <Section>
//           <SectionTitle>Overview</SectionTitle>
//           <CardContainer>
//             <Card>
//               <CardTitle>Name</CardTitle>
//               <CardContent>{teacherDetails.name || 'Loading...'}</CardContent>
//             </Card>
//             <Card>
//               <CardTitle>Department</CardTitle>
//               <CardContent>{teacherDetails.department || 'Loading...'}</CardContent>
//             </Card>
//             <Card>
//               <CardTitle>Email</CardTitle>
//               <CardContent>{teacherDetails.email || 'Loading...'}</CardContent>
//             </Card>
//           </CardContainer>
//         </Section>

//         <Section>
//           <SectionTitle>Subjects</SectionTitle>
//           <CardContainer>
//             {teacherDetails.subjects && teacherDetails.subjects.length > 0 ? (
//               teacherDetails.subjects.map((subject, index) => (
//                 <Card key={index}>
//                   <CardTitle>Subject {index + 1}</CardTitle>
//                   <CardContent>{subject}</CardContent>
//                 </Card>
//               ))
//             ) : (
//               <Card>
//                 <CardContent>No subjects assigned</CardContent>
//               </Card>
//             )}
//           </CardContainer>
//         </Section>

//         <Section>
//           <SectionTitle>Recent Activity</SectionTitle>
//           {/* Add a list of recent activity items */}
//         </Section>

//         <Section>
//           <SectionTitle>Upcoming Events</SectionTitle>
//           {/* Add a calendar or list of upcoming events */}
//         </Section>
//       </Content>
//     </TeacherDashboardContainer>
//   );
// };

// export default TeacherDashboard;

// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import { 
//   TeacherDashboardContainer, 
//   Content, 
//   Section, 
//   SectionTitle, 
//   CardContainer, 
//   Card, 
//   CardTitle, 
//   CardContent 
// } from '../../styles/DashboardStyles.js';
// import { useAuth } from '../../context/AuthContext.jsx';
// import { fetchTeacherDetails } from '../../services/teacherService.jsx';

// const TeacherDashboard = () => {
//   const { user } = useAuth();
//   const [teacherDetails, setTeacherDetails] = useState({
//     name: '',
//     department: '',
//     subjects: [],
//     email: ''
//   });

//   useEffect(() => {
//     const loadTeacherDetails = async () => {
//       if (user?.email) {
//         try {
//           const details = await fetchTeacherDetails(user.email);
//           setTeacherDetails(details);
//         } catch (error) {
//           console.error('Error fetching teacher details:', error);
//         }
//       }
//     };

//     loadTeacherDetails();
//   }, [user]);

//   if (!user) {
//     return <div>Loading user data...</div>;
//   }

//   return (
//     <TeacherDashboardContainer>
//       <Sidebar />
//       <Content>
//         <Section>
//           <SectionTitle>Overview</SectionTitle>
//           <CardContainer>
//             <Card>
//               <CardTitle>Name</CardTitle>
//               <CardContent>{teacherDetails.name || 'Loading...'}</CardContent>
//             </Card>
//             <Card>
//               <CardTitle>Department</CardTitle>
//               <CardContent>{teacherDetails.department || 'Loading...'}</CardContent>
//             </Card>
//             <Card>
//               <CardTitle>Email</CardTitle>
//               <CardContent>{teacherDetails.email || 'Loading...'}</CardContent>
//             </Card>
//           </CardContainer>
//         </Section>

//         <Section>
//           <SectionTitle>Subjects</SectionTitle>
//           <CardContainer>
//             {teacherDetails.subjects && teacherDetails.subjects.length > 0 ? (
//               teacherDetails.subjects.map((subject, index) => (
//                 <Card key={index}>
//                   <CardTitle>Subject {index + 1}</CardTitle>
//                   <CardContent>{subject}</CardContent>
//                 </Card>
//               ))
//             ) : (
//               <Card>
//                 <CardContent>No subjects assigned</CardContent>
//               </Card>
//             )}
//           </CardContainer>
//         </Section>
//       </Content>
//     </TeacherDashboardContainer>
//   );
// };

// export default TeacherDashboard;



// import React, { useState, useEffect } from 'react';
// import Sidebar from './Sidebar';
// import {
//   TeacherDashboardContainer,
//   Content,
//   Section,
//   SectionTitle,
//   CardContainer,
//   Card,
//   CardTitle,
//   CardContent,
// } from '../../styles/DashboardStyles.js';
// import { useAuth } from '../../context/AuthContext.jsx';
// import { fetchTeacherDetails } from '../../services/teacherService.jsx';

// const TeacherDashboard = () => {
//   const { user } = useAuth();
//   const [teacherDetails, setTeacherDetails] = useState({
//     name: '',
//     department: '',
//     subjects: [],
//     email: '',
//   });

  
//   useEffect(() => {
//     const loadTeacherDetails = async () => {
//       if (user?.email) {
//         try {
//           const details = await fetchTeacherDetails(user.email);
//           setTeacherDetails(details);
//         } catch (error) {
//           console.error('Error fetching teacher details:', error);
//         }
//       }
//     };

//     loadTeacherDetails();
//   }, [user]);

//   if (!user) {
//     return <div>Loading user data...</div>;
//   }

//   return (
//     <TeacherDashboardContainer>
//       <Sidebar />
//       <Content>
//         <Section>
//           <SectionTitle>Overview</SectionTitle>
//           <CardContainer>
//             <Card>
//               <CardTitle>Name</CardTitle>
//               <CardContent>{teacherDetails.name || 'Loading...'}</CardContent>
//             </Card>
//             <Card>
//               <CardTitle>Department</CardTitle>
//               <CardContent>{teacherDetails.department || 'Loading...'}</CardContent>
//             </Card>
//             <Card>
//               <CardTitle>Email</CardTitle>
//               <CardContent>{teacherDetails.email || 'Loading...'}</CardContent>
//             </Card>
//           </CardContainer>
//         </Section>

//         <Section>
//           <SectionTitle>Subjects</SectionTitle>
//           <CardContainer>
//             {teacherDetails.subjects && teacherDetails.subjects.length > 0 ? (
//               teacherDetails.subjects.map((subject, index) => (
//                 <Card key={index}>
//                   <CardTitle>Subject {index + 1}</CardTitle>
//                   <CardContent>{subject}</CardContent>
//                 </Card>
//               ))
//             ) : (
//               <Card>
//                 <CardContent>No subjects assigned</CardContent>
//               </Card>
//             )}
//           </CardContainer>
//         </Section>
//       </Content>
//     </TeacherDashboardContainer>
//   );
// };

// export default TeacherDashboard;
