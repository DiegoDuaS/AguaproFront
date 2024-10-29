import React, { useState, useEffect, useCallback } from 'react';
import './ClientInfo.css';
import useUserInfo from '../../hooks/useGetUserInfo';
import { CircularProgress } from '@mui/material';

const ClientInfo = () => {
  const user = JSON.parse(localStorage.getItem('user')); 
  const username = user?.username;
  const { getUserInfo, isLoading, errorMessage } = useUserInfo('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');

  const [formData2, setFormData2] = useState({
    username: '',
    email: '',
    created_at: ''
  });

  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    nit: '',
    direccion: ''
  });

  const memoizedGetUserInfo = useCallback(getUserInfo, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await memoizedGetUserInfo(localStorage.getItem('id'));
        const user = userInfo.data[0];
        setFormData2({
          username: user.username || '',
          email: user.email || '',
          created_at: user.created_at || '',
        });
      } catch (error) {
        console.error("Error al obtener la información del usuario:", error);
      }
    };

    fetchUserInfo();
  }, [memoizedGetUserInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({
      ...formData2,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos actualizados:', formData);
  };

  const handleSubmit2 = (e) => {
    e.preventDefault();
    console.log('Datos actualizados:', formData2);
  };

  if (isLoading) {
    return(
    <div className="main-content-loading">
      <CircularProgress />
      <p className='loading'>Cargando Información...</p>
      <div className='space' />
    </div>
    )
  }

  return (
    <div className="client-page">
      <div className="user-info-container">
        <h2>Bienvenido {username}</h2>
        <form className="form-unit-client" onSubmit={handleSubmit2}>
          <div className="form-group-cf">
            <label>Usuario:</label>
            <input
              type="text"
              name="username"
              value={formData2.username}
              onChange={handleChange2}
              placeholder="Nombre de Usuario"
            />
          </div>
          <div className="form-group-cf">
            <label>Correo:</label>
            <input
              type="email"
              name="email"
              value={formData2.email}
              onChange={handleChange2}
              placeholder="Correo Electrónico"
            />
          </div>
        </form>
        <p>Usuario desde {formData2.created_at.slice(0, 10)}</p>
      </div>
      <div className="client-info-container">
        <h2>Bienvenido Persona</h2>
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
    </div>
  );
};

export default ClientInfo;
