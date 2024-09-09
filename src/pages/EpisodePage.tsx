import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate  } from 'react-router-dom';
import { selectEpisode, fetchEpisodes } from '../store/showSlice';
import EpisodeDetails from '../components/EpisodeDetails';
import { AppDispatch } from '../store';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #ece9e6, #ffffff);

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const EpisodeCard = styled.div`
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

const GoBackButton = styled.button`
  background-color: #3498db;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    background-color: #2980b9;
    transform: scale(1.05);
  }

  &:focus {
    outline: none;
  }
`;

const EpisodePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate(); 

  useEffect(() => {
      dispatch(selectEpisode(Number(id)));
  }, [dispatch, id]); 
  
  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <PageContainer>
      <EpisodeCard data-testid="episode-details">
        <GoBackButton onClick={handleGoBack}>{"< Go Back"}</GoBackButton>
        <EpisodeDetails />
      </EpisodeCard>
    </PageContainer>
  );
};

export default EpisodePage;
