import React from 'react';
import ShowDetails from '../components/ShowDetails';
import styled from 'styled-components';


const PageContainer = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const ShowPage: React.FC = () => {
  return (
    <PageContainer>
      <ShowDetails />
    </PageContainer>
  );
};

export default ShowPage;
