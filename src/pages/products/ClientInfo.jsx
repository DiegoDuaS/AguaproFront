import React, { useState } from 'react';
import './ClientInfo.css';

const ClientInfo = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    nit: '',
    direccion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar la actualización de la información del cliente
    console.log('Datos actualizados:', formData);
  };

  return (
    <div className="client-info-container">
      <h2>Bienvenido "Username"</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group-cf">
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            placeholder="Nombre completo"
          />
        </div>
        <div className="form-group-cf">
          <label>Correo:</label>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
            placeholder="Correo electrónico"
          />
        </div>
        <div className="form-group-cf">
          <label>Teléfono:</label>
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            placeholder="Número de teléfono"
          />
        </div>
        <div className="form-group-cf">
          <label>NIT:</label>
          <input
            type="text"
            name="nit"
            value={formData.nit}
            onChange={handleChange}
            placeholder="NIT"
          />
        </div>
        <div className="form-group-cf">
          <label>Dirección:</label>
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección de entrega"
          />
        </div>
        <div className="button-container-cf">
          <button type="submit">Actualizar</button>
        </div>
      </form>
    </div>
  );
};

export default ClientInfo;
