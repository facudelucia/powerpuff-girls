import React from 'react';
import ShowDetails from '../components/ShowDetails';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  
  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ShowCard = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 1000px;
  width: 100%;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const ShowPage: React.FC = () => {
  return (
    <PageContainer>
      <ShowCard>
        <ShowDetails />
      </ShowCard>
    </PageContainer>
  );
};

export default ShowPage;
