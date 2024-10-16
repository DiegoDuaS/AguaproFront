// FormsSer.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormsSer from '../forms/formsSer';

describe('FormsSer Component', () => {
  test('renders the form fields correctly', () => {
    render(<FormsSer />);

    // Check for input fields and labels
    const nameInput = screen.getByPlaceholderText('Nombre');
    const correoInput = screen.getByPlaceholderText('Correo Electrónico');
    const q1Input = screen.getByPlaceholderText('Pregunta 1');
    const q2Input = screen.getByPlaceholderText('Pregunta 2');
    const q3Input = screen.getByPlaceholderText('Pregunta 3');
    const q4Input = screen.getByPlaceholderText('Pregunta 4');
    const submitButton = screen.getByText('Enviar');

    // Verify that all elements are rendered
    expect(nameInput).toBeInTheDocument();
    expect(correoInput).toBeInTheDocument();
    expect(q1Input).toBeInTheDocument();
    expect(q2Input).toBeInTheDocument();
    expect(q3Input).toBeInTheDocument();
    expect(q4Input).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test('updates the state when input fields change', () => {
    render(<FormsSer />);

    const nameInput = screen.getByPlaceholderText('Nombre');
    const correoInput = screen.getByPlaceholderText('Correo Electrónico');
    const q1Input = screen.getByPlaceholderText('Pregunta 1');
    
    // Simulate user typing
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(correoInput, { target: { value: 'john@example.com' } });
    fireEvent.change(q1Input, { target: { value: 'Answer 1' } });

    // Verify that the values are updated
    expect(nameInput.value).toBe('John Doe');
    expect(correoInput.value).toBe('john@example.com');
    expect(q1Input.value).toBe('Answer 1');
  });

  test('renders the submit button', () => {
    render(<FormsSer />);

    const submitButton = screen.getByText('Enviar');

    // Verify the button is rendered
    expect(submitButton).toBeInTheDocument();
  });
});
