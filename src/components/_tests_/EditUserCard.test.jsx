import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EditUserCard from '../cards/editUsercard'; // Adjust the path according to your file structure
import '@testing-library/jest-dom'

describe('EditUserCard', () => {
    let closeCardMock;
    const mockUser = {
        id: 1,
        username: 'TestUser',
        email: 'testuser@example.com',
        role: 'admin',
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
                refetchUsers={jest.fn()}
            />
        );

        expect(screen.getByText('TestUser - #1')).toBeInTheDocument(); // Check that username and id are displayed
        expect(screen.getByRole('button', { name: /X/i })).toBeInTheDocument(); // Check that the close button is displayed
        expect(screen.getByPlaceholderText('testuser@example.com')).toBeInTheDocument(); // Check the email placeholder
        expect(screen.getByPlaceholderText('TestUser')).toBeInTheDocument(); // Check the username placeholder
        expect(screen.getByPlaceholderText('admin')).toBeInTheDocument(); // Check the role placeholder
    });

    test('does not render when isOpen is false', () => {
        const { container } = render(
            <EditUserCard
                isOpen={false}
                closeCard={closeCardMock}
                user={mockUser}
                refetchUsers={jest.fn()}
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
                refetchUsers={jest.fn()}
            />
        );

        fireEvent.click(screen.getByRole('button', { name: /X/i })); // Click the close button

        expect(closeCardMock).toHaveBeenCalled(); // Verify that closeCard was called
    });
});

