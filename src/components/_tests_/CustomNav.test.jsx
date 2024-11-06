import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CustomNav from '../CustomNav';
import '@testing-library/jest-dom';

describe('CustomNav', () => {
  const mockOnOptionSelect = jest.fn();
  const mockSetIsSidebarOpen = jest.fn();
  const mockSetActivePage = jest.fn();
  const mockIsOpen = jest.fn();

  const items = [
    { name: 'Home', subItems: [] },
    { name: 'Productos', subItems: ['Product 1', 'Product 2'] },
    { name: 'Servicios', subItems: [] },
    { name: 'Sobre Nosotros', subItems: [] },
  ];

  it('renders CustomNav and displays menu items', () => {
    render(<CustomNav
      items={items}
      onOptionSelect={mockOnOptionSelect}
      isOpen={mockIsOpen} // Passing mock function instead of boolean
      setIsSidebarOpen={mockSetIsSidebarOpen}
      setActivePage={mockSetActivePage}
    />);
    items.forEach(item => {
      expect(screen.getByText(item.name)).toBeInTheDocument();
    });
  });

  it('opens sidebar when "Productos" or "Sobre Nosotros" is clicked', () => {
    render(<CustomNav
      items={items}
      onOptionSelect={mockOnOptionSelect}
      isOpen={mockIsOpen} // Passing mock function instead of boolean
      setIsSidebarOpen={mockSetIsSidebarOpen}
      setActivePage={mockSetActivePage}
    />);

    const productosOption = screen.getByText('Productos');
    fireEvent.click(productosOption);
    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(true);

    const sobreNosotrosOption = screen.getByText('Sobre Nosotros');
    fireEvent.click(sobreNosotrosOption);
    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(true);
  });

  it('closes sidebar when an option without subItems is clicked', () => {
    render(<CustomNav
      items={items}
      onOptionSelect={mockOnOptionSelect}
      isOpen={mockIsOpen} // Passing mock function instead of boolean
      setIsSidebarOpen={mockSetIsSidebarOpen}
      setActivePage={mockSetActivePage}
    />);

    const serviciosOption = screen.getByText('Servicios');
    fireEvent.click(serviciosOption);
    expect(mockSetIsSidebarOpen).toHaveBeenCalledWith(false);
  });

  it('opens and closes the dropdown for a selected option', () => {
    render(<CustomNav
      items={items}
      onOptionSelect={mockOnOptionSelect}
      isOpen={mockIsOpen} // Passing mock function instead of boolean
      setIsSidebarOpen={mockSetIsSidebarOpen}
      setActivePage={mockSetActivePage}
    />);

    const productosOption = screen.getByText('Productos');
    fireEvent.click(productosOption);

    // Check if the submenu is displayed
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
    
    // Close the submenu by clicking the same option
    fireEvent.click(productosOption);
    expect(screen.queryByText('Product 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Product 2')).not.toBeInTheDocument();
  });

  it('calls onOptionSelect when a sub-item is clicked', () => {
    render(<CustomNav
      items={items}
      onOptionSelect={mockOnOptionSelect}
      isOpen={mockIsOpen} // Passing mock function instead of boolean
      setIsSidebarOpen={mockSetIsSidebarOpen}
      setActivePage={mockSetActivePage}
    />);

    const productosOption = screen.getByText('Productos');
    fireEvent.click(productosOption);

    const subItem = screen.getByText('Product 1');
    fireEvent.click(subItem);

    expect(mockOnOptionSelect).toHaveBeenCalledWith('Product 1');
  });
});

