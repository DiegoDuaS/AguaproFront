import React, { useState, useEffect, useRef } from 'react';
import './cart.css'; // Import your CSS file
import { IoCartOutline } from "react-icons/io5";

const Cart = ({ cartItems, updateCartItem, removeCartItem, closeCart, checkout }) => {
 console.log('Cart items:', cartItems);
 const [total, setTotal] = useState(0);
 const cartRef = useRef(null);
 
  useEffect(() => {
    const calculatedTotal = cartItems.reduce((sum, item) => sum + (item.precio * item.quantity), 0);
    setTotal(calculatedTotal.toFixed(2)); // Keeping two decimal places
  }, [cartItems]);

  const handleClickOutside = (event) => {
    if (cartRef.current && !cartRef.current.contains(event.target)) {
      closeCart();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  return (
    <div className="cart" ref={cartRef}>
      <h3>Carrito</h3>
      {cartItems.length === 0 ? (
        <div className='emptycartholder'>
          <IoCartOutline stroke='black'  size={60}/>
          <p className='emptycart'>Tu Carrito esta vacio.</p>
        </div>  
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id_producto} className="cart-item">
                <img src={item.imagen} alt={item.nombre} className="cart-item-image" />
                <div className="cart-item-details">
                  <p>{item.nombre}</p>
                  <p>${item.precio !== undefined ? parseFloat(item.precio* item.quantity).toFixed(2) : '0.00'}</p>
                  <div className="quantity-controls">
                    <button onClick={() => updateCartItem(item.id_producto, item.quantity > 1 ? item.quantity - 1 : 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateCartItem(item.id_producto, item.quantity + 1)}>+</button>
                    <button onClick={() => removeCartItem(item.id_producto)}>Remover</button>
                  </div>
                  
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <div className="total-amount">Total: Q{total}</div>
            <button onClick={checkout} className="checkout-button">Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
