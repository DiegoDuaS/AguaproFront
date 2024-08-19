import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../card';
import '@testing-library/jest-dom'

test('renders Card component and triggers callback on button click', () => {
  const onMoreInfoClick = jest.fn();
  render(<Card nombre="Test Product" precio="100" imagen="test.png" onMoreInfoClick={onMoreInfoClick} />);
  
  expect(screen.getByText('Test Product')).toBeInTheDocument();
  expect(screen.getByText('Q 100')).toBeInTheDocument();
  
  fireEvent.click(screen.getByText('Más Información'));
  expect(onMoreInfoClick).toHaveBeenCalled();
});
