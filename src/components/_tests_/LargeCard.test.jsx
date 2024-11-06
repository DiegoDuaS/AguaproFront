import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import LargeCard from '../cards/LargeCard';
import '@testing-library/jest-dom';

test('renders LargeCard component and handles add to cart', () => {
  const addToCart = jest.fn();
  const closeCard = jest.fn();
  const product = {
    id_producto: 1,
    nombre: 'Product 1',
    precio: 100.00,
    descripción: 'A great product',
    marca: 'Brand X',
    material: 'Plastic',
    modelo: 'Model Y',
    capacidadmin: 10,
    capacidadmax: 100,
  };
  const imageRef = 'https://example.com/product-image.jpg';

  render(
    <LargeCard 
      isOpen={true} 
      closeCard={closeCard} 
      product={product} 
      addToCart={addToCart} 
      imageRef={imageRef} 
    />
  );

  // Check if product details are rendered correctly
  expect(screen.getByText('Product 1')).toBeInTheDocument();
  expect(screen.getByText('Q 100.00')).toBeInTheDocument();
  expect(screen.getByText('A great product')).toBeInTheDocument();
  expect(screen.getByText('Brand X')).toBeInTheDocument();
  expect(screen.getByText('Plastic')).toBeInTheDocument();
  expect(screen.getByText('Model Y m')).toBeInTheDocument();
  expect(screen.getByText('10 g(L)')).toBeInTheDocument();
  expect(screen.getByText('100 g(L)')).toBeInTheDocument();

  // Check if image is rendered correctly
  const img = screen.getByRole('img');
  expect(img).toHaveAttribute('src', imageRef);
  expect(img).toHaveAttribute('alt', 'Product 1');

  // Simulate adding product to cart
  fireEvent.click(screen.getByText('Agregar al Carrito'));
  expect(addToCart).toHaveBeenCalledWith(expect.objectContaining({
    nombre: 'Product 1',
    quantity: 1,
    size: '4\'\'',
    image: imageRef,
  }));

  // Simulate changing the quantity
  const quantityDisplay = screen.getByText('1');
  fireEvent.click(screen.getByText('+'));
  expect(screen.getByText('2')).toBeInTheDocument();
  fireEvent.click(screen.getByText('-'));
  expect(screen.getByText('1')).toBeInTheDocument();
});

