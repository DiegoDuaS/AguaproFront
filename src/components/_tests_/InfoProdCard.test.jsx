import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import InfoProdCard from '../cards/infoProdCard'; // Adjust the path according to your file structure
import '@testing-library/jest-dom';

describe('InfoProdCard', () => {
    let closeCardMock;
    const mockProduct = {
        id_producto: 1,
        nombre: 'Test Product',
        descripción: 'This is a test product.',
        tipoproducto: 'Type A', // Updated key name
        precio: 100,
        disponibilidad: 50,
        marca: 'Brand X',
        material: 'Plastic',
        capacidadmin: 10,
        capacidadmax: 20,
    };

    beforeEach(() => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                blob: () => Promise.resolve(new Blob()), // Mock blob response
            })
        );

        global.URL.createObjectURL = jest.fn(); // Mock createObjectURL
        closeCardMock = jest.fn(); // Create a mock function for closeCard
    });

    afterEach(() => {
        jest.resetAllMocks(); // Reset mocks after each test
    });

    test('renders correctly when open', async () => {
        await act(async () => {
            render(
                <InfoProdCard
                    isOpen={true}
                    closeCard={closeCardMock}
                    product={mockProduct}
                />
            );
        });

        expect(screen.getByText('Test Product - #1')).toBeInTheDocument();
        expect(screen.getByText('This is a test product.')).toBeInTheDocument();
        expect(screen.getByText('Type A')).toBeInTheDocument();
        expect(screen.getByText('Q.100')).toBeInTheDocument(); // Updated price format
        expect(screen.getByText('50 en stock')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /X/i })).toBeInTheDocument();
    });

    test('does not render when isOpen is false', async () => {
        const { container } = await act(async () => {
            return render(
                <InfoProdCard
                    isOpen={false}
                    closeCard={closeCardMock}
                    product={mockProduct}
                />
            );
        });

        expect(container).toBeEmptyDOMElement(); // The component should not render anything
    });

    test('calls closeCard when close button is clicked', async () => {
        await act(async () => {
            render(
                <InfoProdCard
                    isOpen={true}
                    closeCard={closeCardMock}
                    product={mockProduct}
                />
            );
        });

        fireEvent.click(screen.getByRole('button', { name: /X/i })); // Click the close button
        expect(closeCardMock).toHaveBeenCalled(); // Verify that closeCard was called
    });

    test('closes when clicking outside the card', async () => {
        await act(async () => {
            render(
                <InfoProdCard
                    isOpen={true}
                    closeCard={closeCardMock}
                    product={mockProduct}
                />
            );
        });

        // Simulate a click outside the card
        fireEvent.mouseDown(document);
        expect(closeCardMock).toHaveBeenCalled(); // Verify that closeCard was called
    });

    test('does not close when clicking inside the card', async () => {
        await act(async () => {
            render(
                <InfoProdCard
                    isOpen={true}
                    closeCard={closeCardMock}
                    product={mockProduct}
                />
            );
        });

        const card = screen.getByText('Test Product - #1');
        fireEvent.mouseDown(card); // Simulate a click inside the card
        expect(closeCardMock).not.toHaveBeenCalled(); // Verify that closeCard was not called
    });
});

