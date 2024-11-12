import { useState, useEffect, useCallback, useRef } from 'react';
import useApiP from '../../hooks/useAPIProducts';
import Card from "../../components/cards/card";
import LargeCard from "../../components/cards/LargeCard";
import { CircularProgress } from '@mui/material';
import { BiError } from "react-icons/bi";
import searchIcon from './../../image/searchIcon.png';
import './products.css';
import FilterCatalogo from './FitersCatalogo';

const BombasAgua = ({cartItems, setCartItems, setSuccessMessage }) => {
  const [isLargeCardOpen, setIsLargeCardOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { data: productos, errorMessage, isLoading } = useApiP('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/catalogo');
  const [images, setImages] = useState({}); 
  const [loadingImages, setLoadingImages] = useState(false);
  const [imageError, setImageError] = useState(null);
  const imageCache = useRef({});
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterMarca, setFilterMarca] = useState('');
  const [filterMaterial, setFilterMaterial] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [sortName, setSortName] = useState('');

  useEffect(() => {
    if (productos && productos.length > 0) {
      const fetchImages = async () => {
        setLoadingImages(true);
        setImageError(null);

        try {
          // Filtrar productos cuyas imágenes aún no se han cargado para evitar solicitudes innecesarias
          const uncachedProducts = productos.filter(product => !imageCache.current[product.id_producto]);

          if (uncachedProducts.length > 0) {
            // Realizar las solicitudes en paralelo con Promise.all
            const imagePromises = uncachedProducts.map(async (product) => {
              const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/images/visualize/${product.id_producto}.png`);
              if (response.ok) {
                const imageBlob = await response.blob();
                const imageURL = URL.createObjectURL(imageBlob);
                // Almacenar en caché
                imageCache.current[product.id_producto] = imageURL;
                return { id: product.id_producto, url: imageURL };
              } else {
                const fallbackImage = 'fallback-image.png'; // Imagen de respaldo
                imageCache.current[product.id_producto] = fallbackImage;
                return { id: product.id_producto, url: fallbackImage };
              }
            });

            // Esperar a que todas las imágenes se carguen
            const loadedImages = await Promise.all(imagePromises);

            // Solo actualizamos el estado si hay nuevas imágenes
            const newImages = { ...images };
            loadedImages.forEach(({ id, url }) => {
              newImages[id] = url;
            });

            setImages(prevImages => {
              // Solo actualizamos si algo ha cambiado
              if (JSON.stringify(prevImages) !== JSON.stringify(newImages)) {
                return newImages;
              }
              return prevImages;
            });
          }
        } catch (error) {
          console.error('Error al obtener las imágenes:', error);
          setImageError('Error al cargar imágenes.');
        } finally {
          setLoadingImages(false);
        }
      };

      fetchImages();
    }
  }, [productos]);


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

  const getMarcas = useCallback(() => {
    if (!productos) return [];
    return [...new Set(productos.map(p => p.marca))].sort();
  }, [productos]);

  const getMateriales = useCallback(() => {
    if (!productos) return [];
    return [...new Set(productos.map(p => p.material))].sort();
  }, [productos]);

  const handleMarcaChange = (e) => {
    setFilterMarca(e);
  };

  const handleMaterialChange = (e) => {
    setFilterMaterial(e);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
    setSortName(''); // Reset name sort when price sort is selected
  };

  const handleNameSort = (order) => {
    setSortName(order);
    setSortOrder(''); // Reset price sort when name sort is selected
  };

  // Filter and sort products
  const getFilteredProducts = useCallback(() => {
    let filtered = [...(productos || [])];

    // Apply marca filter
    if (filterMarca) {
      filtered = filtered.filter(p => p.marca === filterMarca);
    }

    // Apply material filter
    if (filterMaterial) {
      filtered = filtered.filter(p => p.material === filterMaterial);
    }

    // Apply price sorting
    if (sortOrder) {
      filtered.sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.precio - b.precio;
        } else {
          return b.precio - a.precio;
        }
      });
    }

    // Apply name sorting
    if (sortName) {
      filtered.sort((a, b) => {
        if (sortName === 'asc') {
          return a.nombre.localeCompare(b.nombre);
        } else {
          return b.nombre.localeCompare(a.nombre);
        }
      });
    }

    return filtered;
  }, [productos, filterMarca, filterMaterial, sortOrder, sortName]);

  if (isLoading || loadingImages) {
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
        <FilterCatalogo
          isFilterOpen={isFilterOpen}
          toggleFilter={() => setIsFilterOpen(!isFilterOpen)}
          marcas={getMarcas()}
          materiales={getMateriales()}
          filterMarca={filterMarca}
          filterMaterial={filterMaterial}
          handleMarcaChange={handleMarcaChange}
          handleMaterialChange={handleMaterialChange}
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
          sortName={sortName}
          handleNameSort={handleNameSort}
        />
      </div>


      <div className='space2' />

      <ul className="small-card-list">
        {getFilteredProducts().map(product => (
          <Card
            key={product.id_producto}
            nombre={product.nombre}
            precio={product.precio}
            imagen={images[product.id_producto] || 'fallback-image.png'}
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
          imageRef={images[selectedProduct.id_producto]}
        />
      )}
    </main>
  );
};

export default BombasAgua;
