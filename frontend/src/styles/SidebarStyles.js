import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ isOpen }) => (isOpen ? '250px' : '80px')};
  height: 100%;
  background: linear-gradient(180deg, #34495e, #2c3e50); /* Gradient for modern look */
  color: white;
  overflow-y: auto;
  padding-top: 60px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  transition: width 0.3s ease, background-color 0.3s ease;
  z-index: 100;

  @media (max-width: 640px) {
    width: ${({ isOpen }) => (isOpen ? '200px' : '60px')}; /* Smaller width for mobile */
  }

  @media (min-width: 641px) and (max-width: 1024px) {
    width: ${({ isOpen }) => (isOpen ? '220px' : '70px')};
  }
`;

export const SidebarHeader = styled.div`
  padding: 20px;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  color: #ecf0f1; /* Light text */
  border-bottom: 1px solid #34495e; /* Separation line */
`;

export const SidebarNav = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const SidebarNavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 20px;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 1px solid #34495e; /* Dividers */
  transition: all 0.3s ease;

  &:hover {
    background-color: #1abc9c; /* Attractive hover color */
    color: white;
    transform: scale(1.05); /* Slight zoom effect on hover */
  }

  @media (max-width: 640px) {
    font-size: 14px;
    padding: 10px 15px;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
  margin-left: 10px;
  display: ${({ isOpen }) => (isOpen ? 'inline-block' : 'none')};
  transition: opacity 0.3s ease;

  @media (max-width: 640px) {
    font-size: 14px;
  }
`;

export const SidebarIcon = styled.div`
  font-size: 20px;
  margin-right: 15px;
  color: #bdc3c7; /* Muted icon color */
  transition: color 0.3s ease;

  ${SidebarNavItem}:hover & {
    color: white; /* Brighten icon on hover */
  }
`;

export const Logo = styled.img`
  width: ${({ isOpen }) => (isOpen ? '50px' : '30px')};
  height: auto;
  transition: width 0.3s ease;

  @media (max-width: 640px) {
    width: ${({ isOpen }) => (isOpen ? '40px' : '25px')};
  }
`;

export const ToggleButton = styled.div`
  position: absolute;
  top: 20px;
  right: ${({ isOpen }) => (isOpen ? '-40px' : '-20px')};
  width: 30px;
  height: 30px;
  background-color: #1abc9c; /* Attractive toggle color */
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  z-index: 101;

  &:hover {
    background-color: #16a085; /* Darker toggle on hover */
  }

  @media (max-width: 640px) {
    right: ${({ isOpen }) => (isOpen ? '-30px' : '-10px')};
  }
`;

export const ToggleIcon = styled.span`
  color: white;
  font-size: 20px;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;
`;

