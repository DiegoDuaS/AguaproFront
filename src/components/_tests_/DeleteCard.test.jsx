import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import DeleteCard from '../cards/deleteCard'; // Adjust the import according to your file structure
import '@testing-library/jest-dom'

describe('DeleteCard', () => {
    let closeCardMock, setSuccessMessageMock, setErrorMessageMock, refetchProductsMock;

    const mockProduct = {
        id_producto: 1,
        nombre: 'Test Product',
    };

    beforeEach(() => {
        // Create mocks for the props
        closeCardMock = jest.fn();
        setSuccessMessageMock = jest.fn();
        setErrorMessageMock = jest.fn();
        refetchProductsMock = jest.fn();
    });

    test('renders correctly when open', () => {
        render(
            <DeleteCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchProducts={refetchProductsMock}
            />
        );

        expect(screen.getByText(`¿Seguro que quieres borrar '${mockProduct.nombre}'?`)).toBeInTheDocument();
        expect(screen.getByText('Si')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
    });

    test('changes state when "Si" is clicked', () => {
        render(
            <DeleteCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchProducts={refetchProductsMock}
            />
        );

        fireEvent.click(screen.getByText('Si'));
        
        expect(screen.getByText('Escribe el nombre del producto para eliminarlo:')).toBeInTheDocument();
    });

    test('deletes product when correct name is provided', async () => {
        global.fetch = jest.fn().mockResolvedValue({
            ok: true,
        });

        render(
            <DeleteCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchProducts={refetchProductsMock}
            />
        );

        fireEvent.click(screen.getByText('Si')); // Move to the second state

        // Input the correct product name
        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Test Product' } });

        // Click the delete button
        fireEvent.click(screen.getByText('Eliminar'));

        // Wait for assertions
        await waitFor(() => {
            expect(setSuccessMessageMock).toHaveBeenCalledWith('Producto eliminado correctamente.');
            expect(setErrorMessageMock).toHaveBeenCalledWith('');
            expect(refetchProductsMock).toHaveBeenCalled();
            expect(closeCardMock).toHaveBeenCalled();
        });
    });

    test('shows error message when the names do not match', async () => {
        render(
            <DeleteCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchProducts={refetchProductsMock}
            />
        );

        fireEvent.click(screen.getByText('Si')); // Move to the second state

        // Input an incorrect product name
        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Wrong Product' } });

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
            <DeleteCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchProducts={refetchProductsMock}
            />
        );

        fireEvent.click(screen.getByText('Si')); // Move to the second state

        // Input the correct product name
        fireEvent.change(screen.getByPlaceholderText('Nombre'), { target: { value: 'Test Product' } });

        // Click the delete button
        fireEvent.click(screen.getByText('Eliminar'));

        // Wait for assertions
        await waitFor(() => {
            expect(setErrorMessageMock).toHaveBeenCalledWith('Error al conectar con el servidor. Intente nuevamente.');
            expect(setSuccessMessageMock).toHaveBeenCalledWith('');
        });
    });
});
