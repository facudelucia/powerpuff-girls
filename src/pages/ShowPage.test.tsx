import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShowPage from './ShowPage';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { store } from '../store';

describe('ShowPage Component', () => {
  test('renders ShowPage and shows loading state', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ShowPage />
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toBeInTheDocument();
    });
  });

  test('matches the snapshot', () => {
    const tree = renderer.create(
      <Provider store={store}>
        <MemoryRouter>
          <ShowPage />
        </MemoryRouter>
      </Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
