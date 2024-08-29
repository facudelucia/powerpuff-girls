import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import EpisodeDetails from './EpisodeDetails';
import renderer from 'react-test-renderer';

describe('EpisodeDetails Component', () => {
  test('renders loading text before data is loaded', () => {
    render(
      <Provider store={store}>
        <EpisodeDetails />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
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
