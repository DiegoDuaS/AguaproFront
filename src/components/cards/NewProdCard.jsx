import React, { useState } from 'react';
import { createProduct, addProductChars, fetchTypeId, addProductVariableChars } from '../../hooks/useProductChars';
import useApiP from '../../hooks/useAPIProducts';
import './NewProdCard.css';
import { CircularProgress } from '@mui/material';
import uploadImage from '../../image/upload.png'
import useUploadImage from '../../hooks/useUploadImage';

const NewProdCard = ({ isOpen, closeCard, refetchProducts, setSuccsessMessage, setErrorMessage }) => {
  const { data: tipos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/tipos_producto');

  const [step, setStep] = useState(1);
  const [tipoProducto, setTipoProducto] = useState('');
  const [newTipo, setNewTipo] = useState('');
  const [tipoSelected, setTipoSelected] = useState(''); // Se manda paso 1
  const [nombre, setNombre] = useState(''); //Se manda paso 2
  const [descripcion, setDescripcion] = useState(''); // Se manda paso 2
  const [marca, setMarca] = useState(''); // Se manda paso 3
  const [modelo, setModelo] = useState(''); // Se manda paso 3
  const [material, setMaterial] = useState(''); // Se manda paso 3
  const [capacidadMax, setCapacidadmax] = useState(''); // Se manda paso 3
  const [capacidadMin, setCapacidadmin] = useState(''); // Se manda paso 3
  const [precio, setPrecio] = useState(''); // Se manda paso 4
  const [disponibilidad, setDisponibilidad] = useState(''); // Se manda paso 4
  const [image, setImage] = useState(null);
  const [productId, setProductId] = useState(null);
  const [file, setFile] = useState(null);   
 
  const { uploadImage, loading: uploading, error: uploadError, response } = useUploadImage();

  if (!isOpen) return null;

  /*const handleImageChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            setImage(reader.result); // Set the image state to the data URL
        };
        reader.readAsDataURL(file); // Read the file as a data URL
    }
 };*/

  const handleImageChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the image state to the data URL for preview
            };
            reader.readAsDataURL(selectedFile); // Read the file as a data URL
        }
    };  
    
    //const { uploadImage, loading, error, response } = useUploadImage();


  const handleTipoChange = (e) => {
    setTipoProducto(e.target.value);
  };
  const handleNewTipoChange = (e) => setNewTipo(e.target.value);
  const handleNombreChange = (e) => setNombre(e.target.value);
  const handleDescripcionChange = (e) => setDescripcion(e.target.value);
  const handleMarcaChange = (e) => setMarca(e.target.value);
  const handleModeloChange = (e) => setModelo(e.target.value);
  const handleMaterialChange = (e) => setMaterial(e.target.value);
  const handlePrecioChange = (e) => setPrecio(e.target.value);
  const handleDisponibilidadChange = (e) => setDisponibilidad(e.target.value);
  const handleCapacidadmax = (e) => setCapacidadmax(e.target.value);
  const handleCapacidadmin = (e) => setCapacidadmin(e.target.value);

  const handleNextStep = async () => {
    if (step === 1) {
      if (tipoProducto === 'otro') {
        setTipoSelected(newTipo);
        const newtipo = await fetchTypeId(newTipo);
        if (!newtipo) {
          setErrorMessage("No se pudo crear el nuevo tipo.")
          return;
        }

      } else {
        setTipoSelected(tipoProducto);
      }
      if ((tipoProducto === '' && newTipo === '') || (tipoProducto === 'otro' && newTipo === '')) {
        setErrorMessage("Selecciona o crea un tipo de producto")
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!nombre || !descripcion) {
        setErrorMessage("Completa todos los campos")
        return;
      }

      setStep(3);
    } else if (step === 3) {
      if (!marca || !modelo || !material || !image) {
        setErrorMessage("Completa todos los campos")
        return;
      }
      setStep(4);
    } else if (step === 4) {
        if (!precio || !disponibilidad
        ) {
          setErrorMessage("Completa todos los campos")
          return;
        }
        
        const createdProduct = await createProduct(nombre, descripcion, tipoSelected, marca, modelo, material, capacidadMin, capacidadMax, precio, disponibilidad);
        if (!createdProduct) {
          setErrorMessage("No se pudo crear el producto.")
          return;
        }
        
        if (file) {
          const response = await uploadImage(createdProduct.id_producto+".PNG", file);
          console.log(response);
          if (uploadError) {
            setErrorMessage(uploadError);
            return;
          }
          if (response) {
            setSuccsessMessage("Se agregó el producto correctamente.");
          }
        }
        await refetchProducts();
        closeCard();
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
                    <label>Marca:</label>
                    <input
                      type="text"
                      placeholder="Marca del Producto"
                      value={marca}
                      onChange={handleMarcaChange}
                      className='writer2'
                    />
                    <label>Modelo:</label>
                    <input
                      type="text"
                      placeholder="Modelo del Producto"
                      value={modelo}
                      onChange={handleModeloChange}
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
                    <label>Capacidad Minima:</label>
                    <input
                      type="number"
                      placeholder="Capacidad Minima"
                      value={capacidadMin}
                      onChange={handleCapacidadmin}
                      className='writer2'
                    />
                    <label>Capacidad Máxima:</label>
                    <input
                      type="number"
                      placeholder="Capacidad Máxima"
                      value={capacidadMax}
                      onChange={handleCapacidadmax}
                      className='writer2'
                    />
                    {image ? (
                      <img src={image} alt="Preview" className='img_prod_new' />
                    ) : (
                      <img src={uploadImage} alt="Preview" className='img_prod_new' />
                    )}
                    <input
                      id="upload_btn"
                      type="file"
                      onChange={handleImageChange}
                      accept=".jpg, .png"
                    />
                    <label for="upload_btn" className='upload_image'>Subir Imagen</label>
                    <p>Solo archivos .png o .jpg</p>
                    <button onClick={handleNextStep} className='next-button'>
                      Siguiente
                    </button>
        
                <div className='space2'></div>
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
                step="0.05"
                min="0"
                placeholder="0.00"
                value={precio}
                onChange={handlePrecioChange}
                className="writer"
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
