import { useState, useEffect, useCallback } from 'react';
import useApiP from '../../hooks/useAPIProducts';
import Card from "../../components/cards/card";
import LargeCard from "../../components/cards/LargeCard";
import { CircularProgress } from '@mui/material';
import { BiError } from "react-icons/bi";
import searchIcon from './../../image/searchIcon.png';
import './products.css';


const BombasAgua = ({cartItems, setCartItems, setSuccessMessage }) => {
  const [isLargeCardOpen, setIsLargeCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data: productos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/catalogo');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const handleSearch = useCallback(() => {
    const trimmedSearchTerm = searchTerm.trim().toLowerCase();
    if (!trimmedSearchTerm) {
      setSearchResults([]);
      setIsSearchActive(false);
      return;
    }

    const filteredResults = productos.filter(producto =>
      Object.values(producto).some(value => 
        String(value).toLowerCase().includes(trimmedSearchTerm)
      )
    );

    setSearchResults(filteredResults);
    setIsSearchActive(true);
  }, [searchTerm, productos]);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  useEffect(() => {
    if (errorMessage) {
      console.log(errorMessage);
    }
  }, [errorMessage]);

  const openCard = (product) => {
    setSelectedProduct(product);
    setIsLargeCardOpen(true);
  };

  const closeCard = () => {
    setIsLargeCardOpen(false);
    setSelectedProduct(null);
  };

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id_producto === product.id_producto);

      const updatedItems = existingItem
        ? prevItems.map((item) =>
            item.id_producto === product.id_producto
              ? { ...item, quantity: item.quantity + (product.quantity || 1) }
              : item
          )
        : [...prevItems, { ...product, quantity: product.quantity || 1 }];

      return updatedItems;
    });
    setSuccessMessage("Tu producto se añadió al carrito")
  };

  if (isLoading) {
    return (
      <main className="main-content-loading">
        <h2>Bombas de Agua</h2>
        <div className='space' />
        <CircularProgress />
        <p className='loading'>Cargando productos...</p>
        <div className='space' />
      </main>
    );
  }

  if (errorMessage) {
    return(
      <main className="main-content-loading">
        <h2>Bombas de Agua</h2>
        <div className='space' />
        <BiError color='black' size={60}/>
        <p className='loading'>Error Cargando Productos: {errorMessage}</p>
        <div className='space' />
      </main>
    )
  }

  // Determinar qué productos mostrar basado en la búsqueda
  const productsToDisplay = isSearchActive ? searchResults : productos;

  return (
    <main className="main-content-prod">
      <h2>Bombas de Agua</h2>
      <div className="search-bar">
        <input
          className="searchbar"
          type="text"
          placeholder="Nombre, Descripción, Marca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-btn" onClick={handleSearch}>
          <img src={searchIcon} alt="Search" />
        </button>
      </div>
      <div className='space2' />

      <ul className="small-card-list">
        {productsToDisplay.map(product => (
          <Card
            key={product.id_producto}
            nombre={product.nombre}
            precio={product.precio}
            imagen={`/image/${product.id_producto}.png`}
            onMoreInfoClick={() => openCard(product)}
          />
        ))}
      </ul>
      {selectedProduct && (
        <LargeCard
          isOpen={isLargeCardOpen}
          closeCard={closeCard}
          product={selectedProduct}
          addToCart={addToCart}
          cartItems={cartItems}
        />
      )}
    </main>
  );
};

export default BombasAgua;