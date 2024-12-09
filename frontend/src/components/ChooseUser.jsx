import React from 'react';
import { Link } from 'react-router-dom';
import { UserCircle, GraduationCap, Users } from 'lucide-react';
import {
  PageContainer,
  CardsContainer,
  Card,
  IconWrapper,
  Title,
  Description,
  StyledLink
} from '../styles/ChooseUserStyles';

const ChooseUser = () => {
  return (
    <PageContainer>
      <CardsContainer>
        <Card>
          <IconWrapper>
            <UserCircle size={32} />
          </IconWrapper>
          <Title>Admin</Title>
          <Description>
            Login as an administrator to access the dashboard to manage app data.
          </Description>
          <StyledLink as={Link} to="/admin-signIn">
            Login as Admin
          </StyledLink>
        </Card>

        <Card>
          <IconWrapper>
            <GraduationCap size={32} />
          </IconWrapper>
          <Title>Student</Title>
          <Description>
            Login as a student to explore course materials and assignments.
          </Description>
          <StyledLink as={Link} to="/student-signIn">
            Login as Student
          </StyledLink>
        </Card>

        <Card>
          <IconWrapper>
            <Users size={32} />
          </IconWrapper>
          <Title>Teacher</Title>
          <Description>
            Login as a teacher to create courses, assignments, and track student progress.
          </Description>
          <StyledLink as={Link} to="/teacher-signIn">
            Login as Teacher
          </StyledLink>
        </Card>
      </CardsContainer>
    </PageContainer>
  );
};

export default ChooseUser;