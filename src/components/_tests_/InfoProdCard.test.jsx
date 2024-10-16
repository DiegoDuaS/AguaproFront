import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import InfoProdCard from '../cards/infoProdCard'; // Adjust the path according to your file structure
import '@testing-library/jest-dom'

describe('InfoProdCard', () => {
    let closeCardMock;
    const mockProduct = {
        id_producto: 1,
        nombre: 'Test Product',
        descripción: 'This is a test product.',
        tipo_producto: 'Type A',
        precio: 100,
        disponibilidad: 50,
        marca: 'Brand X',
        material: 'Plastic',
        profundidad: 20,
        temperatura_liquida_max: 80,
        conexion_tuberia: 'Standard',
        presion_funcional: 10,
        head: 5,
        aplicaciones: 'Application X',
        temperatura_media: 60,
        min_gpm: 1,
        max_gpm: 5,
        min_hp: 1,
        max_hp: 3,
        capacitor: 'Capacitor A',
        temperatura_liquida_min: 5,
        temperatura_ambiente: 25,
        presion: 15,
        flow_rate: 2,
    };

    beforeEach(() => {
        closeCardMock = jest.fn(); // Create a mock function for closeCard
    });

    test('renders correctly when open', () => {
        render(
            <InfoProdCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
            />
        );

        expect(screen.getByText('Test Product - #1')).toBeInTheDocument();
        expect(screen.getByText('This is a test product.')).toBeInTheDocument();
        expect(screen.getByText('$100')).toBeInTheDocument();
        expect(screen.getByText('50 en stock')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /X/i })).toBeInTheDocument();
    });

    test('does not render when isOpen is false', () => {
        const { container } = render(
            <InfoProdCard
                isOpen={false}
                closeCard={closeCardMock}
                product={mockProduct}
            />
        );

        expect(container).toBeEmptyDOMElement(); // The component should not render anything
    });

    test('calls closeCard when close button is clicked', () => {
        render(
            <InfoProdCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /X/i })); // Click the close button

        expect(closeCardMock).toHaveBeenCalled(); // Verify that closeCard was called
    });

    test('closes when clicking outside the card', () => {
        render(
            <InfoProdCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
            />
        );

        // Simulate a click outside the card
        fireEvent.mouseDown(document);

        expect(closeCardMock).toHaveBeenCalled(); // Verify that closeCard was called
    });

    test('does not close when clicking inside the card', () => {
        render(
            <InfoProdCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
            />
        );

        const card = screen.getByText('Test Product - #1');
        fireEvent.mouseDown(card); // Simulate a click inside the card

        expect(closeCardMock).not.toHaveBeenCalled(); // Verify that closeCard was not called
    });
});
