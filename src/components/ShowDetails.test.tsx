import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store';
import ShowDetails from './ShowDetails';
import renderer from 'react-test-renderer';

describe('ShowDetails Component', () => {
  test('renders loading text before data is loaded', () => {
    render(
      <Provider store={store}>
        <ShowDetails />
      </Provider>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  test('matches snapshot', () => {
    const tree = renderer
      .create(
        <Provider store={store}>
          <ShowDetails />
        </Provider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
