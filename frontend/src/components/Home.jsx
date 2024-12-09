import React from 'react';
import {
  NavbarContainer,
  NavLinks,
  MainContainer,
  ContentSection,
  IllustrationSection,
  WebsiteTitle,
  WebsiteDescription,
  Logo,
  ButtonsContainer,
  LoginButton,
} from '../styles/styles';

import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/choose-user');
  };

  return (
    <>
      <NavbarContainer>
        <Logo>Flex 2.0</Logo>
        <NavLinks>
          <ButtonsContainer>
            <LoginButton onClick={handleLoginClick}>Sign In</LoginButton>
          </ButtonsContainer>
        </NavLinks>
      </NavbarContainer>

      <MainContainer>
        <ContentSection>
          <WebsiteTitle>University Management System</WebsiteTitle>
          <WebsiteDescription>
            Our website streamlines administrative tasks, bridges the gap of communication between admin, faculty and students and ehnances communication between them. This modern solution is designed to make school management effortless and effective.
          </WebsiteDescription>
        </ContentSection>

        <IllustrationSection>
        <img 
          src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d29ya3xlbnwwfHwwfHx8MA%3D%3D" 
           alt="School Management System Illustration"
          />

        </IllustrationSection>
      </MainContainer>
    </>
  );
};

export default Home;
