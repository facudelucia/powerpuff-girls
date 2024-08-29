import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import EpisodePage from './EpisodePage';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { store } from '../store';

describe('EpisodePage Component', () => {
  test('renders EpisodePage and shows loading state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <EpisodePage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('matches the snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <EpisodePage />
        </MemoryRouter>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
