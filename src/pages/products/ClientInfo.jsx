import React, { useState, useEffect, useCallback } from 'react';
import './ClientInfo.css';
import useUserInfo from '../../hooks/useGetUserInfo';
import { useFetchClient } from '../../hooks/useFetchClient';
import useUpdateUser from '../../hooks/useUpdateUser';
import { useUpdateClient } from '../../hooks/useUpdateClient';
import useRegisterClient from '../../hooks/useRegisterClient';
import { CircularProgress } from '@mui/material';

const ClientInfo = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username;
  const userReference = localStorage.getItem('id');

  const { getUserInfo, isLoading, errorMessage } = useUserInfo('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');
  const { client, loading: clientLoading } = useFetchClient(userReference);
  
  // Hooks for handling updates and registration
  const { updateUser, isLoading: updatingUser, errorMessage: updateUserError } = useUpdateUser('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');
  const { updateClient, loading: updatingClient, success: updateClientSuccess, error: updateClientError } = useUpdateClient();
  const { registerClient, loading: registeringClient, success: registerClientSuccess, error: registerClientError } = useRegisterClient('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');

  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [formData2, setFormData2] = useState({ username: '', email: '', created_at: '' });
  const [formData, setFormData] = useState({ nombre: '', correo: '', telefono: '', nit: '', direccion: '' });

  const memoizedGetUserInfo = useCallback(getUserInfo, []);

  // Fetch and set user info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userInfo = await memoizedGetUserInfo(userReference);
        const user = userInfo.data[0];
        setFormData2({
          username: user.username || '',
          email: user.email || '',
          created_at: user.created_at || '',
        });
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, [memoizedGetUserInfo, userReference]);
  
  //console.log(user.username);
  // Fetch and set client info if available
  useEffect(() => {
    if (client) {
      setFormData({
        nombre: client.data.nombre || '',
        telefono: client.data.telefono || '',
        nit: client.data.nit || '',
        direccion: client.data.direccion || '',
        user_reference: userReference
      });
    }
  }, [client]);

  // Handle form data changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setFormData2({ ...formData2, [name]: value });
  };

  // Update user information
  const handleSubmit2 = async (e) => {
    e.preventDefault();
    const result = await updateUser(userReference, { username: formData2.username, email: formData2.email });
    if (result.success) {
      console.log('User information updated:', result.message);
    }
  };
  //console.log(client.data.id_cliente);
  // Register or update client information
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (client==null) {
      await registerClient(formData, userReference);
      setShowAdditionalForm(false); // Hide the form after registration
    } else {
      console.log(parseInt(client.data.id_cliente));
      const id = parseInt(client.data.id_cliente);
      await updateClient(id, formData);
    }
  };
 

  if (isLoading || clientLoading || updatingUser || registeringClient || updatingClient) {
    return (
      <div className="main-content-loading">
        <CircularProgress />
        <p className="loading">Loading Information...</p>
        <div className="space" />
      </div>
    );
  }

  return (
    <div className="client-page">
      <div className="user-info-container">

        {!client && !showAdditionalForm && (
          <>
           <h2>Bienvenido, {username}</h2>
            <form className="form-unit-client" onSubmit={handleSubmit2}>
              <div className="form-group-cf">
                <label>Usuario:</label>
                <input
                  type="text"
                  name="username"
                  value={formData2.username}
                  onChange={handleChange2}
                  placeholder="Username"
                />
              </div>
              <div className="form-group-cf">
                <label>Correo:</label>
                <input
                  type="email"
                  name="email"
                  value={formData2.email}
                  onChange={handleChange2}
                  placeholder="Email"
                />
              </div>
              <button type="submit">Actualizar</button>
            </form>
            <p>Usuario desde {formData2.created_at.slice(0, 10)}</p>

            {!showAdditionalForm && (
              <p>
                Deseas llenar información adicional?{' '}
                <button onClick={() => setShowAdditionalForm(true)}>Has click aquí</button>
              </p>
            )}
          </>
        )}

        {(client || showAdditionalForm) && (
          <div className="client-info-container">
            <h2>Mi información</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group-cf">
                <label>Nombre:</label>
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  placeholder="Full Name"
                />
              </div>
              <div className="form-group-cf">
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Phone Number"
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
                  placeholder="Delivery Address"
                />
              </div>
              <button type="submit">Actualizar</button>
              <button type="button" onClick={() => setShowAdditionalForm(false)}>Back</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClientInfo;
