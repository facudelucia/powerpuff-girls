import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import ShowDetails from './ShowDetails';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

describe('ShowDetails Component', () => {
  test('renders loading text before data is loaded', async () => {
    render(
      <Provider store={store}>
         <MemoryRouter>
          <ShowDetails />
         </MemoryRouter>
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
          <MemoryRouter>
            <ShowDetails />
          </MemoryRouter>
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
