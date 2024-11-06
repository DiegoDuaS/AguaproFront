import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../cards/card';
import '@testing-library/jest-dom'

test('renders Card component and triggers callback on button click', () => {
  const onMoreInfoClick = jest.fn();
  
  // Passing precio as a number
  render(<Card nombre="Test Product" precio={100} imagen="test.png" onMoreInfoClick={onMoreInfoClick} />);
  
  // Check if the product name and price are displayed correctly
  expect(screen.getByText('Test Product')).toBeInTheDocument();
  expect(screen.getByText('Q 100.00')).toBeInTheDocument();
  
  // Click the button and verify that the callback is triggered
  fireEvent.click(screen.getByText('Más Información'));
  expect(onMoreInfoClick).toHaveBeenCalled();
  
  // Test the behavior when precio is null
  render(<Card nombre="Test Product" precio={null} imagen="test.png" onMoreInfoClick={onMoreInfoClick} />);
  expect(screen.getByText('Q N/A')).toBeInTheDocument();
});

