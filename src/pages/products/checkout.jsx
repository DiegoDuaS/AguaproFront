import React from 'react';
import CheckoutHeader from '../../components/checkoutHeader';
import './checkout.css';

const Checkout = ({ onRouteChange, cartItems }) => {
  return (
    <div>
      <CheckoutHeader />
      <div className="containerch">
        <h2> Checkout</h2>
        <div className="order-container">
          {/* Sección izquierda: detalles adicionales */}
          <div className="order-details">
            <h2>Orden #ENEZ025AAA</h2>
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
            <div>
              <div className="subtotal">Subtotal: Q1627.97</div>
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
