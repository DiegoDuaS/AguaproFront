import React, { useEffect, useRef, useState } from 'react';
import { CircularProgress } from '@mui/material';
import './EditProdCard.css';
import useModifyImage from '../../hooks/useModifyImage';
import useUpdateProduct from '../../hooks/useUpdateProduct';
import { getSizeIndex, getEnergiaIndex, getCondicionesIndex, getTipoIndex } from '../../hooks/useFetchs';

const EditProdCard = ({ isOpen, closeCard, product, refetchProducts, setSuccsessMessage, setErrorMessage}) => {
    
    const cardRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');
    const [isLoadingIm, setIsLoadingIm] = useState(true);
    const [error, setError] = useState(null);

    const { updateProduct, isLoading, errorMessage } = useUpdateProduct('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');
    const { modifyImage, isLoading2, errorMessage2, success} = useModifyImage('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');

    const [nombre, setNombre] = useState(product.nombre);
    const [descripción, setDescripción] = useState(product.descripción);
    const [tipoProducto, setTipoProducto] = useState(product.tipoproducto);
    const [precio, setPrecio] = useState(product.precio);
    const [disponibilidad, setDisponibilidad] = useState(product.disponibilidad);
    const [marca, setMarca] = useState(product.marca);
    const [modelo, setModelo] = useState(product.modelo);
    const [material, setMaterial] = useState(product.material);
    const [tipoIndex, setTipoIndex] = useState(null); 
    const [image, setImage] = useState(null);
    const [capacidadmin, setCapacidadmin] = useState(product.capacidadmin);
    const [capacidadmax, setCapacidadmax] = useState(product.capacidadmax);
    const [file, setFile] = useState(null)

    const handleImageChange = (e) => {
        const selectedFile = e.target.files[0]; // Obtén el archivo seleccionado
        if (selectedFile) {
            setFile(selectedFile); // Guarda el archivo en el estado `file`

            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Establece el estado `image` con la vista previa
            };
            reader.readAsDataURL(selectedFile); // Lee el archivo como una URL de datos
        }
    };

    useEffect(() => {
        const fetchImage = async () => {

          try {
            const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/images/visualize/${product.id_producto}.png`, {
              method: 'GET',
            });
            console.log()
    
            if (response.ok) {
              const blob = await response.blob();
              const url = URL.createObjectURL(blob);
              setImageSrc(url);
            } else {
              setError('Error al obtener la imagen');
            }
          } catch (error) {
            console.error('Error al cargar la imagen:', error);
            setError('Error al cargar la imagen');
          } finally {
            setIsLoadingIm(false);
          }
        };
    
        fetchImage();
      });


    const handleClickOutside = (event) => {
        if (cardRef.current && !cardRef.current.contains(event.target)) {
        closeCard();
        }
    };

    useEffect(() => {
        if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
        } else {
        document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    if (!isOpen) return null;
    
    useEffect(() => {
        if (isOpen) {
            const fetchIndices = async () => {
                try {
                    const tipoIdx = await getTipoIndex(tipoProducto);
                    setTipoIndex(tipoIdx);
                } catch (error) {
                    console.error('Error al obtener índices:', error);
                    alert('Hubo un error al obtener los índices. Inténtalo de nuevo.');
                }
            };

            fetchIndices();
        }
    }, [isOpen, tipoProducto]);

    const handleSave = async () => {
      try {
        const productData = {
          nombre,
          descripción,
          tipo_producto: tipoIndex,
          marca,
          modelo,
          material,
          capacidad_min: parseFloat(capacidadmin),
          capacidad_max: parseFloat(capacidadmax),
          precio: parseFloat(precio),
          disponibilidad: parseInt(disponibilidad)
        }; 
        if (file){
            const result2 = await modifyImage(product.id_producto, file);
            const result = await updateProduct(product.id_producto, productData);
            if (result.success) {
                if (result2.success){
                    await refetchProducts();
                    setSuccsessMessage('Cambios guardados exitosamente.');
                    closeCard();
                }
                else {
                    setErrorMessage('Hubo un error al guardar los cambios.');
                }
            } else {
            setErrorMessage('Hubo un error al guardar los cambios.');
            }
        }
        else{
            const result = await updateProduct(product.id_producto, productData);
            if (result.success) {
                    await refetchProducts();
                    setSuccsessMessage('Cambios guardados exitosamente.');
                    closeCard();
            } else {
            setErrorMessage('Hubo un error al guardar los cambios.');
            }
        }
      } catch (error) {
        console.error('Error al guardar los cambios:', error);
        setErrorMessage('Hubo un error al guardar los cambios. Inténtalo de nuevo.');
      }
    };
            

    return (
        <div className="large-card-edit" ref={cardRef}>
            <button className="close-button" onClick={closeCard}>X</button>
            <h2 className='text'>{product.nombre} - #{product.id_producto}</h2>
            <div className='tables-section'>
                <div className="section">
                    <div className="vertical-table">
                        <div className="table-row2">
                            <div className="table-cell title">Nombre</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={nombre}
                                placeholder={product.nombre}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Descripción</div>
                            <textarea
                                type="text"
                                className="table-cell inputdes"
                                value={descripción}
                                placeholder={product.descripción}
                                maxLength="100"
                                onChange={(e) => setDescripción(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Tipo de Producto</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={tipoProducto}
                                placeholder={product.tipo_producto}
                                onChange={(e) => setTipoProducto(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Precio</div>
                            <input
                                type="number"
                                className="table-cell input"
                                value={precio}
                                placeholder={product.precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </div> 
                        <div className="table-row2">
                            <div className="table-cell title">Marca</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={marca}
                                placeholder={product.marca}
                                onChange={(e) => setMarca(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Modelo</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={modelo}
                                placeholder={product.modelo}
                                onChange={(e) => setModelo(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Material</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={material}
                                placeholder={product.material}
                                onChange={(e) => setMaterial(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Capacidad mínima</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={capacidadmin}
                                placeholder={product.capacidadmin}
                                onChange={(e) => setCapacidadmin(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Capacidad máxima</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={capacidadmax}
                                placeholder={product.capacidadmax}
                                onChange={(e) => setCapacidadmax(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='section'>
                    <div className="table-cell title">Imagen del Producto</div>
                    {image ? (
                      <img src={image} alt="Preview" className='img_prod' />
                    ) : (
                        isLoadingIm ? (
                            <>
                                <p>Cargando imagen...</p>
                                <CircularProgress/>
                            </>  
                        ) : error ? (
                            <p>{error}</p>
                        ) : (
                         <img className='img_prod2' src={imageSrc} alt='Bomba de agua' />
                        )
                    )}
                    <input
                        id="upload_btn"
                        type="file"
                        onChange={handleImageChange}
                        accept=".png"
                    />
                    <label htmlFor="upload_btn" className='upload_image'>Subir Imagen</label>
                    <p>Solo archivos .png</p>
                
                </div>
            </div>
            <button className="save-button" onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar'}
            </button>	    
        </div>
    );
};

export default EditProdCard;
