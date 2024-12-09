import styled from 'styled-components';

export const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #e0f7fa;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  width: 100%;
  max-width: 1200px;
  
  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    max-width: 400px;
  }
`;

export const Card = styled.div`
  background: white;
  border-radius: 1rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 12px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 480px) {
    padding: 1.5rem;
  }
`;

export const IconWrapper = styled.div`
  background-color: #6f412a;
  color: white;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1.5rem;

  @media (max-width: 480px) {
    width: 56px;
    height: 56px;
  }
`;

export const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: #2D3748;
  margin-bottom: 1rem;

  @media (max-width: 480px) {
    font-size: 1.25rem;
  }
`;

export const Description = styled.p`
  color: #718096;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  flex-grow: 1;

  @media (max-width: 480px) {
    font-size: 0.875rem;
  }
`;

export const StyledLink = styled.a`
  background-color: #6f412a;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s ease;
  width: 100%;
  text-align: center;

  &:hover {
    background-color: #3B0062;
  }

  @media (max-width: 480px) {
    padding: 0.625rem 1.25rem;
    font-size: 0.875rem;
  }
`;