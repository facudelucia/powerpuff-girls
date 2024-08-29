import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import ShowPage from './pages/ShowPage';
import EpisodePage from './pages/EpisodePage';
import { store } from './store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer'

describe('App Component', () => {
  test('renders ShowPage component as the default route', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<ShowPage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('show-details')).toBeInTheDocument();
    });
  });

  test('renders EpisodePage component when navigating to /episode/:id', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/episode/657308']}>
          <Routes>
            <Route path="/episode/:id" element={<EpisodePage />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('episode-details')).toBeInTheDocument();
    });
  });

  test('matches the snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
          <App />
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
