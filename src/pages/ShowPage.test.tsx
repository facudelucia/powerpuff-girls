import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ShowPage from './ShowPage';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { store } from '../store';

describe('ShowPage Component', () => {
  test('renders ShowPage and shows loading state', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ShowPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
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
