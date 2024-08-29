import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchShowDetails, fetchEpisodes } from '../store/showSlice';
import { RootState, AppDispatch } from '../store';
import styled from 'styled-components';


const Container = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 15px;
  }
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: #333;

  @media (max-width: 768px) {
    font-size: 2rem;
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

  & li {
    margin: 10px 0;
  }

  & a {
    color: #0066cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ShowDetails: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const { show, episodes } = useSelector((state: RootState) => state.show);

  useEffect(() => {
    dispatch(fetchShowDetails());
    dispatch(fetchEpisodes());
  }, [dispatch]);

  if (!show) return <div>Loading...</div>;

  return (
    <Container data-testid="show-details">
      <Title>{show.name}</Title>
      <Image src={show.image.original} alt={show.name} />
      <Summary dangerouslySetInnerHTML={{ __html: show.summary }} />
      <h2>Episodes</h2>
      <EpisodesList>
        {episodes.map((episode) => (
          <li key={episode.id}>
            <a href={`/episode/${episode.id}`}>{episode.name}</a>
          </li>
        ))}
      </EpisodesList>
    </Container>
  );
};

export default ShowDetails;
