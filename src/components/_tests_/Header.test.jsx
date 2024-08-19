import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../header';
import cartIcon from '../../image/cartIcon.png';
import userIcon from '../../image/userIcon.png';
import notificationIcon from '../../image/notificationIcon.png';
import '@testing-library/jest-dom'

test('renders the Header component with icons and brand', () => {
  render(<Header toggleCart={jest.fn()} />);
  
  expect(screen.getByAltText('Cart')).toHaveAttribute('src', cartIcon);
  expect(screen.getByAltText('User')).toHaveAttribute('src', userIcon);
  expect(screen.getByAltText('Notifications')).toHaveAttribute('src', notificationIcon);
  expect(screen.getByText('AGUATESA')).toBeInTheDocument();
});
