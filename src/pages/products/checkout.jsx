import React, { useState } from 'react';
import CheckoutHeader from '../../components/headers/checkoutHeader';
import './checkout.css';

const Checkout = ({ onRouteChange, cartItems }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  const [checkoutStep, setCheckoutStep] = useState('entrega'); // Nuevo estado para controlar el paso

  const handleNextStep = () => {
    // Cambia al siguiente paso cuando se confirma la información
    if (checkoutStep === 'entrega') {
      setCheckoutStep('pago');
    } else {
      // Aquí puedes manejar la confirmación final
      console.log("Orden confirmada");
    }
  };

  const handleLeave = () => {
    onRouteChange('Bombas de agua');
  };

  // Estado para los datos del formulario de entrega y pago
  const [formData, setFormData] = useState({
    nombre: '',
    direccion: '',
    telefono: '',
    nit: '',
    paymentMethod: 'tarjeta',
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvv: '',
    cantidadPago: ''
  });

  // Manejar cambios en los inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  return (
    <div>
      <CheckoutHeader />
      <div className="containerch">
        <h2> Checkout</h2>
        <div className="order-container">
          <div className="order-details">
            <h2>Orden #ENEZ025AAA</h2>
            <div className='title_check_side' onClick={ (e) => setCheckoutStep('entrega')}>
                  <h3 className='checkout'>Información de entrega</h3>
                  <div className='circle'></div>
            </div>
            {/* Render condicional basado en el estado checkoutStep */}
            {checkoutStep === 'entrega' && (
              <>
                <div className="section_checkout">
                  <div className="form-group">
                    <label>Nombre</label>
                    <input 
                      type="text" 
                      name="nombre" 
                      value={formData.nombre} 
                      onChange={handleInputChange} 
                      placeholder="Nombre completo" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input 
                      type="text" 
                      name="direccion" 
                      value={formData.direccion} 
                      onChange={handleInputChange} 
                      placeholder="Dirección de entrega" 
                    />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input 
                      type="text" 
                      name="telefono" 
                      value={formData.telefono} 
                      onChange={handleInputChange} 
                      placeholder="Número de teléfono" 
                    />
                  </div>
                  <div className="form-group">
                    <label>NIT</label>
                    <input 
                      type="text" 
                      name="nit" 
                      value={formData.nit} 
                      onChange={handleInputChange} 
                      placeholder="NIT" 
                    />
                  </div>
                  <div className="confirm-btn">
                    <button onClick={handleNextStep}>Confirmar Información de Entrega</button>
                  </div>
                </div>
              </>
            )}

            <div className='title_check_side' onClick={(e) => setCheckoutStep('pago')}>
              <h3 className='checkout'>Información de pago</h3>
              <div className='circle'></div>
            </div>

            {checkoutStep === 'pago' && (
              <>
                <div className="section_checkout">
                  <div className="forma-group">
                    <label>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="tarjeta" 
                        checked={formData.paymentMethod === 'tarjeta'} 
                        onChange={handleInputChange} 
                      /> Tarjeta
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="contra_entrega" 
                        checked={formData.paymentMethod === 'contra_entrega'} 
                        onChange={handleInputChange} 
                      /> Contra entrega
                    </label>
                  </div>

                  {formData.paymentMethod === 'tarjeta' && (
                    <div className="tarjeta-info">
                      <div className="form-group">
                        <label>Número de tarjeta</label>
                        <input 
                          type="text" 
                          name="numeroTarjeta" 
                          value={formData.numeroTarjeta} 
                          onChange={handleInputChange} 
                          placeholder="Número de tarjeta" 
                        />
                      </div>
                      <div className="form-group">
                        <label>Fecha de vencimiento</label>
                        <input 
                          type="text" 
                          name="fechaVencimiento" 
                          value={formData.fechaVencimiento} 
                          onChange={handleInputChange} 
                          placeholder="MM/YY" 
                        />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input 
                          type="text" 
                          name="cvv" 
                          value={formData.cvv} 
                          onChange={handleInputChange} 
                          placeholder="CVV" 
                        />
                      </div>
                      <div className="confirm-btn">
                        <button onClick={handleNextStep}>Confirmar Información de Pago</button>
                      </div>
                    </div>
                  )}

                  {formData.paymentMethod === 'contra_entrega' && (
                    <div className="tarjeta-info">
                      <div className="form-group">
                        <label>Cantidad Pago</label>
                        <input 
                          type="text" 
                          name="cantidadPago" 
                          value={formData.cantidadPago} 
                          onChange={handleInputChange} 
                          placeholder="Cantidad en Efectivo" 
                        />
                      </div>
                      <p className='info_extra_contra'>Esta información se utiliza para poder proveer la cantidad de vuelto necesario.</p>
                      <div className="confirm-btn">
                        <button onClick={handleNextStep}>Confirmar Información de Pago</button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Sección derecha: resumen de orden */}
          <div className="order-summary">
            <div className='summary'>
              <h3>Resumen de Orden</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>{item.quantity}</td>
                      <td>Q.{item.precio}</td>
                    </tr>
                  ))}
                  <tr>
                    <td><strong>Envio</strong></td>
                    <td><strong>-</strong></td>
                    <td><strong>Q. PH</strong></td>
                  </tr>
                </tbody>
              </table>
              
            </div>

            <div className="center-container">
              <div className="subtotal">Subtotal: Q{subtotal.toFixed(2)}</div>
              {checkoutStep === 'pago' && (
                <div className="confirm-btn">
                  <button onClick={handleNextStep}>Confirmar Orden</button>
                </div>
              )}
              <p className='info_extra'>¿Te hizo falta algún producto?</p> 
              <span className="registerLink" onClick={handleLeave}>
                Regresa a la pagina principal
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
