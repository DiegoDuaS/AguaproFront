import React, { useState, useEffect } from 'react';
import './admin.css';
import searchIcon from './../../../image/searchIcon.png';
import { CircularProgress } from '@mui/material';
import useApiP from '../../../hooks/useAPIProducts';
import { CiEdit } from "react-icons/ci";
import InfoProdCard from '../../../components/infoProdCard';
import EditProdCard from '../../../components/EditProdCard';
import NewProdCard from '../../../components/NewProdCard';
import { BiError } from "react-icons/bi";
import StateCard from '../../../components/stateCard';
import { GoTrash } from "react-icons/go";
import { FaTrash } from "react-icons/fa6";
import DeleteCard from '../../../components/deleteCard';


const ProductosPage = () => {
  const { data: productos, errorMessage, isLoading, refetch } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos');
  const [isInformationCardOpen, setisInformationCardOpen] = useState(false);
  const [isNewCardOpen, setisNewCardOpen] = useState(false);
  const [isEditCardOpen, setisEditCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageState, setErrorMessageState] = useState('');
  const [isDeleteCardOpen, setisDeleteCardOpen] = useState(false);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [successMessage]);

  useEffect(() => {
    if (errorMessageState) {
      const timer = setTimeout(() => {
        setErrorMessageState('');
      }, 5000); 

      return () => clearTimeout(timer); 
    }
  }, [errorMessageState]);

  const openCard = (producto) => {
    setSelectedProduct(producto);
    setisInformationCardOpen(true);
  };

  const closeCard = () => {
    setisInformationCardOpen(false);
    setSelectedProduct(null);
  };
  const openEditCard = (producto) => {
    setSelectedProduct(producto);
    setisEditCardOpen(true);
  };

  const closeEditCard = () => {
    setisEditCardOpen(false);
    setSelectedProduct(null);
  };
  const openNewCard = () => {
    setisNewCardOpen(true);
  };

  const closeNewCard = () => {
    setisNewCardOpen(false);
  };

  const openDeleteCard = (producto) => {
    setSelectedProduct(producto);
    setisDeleteCardOpen(true);
  };

  const closeDeleteCard = () => {
    setisDeleteCardOpen(false);
    setSelectedProduct(null);
  };

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Productos</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Productos..."
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className='space' />
        <div className='loadingcontainer'>
          <CircularProgress />
          <p className='loading'>Cargando productos...</p>
        </div>
      </div>
    );
  }

  // Pantalla de Error
  if (errorMessage) {
    return (
      <div className="container">
        <div className="text">Productos</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Productos..."
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className='space' />
        <div className='error-container'>
          <BiError color='black' size={80}/>
          <p className='loading'>Error Cargando Productos - {errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text">Productos</div>
      <div className='modbar'>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Productos..."
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <button className='addbutton' onClick={() => openNewCard()}> Agregar Producto +</button>
      </div>
      {/* PANTALLA PRINCIPAL SIN BUSCAR */}
      <div className="table">
        <div className="table3-grid table-header">
          <h3></h3>
          <h3>Id</h3>
          <h3>Nombre</h3>
          <h3>Descripción</h3>
          <h3>Precio Unitario</h3>
          <h3>Disponibilidad</h3>
          <h3>Marca</h3>
          <h3>Mas Información</h3>
          <h3>Editar</h3>
        </div>
        {productos.map((producto, index) => (
          <div className="table3-grid table-row" key={index}>
            <FaTrash color='#00668C' className='trash_icon' onClick={() => openDeleteCard(producto)}></FaTrash>
            <p className='table-text'>#{producto.id_producto}</p>
            <p className='table-text'>{producto.nombre}</p>
            <p className='table-text'>{producto.descripción}</p>
            <p className='table-text'>Q.{producto.precio}</p>
            <p className='table-text'>{producto.disponibilidad} Unidades</p>
            <p className='table-text'>{producto.marca}</p>
            <button 
              className='more-edit' 
              onClick={() => openCard(producto)}>
              ...
            </button>
            <button className='more-edit'
              onClick={() => openEditCard(producto)}>
              <CiEdit size={25}/>
              
            </button>
          </div>
        ))}
      </div>
      {selectedProduct && isInformationCardOpen && (
        <InfoProdCard
          isOpen={isInformationCardOpen}
          closeCard={closeCard}
          product={selectedProduct}
        />
      )}
      {selectedProduct && isEditCardOpen && (
        <EditProdCard
          isOpen={isEditCardOpen}
          closeCard={closeEditCard}
          product={selectedProduct}
          refetchProducts={refetch}
          setSuccsessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessageState}
        />
      )}
      {isNewCardOpen && (
        <NewProdCard
          isOpen={isNewCardOpen}
          closeCard={closeNewCard}
          refetchProducts={refetch}
          setSuccsessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessageState}
        />
      )}
      {isDeleteCardOpen && (
        <DeleteCard
          isOpen={isDeleteCardOpen}
          closeCard={closeDeleteCard}
          product={selectedProduct}
          setSuccsessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessageState}
          refetchProducts={refetch}
        />
      )}
      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessageState} isOpen={!!errorMessageState} type={2}/>
    </div>
    
  );
};

export default ProductosPage;
