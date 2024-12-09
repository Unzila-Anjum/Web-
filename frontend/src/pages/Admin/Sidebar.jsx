import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { BsGraphUp, BsPeople, BsPerson, BsFileText, BsBook, BsGraphDown, BsCalendar, BsGear, BsChatDots, BsCalendarEvent, BsList } from "react-icons/bs";

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #2c3e50;
  color: white;
  overflow-y: auto;
  transition: width 0.3s ease;
  z-index: 100;

  width: ${({ isOpen }) => (isOpen ? "250px" : "0")};

  /* Always visible on large screens */
  @media (min-width: 769px) {
    width: 250px;
  }

  /* Adjust the width on small and medium screens */
  @media (max-width: 768px) {
    width: ${({ isOpen }) => (isOpen ? "200px" : "0")};
  }
`;

const SidebarHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  img {
    width: 50px;
    height: auto;
  }
`;

const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  flex-grow: 1;
`;

const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  font-size: 16px;
  transition: background-color 0.3s ease, padding-left 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #34495e;
    padding-left: 25px;
  }

  svg {
    font-size: 20px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 10px 15px;
  }
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: ${({ isOpen }) => (isOpen ? "10px" : "0")};
  display: ${({ isOpen }) => (isOpen ? "inline-block" : "none")};
  transition: opacity 0.3s ease;

  /* Always show the link text on larger screens */
  @media (min-width: 769px) {
    display: inline-block;
  }
`;

const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 30px;
  height: 30px;
  background-color: #34495e;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 101;

  @media (min-width: 769px) {
    display: none;
  }
`;

const ToggleIcon = styled(BsList)`
  color: white;
  font-size: 20px;
`;

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ToggleButton onClick={toggleSidebar}>
        <ToggleIcon />
      </ToggleButton>
      <SidebarContainer isOpen={isOpen}>
        <SidebarHeader>
          <img src="/assets/logo.png" alt="Logo" />
        </SidebarHeader>
        <SidebarNav>
          <SidebarNavItem>
            <BsGraphUp />
            <StyledLink to="/admin/dashboard" isOpen={isOpen}> Dashboard</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <BsPeople />
            <StyledLink to="/admin/classes" isOpen={isOpen}> Courses</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <BsPerson />
            <StyledLink to="/admin/teachers" isOpen={isOpen}> Teachers</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <BsPerson />
            <StyledLink to="/admin/students" isOpen={isOpen}> Students </StyledLink>
          </SidebarNavItem>
       
          <SidebarNavItem>
            <BsFileText />
            <StyledLink to="/admin/timetable" isOpen={isOpen}> TimeTable</StyledLink>
          </SidebarNavItem>
         
          <SidebarNavItem>
            <BsGraphDown />
            <StyledLink to="/admin/performance" isOpen={isOpen}> Performance</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <BsCalendar />
            <StyledLink to="/admin/attendance" isOpen={isOpen}> Attendance</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <BsChatDots />
            <StyledLink to="/admin/communication" isOpen={isOpen}> Announcement</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <BsCalendarEvent />
            <StyledLink to="/admin/events" isOpen={isOpen}> Events & Calendar</StyledLink>
          </SidebarNavItem>
          <SidebarNavItem>
            <BsGear />
            <StyledLink to="/admin/profile" isOpen={isOpen}> Settings & Profile</StyledLink>
          </SidebarNavItem>
        </SidebarNav>
      </SidebarContainer>
    </>
  );
};

export default Sidebar;
