import React, { useState } from 'react';
import useApiP from '../hooks/useAPIProducts';
import './NewProdCard.css';
import { CircularProgress } from '@mui/material';

const NewProdCard = ({ isOpen, closeCard }) => {
  const { data: tipos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/tipos_producto');
  
  const [step, setStep] = useState(1); 
  const [tipoProducto, setTipoProducto] = useState('');
  const [newTipo, setNewTipo] = useState('');
  const [nombre, setNombre] = useState('');
  const [tipoSelected, setTipoSelected] = useState(''); 
  const [descripcion, setDescripcion] = useState('');

  if (!isOpen) return null;

  const handleTipoChange = (e) => {
    setTipoProducto(e.target.value);
  };
  const handleNewTipoChange = (e) => setNewTipo(e.target.value);
  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleDescripcionChange = (e) => setDescripcion(e.target.value);

  const handleNextStep = async () => {
    if (step === 1) {
        if (tipoProducto === 'otro'){
            setTipoSelected(newTipo);
        }
        else{
            setTipoSelected(tipoProducto);
        }
        if ((tipoProducto === '' && newTipo === '') || (tipoProducto === 'otro' && newTipo === '')) {
            alert("Selecciona o crea un tipo de producto");
            return;
          }          
      setStep(2);
    } else if (step === 2) {
      if (!nombre || !descripcion) {
        alert("Completa todos los campos");
        return;
      }
    
      setStep(3);
    }
  };

  if (isLoading) {
    return (
      <div className="large-card-newprod">
        <button className="close-button" onClick={closeCard}>X</button>
        <h2 className='text'>Nuevo Producto</h2>
        <CircularProgress/>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="large-card-newprod">
        <button className="close-button" onClick={closeCard}>X</button>
        <h2 className='text'>Nuevo Producto</h2>
        <p>Error: {errorMessage}</p>
      </div>
    );
  }

  return (
    <div className="large-card-newprod">
      <button className="close-button" onClick={closeCard}>X</button>
      <h2 className='text'>Nuevo Producto</h2>

      {step === 1 && (
        <>
            <label>Selecciona un Tipo de Producto</label>
            <select value={tipoProducto} onChange={handleTipoChange}>
            <option value="" disabled hidden>
              -- Selecciona un tipo --
            </option>
            {tipos.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
            ))}
            <option value="otro">Otro</option>
            </select>
            
            {tipoProducto === "otro" && (
            <>
                <label style={{ marginTop: '1rem' }}>Crea un Nuevo Tipo de Producto</label>
                <input
                type="text"
                placeholder="Nuevo Tipo de Producto"
                value={newTipo}
                onChange={handleNewTipoChange}
                />
            </>
            )}
            
            <button onClick={handleNextStep} style={{ marginTop: '1rem' }}>
            Siguiente
            </button>
        </>
      )}

      {step === 2 && (
        <>
          <h6>Detalles del Producto</h6>
          <input
            type="text"
            placeholder="Nombre del Producto"
            value={nombre}
            onChange={handleNombreChange}
          />
          <textarea
            placeholder="Descripción"
            value={descripcion}
            onChange={handleDescripcionChange}
            rows={4}
          ></textarea>
          <p><strong>Tipo Producto: </strong>{tipoSelected} </p>
          
          <button onClick={handleNextStep} style={{ marginTop: '1rem' }}>
            Siguiente
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h6>Características Fijas</h6>
          {/* Aquí puedes agregar los campos para ingresar características fijas */}
          
          <button onClick={handleNextStep} style={{ marginTop: '1rem' }}>
            Siguiente
          </button>
        </>
      )}

      {/* Agrega más pasos según tus necesidades */}
    </div>
  );
};

export default NewProdCard;

