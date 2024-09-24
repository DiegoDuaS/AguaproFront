import React from 'react';
import { useState, useEffect } from 'react';
import CheckoutHeader from '../../components/checkoutHeader';
import './checkout.css';


const Checkout = ({ onRouteChange, cartItems }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  console.log(cartItems);
  const [paymentMethod, setPaymentMethod] = useState('tarjeta');
  return (
    <div>
      <CheckoutHeader />
      <div className="containerch">
        <h2> Checkout</h2>
        <div className="order-container">
          {/* Sección izquierda: detalles adicionales */}
          <div className="order-details">
            <h2>Orden #ENEZ025AAA</h2>
            {/* Información de entrega section */}
            <div className="section">
              <h3>Información de entrega</h3>
              <div className="form-group">
                <label>Nombre:</label>
                <input type="text" placeholder="Nombre completo" />
              </div>
              <div className="form-group">
                <label>Dirección:</label>
                <input type="text" placeholder="Dirección de entrega" />
              </div>
              <div className="form-group">
                <label>Teléfono:</label>
                <input type="text" placeholder="Número de teléfono" />
              </div>
              <div className="form-group">
                <label>NIT:</label>
                <input type="text" placeholder="NIT" />
              </div>
            </div>

            {/* Información de pago section */}
            <div className="section">
              <h3>Información de pago</h3>
              <div className="forma-group">
                <label>
                  <input type="radio" name="payment" value="tarjeta" onChange={() => setPaymentMethod('tarjeta')} /> Tarjeta
                </label>
                <label>
                  <input type="radio" name="payment" value="contra_entrega" onChange={() => setPaymentMethod('contra_entrega')} /> Contra entrega
                </label>
              </div>

                {/* Conditionally render additional fields for tarjeta */}
                {paymentMethod === 'tarjeta' && (
                  <div className="tarjeta-info">
                    <div className="form-group">
                      <label>Número de tarjeta:</label>
                      <input type="text" placeholder="Número de tarjeta" />
                    </div>
                    <div className="form-group">
                      <label>Fecha de vencimiento:</label>
                      <input type="text" placeholder="MM/YY" />
                    </div>
                    <div className="form-group">
                      <label>CVV:</label>
                      <input type="text" placeholder="CVV" />
                    </div>
                  </div>
                )}
            </div>
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
                    <tr>
                      <td>{item.nombre}</td>
                      <td>{item.quantity}</td>
                      <td>Q.{item.precio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Subtotal y botón de confirmación */}
            <div className="center-container">
              <div className="subtotal">Subtotal: Q{subtotal.toFixed(2)}</div>
              <div className="confirm-btn">
                <button>Confirmar Orden</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
