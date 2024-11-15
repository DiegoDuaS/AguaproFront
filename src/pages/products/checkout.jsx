import React, { useState, useEffect, useCallback } from 'react';
import CheckoutHeader from '../../components/headers/checkoutHeader';
import './checkout.css';
import { useFetchClient } from '../../hooks/useFetchClient';
import { useUpdateClient } from '../../hooks/useUpdateClient';
import useRegisterClient from '../../hooks/useRegisterClient';
import useCreatePedido from '../../hooks/useCreatePedido';
import usePaymentRequest from '../../hooks/usePaymentRequest';
import useSalesReviewRequest from '../../hooks/useSalesReviewRequest';
import useUpdateUserEmail from '../../hooks/useUpdateUserEmail';
import StateCard from '../../components/cards/stateCard';

const Checkout = ({ onRouteChange, cartItems, navigateToLogin }) => {
  const shippingFee = 35.0;
  const subtotal = cartItems.reduce((acc, item) => acc + item.precio * item.quantity, 0);
  const total = subtotal + shippingFee;
  const [checkoutStep, setCheckoutStep] = useState('entrega'); // Nuevo estado para controlar el paso
  const [successMessage, setSuccessMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const userReference = localStorage.getItem('id');
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  //console.log(cartItems);


  const { sendPaymentRequest, loading: loadingPay, error: errorPay, success: successPay } = usePaymentRequest();
  const { sendSalesReviewRequest, loading: loadingReview, error: errorReview, success: successReview } = useSalesReviewRequest();
  const { createPedido, loading: pedidoLoading, error: errorPedido, message, pedidoId } = useCreatePedido();
  const { userData, loading, error, success, updateUserEmail } = useUpdateUserEmail();
  const { updateClient, loading: updateLoading, success: updateSuccess, error: updateError } = useUpdateClient();
  const {updatedResult, registerClient, isLoading: registerLoading, successMessage: registerSuccess, errorMessage: registerError } = useRegisterClient("https://aguapro-back-git-main-villafuerte-mas-projects.vercel.app");
  const { client, loading: clientLoading, refetch: refetchClient } = useFetchClient(userReference);

  //console.log(client);
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

  const handleNextStep = async () => {
    // Cambia al siguiente paso cuando se confirma la información
    if (checkoutStep === 'entrega') {
      if(hasEmptyFields1()){
        setWarningMessage("Completa todos los campos")
      }
      else{
        if (client) {
          const cleanData = {
            nombre: formData.nombre,
            direccion: formData.direccion,
            telefono: formData.telefono,
            nit: formData.nit,
            user_reference: userReference,
            email: formData.email
          };
          // Update client information if client already exists
          await updateClient(client.data.id_cliente, cleanData);
          //console.log(userReference);
          await updateUserEmail(userReference, cleanData.email);
          console.log(success);
          if (updateSuccess && success) {
            setSuccessMessage("Información guardada correctamente");
            refetchClient(); // Refresh client data after update
          } else if (updateError) {
            setErrorMessage(updateError);
          }
        } else {
          const cleanData = {
            nombre: formData.nombre,
            direccion: formData.direccion,
            telefono: formData.telefono,
            nit: formData.nit,
            user_reference: null,
            email: formData.email
          };
          // Register a new client if no client exists
          console.log(cleanData);
          await registerClient(cleanData, null);
          if (registerSuccess) {
            console.log(updatedResult);
            setSuccessMessage("Información guardada correctamente");
            refetchClient(); // Fetch client data after registration
          } else if (registerError) {
            setErrorMessage(registerError);
          }
        }
        setCheckoutStep('pago');
      }
    } else if (checkoutStep === 'pago') {
      if (!isOrderConfirmed) {
        setWarningMessage("Por favor confirma tu orden antes de proceder al pago.");
      } else {
        //console.log("Pago confirmado");
        const metodo = formData.paymentMethod === "transferencia" ? "la transferencia" : 
              formData.paymentMethod === "deposito" ? "el deposito" : 
              "Método no reconocido";
        const clientPay = {
           mailto: formData.email,
           metodo,
          };
        console.log(clientPay);
        await sendPaymentRequest(clientPay);
       
        const PayInfo = {
          mailTo: ['ventas@aguatesa.com', 'ventas2@aguatesa.com'],
          nombre: formData.nombre,
          correo: formData.email,
          telefono: formData.telefono,
          idPedido: pedidoId,
          monto: total,
          banco: formData.banco,
          numAutorizacion: formData.numeroAutorizacion
        };
        //console.log(successPay);
        await sendSalesReviewRequest(PayInfo);
        if(successReview){
          //onRouteChange('Bombas de agua');
          setSuccessMessage("Se envió el pago");
          onRouteChange('Bombas de agua');
        } else {
          setErrorMessage("Hubo un error al envia el pago");
        }
      }
    } 
    
  };

  const handleConfirmOrder = async () => {
    const productos = cartItems.map((item) => ({
      idProducto: item.id_producto,
      cantidad: item.quantity,
    }));
    
    const pedidoData = {
      clienteId: client ? client.data.id_cliente : updatedResult.id_cliente,
      productos,
      nitEmpresa: formData.nit,
      idDescuento: null, // Add discount ID if applicable
      direccion: formData.direccion,
    };

    // Make the pedido
    await createPedido(pedidoData);
    //console.log(pedidoId);
    // Handle success or error messaging
    if (message) {
      //console.log("pedido hecho");
      setIsOrderConfirmed(true);
      setSuccessMessage("Orden confirmada correctamente");
      //setSuccessMessage(message);
      //setCheckoutStep('confirmation'); // Go to the confirmation step
    } else {
      setErrorMessage("Hubo un problema al procesar el pedido");
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
    email:'',
    paymentMethod: 'tarjeta',
    numeroTarjeta: '',
    fechaVencimiento: '',
    cvv: '',
    cantidadPago: '',
    banco: '',
    numeroAutorizacion: '',
  });

useEffect(() => {
    if (client) {
      setFormData({
        nombre: client.data.nombre || '',
        telefono: client.data.telefono || '',
        nit: client.data.nit || '',
        direccion: client.data.direccion || '',
        email: client.data.email || '',
        paymentMethod: 'tarjeta',
        numeroTarjeta: '',
        fechaVencimiento: '',
        cvv: '',
        cantidadPago: ''
      });
    }
  }, [client]);

  //console.log(formData);
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
                  <div className="form-group">
                    <label>Correo</label>
                    <input
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Correo electrónico"
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

                 
                {(formData.paymentMethod === 'deposito' || formData.paymentMethod === 'transferencia') && (
                  <div className="tarjeta-info">
                    <div className="form-group">
                      <label>Monto</label>
                      <input 
                        type="text" 
                        name="monto"
                        value={`Q ${total.toFixed(2)}`} 
                        disabled
                        placeholder="Monto total" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Banco</label>
                      <input 
                        type="text" 
                        name="banco" 
                        value={formData.banco} 
                        onChange={handleInputChange} 
                        placeholder="Nombre del banco donde fue realizado el pago" 
                      />
                    </div>
                    <div className="form-group">
                      <label>Número de autorización</label>
                      <input 
                        type="text" 
                        name="numeroAutorizacion" 
                        value={formData.numeroAutorizacion} 
                        onChange={handleInputChange} 
                        placeholder="Número de autorización" 
                      />
                    </div>
                    
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
                    <td><strong>Q. {shippingFee}</strong></td>
                  </tr>
                </tbody>
              </table>
              
            </div>

            <div className="center-container">
              <div className="subtotal">Subtotal: Q{subtotal.toFixed(2)}</div>
              <div className="total">Total (con envio): Q{total.toFixed(2)}</div>
              { !isOrderConfirmed && checkoutStep === 'pago' && (
                <div className="confirm-btn">
                  <button onClick={handleConfirmOrder}>Confirmar Orden</button>
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
