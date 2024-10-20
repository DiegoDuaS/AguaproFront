import React, { useEffect, useRef, useState } from 'react';
import useApiPr from '../../hooks/useAPIProduct';
import './EditProdCard.css';
import ProductosPage from '../../pages/products/Admin/ProductosPage';
import useUpdateProduct from '../../hooks/useUpdateProduct';
import { getSizeIndex, getEnergiaIndex, getCondicionesIndex, getTipoIndex } from '../../hooks/useFetchs';

const EditProdCard = ({ isOpen, closeCard, product, refetchProducts, setSuccsessMessage, setErrorMessage}) => {
    
    const cardRef = useRef(null);

    const { updateProduct, isLoading, errorMessage } = useUpdateProduct('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app');

    const [nombre, setNombre] = useState(product.nombre);
    const [descripción, setDescripción] = useState(product.descripción);
    const [tipoProducto, setTipoProducto] = useState(product.tipoproducto);
    const [precio, setPrecio] = useState(product.precio);
    const [disponibilidad, setDisponibilidad] = useState(product.disponibilidad);
    const [marca, setMarca] = useState(product.marca);
    const [material, setMaterial] = useState(product.material);
    const [tipoIndex, setTipoIndex] = useState(null); 
    const [image, setImage] = useState(null);

    const handleImageChange = (e) => {
        const file = e.target.files[0]; // Get the selected file
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result); // Set the image state to the data URL
            };
            reader.readAsDataURL(file); // Read the file as a data URL
        }
    };


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
            
            // Actualizar el producto principal
            const response = await fetch(`https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos/${product.id_producto}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nombre, descripción, tipo_producto: tipoIndex }),
            });
            if (!response.ok) {
                throw new Error('Error al actualizar el producto');
            }
    
            await refetchProducts();
            setSuccsessMessage('Cambios guardados exitosamente.');
            closeCard();
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
                                maxlength="100"
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
                                type="text"
                                className="table-cell input"
                                value={precio}
                                placeholder={product.precio}
                                onChange={(e) => setPrecio(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Disponibilidad</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={disponibilidad}
                                placeholder={product.disponibilidad}
                                onChange={(e) => setDisponibilidad(e.target.value)}
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
                            <div className="table-cell title">Material</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={material}
                                placeholder={product.material}
                                onChange={(e) => setMaterial(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='section'>
                    <div className="table-cell title">Imagen del Producto</div>
                    {image ? (
                      <img src={image} alt="Preview" className='img_prod' />
                    ) : (
                      <img src='https://elarenal.com.gt/cdn/shop/products/PLO-ROT-BACR5_bf4c08cb-f95f-44b2-8536-d995a4d337ed.jpg?v=1643991840' alt="Preview" className='img_prod' />
                    )}
                    <input
                        id="upload_btn"
                        type="file"
                        onChange={handleImageChange}
                        accept=".jpg, .png"
                    />
                    <label for="upload_btn" className='upload_image'>Subir Imagen</label>
                    <p>Solo archivos .png o .jpg</p>
                
                </div>
            </div>
            <button className="save-button" onClick={handleSave} disabled={isLoading}>
                {isLoading ? 'Guardando...' : 'Guardar'}
            </button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}	    
        </div>
    );
};

export default EditProdCard;
