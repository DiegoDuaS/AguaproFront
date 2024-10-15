// AdminHeader.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminHeader from '../headers/AdminHeader';

describe('AdminHeader', () => {
  const mockHandleLogout = jest.fn();
  const mockToggleMenu = jest.fn();
  const mockHandleLeave = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the menu icon, company name, user icon, and logout icon', () => {
    render(
      <AdminHeader
        handleLogout={mockHandleLogout}
        isExpanded={false}
        toggleMenu={mockToggleMenu}
        handleLeave={mockHandleLeave}
      />
    );

    const menuIcon = screen.getByAltText('Menu');
    const companyName = screen.getByText('AGUATESA ADMIN');
    const userIcon = screen.getByTitle('Página Principal');
    const logoutIcon = screen.getByTitle('Logout');

    expect(menuIcon).toBeInTheDocument();
    expect(companyName).toBeInTheDocument();
    expect(userIcon).toBeInTheDocument();
    expect(logoutIcon).toBeInTheDocument();
  });

  test('calls toggleMenu when the menu icon is clicked', () => {
    render(
      <AdminHeader
        handleLogout={mockHandleLogout}
        isExpanded={false}
        toggleMenu={mockToggleMenu}
        handleLeave={mockHandleLeave}
      />
    );

    const menuIcon = screen.getByAltText('Menu');
    fireEvent.click(menuIcon);

    expect(mockToggleMenu).toHaveBeenCalledTimes(1);
  });

  test('calls handleLeave when the user icon is clicked', () => {
    render(
      <AdminHeader
        handleLogout={mockHandleLogout}
        isExpanded={false}
        toggleMenu={mockToggleMenu}
        handleLeave={mockHandleLeave}
      />
    );

    const userIcon = screen.getByTitle('Página Principal');
    fireEvent.click(userIcon);

    expect(mockHandleLeave).toHaveBeenCalledTimes(1);
  });

  test('calls handleLogout when the logout icon is clicked', () => {
    render(
      <AdminHeader
        handleLogout={mockHandleLogout}
        isExpanded={false}
        toggleMenu={mockToggleMenu}
        handleLeave={mockHandleLeave}
      />
    );

    const logoutIcon = screen.getByTitle('Logout');
    fireEvent.click(logoutIcon);

    expect(mockHandleLogout).toHaveBeenCalledTimes(1);
  });
});
