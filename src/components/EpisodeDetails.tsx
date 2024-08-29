import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 800px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;

const Summary = styled.div`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const EpisodeDetails: React.FC = () => {
  const selectedEpisode = useSelector((state: RootState) => state.show.selectedEpisode);

  if (!selectedEpisode) return <div>Loading...</div>;

  return (
    <Container data-testid="episode-details">
      <Title>{selectedEpisode.name}</Title>
      {selectedEpisode.image && (
        <Image src={selectedEpisode.image.original} alt={selectedEpisode.name} />
      )}
      <Summary dangerouslySetInnerHTML={{ __html: selectedEpisode.summary }} />
    </Container>
  );
};

export default EpisodeDetails;
