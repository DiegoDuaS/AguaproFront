import React, { useEffect, useRef, useState } from 'react';
import useApiPr from '../hooks/useAPIProduct';
import './EditProdCard.css';
import ProductosPage from '../pages/products/Admin/ProductosPage';
import useUpdateProduct from '../hooks/useUpdateProduct';

const EditProdCard = ({ isOpen, closeCard, product}) => {
    
    const cardRef = useRef(null);

    const { updateProduct, isLoading, errorMessage } = useUpdateProduct('https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app/productos');

    const [nombre, setNombre] = useState(product.nombre);
    const [descripción, setDescripción] = useState(product.descripción);
    const [sizeRange, setSizeRange] = useState(product.size_range);
    const [tipoProducto, setTipoProducto] = useState(product.tipo_producto);
    const [precio, setPrecio] = useState(product.precio);
    const [disponibilidad, setDisponibilidad] = useState(product.disponibilidad);
    const [marca, setMarca] = useState(product.marca);
    const [material, setMaterial] = useState(product.material);
    const [profundidad, setProfundidad] = useState(product.profundidad);
    const [temperaturaLiquidaMax, setTemperaturaLiquidaMax] = useState(product.temperatura_liquida_max);
    const [conexionTuberia, setConexionTuberia] = useState(product.conexion_tuberia);
    const [presionFuncional, setPresionFuncional] = useState(product.presion_funcional);
    const [head, setHead] = useState(product.head);
    const [aplicaciones, setAplicaciones] = useState(product.aplicaciones);
    const [temperaturaMedia, setTemperaturaMedia] = useState(product.temperatura_media);
    const [minGpm, setMinGpm] = useState(product.min_gpm);
    const [maxGpm, setMaxGpm] = useState(product.max_gpm);
    const [minHp, setMinHp] = useState(product.min_hp);
    const [maxHp, setMaxHp] = useState(product.max_hp);
    const [capacitor, setCapacitor] = useState(product.capacitor);
    const [temperaturaLiquidaMin, setTemperaturaLiquidaMin] = useState(product.temperatura_liquida_min);
    const [temperaturaAmbiente, setTemperaturaAmbiente] = useState(product.temperatura_ambiente);
    const [presion, setPresion] = useState(product.presion);
    const [flowRate, setFlowRate] = useState(product.flow_rate); 

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

    const handleSave = async () => {
        const productData = {
            nombre,
            descripción,
            tipo_producto: tipoProducto,
            precio,
            disponibilidad,
            marca,
            material,
            profundidad,
            temperatura_liquida_max: temperaturaLiquidaMax,
            conexion_tuberia: conexionTuberia,
            presion_funcional: presionFuncional,
            head,
            aplicaciones,
            temperatura_media: temperaturaMedia,
            min_gpm: minGpm,
            max_gpm: maxGpm,
            min_hp: minHp,
            max_hp: maxHp,
            capacitor,
            temperatura_liquida_min: temperaturaLiquidaMin,
            temperatura_ambiente: temperaturaAmbiente,
            presion,
            flow_rate: flowRate,
        };

        const result = await updateProduct(product.id_producto, productData);
        if (result.success) {
            closeCard();
        }
    };

    return (
        <div className="large-card-prod" ref={cardRef}>
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
                            <input
                                type="text"
                                className="table-cell input"
                                value={descripción}
                                placeholder={product.descripción}
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
                        <div className="table-row2">
                            <div className="table-cell title">Profundidad (mm)</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={profundidad}
                                placeholder={product.profundidad}
                                onChange={(e) => setProfundidad(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Líquida Máxima(°C)</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={temperaturaLiquidaMax}
                                placeholder={product.temperatura_liquida_max}
                                onChange={(e) => setTemperaturaLiquidaMax(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Conexión de Tubería</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={conexionTuberia}
                                placeholder={product.conexio_tuberia}
                                onChange={(e) => setConexionTuberia(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Presión Funcional (bar)</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={presionFuncional}
                                placeholder={product.presion_funcional}
                                onChange={(e) => setPresionFuncional(e.target.value)}
                            />
                        </div>
                         <div className="table-row2">
                            <div className="table-cell title">Head</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={head}
                                placeholder={product.head}
                                onChange={(e) => setHead(e.target.value)}
                            />
                        </div>
                       <div className="table-row2">
                            <div className="table-cell title">Size Range</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={sizeRange}
                                placeholder={product.size_range}
                                onChange={(e) => setSizeRange(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className='section'>
                    <div className='vertical-table'>
                        <div className="table-row2">
                            <div className="table-cell title">Aplicaciones</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={aplicaciones}
                                placeholder={product.aplicaciones}
                                onChange={(e) => setAplicaciones(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Media (°C)</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={temperaturaMedia}
                                placeholder={product.temperatura_media}
                                onChange={(e) => setTemperaturaMedia(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">GPM Mínimo</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={minGpm}
                                placeholder={product.min_gpm}
                                onChange={(e) => setMinGpm(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">GPM Máximo</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={maxGpm}
                                placeholder={product.max_gpm}
                                onChange={(e) => setMaxGpm(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">HP Mínimo</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={minHp}
                                placeholder={product.min_hp}
                                onChange={(e) => setMinHp(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">HP Máximo</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={maxHp}
                                placeholder={product.max_hp}
                                onChange={(e) => setMaxHp(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Capacitor</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={capacitor}
                                placeholder={product.capacitor}
                                onChange={(e) => setCapacitor(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Líquida Mínima(°C)</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={temperaturaLiquidaMin}
                                placeholder={product.temperatura_liquida_min}
                                onChange={(e) => setTemperaturaLiquidaMin(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Temperatura Ambiente(°C)</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={temperaturaAmbiente}
                                placeholder={product.temperatura_ambiente}
                                onChange={(e) => setTemperaturaAmbiente(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Presión (bar)</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={presion}
                                placeholder={product.presion}
                                onChange={(e) => setPresion(e.target.value)}
                            />
                        </div>
                        <div className="table-row2">
                            <div className="table-cell title">Caudal (L/min)</div>
                            <input
                                type="text"
                                className="table-cell input"
                                value={flowRate}
                                placeholder={product.flow_rate}
                                onChange={(e) => setFlowRate(e.target.value)}
                            />
                        </div>
                    </div>
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
