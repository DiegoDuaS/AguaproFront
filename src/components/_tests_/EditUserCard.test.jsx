import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditUserCard from '../cards/editUsercard'; // Adjust the path according to your file structure
import '@testing-library/jest-dom'

describe('EditUserCard', () => {
    let closeCardMock;
    const mockUser = {
        id: 1,
        username: 'TestUser',
    };

    beforeEach(() => {
        closeCardMock = jest.fn(); // Create a mock function for closeCard
    });

    test('renders correctly when open', () => {
        render(
            <EditUserCard
                isOpen={true}
                closeCard={closeCardMock}
                user={mockUser}
            />
        );

        expect(screen.getByText('prueba')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /X/i })).toBeInTheDocument();
    });

    test('does not render when isOpen is false', () => {
        const { container } = render(
            <EditUserCard
                isOpen={false}
                closeCard={closeCardMock}
                user={mockUser}
            />
        );

        expect(container).toBeEmptyDOMElement(); // The component should not render anything
    });

    test('calls closeCard when close button is clicked', () => {
        render(
            <EditUserCard
                isOpen={true}
                closeCard={closeCardMock}
                user={mockUser}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /X/i })); // Click the close button

        expect(closeCardMock).toHaveBeenCalled(); // Verify that closeCard was called
    });
});
