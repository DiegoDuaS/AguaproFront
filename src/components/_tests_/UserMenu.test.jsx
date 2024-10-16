// UserMenu.test.jsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserMenu from '../UserMenu';
import useUserData from '../../hooks/useUserData';
import '@testing-library/jest-dom'

jest.mock('../../hooks/useUserData'); // Mock the custom hook

describe('UserMenu', () => {
  const mockCloseUserMenu = jest.fn();
  const mockOnLogout = jest.fn();
  const mockOnViewInfo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders user data correctly', () => {
    useUserData.mockReturnValue({
      userData: { username: 'JohnDoe' },
      loading: false,
      error: null,
    });

    render(
      <UserMenu
        closeUserMenu={mockCloseUserMenu}
        onLogout={mockOnLogout}
        onViewInfo={mockOnViewInfo}
      />
    );

    expect(screen.getByText('Hola JohnDoe')).toBeInTheDocument();
  });

  test('shows loading state', () => {
    useUserData.mockReturnValue({
      userData: null,
      loading: true,
      error: null,
    });

    render(
      <UserMenu
        closeUserMenu={mockCloseUserMenu}
        onLogout={mockOnLogout}
        onViewInfo={mockOnViewInfo}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('displays error message', () => {
    useUserData.mockReturnValue({
      userData: null,
      loading: false,
      error: 'Failed to fetch user data',
    });

    render(
      <UserMenu
        closeUserMenu={mockCloseUserMenu}
        onLogout={mockOnLogout}
        onViewInfo={mockOnViewInfo}
      />
    );

    expect(screen.getByText('Failed to fetch user data')).toBeInTheDocument();
  });

  test('calls onViewInfo when "Mi Información" is clicked', () => {
    useUserData.mockReturnValue({
      userData: { username: 'JohnDoe' },
      loading: false,
      error: null,
    });

    render(
      <UserMenu
        closeUserMenu={mockCloseUserMenu}
        onLogout={mockOnLogout}
        onViewInfo={mockOnViewInfo}
      />
    );

    const infoButton = screen.getByText('Mi Información');
    fireEvent.click(infoButton);

    expect(mockOnViewInfo).toHaveBeenCalledTimes(1);
  });

  test('calls onLogout when "Logout" is clicked', () => {
    useUserData.mockReturnValue({
      userData: { username: 'JohnDoe' },
      loading: false,
      error: null,
    });

    render(
      <UserMenu
        closeUserMenu={mockCloseUserMenu}
        onLogout={mockOnLogout}
        onViewInfo={mockOnViewInfo}
      />
    );

    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);

    expect(mockOnLogout).toHaveBeenCalledTimes(1);
  });

  test('closes the menu when clicking outside', async () => {
    useUserData.mockReturnValue({
      userData: { username: 'JohnDoe' },
      loading: false,
      error: null,
    });

    render(
      <UserMenu
        closeUserMenu={mockCloseUserMenu}
        onLogout={mockOnLogout}
        onViewInfo={mockOnViewInfo}
      />
    );

    // Simulate clicking outside the menu
    fireEvent.mouseDown(document);

    await waitFor(() => {
      expect(mockCloseUserMenu).toHaveBeenCalledTimes(1);
    });
  });
});
