import React from 'react';
import { render, fireEvent, getAllByText } from '@testing-library/react';
import InfoProdPedidoCard from '../cards/InfoProdPedidoCard';
import '@testing-library/jest-dom'

describe('InfoProdPedidoCard', () => {
    let closeCardMock;

    beforeEach(() => {
        closeCardMock = jest.fn(); // Mock closeCard function
    });

    test('should not render when isOpen is false', () => {
        const { container } = render(
            <InfoProdPedidoCard isOpen={false} closeCard={closeCardMock} productos={{}} isLoadingProductos={false} />
        );
        expect(container.firstChild).toBeNull(); // The component should not render anything
    });

    test('should render loading state', () => {
        const { getByText, getByRole } = render(
            <InfoProdPedidoCard isOpen={true} closeCard={closeCardMock} productos={{}} isLoadingProductos={true} />
        );
        expect(getByText('Productos en el Pedido')).toBeInTheDocument();
        expect(getByText('X')).toBeInTheDocument(); // Close button should be present
        expect(getByRole('progressbar')).toBeInTheDocument(); // Check for CircularProgress
    });

   

    test('should render message when no products', () => {
        const { getByText } = render(
            <InfoProdPedidoCard isOpen={true} closeCard={closeCardMock} productos={{ data: [] }} isLoadingProductos={false} />
        );

        expect(getByText('No hay productos para mostrar.')).toBeInTheDocument();
    });

    test('should close card when clicking outside', () => {
        const { getByText, container } = render(
            <InfoProdPedidoCard isOpen={true} closeCard={closeCardMock} productos={{}} isLoadingProductos={false} />
        );

        // Simulate click outside of the card
        fireEvent.mouseDown(container); 
        expect(closeCardMock).toHaveBeenCalledTimes(1); // closeCard should be called once
    });

    test('should not close card when clicking inside', () => {
        const { getByText } = render(
            <InfoProdPedidoCard isOpen={true} closeCard={closeCardMock} productos={{}} isLoadingProductos={false} />
        );

        // Simulate click inside the card
        fireEvent.mouseDown(getByText('Productos en el Pedido')); 
        expect(closeCardMock).not.toHaveBeenCalled(); // closeCard should not be called
    });
});
