import React from 'react';
import './admin.css';
import { CircularProgress } from '@mui/material';
import searchIcon from './../../../image/searchIcon.png';
import useApiP from '../../../hooks/useAPIProducts';
import { BiError } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";

const UsuariosPage = () => {
  const { data: usuarios, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/users');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Usuarios</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Usuarios..."
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className='space' />
        <div className='loadingcontainer'>
          <CircularProgress />
          <p className='loading'>Cargando Usuarios...</p>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="container">
        <div className="text">Usuarios</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Search Usuarios..."
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <div className='space' />
        <div className='error-container'>
          <BiError color='black' size={80}/>
          <p className='loading'>Error Cargando Usuarios - {errorMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text">Usuarios</div>
      <div className='modbar'>
        <div className="search-bar">
          <input 
            className="searchbar" 
            type="text" 
            placeholder="Search Usuarios..." 
          />
          <button className="search-btn">
            <img src={searchIcon} alt="Search" />
          </button>
        </div>
        <button className='addbutton'> Agregar Usuario +</button>
      </div>

      <div className='clients-tablespace'> 
      {/* PANTALLA PRINCIPAL SIN BUSCAR */}
        <div className="table2">
          <div className="table5-grid table2-header">
            <h3/>
            <h3>Usuario Id</h3>
            <h3>Nombre Usuario</h3>
            <h3>Correo</h3>
            <h3>Rol</h3>
            <h3>Fecha de Creación</h3>
            <h3>Editar</h3>
          </div>
          {usuarios.map((usuario, index) => {
            
            const iconColor = storedUser.id !== usuario.id ? '#00668C' : '#FF0000';
            const iconClass = storedUser.id !== usuario.id ? 'trash_icon' : 'trash_icon_undelteable';
            return (
              <div className="table5-grid table-row" key={index}>
                <FaTrash color={iconColor} className={iconClass} />
                <p className='table-text'>#{usuario.id}</p>
                <p className='table-text'>{usuario.username}</p>
                <p className='table-text'>{usuario.email}</p>
                <p className='table-text'>{usuario.role}</p>
                <p className='table-text'>{usuario.created_at.slice(0, 10)}</p>
                <button className='more-edit'>
                  <CiEdit size={25}/>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UsuariosPage;
