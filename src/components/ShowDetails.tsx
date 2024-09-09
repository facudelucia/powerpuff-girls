import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchShowDetails, fetchEpisodes } from '../store/showSlice';
import { RootState, AppDispatch } from '../store';
import styled, { keyframes } from 'styled-components';

// Styled Components
const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;
  text-align: center;
  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Image = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
  border-radius: 8px;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Summary = styled.div`
  font-size: 1.1rem;
  color: #555;
  line-height: 1.6;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  & p {
    margin-bottom: 10px;
  }
`;

const EpisodesList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const EpisodeCard = styled.li`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 200px;
  text-align: center;
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  
  &:hover {
    cursor:pointer;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-10px);
  }
`;

const EpisodeImage = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const EpisodeTitle = styled.a`
  text-decoration: none;
  color: #0066cc;
  font-size: 1.1rem;
  font-weight: bold;
  display: block;
  margin-top: 10px;

  &:hover {
    text-decoration: underline;
  }
`;

const LoadingSpinner = styled.div`
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #3498db;
  width: 40px;
  height: 40px;
  animation: ${keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  `} 2s linear infinite;
  margin: 20px auto;
`;

const ShowDetails: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const { show, episodes, status } = useSelector((state: RootState) => state.show);

  useEffect(() => {
    if(!show){
      dispatch(fetchShowDetails());
    }
    if(episodes.length === 0){
      dispatch(fetchEpisodes());
    }
  }, [dispatch, show, episodes]);

  const handleCardClick = (id: number) => {
    navigate(`/episode/${id}`); 
  };

  if (status === 'loading') return <LoadingSpinner data-testid="loading" />;

  if (!show) return <div>Error loading show details</div>;

  return (
    <Container data-testid="show-details">
      <Title>{show.name}</Title>
      <Image src={show.image.original} alt={show.name} />
      <Summary dangerouslySetInnerHTML={{ __html: show.summary }} />
      <h2>Episodes</h2>
      <EpisodesList>
        {episodes.map((episode) => (
          <EpisodeCard key={episode.id} onClick={() => handleCardClick(episode.id)}>
            {episode.image ? (
              <EpisodeImage src={episode.image.medium} alt={episode.name} />
            ) : (
              <EpisodeImage
                src="https://via.placeholder.com/210x295?text=No+Image"
                alt="No image available"
              />
            )}
            <EpisodeTitle href={`/episode/${episode.id}`}>{episode.name}</EpisodeTitle>
          </EpisodeCard>
        ))}
      </EpisodesList>
    </Container>
  );
};

export default ShowDetails;
