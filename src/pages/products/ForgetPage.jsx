import './login.css';
import { useState, useEffect } from 'react';
import StateCard from '../../components/cards/stateCard';

const ForgetPage = ({ onRouteChange }) => {
  const [phase, setPhase] = useState(1); // Fase actual
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [warningMessage, setWarningMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [timeLeft, setTimeLeft] = useState(600);

  useEffect(() => {
    if (phase === 2 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer); 
    }
  }, [phase, timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
      setWarningMessage('');
    }, 5000);

    return () => clearTimeout(timer);
  }, [successMessage, errorMessage, warningMessage]);
  
  const handleSendEmail = () => {
    if (username === '' || email === ''){
        setWarningMessage("Completa todos los campos")
    }
    else{
        setTimeLeft(600);
        setSuccessMessage("Correo Enviado")
        setPhase(2);
    }
  };

  const handleVerifyCode = () => {
    if (verificationCode === ''){
        setWarningMessage("Ingresa el Código de Verificación")
    }
    else{
        setSuccessMessage("Código Verificado")
        setPhase(3);
    }
    
  };

  const handleChangePassword = () => {
    // Validar si las contraseñas coinciden
    if (newPassword !== confirmPassword) {
      setWarningMessage('Las contraseñas no coinciden');
      return;
    }
    else{
      setSuccessMessage('Contraseña cambiada con éxito')
      setTimeout(() => {
        onRouteChange('Login'); 
      }, 2500);
    }
  };

  return (
    <div className="mainContainer">
      <StateCard message={successMessage} isOpen={!!successMessage} type={1}/>
      <StateCard message={errorMessage} isOpen={!!errorMessage} type={2}/>
      <StateCard message={warningMessage} isOpen={!!warningMessage} type={4}/>
      <div className="titleContainer">Recupera tu Contraseña</div>

      {phase === 1 && (
        <div className="inputContainer">
          <div className="spacelogin"></div>
          <input
            className="inputBox"
            type="text"
            placeholder="Ingrese su usuario"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="inputBox"
            type="text"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button className="inputButton" onClick={handleSendEmail}>
            Enviar Correo
          </button>
          <button className="inputButton" onClick={() => onRouteChange('Login')}>
            Regresar
          </button>
          <div className="spacelogin"></div>
        </div>
      )}

      {phase === 2 && (
        <div className="inputContainer">
          <div className="spacelogin"></div>
          <p className='code-ver'>Revisa el inbox de tu correo</p>
          {timeLeft > 0 ? (
            <p className='code-ver'>
                El código vencerá en <strong>{formatTime(timeLeft)}</strong> minutos
            </p>
            ) : (
            <p className='code-ver'>El código ha vencido. Por favor, solicita uno nuevo.</p>
          )}
          <input
            className="inputBox"
            type="text"
            placeholder="Ingrese el código de verificación"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <button className="inputButton" onClick={handleVerifyCode}>
            Verificar Código
          </button>
          <button className="inputButton" onClick={handleSendEmail}>
            Renviar Código
          </button>
          <div className="spacelogin"></div>
        </div>
      )}

      {phase === 3 && (
        <div className="inputContainer">
          <div className="spacelogin"></div>
          <input
            className="inputBox"
            type="text"
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            className="inputBox"
            type="text"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button className="inputButton" onClick={handleChangePassword}>
            Cambiar Contraseña
          </button>
          <button className="inputButton" onClick={() => setPhase(2)}>
            Regresar
          </button>
          <div className="spacelogin"></div>
        </div>
      )}
    </div>
  );
};

export default ForgetPage;
