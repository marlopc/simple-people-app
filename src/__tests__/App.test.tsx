import App from '../App';

import { render, screen } from '@testing-library/react';

describe('App component', () => {
  test('renders page\'s title', () => {
    render(<App />);
    const titleElement = screen.getByText(/People/i);
    expect(titleElement).toBeInTheDocument();
  });
});
