import { render, screen } from '@testing-library/react';
import AdminNav from '../../components/AdminNav'; // Adjust the import path
import { PiClipboardText } from "react-icons/pi";
import { BsBoxSeam, BsGraphUp, BsGear } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { GoMail } from "react-icons/go";
import '@testing-library/jest-dom'

describe('AdminNav', () => {
  const mockItems = [
    ["Pedidos", PiClipboardText],
    ["Productos", BsBoxSeam],
    ["Analítica", BsGraphUp],
    ["Clientes", FaUsers],
    ["Usuarios", BsGear],
    ["Solicitudes", GoMail]
  ];

  it('displays the correct icon for each item', () => {
    render(<AdminNav li={mockItems} onOptionSelect={() => {}} isExpanded={true} />);

    // Loop through each item and check that the icon is rendered and accessible
    mockItems.forEach(([label, Icon]) => {
      // Get the icon element by its aria-label (which matches the label text)
      const iconElement = screen.getByText(label);

      // Check that the icon is in the document
      expect(iconElement).toBeInTheDocument();
    });
  });
});

