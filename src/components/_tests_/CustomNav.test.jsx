import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomNav from '../CustomNav';
import '@testing-library/jest-dom'

test('renders CustomNav and handles menu interactions', () => {
  const onOptionSelect = jest.fn();
  const setIsSidebarOpen = jest.fn();
  const items = [
    { name: 'Home', subItems: [] },
    { name: 'Products', subItems: ['Item 1', 'Item 2'] },
  ];

  render(<CustomNav items={items} onOptionSelect={onOptionSelect} isOpen={true} setIsSidebarOpen={setIsSidebarOpen} />);

  expect(screen.getByText('Home')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Products'));
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Item 1'));
  expect(onOptionSelect).toHaveBeenCalledWith('Item 1');
});
