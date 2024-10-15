import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MoreCard from '../cards/moreCard'; // Adjust the path according to your file structure
import '@testing-library/jest-dom'

describe('MoreCard', () => {
    let closeCardMock;
    const mockProduct = {
        id_producto: 1,
        nombre: 'Test Product',
        disponibilidad: 50,
    };

    beforeEach(() => {
        closeCardMock = jest.fn(); // Create a mock function for closeCard
    });

    test('renders correctly when open', () => {
        render(
            <MoreCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
            />
        );

        expect(screen.getByText('#1 - Test Product')).toBeInTheDocument();
        expect(screen.getByText('Unidades Disponibles:')).toBeInTheDocument();
        expect(screen.getByText('50')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('0')).toBeInTheDocument();
    });

    test('does not render when isOpen is false', () => {
        const { container } = render(
            <MoreCard
                isOpen={false}
                closeCard={closeCardMock}
                product={mockProduct}
            />
        );

        expect(container).toBeEmptyDOMElement(); // The component should not render anything
    });

    test('calls closeCard when Regresar button is clicked', () => {
        render(
            <MoreCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /Regresar/i })); // Click the Regresar button

        expect(closeCardMock).toHaveBeenCalled(); // Verify that closeCard was called
    });

    test('updates newUnits state on input change', () => {
        render(
            <MoreCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
            />
        );

        const input = screen.getByPlaceholderText('0');

        fireEvent.change(input, { target: { value: '10' } }); // Simulate typing in the input

        expect(input.value).toBe('10'); // Verify that the input value updates
    });
});
