import styled from 'styled-components';
import { Link } from 'react-router-dom';


export const GetStartedButton = styled.button`
  background: #7c3aed;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 9999px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #6d28d9;
  }
`;

export const MainContainer = styled.main`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 0.5rem 2rem;
  background: #e0f7fa; /* Light blue background */
  min-height: 120vh;
`;

export const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;





export const GuestButton = styled.button`
  color: blue;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid orange;
  border-radius: 5px;
  background-color: transparent;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: orange;
  }

  @media screen and (max-width: 768px) {
    padding: 8px 16px;
    font-size: 14px;
  }
`;

export const IllustrationSection = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    max-width: 100%;
    height: auto;
    border-radius: 1rem;
  }
`;

export const WebsiteTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

export const WebsiteDescription = styled.p`
  font-size: 1.125rem;
  color: #4b5563;
  line-height: 1.7;
  max-width: 500px;
`;

export const PurpleButton = styled.button`
  background: #7c3aed;
  color: white;
  padding: 1rem 2rem;
  border-radius: 9999px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  width: fit-content;

  &:hover {
    background: #6d28d9;
  }
`;

export const AdminRegisterLink = styled(Link)`
  color: white;
  font-size: 12px;
  font-weight: bold;
  text-decoration: none;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }

  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`;
export const NavbarContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #ffffff;
  padding: 1rem 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  z-index: 1000;

  @media (max-width: 1024px) {
    padding: 0.8rem 1.5rem;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;

// Logo
export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #1a1a1a;

  @media (max-width: 768px) {
    margin-bottom: 0.5rem;
  }
`;

// Navigation Links
export const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1rem;
  }
`;

// Individual Navigation Link
export const NavLink = styled.a`
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s ease;

  &:hover {
    color: #1a1a1a;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  margin-left: auto; /* Push buttons to the right */
  padding-right: 1rem; /* Add space from the screen edge */

  @media (max-width: 768px) {
    justify-content: flex-end; /* Maintain right alignment on mobile */
    width: 100%;
    padding-right: 1rem; /* Ensure spacing on smaller screens */
  }
`;



export const LoginButton = styled.button`
  background-color: black;
  color: white;
  border: solid 2px black;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: white;
    color: black;
  }

  @media (max-width: 1024px) {
    font-size: 14px;
    padding: 8px 16px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
    padding: 8px 16px;
  }
`;
