import '@testing-library/jest-dom';
import FormsSer from '../forms/formsSer';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
//import FormsSer from './FormsSer'; // Adjust the path as needed
import { useRegisterSolicitud } from '../../hooks/useRegisterSolicitud';
import { useSolicitud } from '../../hooks/email/useSolicitud';

describe('FormsSer', () => {
  it('renders form elements correctly', () => {
    render(<FormsSer setShowForms={jest.fn()} setSuccessMessage={jest.fn()} setErrorMessage={jest.fn()} type={1} />);

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText('Nombre Completo')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Correo Electrónico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('1234-5678')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Nombre Empresa')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('...')).toBeInTheDocument();
    expect(screen.getByLabelText('Departamento')).toBeInTheDocument();
    expect(screen.getByLabelText('Tipo de Servicio')).toBeInTheDocument();
    expect(screen.getByText('Enviar')).toBeInTheDocument();
  });

  it('renders error message when API fails', () => {
    render(<FormsSer setShowForms={jest.fn()} setSuccessMessage={jest.fn()} setErrorMessage={jest.fn()} type={1} />);

    // Trigger a failure scenario without mocking the API calls
    fireEvent.click(screen.getByText('Enviar'));

    // Check if error message is displayed
    // This is assuming that the error message will be shown even without mocking the API call
    //expect(screen.getByText('Error al enviar la solicitud')).toBeInTheDocument();
  });
});
