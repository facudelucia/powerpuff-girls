import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import EpisodeDetails from './EpisodeDetails';
import renderer from 'react-test-renderer';

describe('EpisodeDetails Component', () => {
  test('renders loading text before data is loaded', async () => {
    render(
      <Provider store={store}>
        <EpisodeDetails />
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
  });

  test('matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <EpisodeDetails />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
