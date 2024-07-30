import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LargeCard from '../LargeCard';
import '@testing-library/jest-dom'

test('renders LargeCard component and handles add to cart', () => {
  const addToCart = jest.fn();
  const closeCard = jest.fn();
  const product = { id_producto: 1, nombre: 'Product 1', precio: 100, descripción: 'A great product' };

  render(<LargeCard isOpen={true} closeCard={closeCard} product={product} addToCart={addToCart} />);
  
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Q 100')).toBeInTheDocument();
  fireEvent.click(screen.getByText('Agregar al Carrito'));
  expect(addToCart).toHaveBeenCalledWith(expect.objectContaining({ nombre: 'Product 1' }));
});
