import styled from 'styled-components';

// Admin Dashboard Container
export const AdminDashboardContainer = styled.div`
  display: flex;
  background-color: #f4f5f7; /* Neutral background for better readability */
  min-height: 100vh; /* Full viewport height */
`;

// Content Area
export const Content = styled.div`
  flex: 1;
  padding: 30px;
  margin-left: ${({ isOpen }) => (isOpen ? '250px' : '80px')}; /* Adjust margin based on sidebar state */
  transition: margin-left 0.3s ease;
`;

// Top Section (e.g., Overview and Calendar)
export const TopContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

// Bottom Section (e.g., Performance and Announcements)
export const BottomContent = styled.div`
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

// Reusable Section Component
export const Section = styled.section`
  flex: 1;
  min-width: 320px; /* Maintain layout integrity on smaller screens */
  background-color: #ffffff;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

// Section Title Styling
export const SectionTitle = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
  color: #333333;
  font-weight: bold;
`;

// Card Container
export const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between; /* Even spacing between cards */
`;

// Individual Card Styling
export const Card = styled.div`
  background-color: #ffffff;
  flex: 1 1 200px; /* Flexible width with a minimum size */
  padding: 20px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }
`;

// Card Title Styling
export const CardTitle = styled.h3`
  font-size: 18px;
  color: #007bff;
  margin-bottom: 10px;
`;

// Card Content Styling
export const CardContent = styled.p`
  font-size: 16px;
  color: #555555;
`;

// Student Dashboard Container
export const StudentDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 240px;
  gap: 20px;
`;

// Teacher Dashboard Container
export const TeacherDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 240px;
  gap: 20px;
`;

// Utility: Shadow for Reusable Box Styles
const boxShadow = `0 4px 12px rgba(0, 0, 0, 0.1)`;

// Utility: Media Queries
const breakpoints = {
  mobile: '640px',
  tablet: '768px',
  desktop: '1024px',
};

// Responsive Styling for Sections
export const ResponsiveSection = styled(Section)`
  @media (max-width: ${breakpoints.tablet}) {
    flex: 1 1 100%; /* Stack sections on smaller screens */
  }
`;

// Styling for Performance Charts or Widgets
export const PerformanceWidget = styled.div`
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: ${boxShadow};
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

// Styling for Announcements Section
export const AnnouncementsSection = styled(Section)`
  overflow-y: auto; /* Scroll for long content */
  max-height: 300px; /* Limit height for better layout control */
`;

