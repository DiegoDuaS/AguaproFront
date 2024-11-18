import React, { useEffect, useState, useCallback, useMemo } from 'react';
import './admin.css';
import { CircularProgress } from '@mui/material';
import searchIcon from './../../../image/searchIcon.png';
import useApiP from '../../../hooks/useAPIProducts';
import NewUserCard from '../../../components/cards/NewUserCard';
import DeleteUserCard from '../../../components/cards/deleteUserCard';
import StateCard from '../../../components/cards/stateCard';
import EditUserCard from '../../../components/cards/editUsercard';
import { BiError } from "react-icons/bi";
import { FaTrash } from "react-icons/fa6";
import { CiEdit } from "react-icons/ci";
import FilterSectionUsuarios from './Filtros/FilterSectionUsuarios';
import { FaFilter } from 'react-icons/fa';



const UsuariosPage = () => {
  const { data: usuarios, errorMessage, isLoading, refetch } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/users');
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [isNewCardOpen, setisNewCardOpen] = useState(false);
  const [isDeleteCardOpen, setisDeleteCardOpen] = useState(false);
  const [isEditCardOpen, setisEditCardOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessageState, setErrorMessageState] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterRole, setFilterRole] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [isSearchActive, searchResults, filterRole, sortOrder]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const openNewCard = () => {
    setisNewCardOpen(true);
  };

  const closeNewCard = () => {
    setisNewCardOpen(false);
  };

  const openDeleteCard = (user) => {
    setisDeleteCardOpen(true);
    setSelectedUser(user);
  };

  const closeDeleteCard = () => {
    setisDeleteCardOpen(false);
    setSelectedUser(null);
  };

  const openEditCard = (user) => {
    setisEditCardOpen(true);
    setSelectedUser(user);
  };

  const closeEditCard = () => {
    setisEditCardOpen(false);
    setSelectedUser(null);
  };
  
  const handleUserRegistration = async (userData) => {
      refetch(); // Refresh user list
      closeNewCard(); // Close the card
  };

  const handleSearch = useCallback(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }


    const filteredResults = usuarios.filter(usuario =>
      usuario.id.toString().includes(searchTerm.toLowerCase()) ||
      usuario.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
      usuario.created_at.includes(searchTerm)
    );

    setSearchResults(filteredResults);
    setIsSearchActive(true);
  }, [searchTerm, usuarios]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  }, [handleSearch]);

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

  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);

  const handleFilterChange = (e) => {
    setFilterRole(e.target.value);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const uniqueRoles = useMemo(() => {
    if (!usuarios) return [];
    const roles = [...new Set(usuarios.map(user => user.role))];
    return roles.sort(); // Sort alphabetically
  }, [usuarios]);


  const filteredAndSortedUsers = useCallback(() => {
    let result = isSearchActive ? searchResults : usuarios;
    if (filterRole) {
      result = result.filter(usuario => usuario.role.toLowerCase() === filterRole.toLowerCase());
    }
    if (sortOrder) {
      result.sort((a, b) => {
        if (sortOrder === 'asc') {
          return new Date(a.created_at) - new Date(b.created_at);
        } else if (sortOrder === 'desc') {
          return new Date(b.created_at) - new Date(a.created_at);
        }
        return 0;
      });
    }

    return result;
  }, [isSearchActive, searchResults, usuarios, filterRole, sortOrder]);

  const usuariosToDisplay = filteredAndSortedUsers();

  const totalPages = Math.ceil(usuariosToDisplay.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const endIndex = startIndex + 10;

  const usersEnPagina = usuariosToDisplay.slice(startIndex, endIndex);

  if (isLoading) {
    return (
      <div className="container">
        <div className="text">Usuarios</div>
        <div className="search-bar">
          <input
            className="searchbar"
            type="text"
            placeholder="Buscar Usuarios..."
            aria-label="Buscar Usuarios"
          />
          <button className="search-btn" aria-label="Search">
            <img src={searchIcon} alt="" />
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
            placeholder="Buscar Usuarios..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Buscar Usuarios"
          />
          <button className="search-btn" onClick={handleSearch} aria-label="Search">
            <img src={searchIcon} alt="" />
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
            placeholder="Buscar por ID, Nombre, Correo, Rol o Fecha..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            aria-label="Buscar Usuarios"
          />
          <button className="search-btn" onClick={handleSearch} aria-label="Search">
            <img src={searchIcon} alt="" />
          </button>
          <button onClick={toggleFilter} className="filter-button">
            <FaFilter /> Filter
          </button>
        </div>
        <button className='addbutton' onClick={() => openNewCard()}> Agregar Usuario +</button>
      </div>
      <FilterSectionUsuarios 
        isFilterOpen={isFilterOpen}
        filterRole={filterRole}
        handleFilterChange={handleFilterChange}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
        availableRoles={uniqueRoles}
      />

      <div className='clients-tablespace'> 
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
          {usersEnPagina.map((usuario, index) => {
            const iconColor = storedUser.id !== usuario.id ? '#00668C' : '#FF0000';
            const iconClass = storedUser.id !== usuario.id ? 'trash_icon' : 'trash_icon_undelteable';
            const handleClick = storedUser.id !== usuario.id ? () => openDeleteCard(usuario) : null;

            return (
              <div className="table5-grid table-row" key={index}>
                <FaTrash 
                  color={iconColor} 
                  className={iconClass} 
                  onClick={handleClick}
                />
                <p className='table-text'>#{usuario.id}</p>
                <p className='table-text'>{usuario.username}</p>
                <p className='table-text'>{usuario.email}</p>
                <p className='table-text'>{usuario.role}</p>
                <p className='table-text'>{usuario.created_at.slice(0, 10)}</p>
                <button className='more-edit' onClick={() => openEditCard(usuario)}>
                  <CiEdit size={25}/>
                </button>
              </div>
            );
          })}
        </div>
        <div className="pagination-controls">
          <div className='change-page'>
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
            >
              Anterior
            </button>
            <span>Página {currentPage} de {totalPages}</span>
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
      {isNewCardOpen && (
        <NewUserCard
          isOpen={isNewCardOpen}
          closeCard={closeNewCard}
          onRegister={handleUserRegistration}
          refetch={refetch}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessageState}
        />
      )}

      {isDeleteCardOpen && (
        <DeleteUserCard
          isOpen={isDeleteCardOpen}
          closeCard={closeDeleteCard}
          user={selectedUser}
          setSuccsessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessageState}
          refetchUsers={refetch}
        />
      )}

      {isEditCardOpen && (
        <EditUserCard
          isOpen={isEditCardOpen}
          closeCard={closeEditCard}
          user={selectedUser}
          refetchUsers={refetch}
          setSuccessMessage={setSuccessMessage}
          setErrorMessage={setErrorMessageState}
        />
      )}
      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessageState} isOpen={!!errorMessageState} type={2}/>
    </div>
  );
};

export default UsuariosPage;