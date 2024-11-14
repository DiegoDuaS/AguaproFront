import React, { useState, useEffect, useCallback } from 'react';
import './ClientInfo.css';
import useUserInfo from '../../hooks/useGetUserInfo';
import { useFetchClient } from '../../hooks/useFetchClient';
import useUpdateUser from '../../hooks/useUpdateUser';
import { useUpdateClient } from '../../hooks/useUpdateClient';
import useRegisterClient from '../../hooks/useRegisterClient';
import { CircularProgress } from '@mui/material';
import StateCard from '../../components/cards/stateCard';

const ClientInfo = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const username = user?.username;
  const userReference = localStorage.getItem('id');

  const { getUserInfo, isLoading, errorMessage } = useUserInfo('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');
  const { client, loading: clientLoading, refetch: refetchClient } = useFetchClient(userReference);
  
  // Hooks for handling updates and registration
  const { updateUser, isLoading: updatingUser, errorMessage: updateUserError } = useUpdateUser('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');
  const { updateClient, loading: updatingClient, success: updateClientSuccess, error: updateClientError } = useUpdateClient();
  const { registerClient, loading: registeringClient, success: registerClientSuccess, error: registerClientError } = useRegisterClient('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');

  const [showAdditionalForm, setShowAdditionalForm] = useState(false);
  const [formData2, setFormData2] = useState({ username: '', email: '', created_at: '' });
  const [formData, setFormData] = useState({ nombre: '', telefono: '', nit: '', direccion: '', email: formData2.email || '' , user_reference: '' });
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage2, setErrorMessage2] = useState(false);

  const memoizedGetUserInfo = useCallback(getUserInfo, []);
  useEffect(() => {
    if (client && formData2.email) {
      setFormData((prev) => ({ ...prev, email: formData2.email }));
      // Update client information with the new email
      const updateClientEmail = async () => {
        const id = parseInt(client.data.id_cliente);
        await updateClient(id, { ...formData, email: formData2.email });
      };
      updateClientEmail();
    }
  }, [formData2.email, client]);

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
        user_reference: userReference,
        email: formData2.email,
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
      setSuccessMessage(true)
      setFormData((prev) => ({ ...prev, email: formData2.email }));
    }
  };
  
  // Register or update client information
  const handleSubmit = async (e) => {
  e.preventDefault();

  // Ensure the form data is properly updated before submission
  setFormData({ ...formData, email: formData2.email, user_reference: parseInt(userReference, 10) });

  try {
    if (client == null) {
      // Register the client
      await registerClient(formData);
      
      // Refetch client info and reset the form or show success
      refetchClient();
      setShowAdditionalForm(false); // Hide the form after registration
     
    } else {
      // Update existing client information
      const id = parseInt(client.data.id_cliente);
      await updateClient(id, formData);
      setSuccessMessage(true);
    }
  } catch (error) {
    setErrorMessage2("An error occurred while submitting the form.");
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

        {!showAdditionalForm && (
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
            <p>Usuario desde <strong>{formData2.created_at.slice(0, 10)}</strong></p>

            {(client !== null) ? (
              <>
                <p>¡Encuentra tu información como cliente!{' '}</p>
                <button onClick={() => setShowAdditionalForm(true)}>Haz click aquí</button>
              
              </>
            ) : (
              <>
                <p>¿Quieres volverte un cliente frecuente?{' '}</p>
                <button onClick={() => setShowAdditionalForm(true)}>Haz click aquí</button>
              </>
            )}
          </>
        )}

        {(showAdditionalForm) && (
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
                  placeholder="Nombre Completo"
                />
              </div>
              <div className="form-group-cf">
                <label>Teléfono:</label>
                <input
                  type="text"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="Número de Teléfono"
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
                  placeholder="Dirrección de Envio"
                />
              </div>
              
              <div className='button-section-2'>
                <button type="button" onClick={() => setShowAdditionalForm(false)}>Regresar</button>
                {(client !== null) ? (
                  <>
                    <button type="submit">Actualizar</button>
                  </>
                ) : (
                  <>
                    <button type="submit">Crear Información</button>
                  </>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
      <StateCard message={"Información Actualizada Correctamente"} isOpen={!!successMessage} type={1}></StateCard>
    </div>
  );
};

export default ClientInfo;
