// CheckoutHeader.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckoutHeader from '../headers/checkoutHeader';

describe('CheckoutHeader', () => {
  const mockNavigateToLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders the brand name', () => {
    render(<CheckoutHeader navigateToLogin={mockNavigateToLogin} />);

    const brandElement = screen.getByText('AGUATESA');
    expect(brandElement).toBeInTheDocument();
  });

  test('renders the user and notification icons', () => {
    render(<CheckoutHeader navigateToLogin={mockNavigateToLogin} />);

    const userIcon = screen.getByTestId('user-icon');

    expect(userIcon).toBeInTheDocument();
   
  });

  test('calls navigateToLogin when the user icon is clicked', () => {
    render(<CheckoutHeader navigateToLogin={mockNavigateToLogin} />);

    const userIcon = screen.getByTestId('user-icon');
    fireEvent.click(userIcon);

    expect(mockNavigateToLogin).toHaveBeenCalledTimes(1);
  });
});
