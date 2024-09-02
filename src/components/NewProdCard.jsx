import React, { useState } from 'react';
import useApiP from '../hooks/useAPIProducts';
import './NewProdCard.css';
import { CircularProgress } from '@mui/material';

const NewProdCard = ({ isOpen, closeCard }) => {
  const { data: tipos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/tipos_producto');
  const { data: energias, errorMessageE, isLoadingE } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/energia');
  const { data: condicioness, errorMessageC, isLoadingC } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/condiciones');
  const { data: sizes, errorMessageS, isLoadingS } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/size');

  const [step, setStep] = useState(1);
  const [tipoProducto, setTipoProducto] = useState('');
  const [newTipo, setNewTipo] = useState('');
  const [tipoSelected, setTipoSelected] = useState(''); // Se manda paso 1
  const [nombre, setNombre] = useState(''); //Se manda paso 2
  const [descripcion, setDescripcion] = useState(''); // Se manda paso 2
  const [marca, setMarca] = useState(''); // Se manda paso 3
  const [material, setMaterial] = useState(''); // Se manda paso 3
  const [profundidad, setProfundidad] = useState(''); // Se manda paso 3
  const [conexionTuberia, setConexionTuberia] = useState(''); // Se manda paso 3
  const [presionFuncional, setPresionFuncional] = useState(''); // Se manda paso 3
  const [head, setHead] = useState(''); // Se manda paso 3
  const [flowRate, setFlowRate] = useState(''); // Se manda paso 3
  const [aplicaciones, setAplicaciones] = useState(''); // Se manda paso 3
  const [energia, setEnergia] = useState(''); // Se manda paso 3
  const [condiciones, setCondiciones] = useState(''); // Se manda paso 3
  const [temperaturaMedia, setTemperaturaMedia] = useState(''); // Se manda paso 3
  const [size, setSize] = useState('');  // Se manda paso 4
  const [precio, setPrecio] = useState(''); // Se manda paso 4
  const [disponibilidad, setDisponibilidad] = useState(''); // Se manda paso 4

  if (!isOpen) return null;

  const handleTipoChange = (e) => {
    setTipoProducto(e.target.value);
  };
  const handleNewTipoChange = (e) => setNewTipo(e.target.value);
  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleDescripcionChange = (e) => setDescripcion(e.target.value);
  const handleMarcaChange = (e) => setMarca(e.target.value);
  const handleMaterialChange = (e) => setMaterial(e.target.value);
  const handleProfundidadChange = (e) => setProfundidad(e.target.value);
  const handleConexionTuberiaChange = (e) => setConexionTuberia(e.target.value);
  const handlePresionFuncionalChange = (e) => setPresionFuncional(e.target.value);
  const handleHeadChange = (e) => setHead(e.target.value);
  const handleFlowRateChange = (e) => setFlowRate(e.target.value);
  const handleAplicacionesChange = (e) => setAplicaciones(e.target.value);
  const handleEnergiaChange = (e) => setEnergia(e.target.value);
  const handleCondicionesChange = (e) => setCondiciones(e.target.value);
  const handleTemperaturaMediaChange = (e) => setTemperaturaMedia(e.target.value);
  const handleSizeChange = (e) => setSize(e.target.value);
  const handlePrecioChange = (e) => setPrecio(e.target.value);
  const handleDisponibilidadChange = (e) => setDisponibilidad(e.target.value);


  const handleNextStep = async () => {
    if (step === 1) {
      if (tipoProducto === 'otro') {
        setTipoSelected(newTipo);
      } else {
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
    } else if (step === 3) {
      if (!marca || !material || !profundidad || !conexionTuberia || !presionFuncional || !head || !flowRate || !aplicaciones ||  !energia || !condiciones || !temperaturaMedia) {
        alert("Completa todos los campos");
        return;
      }
      setStep(4);
      console.log({ material, profundidad, conexionTuberia, presionFuncional, head, flowRate, aplicaciones, energia, condiciones, temperaturaMedia });
    } else if (step === 4) {
        if (!precio || !size || !disponibilidad
        ) {
          alert("Completa todos los campos");
          return;
        }
        closeCard();
        console.log({precio, size, disponibilidad})
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
            <h4>Tipo de Producto</h4>
            <div className='question-section'>
                <label>Selecciona un Tipo de Producto</label>
                <select value={tipoProducto} onChange={handleTipoChange} className='chooser'>
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
                    className='writer'
                    />
                </>
                )}
                <button onClick={handleNextStep} className='next-button'>
                Siguiente
                </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h4>Detalles del Producto</h4>
            <div className='question-section'>
                <p><strong>Tipo Producto: </strong>{tipoSelected} </p>
                <label style={{ marginTop: '1rem' }}>Nombre del Producto:</label>
                <input
                type="text"
                placeholder="Nombre del Producto"
                value={nombre}
                onChange={handleNombreChange}
                className='writer'
                />
                <label style={{ marginTop: '1rem' }}>Descripción del Producto:</label>
                <input
                placeholder="Descripción"
                value={descripcion}
                onChange={handleDescripcionChange}
                className='writer'
                ></input>
                <button onClick={handleNextStep} className='next-button'>
                Siguiente
                </button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <h4>Características Fijas</h4>
            <div className='question-section'>
                <div className='past-description'>
                    <p><strong>Tipo Producto: </strong>{tipoSelected} </p>
                    <p><strong>Nombre: </strong>{nombre} </p>
                    <p><strong>Descripción: </strong>{descripcion} </p>
                </div>

                <div className='divided'>

                    <div className='leftside'> 
                        <label>Marca:</label>
                        <input
                        type="text"
                        placeholder="Marca del Producto"
                        value={marca}
                        onChange={handleMarcaChange}
                        className='writer2'
                        />
                        <label>Material:</label>
                        <input
                        type="text"
                        placeholder="Material"
                        value={material}
                        onChange={handleMaterialChange}
                        className='writer2'
                        />
                        <label>Profundidad:</label>
                        <input
                        type="number"
                        step="any"
                        placeholder="Profundidad"
                        value={profundidad}
                        onChange={handleProfundidadChange}
                        className='writer2'
                        />
                        <label>Conexión de Tubería:</label>
                        <input
                        type="text"
                        placeholder="Conexión de Tubería"
                        value={conexionTuberia}
                        onChange={handleConexionTuberiaChange}
                        className='writer2'
                        />
                        <label>Presión Funcional:</label>
                        <input
                        type="number"
                        step="any"
                        placeholder="Presión Funcional"
                        value={presionFuncional}
                        onChange={handlePresionFuncionalChange}
                        className='writer2'
                        />
                        <label>Head:</label>
                        <input
                        type="number"
                        placeholder="Head"
                        value={head}
                        onChange={handleHeadChange}
                        className='writer2'
                        />
                    </div>

                    <div className='rightside'>
                        <label>Flow Rate:</label>
                        <input
                        type="number"
                        step="any"
                        placeholder="Flow Rate"
                        value={flowRate}
                        onChange={handleFlowRateChange}
                        className='writer2'
                        />
                        <label>Aplicaciones:</label>
                        <input
                        type="text"
                        placeholder="Aplicaciones"
                        value={aplicaciones}
                        onChange={handleAplicacionesChange}
                        className='writer2'
                        />

                        <label>Temperatura Media:</label>
                        <input
                        type="number"
                        step="any"
                        placeholder="Temperatura Media"
                        value={temperaturaMedia}
                        onChange={handleTemperaturaMediaChange}
                        className='writer2'
                        />

                        <label>Energia:</label>
                        <select value={energia} onChange={handleEnergiaChange} className='chooser2'>
                        <option value="" disabled hidden>
                            -- Selecciona un tipo de Energia --
                        </option>
                        {energias.map((energia) => (
                            <option key={energia.energia} value={energia.energia}>Capacitor: {energia.capacitor} - Energia Minima: {energia.min_hp} HP - Energia Maxima: {energia.max_hp} HP</option>
                        ))}
                        </select>

                        <label>Condiciones Funcionales:</label>
                        <select value={condiciones} onChange={handleCondicionesChange} className='chooser2'>
                        <option value="" disabled hidden>
                            -- Selecciona un tipo de Condicion --
                        </option>
                        {condicioness.map((condicion) => (
                            <option key={condicion.condiciones} value={condicion.condiciones}>Temp Min: {condicion.temperatura_liquida_min} C° - Temp Max: {condicion.temperatura_liquida_max} C° - Temp Ambiente: {condicion.temperatura_ambiente} C°</option>
                        ))}
                        </select>

                        <button onClick={handleNextStep} className='next-button'>
                            Siguiente
                        </button>
                    </div>
                </div>

            </div>


            
            
          </>
        )}

        {step === 4 && (
          <>
            <h4>Características Variables</h4>
                <div className='question-section'>

                <div className='past-description'>
                    <p><strong>Tipo Producto: </strong>{tipoSelected} </p>
                    <p><strong>Nombre: </strong>{nombre} </p>
                    <p><strong>Descripción: </strong>{descripcion} </p>
                </div>

                

                <label>Precio:</label>
                <input
                type="number"
                step="any"
                placeholder="Precio"
                value={precio}
                onChange={handlePrecioChange}
                className='writer'
                />

                <label>Disponibilidad:</label>
                <input
                type="number"
                step="any"
                placeholder="Disponibilidad"
                value={disponibilidad}
                onChange={handleDisponibilidadChange}
                className='writer'
                />

                <label>Tamaño:</label>
                <select value={size} onChange={handleSizeChange} className='chooser'>
                    <option value="" disabled hidden>
                        -- Selecciona un Tamaño --
                    </option>
                    {sizes.map((size) => (
                    <option key={size.size} value={size.size}>{size.range}''</option>
                    ))}
                    <option value="otro">Otro</option>
                </select>
                
                <button onClick={handleNextStep} className='next-button'>
                Finalizar
                </button>
            </div>
          </>
        )}
    </div>
  );
};

export default NewProdCard;
