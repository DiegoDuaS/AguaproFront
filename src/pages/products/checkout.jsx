import React, { useState } from 'react';
import CheckoutHeader from '../../components/checkoutHeader';
import './checkout.css';

const Checkout = ({ onRouteChange, cartItems }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
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
                    <input type="text" placeholder="Nombre completo" />
                  </div>
                  <div className="form-group">
                    <label>Dirección</label>
                    <input type="text" placeholder="Dirección de entrega" />
                  </div>
                  <div className="form-group">
                    <label>Teléfono</label>
                    <input type="text" placeholder="Número de teléfono" />
                  </div>
                  <div className="form-group">
                    <label>NIT</label>
                    <input type="text" placeholder="NIT" />
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
                      <input type="radio" name="payment" value="tarjeta" onChange={() => setPaymentMethod('tarjeta')} /> Tarjeta
                    </label>
                    <label>
                      <input type="radio" name="payment" value="contra_entrega" onChange={() => setPaymentMethod('contra_entrega')} /> Contra entrega
                    </label>
                  </div>

                  {paymentMethod === 'tarjeta' && (
                    <div className="tarjeta-info">
                      <div className="form-group">
                        <label>Número de tarjeta</label>
                        <input type="text" placeholder="Número de tarjeta" />
                      </div>
                      <div className="form-group">
                        <label>Fecha de vencimiento</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="CVV" />
                      </div>
                      <div className="confirm-btn">
                        <button onClick={handleNextStep}>Confirmar Información de Pago</button>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'contra_entrega' && (
                    <div className="tarjeta-info">
                      <div className="form-group">
                        <label>Cantidad Pago</label>
                        <input type="text" placeholder="Cantidad en Efectivo" />
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
