import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HideCard from '../cards/hideCard';
import '@testing-library/jest-dom';

describe('HideCard', () => {
    let closeCardMock, setSuccessMessageMock, setErrorMessageMock, refetchProductsMock;

    const mockProduct = {
        id_producto: 1,
        nombre: 'Test Product',
        estado: "en venta" // Make sure to set the state as per the logic in the component
    };

    beforeEach(() => {
        // Create mocks for the props
        closeCardMock = jest.fn();
        setSuccessMessageMock = jest.fn();
        setErrorMessageMock = jest.fn();
        refetchProductsMock = jest.fn();
        // Reset the fetch mock before each test
        global.fetch = jest.fn();
    });

    test('renders correctly when open', () => {
        render(
            <HideCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchProducts={refetchProductsMock}
            />
        );

        expect(screen.getByText(`¿Seguro que quieres ocultar '${mockProduct.nombre}'?`)).toBeInTheDocument();
        expect(screen.getByText('Si')).toBeInTheDocument();
        expect(screen.getByText('No')).toBeInTheDocument();
    });

    test('changes state when "Si" is clicked', () => {
        render(
            <HideCard
                isOpen={true}
                closeCard={closeCardMock}
                product={mockProduct}
                setSuccsessMessage={setSuccessMessageMock}
                setErrorMessage={setErrorMessageMock}
                refetchProducts={refetchProductsMock}
            />
        );

        fireEvent.click(screen.getByText('Si'));
        
        expect(screen.getByText('Escribe el nombre del producto para ocultarlo:')).toBeInTheDocument();
    });

    test('hides product when correct name is provided', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: true,
        });

        render(
            <HideCard
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

        // Click the hide button
        fireEvent.click(screen.getByText('Ocultar'));

        // Wait for assertions
        await waitFor(() => {
            expect(setSuccessMessageMock).toHaveBeenCalledWith('Producto ocultado correctamente.');
            expect(setErrorMessageMock).toHaveBeenCalledWith('');
            expect(refetchProductsMock).toHaveBeenCalled();
            expect(closeCardMock).toHaveBeenCalled();
        });
    });

    test('shows error message when the names do not match', async () => {
        render(
            <HideCard
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

        // Click the hide button
        fireEvent.click(screen.getByText('Ocultar'));

        // Wait for assertions
        await waitFor(() => {
            expect(screen.getByText('Los nombres no coinciden, intenta nuevamente.')).toBeInTheDocument();
        });
    });

    test('handles fetch error during hiding', async () => {
        global.fetch.mockResolvedValueOnce({
            ok: false,
        });

        render(
            <HideCard
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

        // Click the hide button
        fireEvent.click(screen.getByText('Ocultar'));

        // Wait for assertions
        await waitFor(() => {
            expect(setErrorMessageMock).toHaveBeenCalledWith('Error al conectar con el servidor. Intente nuevamente.');
            expect(setSuccessMessageMock).toHaveBeenCalledWith('');
        });
    });
});

