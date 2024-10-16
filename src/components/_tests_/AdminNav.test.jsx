// AdminNav.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import AdminNav from '../AdminNav';
import '@testing-library/jest-dom'

describe('AdminNav', () => {
  const mockOnOptionSelect = jest.fn();
  const mockItems = [
    ['Dashboard', 'dashboard-icon.png'],
    ['Settings', 'settings-icon.png'],
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders all items in the navigation', () => {
    render(
      <AdminNav
        li={mockItems}
        onOptionSelect={mockOnOptionSelect}
        isExpanded={true}
      />
    );

    mockItems.forEach(([label]) => {
      expect(screen.getByText(label)).toBeInTheDocument();
    });
  });

  test('calls onOptionSelect with the correct label when item is clicked', () => {
    render(
      <AdminNav
        li={mockItems}
        onOptionSelect={mockOnOptionSelect}
        isExpanded={true}
      />
    );

    const firstItem = screen.getByText('Dashboard');
    fireEvent.click(firstItem);

    expect(mockOnOptionSelect).toHaveBeenCalledWith('Dashboard');
  });

  test('displays the correct icon for each item', () => {
    render(
      <AdminNav
        li={mockItems}
        onOptionSelect={mockOnOptionSelect}
        isExpanded={true}
      />
    );

    mockItems.forEach(([label, icon]) => {
      const iconElement = screen.getByAltText(label);
      expect(iconElement).toHaveAttribute('src', icon);
    });
  });

  test('applies "expanded" class when isExpanded is true', () => {
    render(
      <AdminNav
        li={mockItems}
        onOptionSelect={mockOnOptionSelect}
        isExpanded={true}
      />
    );

    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('expanded');
  });

  test('applies "collapsed" class when isExpanded is false', () => {
    render(
      <AdminNav
        li={mockItems}
        onOptionSelect={mockOnOptionSelect}
        isExpanded={false}
      />
    );

    const navbar = screen.getByRole('navigation');
    expect(navbar).toHaveClass('collapsed');
  });

  test('does not display labels when isExpanded is false', () => {
    render(
      <AdminNav
        li={mockItems}
        onOptionSelect={mockOnOptionSelect}
        isExpanded={false}
      />
    );

    mockItems.forEach(([label]) => {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    });
  });
});
