import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Calm-React title', () => {
  render(<App />);
  const titleElement = screen.getByText(/Calm-React/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders description', () => {
  render(<App />);
  const descElement = screen.getByText(/Responsive webpages in React/i);
  expect(descElement).toBeInTheDocument();
});
