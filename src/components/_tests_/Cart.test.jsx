import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from '../cart';
import '@testing-library/jest-dom'

test('renders cart with items and updates total', () => {
  const cartItems = [
    { id: 1, nombre: 'Item 1', precio: 10, quantity: 2, imagen: 'item1.png' },
    { id: 2, nombre: 'Item 2', precio: 20, quantity: 1, imagen: 'item2.png' },
  ];

  render(<Cart cartItems={cartItems} removeCartItem={jest.fn()} updateCartItem={jest.fn()} closeCart={jest.fn()} />);
  
  expect(screen.getByText('Your Cart')).toBeInTheDocument();
  expect(screen.getByText('Item 1')).toBeInTheDocument();
  expect(screen.getByText('Item 2')).toBeInTheDocument();
  expect(screen.getByText('Total: $40.00')).toBeInTheDocument();
});
