// import { render, screen } from '@testing-library/react';
// import App from './App';

// test('renders learn react link', () => {
//   render(<App />);
//   const linkElement = screen.getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });
// PrivateRoute.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('PrivateRoute Component', () => {
  test('renders Header and Outlet when authenticated', () => {
    // Set up authentication state
    sessionStorage.setItem('accessToken', 'fakeAccessToken');
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Ensure Header is rendered
    expect(screen.getByTestId('header')).toBeInTheDocument();
    // Ensure Outlet content is rendered
    expect(screen.getByTestId('outlet')).toBeInTheDocument();
  });

  test('redirects to /account when not authenticated', () => {
    // Clear authentication state
    sessionStorage.removeItem('accessToken');
    render(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    // Ensure redirection to /account
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});
