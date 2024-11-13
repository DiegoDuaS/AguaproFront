import React, { useState, useEffect} from 'react';
import CheckoutHeader from '../../components/headers/checkoutHeader';
import './checkout.css';
import StateCard from '../../components/cards/stateCard';

const Checkout = ({ onRouteChange, cartItems, navigateToLogin }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  const [checkoutStep, setCheckoutStep] = useState('entrega'); // Nuevo estado para controlar el paso
  const [successMessage, setSuccessMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
      setWarningMessage('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage, warningMessage]);

  const hasEmptyFields1 = () => (
    formData.nombre === '' || formData.direccion === '' || formData.telefono === '' || formData.nit === ''
  );

  const handleNextStep = () => {
    // Cambia al siguiente paso cuando se confirma la información
    if (checkoutStep === 'entrega') {
      if(hasEmptyFields1()){
        setWarningMessage("Completa todos los campos")
      }
      else{
        setCheckoutStep('pago');
      }
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
      <CheckoutHeader navigateToLogin={navigateToLogin}/>
      <div className="containerch">
        <h2> Checkout</h2>
        <div className="order-container">
          <div className="order-details">
            <h2>Orden #ENEZ025AAA</h2>
            <div className='title_check_side' onClick={ (e) => setCheckoutStep('entrega')}>
                  <h3 className='checkout'>Información de entrega</h3>
                  <div className={`circle ${hasEmptyFields1() ? '' : 'active'}`}></div>
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

            <div className='title_check_side' onClick={handleNextStep}>
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
                        value="transferencia" 
                        checked={formData.paymentMethod === 'transferencia'} 
                        onChange={handleInputChange} 
                      /> Transferencia
                    </label>
                    <label>
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        value="deposito" 
                        checked={formData.paymentMethod === 'deposito'} 
                        onChange={handleInputChange} 
                      /> Deposito
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

                  {formData.paymentMethod === 'deposito' && (
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

                  {formData.paymentMethod === 'transferencia' && (
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
                <tbody className='resumen-box'>
                  {cartItems.map((item, index) => (
                    <tr key={index}>
                      <td>{item.nombre}</td>
                      <td>{item.quantity}</td>
                      <td>Q.{item.precio * item.quantity}</td>
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
      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessage} isOpen={!!errorMessage} type={2}/>
      <StateCard message={warningMessage} isOpen={!!warningMessage} type={4}/>
    </div>
  );
};

export default Checkout;
