import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteUserCard from '../cards/deleteUserCard'; // Adjust the import according to your file structure
import '@testing-library/jest-dom'

describe('DeleteUserCard', () => {
    let closeCardMock, setSuccessMessageMock, setErrorMessageMock, refetchUsersMock;

    const mockUser = {
        id: 1,
        username: 'TestUser',
    };

    beforeEach(() => {
        // Create mocks for the props
        closeCardMock = jest.fn();
        setSuccessMessageMock = jest.fn();  // Corrected function name
        setErrorMessageMock = jest.fn();
        refetchUsersMock = jest.fn();
    });

    test('renders correctly when open', () => {
        render(
            <DeleteUserCard
                isOpen={true}
                closeCard={closeCardMock}
                user={mockUser}
                setSuccsessMessage={setSuccessMessageMock}  // Make sure to change this if it should be setSuccessMessage
                setErrorMessage={setErrorMessageMock}
                refetchUsers={refetchUsersMock}
            />
        );

        expect(screen.getByText(`¿Seguro que quieres borrar al usuario '${mockUser.username}'?`)).toBeInTheDocument();
        expect(screen.getByText('Si')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
    });

    test('changes state when "Si" is clicked', () => {
        render(
            <DeleteUserCard
                isOpen={true}
                closeCard={closeCardMock}
                user={mockUser}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchUsers={refetchUsersMock}
            />
        );

        fireEvent.click(screen.getByText('Si'));
        
        expect(screen.getByText('Escribe el nombre del usuario para eliminarlo:')).toBeInTheDocument();
    });

    test('deletes user when correct name is provided', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
        });

        render(
            <DeleteUserCard
                isOpen={true}
                closeCard={closeCardMock}
                user={mockUser}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchUsers={refetchUsersMock}
            />
        );

        fireEvent.click(screen.getByText('Si')); // Move to the second state

        // Input the correct user name
        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'TestUser' } });

        // Click the delete button
        fireEvent.click(screen.getByText('Eliminar'));

        // Wait for assertions
        await waitFor(() => {
            expect(setSuccessMessageMock).toHaveBeenCalledWith('Usuario eliminado correctamente.');
            expect(setErrorMessageMock).toHaveBeenCalledWith('');
            expect(refetchUsersMock).toHaveBeenCalled();
            expect(closeCardMock).toHaveBeenCalled();
        });
    });

    test('shows error message when the names do not match', async () => {
        render(
            <DeleteUserCard
                isOpen={true}
                closeCard={closeCardMock}
                user={mockUser}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchUsers={refetchUsersMock}
            />
        );

        fireEvent.click(screen.getByText('Si')); // Move to the second state

        // Input an incorrect user name
        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'WrongUser' } });

        // Click the delete button
        fireEvent.click(screen.getByText('Eliminar'));

        // Wait for assertions
        await waitFor(() => {
            expect(screen.getByText('Los nombres no coinciden, intenta nuevamente.')).toBeInTheDocument();
        });
    });

    test('handles fetch error during deletion', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: false,
        });

        render(
            <DeleteUserCard
                isOpen={true}
                closeCard={closeCardMock}
                user={mockUser}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchUsers={refetchUsersMock}
            />
        );

        fireEvent.click(screen.getByText('Si')); // Move to the second state

        // Input the correct user name
        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'TestUser' } });

        // Click the delete button
        fireEvent.click(screen.getByText('Eliminar'));

        // Wait for assertions
        await waitFor(() => {
            expect(setErrorMessageMock).toHaveBeenCalledWith('Error al conectar con el servidor. Intente nuevamente.');
            expect(setSuccessMessageMock).toHaveBeenCalledWith('');
        });
    });
});
