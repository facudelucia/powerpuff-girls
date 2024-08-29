import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { selectEpisode, fetchEpisodes } from '../store/showSlice';
import EpisodeDetails from '../components/EpisodeDetails';
import { AppDispatch } from '../store';
import styled from 'styled-components';


const PageContainer = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const EpisodePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEpisodes()).then(() => {
      dispatch(selectEpisode(Number(id)));
    });
  }, [dispatch, id]);

  return (
    <PageContainer>
      <EpisodeDetails />
    </PageContainer>
  );
};

export default EpisodePage;
